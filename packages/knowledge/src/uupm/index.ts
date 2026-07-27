/**
 * UupmClient — data-backed design-system selection via the bundled
 * ui-ux-pro-max Python engine (84 styles, 192 WCAG-checked palettes, 74 font
 * pairings, landing + motion specs), driven by variance/motion/density dials.
 *
 * We shell out to the bundled `search.py --design-system --json` and parse the
 * structured result. Deterministic given the same query + dials + CSV data;
 * results are cached by input key so pipeline replay stays stable. If Python is
 * unavailable the client returns null and callers fall back to BrandDNAEngine.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const run = promisify(execFile);

const SCRIPT_URL = new URL(
  '../../external/ui-ux-pro-max-skill/cli/assets/scripts/search.py',
  import.meta.url,
);
const SCRIPT_PATH = fileURLToPath(SCRIPT_URL);
const SCRIPT_DIR = dirname(SCRIPT_PATH);

export interface Dials {
  variance: number; // 1 centered/minimal … 10 bold/asymmetric
  motion: number; // 1 subtle … 10 complex
  density: number; // 1 spacious … 10 dense
}

export interface UupmColors {
  primary: string;
  on_primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  destructive: string;
  ring: string;
  cta: string;
  text: string;
  notes?: string;
}

export interface UupmDesignSystem {
  project_name: string;
  category: string;
  style: { name: string; type: string; effects: string; keywords: string };
  pattern: { name: string; sections: string; color_strategy: string };
  colors: UupmColors;
  typography: { heading: string; body: string; mood: string; google_fonts_url: string };
  spacing_scale: Record<string, string>;
  motion_snippet: Record<string, string>;
  key_effects: string;
  anti_patterns: string;
  dials: Record<string, number | string>;
}

let pythonBin: string | null | undefined; // undefined = not probed, null = none

async function resolvePython(): Promise<string | null> {
  if (pythonBin !== undefined) return pythonBin;
  for (const bin of ['python3', 'python']) {
    try {
      await run(bin, ['--version'], { timeout: 5000 });
      pythonBin = bin;
      return bin;
    } catch {
      /* try next */
    }
  }
  pythonBin = null;
  return null;
}

const cache = new Map<string, UupmDesignSystem | null>();

export class UupmClient {
  /**
   * Resolve a full design system for a query + dials. Returns null if Python is
   * unavailable or the engine errors (caller should fall back).
   */
  public async designSystem(query: string, dials: Dials): Promise<UupmDesignSystem | null> {
    const key = `${query}|${dials.variance}|${dials.motion}|${dials.density}`;
    if (cache.has(key)) return cache.get(key)!;

    const python = await resolvePython();
    if (!python) {
      cache.set(key, null);
      return null;
    }

    try {
      const { stdout } = await run(
        python,
        [
          SCRIPT_PATH,
          query,
          '--design-system',
          '--json',
          '--variance',
          String(dials.variance),
          '--motion',
          String(dials.motion),
          '--density',
          String(dials.density),
        ],
        { cwd: SCRIPT_DIR, timeout: 20000, maxBuffer: 8 * 1024 * 1024 },
      );
      const parsed = JSON.parse(stdout) as { design_system?: UupmDesignSystem };
      const ds = parsed.design_system ?? null;
      cache.set(key, ds);
      return ds;
    } catch {
      cache.set(key, null);
      return null;
    }
  }

  /** Is the underlying Python engine reachable? */
  public async available(): Promise<boolean> {
    return (await resolvePython()) !== null;
  }
}
