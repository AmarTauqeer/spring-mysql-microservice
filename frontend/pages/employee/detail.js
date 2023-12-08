"use client";
import React, { useState, useEffect } from "react";

const Detail = (props) => {
  const receviedData = props.data;
  // console.log(receviedData)
  const [employee, setEmployee] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [department, setDepartment] = useState(null);
  const [token, setToken] = useState(null);

  const fetchData = async (token) => {
    const res = await fetch(`http://localhost:8082/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data !== "null" && data !== undefined) {
      const filterData = data.filter((x) => x.id === receviedData.id);
      if (filterData.length > 0) {
        // console.log(filterData[0].name);
        setEmployee(filterData[0].name);
      }
    }
  };
  const getDepartmentData = async (token) => {
    // console.log(token);
    const data = await fetch(`http://localhost:8081/department`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(data);
    if (res !== null && res !== undefined) {
      const filterData = res.filter((x) => x.id === receviedData.departmentId);
      if (filterData.length > 0 && filterData !== null) {
        // console.log(filterData[0].name);
        setDepartment(filterData[0].departmentName);
      }
    }
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData !== null) {
      setToken(getData.jwtToken);

      getDepartmentData(getData.jwtToken);
      fetchData(getData.jwtToken);
    }
  }, [props]);

  return (
    <div
      className="modal fade"
      id="staticBackdropDetail"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="staticBackdropLabel">
              Employee Deatil
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>ID</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.id}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Name</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.name}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Department</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={department}
                />
              </div>
            </div>

            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Age</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.age}
                />
              </div>
            </div>

            <div className="d-flex row align-items-center mb-3">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Address</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.address}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
