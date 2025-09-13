import Number from "./Number"

export default function NumberDisplay({ numbers = [] }) {
  // empty placeholders
  const whiteBalls = numbers.slice(0, 5);
  const powerBall = numbers[5];

  return (
    <main>
      <div className="number-display">
        <div className="row">
          {[0,1,2].map(i => (
            <Number key={i} value={whiteBalls[i] ?? null} />
          ))}
        </div>
        <div className="row">
          {[3,4].map(i => (
            <Number key={i} value={whiteBalls[i] ?? null} />
          ))}
        </div>
        <div className="row">
          <Number value={powerBall ?? null} isRed />
        </div>
      </div>
    </main>
  );
}