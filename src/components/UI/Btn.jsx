function Btn(props) {
  return (
    <button className={props.classes + " button"} onClick={props.clickHandler}>
      {props.text}
    </button>
  );
}
export default Btn;
