import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Edit from "../department/edit";
import Delete from "../department/delete";
import Link from "next/link";
import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();
  const userData = router.query;
  // console.log(userData);
  const [filterDepartments, setFilterDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(userData);

  const callBack = async (childData) => {
    setDepartmentData(childData);
  };

  const columns = [
    {
      name: "ID#",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
      // grow:2,
    },
    {
      name: "Department Name",
      selector: (row) => row.departmentName,
      sortable: true,
      width: "300px",
    },

    {
      name: "ACTIONS",
      selector: (row) => (
        <div className="row">
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <FiEdit
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropUpdate"
                  onClick={() => {
                    setData({
                      id: row.id,
                      departmentName: row.departmentName,
                    });
                  }}
                  size={20}
                />
              </div>

              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropUpdate"
                onClick={() => {
                  setData({
                    id: row.id,
                    departmentName: row.departmentName,
                  });
                }}
              >
                Edit
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <RiDeleteBinLine
                  size={22}
                  color="#f94144"
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropDelete"
                  onClick={() => {
                    setData({
                      id: row.id,
                    });
                  }}
                />
              </div>
              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropDelete"
                onClick={() => {
                  setData({
                    id: row.id,
                  });
                }}
                style={{ color: "#f94144" }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      ),
      sortable: true,
      grow: 2,
      width: "500px",
    },
  ];

  const customStyle = {
    hieght: "100%",
    // minWidth:"1200px",
    rows: {
      style: {
        fontSize: "15px",
        paddingBottom: "20px",
        paddingTop: "20px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingBottom: "20px",
        backgroundColor: "#f8f9fa",
      },
    },
  };

  const handleChange = (e) => {
    const filtered = departmentData.filter((x) => {
      return x.departmentName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterDepartments(filtered);
  };

  useEffect(() => {
    if (userData) {
      let token = userData.jwtToken;
      getDepartment(token);
      setUser(userData);
    }
  }, [props]);

  const getDepartment = async (token) => {
    const data = await fetch("http://localhost:8081/department", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res) {
      setDepartmentData(res);
    }
  };

  return (
    <>
      {user !== null && user !== undefined && Object.keys(user).length!=0 ? (
        <>
          <div className="h3 mt-5 mb-5">Department</div>

          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Department &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                  // value={search}
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>

          {departmentData !== null ? (
            <DataTable
              columns={columns}
              data={
                filterDepartments.length >= 1
                  ? filterDepartments
                  : departmentData
              }
              pagination
              customStyles={customStyle}
              highlightOnHover
              dense
            />
          ) : (
            "There are no records to display"
          )}

          {/* add modal */}
          <Add handleCallBack={callBack} />

          <Edit data={data} handleCallBack={callBack} />
          <Delete id={data.id} handleCallBack={callBack} />
        </>
      ) : (
        <h4 className="mt-5">
          You are allowed to view this page. <br />
          <br />
          <Link href="/" style={{ fontSize: "24px", fontWeight: "bolder" }}>
            Login
          </Link>
        </h4>
      )}
    </>
  );
};

export default index;
