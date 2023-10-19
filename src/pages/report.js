import React, { useEffect, useState } from "react";
import "./report.css";
import { useNavigate } from "react-router-dom";
import { authUser } from "./Home";
import axios from "axios";

const Report = () => {
  const [report, setReport] = useState("");
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  const whatTime = new Date().getHours();

  useEffect(() => {
    if (authUser.length === 0) {
      return navigate("/");
    }

    getData();
  }, []);

  const morning = () => {
    const { id, firstname, name, pass, email, privilege, activity } =
      authUser[0];

    axios
      .post("http://localhost:8081/employeeApi/badgeOnMorning", {
        id,
        firstname,
        name,
        pass,
        email,
        privilege,
        activity,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err))
      .finally(() => {
        getData();
      });
  };

  const night = () => {
    const { id, firstname, name, pass, email, privilege, activity } =
      authUser[0];

    console.log("We are at night");
    axios
      .post("http://localhost:8081/employeeApi/badgeAfterNoon", {
        id,
        firstname,
        name,
        pass,
        email,
        privilege,
        report,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err))
      .finally(() => {
        getData();
        setReport("");
      });
  };

  async function getData() {
    axios
      .get(
        `http://localhost:8081/employeeApi/findRegistrationsByEmpName/${authUser[0].name}`
      )
      .then((result) => {
        console.log(result.data);
        setHistory(result.data);
      })
      .catch((err) => console.log(err))
      .finally((response) => {
        console.log("response finally:", response);
      });
  }

  function logout() {
    return navigate("/");
  }

  return (
    <div className="container">
      <h3
        style={{
          margin: "20px auto 10px auto",
          borderBottom: "0.5px solid black",
        }}
      >
        Daily Report
      </h3>
      <button
        style={{
          border: "none",
          outline: "none",
          padding: "3px 5px",
          position: "absolute",
          right: "180px",
          top: "20px",
          borderRadius: "5px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          background: "#656d6d",
          color: "white",
          cursor: "pointer",
        }}
        onClick={logout}
      >
        Log Out
      </button>
      <textarea
        cols={80}
        rows={10}
        className="report"
        name="report"
        value={report}
        onChange={(e) => setReport(e.target.value)}
        placeholder="Please type your report here..."
      />
      <div className="btn-action">
        <button
          className="btn morning"
          // disabled={whatTime > 11 ? true : false}
          onClick={morning}
        >
          Morning Recording
        </button>
        <button
          className="btn night"
          // disabled={whatTime > 14 ? false : true}
          disabled={report.length < 30 ? true : false}
          onClick={night}
        >
          submit Report
        </button>
      </div>
      <div className="container-hist" style={{ marginTop: "35px" }}>
        <div
          className="title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4px",
            cursor: "pointer",
          }}
        >
          <h3>Hystory</h3>
          <h3>{new Date().toLocaleDateString()}</h3>
        </div>
        <div className="employee-data">
          <table id="employee" style={{ marginBottom: "40px" }}>
            <thead>
              <tr>
                <th>First name</th>
                <th>Email</th>
                <th>morning Arrival</th>
                <th>Last time connected</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.empName}</td>
                    <td>{item.email}</td>
                    <td>{item.timeOnMorning}</td>
                    <td>{item.timeOnAfternoon}</td>
                    <td>{item.report && item.report.slice(0, 30)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {authUser.length > 0 && authUser.pop()} */}
        </div>
      </div>
    </div>
  );
};

export default Report;
