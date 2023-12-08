import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

const Add = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [token, setToken] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      designation: "",
      department: "",
    },
  });

  const fetchDepartment = async (token) => {
    const data = await fetch(`http://localhost:8081/department`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();

    if (res.length > 0) {
      setDepartmentData(res);
    }
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData!==null) {
      setToken(getData.jwtToken);
      fetchDepartment(getData.jwtToken);
    }
    
  }, [props]);

  const onSubmit = async (data) => {
    const postData = {
      name: data.name,
      age: data.age,
      address: data.address,
      departmentId: data.departmentId,
    };

    // console.log(postData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      "http://localhost:8082/employee",
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
      // setValue("departmentId", "");
      setValue("age", "");
      setValue("address", "");
      setValue("name", "");
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
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
              Add Employee
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
                      required: "Department is required.",
                    })}
                  >
                    <option>Select...</option>

                    {departmentData &&
                      departmentData.map((x) => {
                        return (
                          <>
                            <option value={x.id}>{x.departmentName}</option>
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
                    placeholder="enter employee age"
                    {...register("age", {
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
                  {errors.age?.type === "required" &&
                    "Employee age is required"}
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
                  {errors.address?.type === "required" && "address is required"}
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
              Save
            </button>
          </div>
          <Alert variant="success" show={showAlert}>
            Recored saved successfully.
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Add;
