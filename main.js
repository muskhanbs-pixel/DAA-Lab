const canvas = document.getElementById("railwayCanvas");
const ctx = canvas.getContext("2d");

let activePathEdges = [];
let activeTrain = 0;
let activeAlgo = "dijkstra";

function selectTrain(index) {
  activeTrain = index;
  document.querySelectorAll(".train-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
  if (activePathEdges.length > 0) runAlgorithm();
}

function selectAlgo(algo, el) {
  activeAlgo = algo;
  document.querySelectorAll(".algo-btn").forEach(btn => btn.classList.remove("active"));
  el.classList.add("active");
}

function getPos(s) {
  const W = canvas.width, H = canvas.height;
  const padX = 60, padY = 50;
  const scaleX = (W - padX * 2) / 460;
  const scaleY = (H - padY * 2) / 240;
  return {
    x: padX + s.x * scaleX,
    y: padY + s.y * scaleY
  };
}

function drawNetwork() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Draw edges
  EDGES.forEach(([a, b, w]) => {
    const A = getPos(STATIONS[a]);
    const B = getPos(STATIONS[b]);
    const isActive = activePathEdges.some(
      ([p, q]) => (p === a && q === b) || (p === b && q === a)
    );

    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);

    if (isActive) {
      ctx.strokeStyle = TRAINS[activeTrain].color;
      ctx.lineWidth = 4;
      ctx.shadowColor = TRAINS[activeTrain].color;
      ctx.shadowBlur = 10;
    } else {
      ctx.strokeStyle = "#dde0ea";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Weight label
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    ctx.fillStyle = isActive ? TRAINS[activeTrain].color : "#b0b4c8";
    ctx.font = "11px Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(w, mx, my - 9);
  });

  // Draw nodes
  Object.entries(STATIONS).forEach(([key, s]) => {
    const { x, y } = getPos(s);
    const inPath = activePathEdges.flat().includes(key);

    // Glow ring
    if (inPath) {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = TRAINS[activeTrain].color + "22";
      ctx.fill();
    }

    // Circle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = inPath ? TRAINS[activeTrain].color : "#ffffff";
    ctx.fill();
    ctx.strokeStyle = inPath ? TRAINS[activeTrain].color : "#c0c4dc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Letter
    ctx.fillStyle = inPath ? "#ffffff" : "#4a4a7a";
    ctx.font = "bold 13px Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(key, x, y);

    // City name
    ctx.fillStyle = inPath ? TRAINS[activeTrain].color : "#9090b0";
    ctx.font = "10px Segoe UI";
    ctx.textBaseline = "top";
    ctx.fillText(s.name, x, y + 19);
  });
}

function runAlgorithm() {
  const t = TRAINS[activeTrain];
  let result;

  if (activeAlgo === "dijkstra") result = dijkstra(t.src, t.dst);
  else if (activeAlgo === "greedy") result = greedy(t.src, t.dst);
  else result = dp(t.src, t.dst);

  activePathEdges = [];
  for (let i = 0; i < result.path.length - 1; i++) {
    activePathEdges.push([result.path[i], result.path[i + 1]]);
  }

  drawNetwork();

  // Result card
  document.getElementById("resultCard").style.display = "block";
  document.getElementById("resultContent").innerHTML = `
    <div class="result-row">
      <span class="result-label">Train</span>
      <span class="result-value">${t.id}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Algorithm</span>
      <span class="result-value">${activeAlgo}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Cost</span>
      <span class="result-value">${result.cost} min</span>
    </div>
    <div class="result-row">
      <span class="result-label">Path</span>
      <span class="result-path">${result.path.join(" → ")}</span>
    </div>
  `;

  document.getElementById("outputLog").innerHTML = `
    <div class="log-row">
      <span class="log-train" style="color:${t.color}">${t.id}</span>
      <span class="log-path">${result.path.join(" → ")}</span>
      <span class="log-cost">${result.cost} min</span>
    </div>
  `;
}

function runAll() {
  let html = "";
  TRAINS.forEach((t) => {
    let result;
    if (activeAlgo === "dijkstra") result = dijkstra(t.src, t.dst);
    else if (activeAlgo === "greedy") result = greedy(t.src, t.dst);
    else result = dp(t.src, t.dst);

    html += `
      <div class="log-row">
        <span class="log-train" style="color:${t.color}">${t.id}</span>
        <span class="log-path">${result.path.join(" → ")}</span>
        <span class="log-cost">${result.cost} min</span>
      </div>`;
  });

  document.getElementById("outputLog").innerHTML = html;
  activePathEdges = [];
  drawNetwork();
}

function resetDashboard() {
  activePathEdges = [];
  activeTrain = 0;
  activeAlgo = "dijkstra";
  document.querySelectorAll(".train-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === 0);
  });
  document.querySelectorAll(".algo-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === 0);
  });
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("outputLog").innerHTML =
    "Select a train and algorithm then click Run.";
  drawNetwork();
}

window.onload = drawNetwork;
window.addEventListener("resize", drawNetwork);