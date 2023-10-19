import React, { useEffect, useState } from "react";
import "../pages/history.css";
import { RxCross2 } from "react-icons/rx";

export const periodRegistration = [];

const PopFormHistory = ({
  handleQuery,
  hidePopForm,
  startingDate,
  setStartingDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="form-popup" id="formpop">
      <form className="form-container">
        <RxCross2 size={24} className="closePopUp" onClick={hidePopForm} />
        <h1>Date Range</h1>
        <hr />
        <div className="start-date">
          <label htmlFor="sdate">Start Date:</label>
          <input
            type="date"
            name="sdate"
            id="sdate"
            required
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </div>
        <div className="end-date">
          <label htmlFor="edate">End Date:</label>
          <input
            type="date"
            name="edate"
            id="edate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-popup"
          id="btn-popup"
          style={{ cursor: "pointer" }}
          onClick={handleQuery}
        >
          Query
        </button>
      </form>
    </div>
  );
};

export default PopFormHistory;
