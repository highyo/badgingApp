import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "../pages/userData.css";
import axios from "axios";
import { deleteEmp, getData } from "../utils/ApiManagement";

const UserInfo = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getData(setInfo, info);
  }, []);

  return (
    <tbody>
      {info.map((user) => {
        return (
          <tr className="staff-list" key={user.id}>
            <td className="firstName th" style={{}}>
              {user.firstname}
            </td>
            <td className="lastName th" style={{}}>
              {user.name}
            </td>
            <td className="email th" style={{}}>
              {user.email}
            </td>
            <td className="password th" style={{}}>
              {user.pass}
            </td>
            <td className="icons th">
              <MdDeleteOutline
                size={20}
                onClick={() => deleteEmp(user.name, setInfo, info)}
                className="icon"
              />
              <FaRegEdit size={20} className="icon" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default UserInfo;
