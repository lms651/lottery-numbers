export default function Button(props) {
    const text = props.text;
    const onClick = props.onClick;

  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}