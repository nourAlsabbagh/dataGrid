import empty from "../../assets/empty-box.png";
export default function Empty() {
  return (
    <>
      <div className="d-flex flex-col align-items-center h-100 ">
        <img src={empty} style={{ height: 150, width: 150 }} alt="" />
        <span className="semi-bold">No Row To show</span>
      </div>
    </>
  );
}
