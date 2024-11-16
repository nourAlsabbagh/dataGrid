import { useEffect } from "react";

function PercentagePreviw(props) {
  const getStatistics = () => {
    if (!!props.statistics)
      return (
        <>
          {Object.keys(props.statistics).map(function (key) {
            return (
              <div
                className="d-flex justify-between px-20px"
                key={"statistics_" + key}
              >
                <p className="label medium mb-0 f-blue f-14px ellipsis">{key}</p>
                <p className="value  mb-0 f-14px semi-bold">
                  {props.statistics[key]}%
                </p>
              </div>
            );
          })}
        </>
      );
  };

  return (
    <>
      <div className="w-100 h-100 d-flex flex-col justify-start max-width-200px align-selft-start">
        {getStatistics()}
      </div>
    </>
  );
}
export default PercentagePreviw;
