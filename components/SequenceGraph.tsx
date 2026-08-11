export default function SequenceGraph(props) {
  const points = props.points;
  const width = 320;
  const height = 200;
  const padding = 30;

  const maxN = Math.max(...points.map(function(p) { return p.n; }));
  const maxVal = Math.max(...points.map(function(p) { return p.value; }));
  const minVal = Math.min(0, Math.min(...points.map(function(p) { return p.value; })));

  function scaleX(n) {
    return padding + (n / maxN) * (width - 2 * padding);
  }
  function scaleY(val) {
    return height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
  }

  return (
    <svg viewBox={"0 0 " + width + " " + height} className="w-full max-w-sm rounded border border-line bg-white">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#E4DFCF" strokeWidth="1" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#E4DFCF" strokeWidth="1" />
      {points.map(function(p) {
        return (
          <circle key={p.n} cx={scaleX(p.n)} cy={scaleY(p.value)} r="4" fill="#0E4F4A" />
        );
      })}
      <text x={width / 2} y={height - 5} fontSize="10" fill="#12241F99" textAnchor="middle">n (position)</text>
      <text x={10} y={height / 2} fontSize="10" fill="#12241F99" textAnchor="middle" transform={"rotate(-90 10 " + (height / 2) + ")"}>a_n (value)</text>
    </svg>
  );
}
