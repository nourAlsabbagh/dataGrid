import useDataGrid from "../customHooks/useDataGrid";
import DatatGrid from "./DataGrid";
import PercentagePreviw from "./statistics/PercentagePreviw";
import { useEffect, useState } from "react";
import "../assets/css/basics.css";
import Btn from "./UI/Btn";
function Demo() {
  const [state, setState] = useState("loading");
  const [rows, colDefs, defaultColDef,error, fetchData] = useDataGrid();

  const emptyDataForTesting = [];
  const fetchDataFromServer = () => {
    setState("loading");
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetchData("server", data);
        setState(null);
      })
      .catch(() => {
        setState("failed");
      });
  };
  const fetchDataFromCsv = () => {
    setState("loading");
    try {
      fetchData("csv", "./DB.csv");
      setState(null);
    } catch {
      setState("failed");
    }
  };
  useEffect(() => {
    fetchDataFromCsv();
    if(error)
    setState("failed");
  }, [error]);
  return (
    <div className="container">
      <div className="d-flex buttons-container flex-wrap ">
        <Btn
          classes="mb-10"
          text={
            state != "loading"
              ? "Enable loading state"
              : "Disable loading state"
          }
          clickHandler={() => {
            state != "loading" ? setState("loading") : setState(null);
          }}
        />
        <Btn
          classes="mb-10"
          text={state!="empty" ? "Enable empty state" : "Disable empty state"}
          clickHandler={() => {
            state != "empty" ? setState("empty") : setState(null);
          }}
        />
        <Btn
          classes="mb-10"
          text={state != "failed" ? "Enable Failed state" : "Disable Failed state"}
          clickHandler={() => {
            state != "failed" ? setState("failed") : setState(null);
          }}
        />
        <Btn
          classes="mb-10 fetch-data"
          text="Fetch data from local csv file"
          clickHandler={fetchDataFromCsv}
        />
       
        <Btn
          classes="mb-10 fetch-data"
          text="Fetch data from api"
          clickHandler={fetchDataFromServer}
        />
      </div>
      <div className="" style={{ height: 450 }}>
        <DatatGrid
          rows={state=="empty" ? emptyDataForTesting : rows}
          colsDef={state=="empty" ? [] : colDefs}
          defaultColDef={defaultColDef}
          state={state}
        />
      </div>
    </div>
  );
}
export default Demo;
