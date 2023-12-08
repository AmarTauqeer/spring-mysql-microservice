import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";

const Add = (props) => {
  // console.log(props)
  const [showAlert, setShowAlert] = useState(false);
  const [valueDate, setValueDate] = useState(new Date());
  const [department, setDepartment] = useState(null);
  const [token, setToken] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    let dateISO = valueDate.toISOString();

    const postData = {
      departmentName: data.name,
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
    // console.log("hi");

    const response = await fetch(
      "http://localhost:8081/department",
      requestOptions
    );
    const result = await response.json();

    // fetch type data and send back to main component
    if (result) {
      const response = await fetch("http://localhost:8081/department", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();
      console.log(res)
      setShowAlert(true);
      setValue("name", "");
      props.handleCallBack(res);
    }
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData!==null) {
      setToken(getData.jwtToken);
    }
    
  }, []);

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
              Add Department
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
                    placeholder="enter department name"
                    {...register("name", {
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
