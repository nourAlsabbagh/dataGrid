function TotalPreview(props) {
  return (
    <>
      <div className="w-100 h-100 d-flex flex-col justify-center  max-width-200px align-selft-start">
        <div className="d-flex flex-col  px-20px justify-center text-center">
          <p className="value mb-0 f-25px semi-bold mt-0">{props.statistics}</p>
          <p className="label mb-0  mt-0 medium f-green">Total</p>
        </div>
      </div>
    </>
  );
}

export default TotalPreview;
