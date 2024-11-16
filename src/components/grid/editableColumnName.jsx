import { useEffect, useRef, useState } from "react";
import React from "react";
// import "../assets/css/demo.css";
import PercentagePreviw from "../statistics/PercentagePreviw";
import TotalPreview from "../statistics/TotalPreview";
function editableColumnName(props) {
  const [columnName, setcolumnName] = useState(props.column.colDef.headerName);
  const toggleEditMode = (e) => {
    e.stopPropagation();
    document
      .querySelector(`#column_${props.column.colId}  .ag-header-cell-text `)
      .classList.toggle("d-none");
    document
      .querySelector(`#column_${props.column.colId} input`)
      .classList.toggle("d-none");
  };
  const getStatistics = () => {
    if (typeof props.statistics == "number")
      return <TotalPreview statistics={props.statistics} />;
    else return <PercentagePreviw statistics={props.statistics} />;
  };
  const setColumnNameInputValue = (e) => {
    setcolumnName(e.target.value);
  };
  const handleChangeName = (e) => {
    if (columnName.trim() != "") {
      try {
        var columns = props.api.getColumnDefs();
        columns.forEach((colDef) => {
          if (colDef.colId == props.column.colId)
            colDef.headerName = columnName;
        });
        props.api.setGridOption("columnDefs", columns);
        props.api.refreshHeader();
        props.api.dispatchEvent({
          type: "changeNameEvent",
          column: props.column,
          data: props.column?.colDef?.headerName,
        });
        setHeaderName(columnName);
      } catch {
        setcolumnName(props.column?.colDef?.headerName);
        toggleEditMode(e);
      }
    } else {
      setcolumnName(props.column?.colDef?.headerName);
      toggleEditMode(e);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleChangeName(e);
    }
  };
  const handleSort = () => {
    if (!props?.column?.sort) {
      props.setSort("asc");
    } else if (props?.column?.sort == "asc") {
      props.setSort("desc");
    } else {
      props.setSort(undefined);
    }
    props.api.refreshHeader();
  };
  return (
    <div className="ag-cell-label-container pointer" onClick={handleSort}>
      <div
        className="ag-header-cell-label d-flex justify-between w-100   "
        id={`column_${props.column.colId}`}
      >
        <div className="py-10 ms-20">
          <input
            className="d-none editMode light-gray  f-14px w-100 "
            value={columnName}
            onChange={setColumnNameInputValue}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <span
            onClick={toggleEditMode}
            data-ref="eText"
            className=" ellipsis ag-header-cell-text semi-bold f-14px  w-fit-content"
          >
            {props.column?.colDef?.headerName + "- ( " + props.type_of + " ) "}
          </span>
        </div>

        <span
          className={
            (!!props?.column?.sort
              ? "fa-sort-" + props?.column?.sort
              : "fa-sort") + "  px-20  fa  f-12px f-green"
          }
        ></span>
      </div>
      <div className="h-100 w-100 pointer">{getStatistics()}</div>
    </div>
  );
}

export default editableColumnName;
