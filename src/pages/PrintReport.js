import React, { useEffect } from "react";
import { registratio } from "./History";
import "./printReport.css";
import { authUser } from "./Home";
import { useNavigate } from "react-router-dom";
import { AiFillPrinter } from "react-icons/ai";

const PrintReport = () => {
  const navigate = useNavigate();

  //Print
  //   const componentRef = useRef();
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //     documentTitle: "Daily Report",
  //     // onAfterPrint: () => alert("Printed successfully"),
  //   });

  // End print

  useEffect(() => {
    if (authUser.length === 0) {
      return navigate("/");
    }

    if (registratio.length == 0) {
      return navigate("/history");
    }
  }, []);

  const { report, email, firstname, empName, timeOnAfternoon } =
    registratio[0] || {};
  // const { report, email, firstname, empName, timeOnAfternoon } = registratio[0];

  function printThisReport() {
    document.getElementById("printer").style.display = "none";
    window.print();
    document.getElementById("printer").style.display = "block";
  }

  return (
    <div className="printContainer" id="printContainer">
      <h1 style={{ margin: "35px 0 25px 0" }}>Seven Group Solution</h1>
      <h3 style={{ marginBottom: "15px" }}>Daily Report</h3>
      <AiFillPrinter
        // onClick={window.print}
        onClick={printThisReport}
        size={20}
        style={{ position: "absolute", right: "180px", top: "40px" }}
        id="printer"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <h5>
          {" "}
          <span
            style={{ borderBottom: "1px solid black", width: "max-content" }}
          >
            Employee's Name:
          </span>
          {" " + firstname + " " + empName}
        </h5>
        <h5>
          <span
            style={{ borderBottom: "1px solid black", width: "max-content" }}
          >
            Date:
          </span>
          {" " + timeOnAfternoon}
        </h5>
      </div>
      <div style={{ margin: "35px 0", width: "80%", textAlign: "center" }}>
        {report}
      </div>
    </div>
  );
};

export default PrintReport;
