"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import { Country, City } from "country-state-city";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;

  const [department, setDepartment] = useState(receviedData.department);
  const [token, setToken] = useState(null);
  const [departmentData, setDepartmentData] = useState();

  const {
    register,
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: receviedData.id,
      name: receviedData.name,
      age: receviedData.age,
      address: receviedData.address,
      departmentId: receviedData.departmentId,
    },
  });

  const getEmployeeData = async () => {
    const data = await props.data;
    // console.log(data);
    setValue("name", data.name);
    setValue("age", data.age);
    setValue("address", data.address);
    setValue("departmentId", data.departmentId);
    // console.log(getValues("territory"));
  };
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData !== null) {
      setToken(getData.jwtToken);
      fetchDepartment(getData.jwtToken);
      getEmployeeData();
    }
  }, [props]);

  const fetchDepartment = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(`http://localhost:8081/department`, requestOptions);

    const data = await res.json();
    // console.log(data);
    setDepartmentData(data);
  };

  const onSubmit = async (data) => {
    const postData = {
      employeeId: receviedData.id,
      departmentId: data.departmentId,
      name: data.name,
      age: data.age,
      address: data.address,
    };
    // console.log(postData);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      `http://localhost:8082/employee/update`,
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch("http://localhost:8082/employee", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      props.handleCallBack(res);
      setShowAlert(true);
    }
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropUpdate"
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
              Update Employee Information
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter employee name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.name?.type === "required" && "Name is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Department</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("departmentId", {
                      required: "Department name is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    {/* {console.log(company)} */}
                    {departmentData !== undefined &&
                      departmentData !== null &&
                      departmentData.map((x) => {
                        return (
                          <>
                            <option value={x.id} key={x.departmentName}>
                              {x.departmentName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.departmentId?.message}
                </error>
              </div>

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Age</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter phone number"
                    {...register("age", {
                      required: "Employee age is required.",
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.age?.message}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Address</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter employee address"
                    {...register("address", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.address?.type === "required" && "Address is required"}
                </error>
              </div>
            </form>
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
            <button
              className="btn btn-sm btn-info fw-bold"
              type="button"
              style={{ color: "#fff" }}
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </button>
          </div>
          <Alert variant="success" show={showAlert}>
            Recored updated successfully.
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Edit;
