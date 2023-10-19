import axios from "axios";
import React from "react";

// function deleteEmp(name, setInfo, info) {
//   axios
//     .delete(`http://localhost:8081/employeeApi/deleteEmp/${name}`)
//     .then((response) => {
//       console.log(response.data);
//       console.log("DeleteEmp is working");
//     })
//     .catch((err) => console.log(err));

//   getData(setInfo, info);
//   //   console.log("DeleteEmp is working");
// }

async function deleteEmp(name, setInfo, info) {
  const res = await axios.delete(
    `http://localhost:8081/employeeApi/deleteEmp/${name}`
  );

  console.log(res);

  getData(setInfo, info);
  //   console.log("DeleteEmp is working");
}

async function deleteRegistration(
  id,
  setEmpData,
  setAllHistory,
  setRegistration
) {
  const res = await axios.delete(
    `http://localhost:8081/employeeApi/deleteRegistryById/${id}`
  );

  console.log(res);

  getRegistrations(setEmpData, setAllHistory, setRegistration);
  //   console.log("DeleteEmp is working");
}

async function getRegistrations(setEmpData, setAllHistory, setRegistration) {
  const response = await fetch(
    "http://localhost:8081/employeeApi/findallRegistration"
  );
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    setEmpData(result);
    setAllHistory(result);
    setRegistration(result);
  }
}

async function getData(setInfo, info) {
  const response = await fetch("http://localhost:8081/employeeApi/findallEmp");
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    setInfo(result);
    console.log("after setting info:", info);
  }
}

export { deleteEmp, getData, getRegistrations, deleteRegistration };
