import React, { useEffect, useRef, useState } from "react";
import "./history.css";
import PopFormHistory from "../components/PopFormHistory";
import axios from "axios";
import { authUser } from "./Home";
import { useNavigate } from "react-router-dom";
import { BsClipboardData } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { BiEdit } from "react-icons/bi";
import { periodRegistration } from "../components/PopFormHistory";
import { AiFillDelete } from "react-icons/ai";
import { deleteRegistration, getRegistrations } from "../utils/ApiManagement";

export const registratio = [];

const History = () => {
  // const [popform, setpopform] = useState("");
  const [empData, setEmpData] = useState([]);
  const [todayFilter, setTodayFilter] = useState(true);
  const [allHistory, setAllHistory] = useState([]);

  //For props
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registration, setRegistration] = useState([]);

  //For update badging
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [morningArrival, setMorningArrival] = useState("");
  const [leavingTime, setLeavingTime] = useState("");
  const [time_, setTime_] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );

  const navigate = useNavigate();
  const todayRegistration = [];

  // useEffect(() => {
  //   if (authUser.length == 0) {
  //     return navigate("/");
  //   }
  //   fetch("http://localhost:8081/employeeApi/findallEmp", {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       // Authorization: `Bearer: ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify(),
  //   })
  //     .then((response) => {
  //       setEmpData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (authUser.length === 0) {
      return navigate("/");
    }

    if (registratio.length > 0) {
      registratio.shift();
    }

    getRegistrations(setEmpData, setAllHistory, setRegistration);
  }, []);

  // async function getData() {
  //   const response = await fetch(
  //     "http://localhost:8081/employeeApi/findallRegistration"
  //   );
  //   const result = await response.json();
  //   console.log(result);
  //   setEmpData(result);
  //   setAllHistory(result);
  //   setRegistration(result);
  // }

  function showPopUp() {
    document.getElementById("formpop").style.display = "block";
    // console.log(document.getElementById("btn-popup"));
  }

  const filterToday = () => {
    setTodayFilter((v) => !v);
    console.log(todayFilter);
    todayBadging();
    if (todayFilter) {
      setEmpData(todayRegistration);
    } else {
      setEmpData(allHistory);
    }
  };

  const periodBadging = () => {
    // Formating Starting Date
    const sYear = startingDate.substring(0, 4);
    const sMonth = startingDate.substring(5, 7);
    const sDay = startingDate.substring(8);
    const sDate = `${sDay}-${sMonth}-${sYear}`;
    // formating End Date
    const eYear = endDate.substring(0, 4);
    const eMonth = endDate.substring(5, 7);
    const eDay = endDate.substring(8);
    const eDate = `${eDay}-${eMonth}-${eYear}`;

    periodRegistration.length = 0;

    registration.forEach((badging) => {
      const bMo = badging.timeOnMorning;
      const bAf = badging.timeOnAfternoon;

      if (bMo != null) {
        if (bMo.substring(0, 10) >= sDate && bMo.substring(0, 10) <= eDate) {
          periodRegistration.push(badging);
        }
      } else if (bAf != null) {
        if (bAf.substring(0, 10) >= sDate && bAf.substring(0, 10) <= eDate) {
          periodRegistration.push(badging);
        }
      }
    });
    console.log(periodRegistration);
    setStartingDate("");
    setEndDate("");
    // console.log(startingDate);
  };

  const hidePopForm = () => {
    document.getElementById("formpop").style.display = "none";
  };

  function handleQuery(event) {
    event.preventDefault();
    console.log(registration);
    periodBadging();
    hidePopForm();
    if (periodRegistration.length > 0) {
      return setEmpData(periodRegistration);
    } else {
      return setEmpData(allHistory);
    }
  }

  const todayBadging = () => {
    const theDate = new Date().toLocaleDateString();
    const theDay = theDate.substring(0, 2);
    const theMonth = theDate.substring(3, 5);
    const theYear = theDate.substring(6);
    const todayDate = `${theDay}-${theMonth}-${theYear}`;

    allHistory.forEach((registration) => {
      const rMo = registration.timeOnMorning;
      const rAf = registration.timeOnAfternoon;

      if (rMo != null) {
        if (rMo.substring(0, 10) == todayDate) {
          todayRegistration.push(registration);
        }
      } else if (rAf != null) {
        if (rAf.substring(0, 10) == todayDate) {
          todayRegistration.push(registration);
        }
      }
    });
    console.log(todayRegistration);
  };

  //Print
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "Daily Report",
  //   // onAfterPrint: () => alert("Printed successfully"),
  // });

  // End print

  const handlePrint = (registratio, item) => {
    registratio.push(item);
    console.log(registratio);
    return navigate("/print-report");
  };

  //Updatating badging
  function handleUpdate() {
    axios
      .post(
        "http://localhost:8081/employeeApi/",
        id,
        firstname,
        morningArrival,
        leavingTime
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }

  // Editing
  const updating = (id, empName, email, timeOnMorning, timeOnAfternoon) => {
    setId(id);
    setFirstname(empName);
    setEmail(email);
    // const morningTime =timeOnMorning.substring(0, 10);
    let morningTime = "";
    let afternoonTime = "";
    //
    if (timeOnMorning != null) {
      const mTD = timeOnMorning.substring(0, 2);
      const mTM = timeOnMorning.substring(3, 5);
      const mTY = timeOnMorning.substring(6, 10);
      morningTime = `${mTY}-${mTM}-${mTD}`;
    }
    //
    if (timeOnAfternoon != null) {
      const aTD = timeOnAfternoon.substring(0, 2);
      const aTM = timeOnAfternoon.substring(3, 5);
      const aTY = timeOnAfternoon.substring(6, 10);
      afternoonTime = `${aTY}-${aTM}-${aTD}`;
    }

    setMorningArrival(
      timeOnMorning != null ? morningTime.substring(0, 10) : ""
    );
    setLeavingTime(
      timeOnAfternoon != null ? afternoonTime.substring(0, 10) : ""
    );
  };

  function logout() {
    return navigate("/");
  }

  return (
    <div className="container">
      <div className="company-name">
        <h1>Seven Group Solution</h1>
      </div>
      <div
        style={{
          padding: "3px",
          marginTop: "150px",
          background: "#809b9b",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          name="firstname"
          style={{ padding: "5px 3px" }}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="email"
          name="email"
          style={{ padding: "5px 3px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          name="morningArrival"
          style={{ padding: "5px 3px" }}
          value={morningArrival}
          onChange={(e) => setMorningArrival(e.target.value)}
        />
        <input
          type="date"
          name="leavingTime"
          style={{ padding: "5px 3px" }}
          value={leavingTime}
          onChange={(e) => setLeavingTime(e.target.value)}
        />
        <input type="hidden" value={time_} />
        <input
          type="submit"
          value="Update"
          style={{
            padding: "5px 12px",
            background: "#8ee0eb",
            border: "1px solid #8ee0eb",
            borderRadius: "5px",
            color: "#809b9b",
            fontWeight: "bold",
          }}
          onClick={handleUpdate}
        />
      </div>
      <button
        style={{
          border: "none",
          outline: "none",
          padding: "3px 5px",
          position: "absolute",
          right: "185px",
          top: "25px",
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

      <div className="container-hist">
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
          <h3>Employee Hystory</h3>
          <h3
            className="filter"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: "#809b9b",
              padding: "0 10px",
              borderRadius: "5px",
            }}
            onClick={filterToday}
          >
            <FiFilter />
            Today
          </h3>
          <h3>{new Date().toLocaleDateString()}</h3>
        </div>
        <div className="employee-data">
          <table id="employee">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>morning Arrival</th>
                <th>Last time connected</th>
                <th>Report</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {empData.map((item) => (
                <tr key={item.id}>
                  <td>{item.firstname}</td>
                  <td>{item.name}</td>
                  <td>{item.firstConnectedTime}</td>
                  <td>{item.lastConnectedTime}</td>
                  <td>{item.activity}</td>
                </tr>
              ))} */}

              {empData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.empName}</td>
                    <td>{item.email}</td>
                    <td>{item.timeOnMorning}</td>
                    <td>{item.timeOnAfternoon}</td>
                    <td style={{ textAlign: "center" }}>
                      {/* ref={componentRef} */}
                      {item.report != null
                        ? item.report.slice(0, 20) + "..."
                        : item.report}
                    </td>
                    <td
                      style={{
                        // display: "flex",
                        // flexFlow: "row",
                        // alignItems: "center",
                        // justifyContent: "center",
                        gap: "10px",
                        textAlign: "center",
                      }}
                    >
                      <BsClipboardData
                        size={20}
                        onClick={() => handlePrint(registratio, item)}
                        style={{ cursor: "pointer", margin: "0 4px" }}
                      />
                      <BiEdit
                        size={20}
                        onClick={() =>
                          updating(
                            item.id,
                            item.empName,
                            item.email,
                            item.timeOnMorning,
                            item.timeOnAfternoon
                          )
                        }
                        style={{ cursor: "pointer", margin: "0 4px" }}
                      />
                      <AiFillDelete
                        size={20}
                        onClick={() =>
                          deleteRegistration(
                            item.id,
                            setEmpData,
                            setAllHistory,
                            setRegistration
                          )
                        }
                        style={{ cursor: "pointer", margin: "0 4px" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {authUser.length > 0 && authUser.pop()} */}
        </div>
      </div>
      {/* </div> */}
      <div className="btn-hystory" style={{ marginBottom: "50px" }}>
        <button className="btn-hist" onClick={showPopUp}>
          Show Hystory
        </button>
      </div>
      <PopFormHistory
        handleQuery={handleQuery}
        hidePopForm={hidePopForm}
        startingDate={startingDate}
        endDate={endDate}
        setStartingDate={setStartingDate}
        setEndDate={setEndDate}
      />
    </div>
  );
};

export default History;
