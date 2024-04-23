import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./../stylesheets/plantation.css"; // Import the CSS file
import { BsSearch } from "react-icons/bs";

//import {useReactprint}
import { useReactToPrint } from "react-to-print";

const ViewEmployee = () => {
  const ComponentPDF = useRef();

  const [allEmployee, setAllEmployee] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");

  useEffect(() => {
    const getAllEmployee = async () => {
      await axios
        .get(`http://localhost:8000/view`)
        .then((res) => {
          setAllEmployee(res.data.existingRecords);
          console.log("Status: " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Get Request. " +
                err.error
            );
          }
        });
    };

    getAllEmployee();
  }, []);

  //implement PDF Download function

  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("download successful"),
  });

  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this items..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/employee/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Delete Request. " +
                err.error
            );
          }
        });
    } else {
      alert("Delete cancelled!");
    }
  };
  // Employee based on searchemployee
  const filteredEmployee = allEmployee.filter((records) =>
    records.fullName.toLowerCase().includes(searchEmployee.toLowerCase())
  );
  return (
    <div>
      <p>All Records</p>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Employee  No"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
      </div>

      <div ref={ComponentPDF} style={{ width: "100%" }}>
        <table class="table" id="plantTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fullName</th>
              <th scope="col">NIC</th>
              <th scope="col">dateOfBirth</th>
              <th scope="col">gender</th>
              <th scope="col">contactNumber</th>
              <th scope="col">contactEmail</th>
              <th scope="col">address</th>
              <th scope="col">jobTitle</th>
              <th scope="col">department</th>
              <th scope="col">startDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployee.map((records, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{records.fullName}</td>
                <td>{records.NIC}</td>
                <td>{records.dateOfBirth}</td>
                <td>{records.gender}</td>
                <td>{records.contactNumber}</td>
                <td>{records.contactEmail}</td>
                <td>{records.address}</td>
                <td>{records.jobTitle}</td>
                <td>{records.department}</td>
                <td>{records.startDate}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editEmp/${records._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => handleDelete(records._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-success">
        <a href="/addEmp" style={{ textDecoration: "none", color: "white" }}>
          Add New Records
        </a>
      </button>

      
      <button className="btn btn-success">
        <a href="/CtreateTaskShedule" style={{ textDecoration: "none", color: "white" }}>
          Add Task SHedule
          </a>
      </button>

      <button className="btn btn-success">
        <a href="/ViewTaskShedule" style={{ textDecoration: "none", color: "white" }}>
          view Task SHedule
          </a>
      </button>

      

      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
          PDF
        </button>{" "}
      </div>
    </div>
  );
};

export default ViewEmployee;
