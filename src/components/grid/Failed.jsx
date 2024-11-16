import error from "../../assets/server.png";
export default function Failed() {
  return (
    <>
      <div className="ag-overlay-wrapper d-flex flex-col align-items-center h-100 justify-center">
        <img className="mb-10" src={error} style={{ height: 150, width: 150 }} alt="" />
        <span className="semi-bold">Oops! something went error please try again</span>
      </div>
    </>
  );
}
