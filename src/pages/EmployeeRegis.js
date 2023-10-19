import React, { useEffect, useState } from "react";
import "./employeeRegis.css";
import { useNavigate } from "react-router-dom";
import { authUser } from "./Home";
import axios from "axios";

const EmployeeRegis = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authUser.length === 0) {
      return navigate("/");
    }
    // console.log(authUser[0]);
  }, []);

  const options = [
    { value: "user", text: "User" },
    { value: "super", text: "Super" },
    { value: "admin", text: "Admin" },
  ];

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [privilege, setPrivilege] = useState(options[2].value);
  const [activity, setActivity] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [id, setId] = useState("");

  function registration() {
    axios
      .post("http://localhost:8081/employeeApi/addNewEmp", {
        name: name,
        firstname: firstname,
        pass: pass,
        email: email,
        privilege: privilege,
        activity: activity,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }

  function updating() {
    axios
      .post(
        "http://localhost:8081/employeeApi/",
        id,
        name,
        firstname,
        pass,
        email,
        privilege
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }

  const handlesubmit = (event) => {
    event.preventDefault();
    // if (!isUpdating) {
    registration();
    setFirstname("");
    setEmail("");
    setName("");
    setPass("");
    setPrivilege(options[0].value);
    // } else {
    //   updating();
    //   setFirstname("");
    //   setEmail("");
    //   setName("");
    //   setPass("");
    //   setPrivilege("");
    // }
  };

  function handleSelection(event) {
    console.log(event.target.value);
    setPrivilege(event.target.value);
  }

  function detectKeyPressed(event) {
    // let key = event.key;
    // console.log(key);
    // if (key == "Enter") {
    //   handlesubmit();
    // }
  }

  return (
    <div className="container" onKeyDown={detectKeyPressed}>
      <div className="company-name">
        <h1>Seven Group Solution</h1>
      </div>

      <div className="form-container">
        <form className="form" id="form-regis" onSubmit={handlesubmit}>
          <h3>Registration</h3>
          <hr />

          <div className="identification">
            <div className="firstname">
              <label htmlFor="firstname">firstname: </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="firstname"
              />
            </div>
            <div className="lastname">
              <label htmlFor="lastname">lastname: </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="lastname"
              />
            </div>
          </div>
          <div className="contact">
            <div className="email">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="type your email"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="role">
            <label htmlFor="role">Role: </label>
            <select
              name="role"
              id="role"
              value={privilege}
              onChange={handleSelection}
            >
              {/* <option value="user" style={{ background: "#B0E0E6" }}>
                User
              </option>
              <option value="super" style={{ background: "#B0E0E6" }}>
                Super
              </option>
              <option value="admin" style={{ background: "#B0E0E6" }}>
                Admin
              </option> */}
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn-registration">
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegis;
