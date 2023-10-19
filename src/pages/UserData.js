import React, { useEffect, useState } from "react";
import "./userData.css";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";
import { authUser } from "./Home";
import axios from "axios";
import { getData } from "../utils/ApiManagement";

const UserData = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState([]);
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   if (authUser.length === 0) {
  //     return navigate("/");
  //   }

  //   setInfo(userData);
  // }, []);

  useEffect(() => {
    if (authUser.length === 0) {
      return navigate("/");
    }
    getData(setInfo);
  }, []);

  function navigationAddEmp() {
    navigate("/registration");
  }

  return (
    <div className="container">
      <div className="company-name">
        <h1>Seven Group Solution</h1>
      </div>
      <div className="container-list">
        <div className="title">
          <h3>Employee Data</h3>
          <h3
            onClick={navigationAddEmp}
            style={{
              cursor: "pointer",
              background: "#656d6d",
              padding: "2px 6px",
              borderRadius: "5px",
              color: "#fff",
            }}
          >
            Add User
          </h3>
        </div>
        <div className="employee-data">
          <table>
            <thead>
              <tr className="head">
                <th className="firstName th" style={{}}>
                  First nama
                </th>
                <th className="lastName th" style={{}}>
                  Last name
                </th>
                <th className="email th" style={{}}>
                  Email
                </th>
                <th className="password th" style={{}}>
                  Password
                </th>
                <th className="password th" style={{}}>
                  Action
                </th>
              </tr>
            </thead>
            {/* {console.log("info:", info)} */}
            <UserInfo />
          </table>
        </div>
      </div>
      {/* <div className="btn-hystory">
        <button className="btn-hist">Show Hystory</button>
      </div> */}
    </div>
  );
};

export default UserData;
