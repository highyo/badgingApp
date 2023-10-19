import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintHistory = ({ content, handlePrint }) => {
  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "first test",
  //   onAfterPrint: () => alert("Printed successfully"),
  // });
  return (
    <div>
      <div
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        {/* <h1 style={{ textAlign: "center", padding: "0 15px" }}>
          Employee Data
        </h1> */}
        <div style={{ textAlign: "center", padding: "0 15px" }}>{content}</div>
        {/* <button onClick={handlePrint}>Print</button> */}
      </div>
    </div>
  );
};

export default PrintHistory;
