export default function Number(props) {
  const { value, isRed = false } = props;

  return (
    <span className={`number ${isRed ? "red" : ""}`}>{value}</span>
  )
}