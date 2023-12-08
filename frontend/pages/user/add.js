import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";

const Add = (props) => {
  // console.log(props)
  const [showAlert, setShowAlert] = useState(false);
  const [valueDate, setValueDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [token, setToken] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      userName: "",
      userFirstName: "",
      userLastName: "",
      email: "",
      // role: "",
      userPassword:"",
    },
  });

  const onSubmit = async (data) => {
    let dateISO = valueDate.toISOString();

    const postData = {
      userName: data.userName,
      userFirstName: data.userFirstName,
      userLastName: data.userLastName,
      email: data.email,
      // role: data.role,
      userPassword: data.userPassword,
    };
    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    };


    const response = await fetch("http://localhost:8083/user/addUser", requestOptions);
    const result = await response.json();

    if (result) {
      const response = await fetch("http://localhost:8083/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();
      // console.log(res);
      setShowAlert(true);
      setValue("userName", "");
      setValue("userFirstName", "");
      setValue("userLastName", "");
      setValue("email", "");
      setValue("userPassword", "");
      props.handleCallBack(res);
    }
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData !== null) {
      setToken(getData.jwtToken);
      // getRoleData(getData.jwtToken)
    }
  }, []);

  const getRoleData = async (token) => {
    const data = await fetch("http://localhost:8083/role", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res) {
      setRoleData(res);
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
              Add User
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
              {/* <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    placeholder="Enter create date."
                    onChange={setValueDate}
                    value={valueDate}
                    name="createDate"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div> */}

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter name"
                    {...register("userName", {
                      required: true,
                    })}
                    style={{ borderRadius: "10px" }}
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
                  <span>First Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter first name"
                    {...register("userFirstName", {
                      required: false,
                    })}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Last Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter last name"
                    {...register("userLastName", {
                      required: false,
                    })}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Email</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter email"
                    {...register("email", {
                      required: true,
                    })}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.email?.type === "required" && "Email is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Password</span>
                </div>
                <div className="col-lg-6">
                  <input
                  type="password"
                    className="form-control"
                    placeholder="enter user password"
                    {...register("userPassword", {
                      required: true,
                    })}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.userPassword?.type === "required" && "Password is required"}
                </error>
              </div>
              {/* <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Role</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("role", {
                      required: "Role is required.",
                    })}
                  >
                    <option>Select...</option>

                    {roleData &&
                      roleData.map((x) => {
                        return (
                          <>
                            <option value={x.roleName}>{x.roleName}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div> */}

              {/* <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Description</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
                    {...register("description", {
                      required: true,
                    })}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.description?.type === "required" &&
                    "Desription is required"}
                </error>
              </div> */}
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
