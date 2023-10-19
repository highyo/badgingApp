import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

export const authUser = [];

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  const notify = () => {
    toast.info("Wrong Password or Email..!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // const userData = [
  //   { email: "guideon@gmail.com", password: "gui00235", level: "user" },
  //   { email: "jocey@gmail.com", password: "jocey012", level: "admin" },
  //   { email: "solomon@gmail.com", password: "solo099", level: "user" },
  //   { email: "juliet@gmail.com", password: "juliet066", level: "superUser" },
  // ];

  const navigate = useNavigate();

  useEffect(() => {
    authUser.length > 0 && authUser.pop();
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "http://localhost:8081/employeeApi/findallEmp"
    );
    const result = await response.json();
    console.log(result);
    setUserData(result);
  }

  const connect = async (email, password) => {
    const req = await axios.get(
      `http://localhost:8081/employeeApi/authenticatewithlogin/${email}/${password}`
    );

    // authUser.length > 0 && authUser.pop();
    console.log(req);
    if (req.data != "") {
      userData.forEach((user) => {
        let route = "";
        notify();

        if (
          user.email === email &&
          user.pass === password &&
          user.privilege === "user"
        ) {
          route = "/report";
          console.log(route, email, password);
          authUser.push(user);
          // console.log("User:", authUser);
          return navigate(route);
        } else if (
          user.email === email &&
          user.pass === password &&
          user.privilege === "admin"
        ) {
          route = "/user-data";
          console.log(route, email, password);
          authUser.push(user);
          return navigate(route);
        } else if (
          user.email === email &&
          user.pass === password &&
          user.privilege === "super"
        ) {
          route = "/history";
          console.log(route, email, password);
          authUser.push(user);
          return navigate(route);
        }
        return notify();
      });
    }
  };

  function showFormLog(email, password) {
    setEmail(email);
    setPassword("");
    document.getElementById("username-container").style.opacity = "0.2";
    document.getElementById("form-connect").classList.add("block");
  }

  const closeForm = () => {
    document.getElementById("form-connect").classList.remove("block");
    document.getElementById("username-container").style.opacity = "1";
  };

  return (
    <div className="container">
      <div className="company-name">
        <h1>Seven Group Solution</h1>
      </div>
      <div className="form-connect" id="form-connect">
        <div className="form">
          <h3>Login</h3>
          <hr />
          <RxCross2 size={20} className="closeForm" onClick={closeForm} />
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div c="login-btn">
            <input
              type="submit"
              value="Log In"
              onClick={() => connect(email, password)}
            />
          </div>
        </div>
      </div>
      <div className="username-container" id="username-container">
        <div className="user-list">
          {userData.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => showFormLog(user.email)}
                className="user-name"
              >
                {user.firstname}
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />;
    </div>
  );
};

export default Home;
