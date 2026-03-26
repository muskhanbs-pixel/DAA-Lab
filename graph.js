const STATIONS = {
  A: { x: 80,  y: 60,  name: "Mumbai" },
  B: { x: 220, y: 40,  name: "Pune" },
  C: { x: 360, y: 70,  name: "Nashik" },
  D: { x: 120, y: 160, name: "Surat" },
  E: { x: 270, y: 150, name: "Vadodara" },
  F: { x: 420, y: 160, name: "Ahmedabad" },
  G: { x: 200, y: 260, name: "Rajkot" },
  H: { x: 380, y: 260, name: "Bhavnagar" }
};

const EDGES = [
  ["A", "B", 4],
  ["A", "D", 5],
  ["B", "C", 3],
  ["B", "E", 6],
  ["C", "F", 4],
  ["C", "E", 5],
  ["D", "E", 3],
  ["D", "G", 7],
  ["E", "F", 2],
  ["E", "G", 4],
  ["E", "H", 5],
  ["F", "H", 3],
  ["G", "H", 4],
  ["A", "E", 8]
];

const TRAINS = [
  { id: "T1", color: "#3B8BD4", src: "A", dst: "G" },
  { id: "T2", color: "#1D9E75", src: "B", dst: "H" },
  { id: "T3", color: "#BA7517", src: "C", dst: "F" },
  { id: "T4", color: "#D85A30", src: "A", dst: "H" },
  { id: "T5", color: "#7F77DD", src: "D", dst: "G" }
];