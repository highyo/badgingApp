import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import History from "./pages/History";
import UserData from "./pages/UserData";
import Report from "./pages/report";
import NoPage from "./pages/NoPage";
import EmployeeRegis from "./pages/EmployeeRegis";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PrintReport from "./pages/PrintReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} path="/" />
          <Route path="history" element={<History />} />
          <Route path="user-data" element={<UserData />} />
          <Route path="report" element={<Report />} />
          <Route path="registration" element={<EmployeeRegis />} />
          <Route path="print-report" element={<PrintReport />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
