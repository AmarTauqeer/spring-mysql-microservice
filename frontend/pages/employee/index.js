import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit, FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Delete from "./delete";
import Detail from "./detail";
import Edit from "./edit";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";

const Employee = (props) => {
  const router = useRouter();
  const userData = router.query;
  const [filterEmployee, setFilterEmployee] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [department, setDepartment] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(userData);

  const callBack = async (childData) => {
    setEmployeeData(childData);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },

    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      width: "300px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "400px",
    },
    {
      name: "Department",
      selector: (row) => {
        if (department!==undefined && department!==null) {
          let filterDepartment =department.filter(d=>d.id==row.departmentId)

          return filterDepartment.map((f)=>{
            return f.departmentName
          })
          
        }
      }
    },
    {
      name: "ACTIONS",
      width: "350px",
      selector: (row) => (
        <div className="row">
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <CgDetailsMore
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropDetail"
                  onClick={() => {
                    setData({
                      id: row.employeeId,
                      name: row.name,
                      age: row.age,
                      address: row.address,
                      departmentId: row.departmentId,
                    });
                  }}
                  size={20}
                />
              </div>

              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropDetail"
                onClick={() => {
                  setData({
                    id: row.employeeId,
                      name: row.name,
                      age: row.age,
                      address: row.address,
                      departmentId: row.departmentId,
                  });
                }}
              >
                Detail
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <FiEdit
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropUpdate"
                  onClick={() => {
                    setData({
                      id: row.employeeId,
                      name: row.name,
                      age: row.age,
                      address: row.address,
                      departmentId: row.departmentId,
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
                    id: row.employeeId,
                      name: row.name,
                      age: row.age,
                      address: row.address,
                      departmentId: row.departmentId,
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
                      id: row.employeeId,
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
                    id: row.employeeId,
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
    },
  ];

  const customStyle = {
    hieght: "100%",
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
    const filtered = employeeData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterEmployee(filtered);
  };

  useEffect(() => {
    if (userData) {
      let token = userData.jwtToken;


      getDepartmentData(token);
      getEmployee(token);
      setUser(userData);
    }
  }, [props]);

  const getDepartmentData = async (token) => {
    // console.log(token)
    const data = await fetch(`http://localhost:8081/department`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res)
    setDepartment(res);
  };

  const getEmployee = async (token) => {
    const data = await fetch("http://localhost:8082/employee", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res) {
      setEmployeeData(res);
    }
  };

  return (
    <>
      {user !== null && user !== undefined && Object.keys(user).length!=0 ? (
        <>
          {" "}
          <div className="h3 mt-5 mb-5">List of Employee</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Employee &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search employee name"
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>
          {employeeData !== null ? (
            <DataTable
              columns={columns}
              data={filterEmployee.length >= 1 ? filterEmployee : employeeData}
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
          <Detail data={data} />
          <Delete id={data.id} handleCallBack={callBack} />
          <Edit data={data} handleCallBack={callBack} />
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

export default Employee;
