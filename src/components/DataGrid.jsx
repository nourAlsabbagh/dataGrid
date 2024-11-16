import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "../assets/css/datagride.css";
import Loader from "./grid/Loader";
import Empty from "./grid/Empty";
import Failed from "./grid/Failed";
function DatatGrid({ rows, colsDef, defaultColDef, state, changeNameHandler }) {
  const gridRef = useRef();
  const handleSortChange = (e) => {
    //if we want to do something after sorting
  };
  const gridReadyHandler = (e) => {
    gridRef.current.api.addEventListener("changeNameEvent", (e) => {
      // here we can send a change column name request by props method
      // props.changeNameHandler
    });
  };
  useEffect(() => {
    // gridRef.current;
      }, []);

  return (
    <>
      {state != "failed" ? (
        <div
          className="custom-table-theme" // applying the Data Grid theme
          style={{ width: "100%", height: "100%" }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            loading={state == "loading" ? true : false}
            ref={gridRef}
            pagination={true}
            rowData={rows}
            columnDefs={colsDef}
            defaultColDef={defaultColDef}
            tooltipShowDelay={400}
            tooltipMouseTrack={true}
            suppressMultiSort={false}
            onSortChanged={handleSortChange}
            loadingOverlayComponent={Loader}
            noRowsOverlayComponent={Empty}
            onGridReady={gridReadyHandler}
          />
        </div>
      ) : (
        <Failed />
      )}
    </>
  );
}
export default DatatGrid;
