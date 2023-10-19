import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <nav className="routes">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/user-data">User's Data</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
