// ---- ALGORITHM 1: DIJKSTRA ----
function dijkstra(src, dst) {
  const dist = {};
  const prev = {};
  const visited = new Set();

  // Set all distances to infinity first
  Object.keys(STATIONS).forEach(s => dist[s] = Infinity);
  dist[src] = 0;

  const pq = [[0, src]];

  while (pq.length > 0) {
    // Pick the station with smallest distance
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();

    if (visited.has(u)) continue;
    visited.add(u);
    if (u === dst) break;

    // Check all neighbours
    for (const [a, b, w] of EDGES) {
      const nb = a === u ? b : b === u ? a : null;
      if (!nb) continue;

      if (dist[u] + w < dist[nb]) {
        dist[nb] = dist[u] + w;
        prev[nb] = u;
        pq.push([dist[nb], nb]);
      }
    }
  }

  // Build path by backtracking
  const path = [];
  let cur = dst;
  while (cur) {
    path.unshift(cur);
    cur = prev[cur];
  }

  return { path, cost: dist[dst] };
}


// ---- ALGORITHM 2: GREEDY ----
function greedy(src, dst) {
  // Build adjacency list
  const adj = {};
  Object.keys(STATIONS).forEach(s => adj[s] = []);
  EDGES.forEach(([a, b, w]) => {
    adj[a].push([b, w]);
    adj[b].push([a, w]);
  });

  const path = [src];
  const visited = new Set([src]);
  let cur = src;
  let cost = 0;

  while (cur !== dst) {
    // Get unvisited neighbours
    const nbrs = adj[cur].filter(([n]) => !visited.has(n) || n === dst);
    if (!nbrs.length) break;

    // Always pick the nearest one
    nbrs.sort((a, b) => a[1] - b[1]);
    const [next, w] = nbrs[0];

    path.push(next);
    visited.add(next);
    cost += w;
    cur = next;
  }

  return { path, cost };
}


// ---- ALGORITHM 3: DYNAMIC PROGRAMMING (Floyd-Warshall) ----
function dp(src, dst) {
  const nodes = Object.keys(STATIONS);
  const n = nodes.length;
  const idx = {};
  nodes.forEach((s, i) => idx[s] = i);

  // Create distance and next-hop tables
  const d = Array.from({ length: n }, () => Array(n).fill(Infinity));
  const next = Array.from({ length: n }, () => Array(n).fill(-1));

  // Distance from a node to itself is 0
  nodes.forEach((_, i) => d[i][i] = 0);

  // Fill in direct edge weights
  EDGES.forEach(([a, b, w]) => {
    d[idx[a]][idx[b]] = w;
    d[idx[b]][idx[a]] = w;
    next[idx[a]][idx[b]] = idx[b];
    next[idx[b]][idx[a]] = idx[a];
  });

  // DP: try every intermediate node k
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (d[i][k] + d[k][j] < d[i][j]) {
          d[i][j] = d[i][k] + d[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Build path using next-hop table
  const si = idx[src];
  const di = idx[dst];
  const path = [src];
  let cur = si;

  while (cur !== di) {
    cur = next[cur][di];
    if (cur === -1) break;
    path.push(nodes[cur]);
  }

  return { path, cost: d[si][di] };
}