export default function TangentLineGraph(props) {
  const curveLabel = props.curveLabel;
  const tangentLabel = props.tangentLabel;
  const width = 320;
  const height = 220;
  const cx = width / 2;
  const cy = height / 2;
  const scale = 10;

  const curvePoints = [];
  for (let px = -5; px <= 5; px += 0.2) {
    const py = px * px - 3;
    curvePoints.push([cx + px * scale, cy - py * scale]);
  }
  const curvePath = "M " + curvePoints.map(function(p) { return p[0] + " " + p[1]; }).join(" L ");

  const tx1 = -5, tx2 = 5;
  const ty1 = 4 * tx1 - 7, ty2 = 4 * tx2 - 7;

  const pointX = 2, pointY = 2 * 2 - 3;

  return (
    <svg viewBox={"0 0 " + width + " " + height} className="w-full max-w-sm rounded border border-line bg-white">
      <line x1={0} y1={cy} x2={width} y2={cy} stroke="#E4DFCF" strokeWidth="1" />
      <line x1={cx} y1={0} x2={cx} y2={height} stroke="#E4DFCF" strokeWidth="1" />
      <path d={curvePath} fill="none" stroke="#0E4F4A" strokeWidth="2" />
      <line x1={cx + tx1 * scale} y1={cy - ty1 * scale} x2={cx + tx2 * scale} y2={cy - ty2 * scale} stroke="#D9A441" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx={cx + pointX * scale} cy={cy - pointY * scale} r="4" fill="#B5533C" />
      <text x={8} y={16} fontSize="10" fill="#0E4F4A">{curveLabel || "f(x) = x^2 - 3"}</text>
      <text x={8} y={30} fontSize="10" fill="#D9A441">{tangentLabel || "tangent at x=2: y = 4x - 7"}</text>
    </svg>
  );
}
