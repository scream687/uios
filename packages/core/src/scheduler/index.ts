/**
 * DAG scheduler — real dependency-respecting execution with level parallelism.
 *
 * Nodes declare dependencies; the scheduler computes topological levels (Kahn's
 * algorithm) and runs every node in a level concurrently, passing prior results
 * in. Independent nodes genuinely run in parallel; cycles are rejected. This is
 * the execution substrate for the PRD's distributed runtime.
 */

export interface TaskNode<T = unknown> {
  id: string;
  deps: string[];
  run: (results: ReadonlyMap<string, unknown>) => T | Promise<T>;
}

export interface ScheduleResult {
  results: Map<string, unknown>;
  /** Topological levels; nodes within a level executed concurrently. */
  levels: string[][];
}

export class DagCycleError extends Error {
  constructor(public readonly remaining: string[]) {
    super(`DAG has a cycle or unresolved dependency among: ${remaining.join(', ')}`);
    this.name = 'DagCycleError';
  }
}

/** Execute a DAG. Deterministic: levels and within-level order are id-sorted. */
export async function schedule(nodes: TaskNode[]): Promise<ScheduleResult> {
  const byId = new Map<string, TaskNode>();
  for (const n of nodes) {
    if (byId.has(n.id)) throw new Error(`Duplicate task id: ${n.id}`);
    byId.set(n.id, n);
  }
  for (const n of nodes) {
    for (const d of n.deps) {
      if (!byId.has(d)) throw new Error(`Task "${n.id}" depends on unknown "${d}"`);
    }
  }

  const indegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();
  for (const n of nodes) {
    indegree.set(n.id, n.deps.length);
    for (const d of n.deps) {
      if (!dependents.has(d)) dependents.set(d, []);
      dependents.get(d)!.push(n.id);
    }
  }

  const results = new Map<string, unknown>();
  const levels: string[][] = [];
  let ready = [...nodes].filter((n) => n.deps.length === 0).map((n) => n.id).sort();
  let processed = 0;

  while (ready.length > 0) {
    levels.push(ready);
    // Execute this level concurrently.
    await Promise.all(
      ready.map(async (id) => {
        results.set(id, await byId.get(id)!.run(results));
      }),
    );
    processed += ready.length;

    const next: string[] = [];
    for (const id of ready) {
      for (const dep of dependents.get(id) ?? []) {
        const remaining = indegree.get(dep)! - 1;
        indegree.set(dep, remaining);
        if (remaining === 0) next.push(dep);
      }
    }
    ready = next.sort();
  }

  if (processed !== nodes.length) {
    const remaining = nodes.filter((n) => !results.has(n.id)).map((n) => n.id);
    throw new DagCycleError(remaining);
  }

  return { results, levels };
}
