/**
 * detectSlop — deterministic anti-pattern detection via the bundled impeccable
 * engine (59 slop rules: ai-color-palette, radial-halo, pulsing-dot,
 * hero-eyebrow-chip, gradient-text, bounce-easing, …). Tailwind-aware, so it
 * lints UIOS's emitted JSX source directly. Detect-only: callers fold the
 * findings into their score.
 */
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

// Point straight at the regex text detector — the only thing detectSlop needs.
// The top-level barrel (detect-antipatterns.mjs) eagerly imports the CLI entry
// and browser/visual detectors (puppeteer, cli/lib), which we don't vendor.
const ENGINE_PATH = fileURLToPath(
  new URL('../../external/impeccable/cli/engine/engines/regex/detect-text.mjs', import.meta.url),
);

export type SlopSeverity = 'critical' | 'warning' | 'advisory';

export interface SlopFinding {
  id: string;
  name: string;
  severity: SlopSeverity;
  category: string;
  line?: number;
  snippet: string;
  remediation: string;
}

interface RawFinding {
  antipattern: string;
  name: string;
  description: string;
  severity: string;
  category: string;
  line?: number;
  snippet: string;
}

// The engine is untyped ESM; import once and reuse.
let enginePromise: Promise<{ detectText: (code: string) => RawFinding[] }> | null = null;
function loadEngine() {
  if (!enginePromise) {
    enginePromise = import(pathToFileURL(ENGINE_PATH).href) as Promise<{
      detectText: (code: string) => RawFinding[];
    }>;
  }
  return enginePromise;
}

const SEVERITIES: SlopSeverity[] = ['critical', 'warning', 'advisory'];
function normalizeSeverity(s: string): SlopSeverity {
  return (SEVERITIES as string[]).includes(s) ? (s as SlopSeverity) : 'warning';
}

/** Run impeccable's detector over source code; returns typed slop findings. */
export async function detectSlop(code: string): Promise<SlopFinding[]> {
  let engine;
  try {
    engine = await loadEngine();
  } catch {
    return []; // engine unavailable → no findings rather than a hard failure
  }
  const raw = engine.detectText(code) ?? [];
  return raw.map((f) => ({
    id: f.antipattern,
    name: f.name,
    severity: normalizeSeverity(f.severity),
    category: f.category,
    line: f.line,
    snippet: f.snippet,
    remediation: f.description,
  }));
}

/** Severity-weighted penalty from a set of findings (for score folding). */
export function slopPenalty(findings: SlopFinding[]): number {
  const weight: Record<SlopSeverity, number> = { critical: 12, warning: 6, advisory: 2 };
  return findings.reduce((acc, f) => acc + weight[f.severity], 0);
}
