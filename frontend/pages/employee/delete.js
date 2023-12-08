"use client";
import React, { useEffect, useState } from "react";

const Delete = (props) => {
  const [token, setToken] = useState(null);
  //   console.log(props.id);
  const handleDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify(postData),
    };
    const res = await fetch(
      `http://localhost:8082/employee/${props.id}`,
      requestOptions
    );
    const result = await res;
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
    }
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(getData);
    // console.log(getData);
    if (getData!==null) {
      setToken(getData.jwtToken);
    }
    
  }, [props]);

  return (
    <div
      class="modal fade"
      id="staticBackdropDelete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Delete Employee
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Do you really want to delete this record?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleDelete}
              class="btn btn-sm btn-danger"
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
