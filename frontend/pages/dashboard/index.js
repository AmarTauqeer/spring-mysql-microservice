import { React, useState, useEffect, useContext } from "react";
import { FiChevronsRight, FiUsers } from "react-icons/fi";
import { BsFillPersonPlusFill, BsListTask } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Baarchart from "../barchart";

const Dashborard = (props) => {
  // console.log(props)
  let token = "";
  // const token =props.router.query.token
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [department, setDepartment] = useState(null);
  const [countUser, setCountUser] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const [countDepartment, setCountDepartment] = useState(0);
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
        if (department !== undefined && department !== null) {
          let filterDepartment = department.filter(
            (d) => d.id == row.departmentId
          );

          return filterDepartment.map((f) => {
            return f.departmentName;
          });
        }
      },
      width: "250px",
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

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));

    if (getData) {
      setUserInfo(getData);
      token = getData.jwtToken;
      getDepartmentData(token);
      getEmployeeData(token);
      setUser(getData);
      getUserData(token);
    }
  }, []);

  const getDepartmentData = async (token) => {
    // console.log(token)
    const data = await fetch(`http://localhost:8081/department`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res) {
      setCountDepartment(res.length);
      setDepartment(res);
    }
  };

  const getEmployeeData = async (token) => {
    // console.log(token);
    const data = await fetch(`http://localhost:8082/employee`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res) {
      setCountEmployee(res.length);
      setEmployee(res);
    }
  };
  const getUserData = async (token) => {
    // console.log(token);
    const response = await fetch(`http://localhost:8083/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 403) {
      const res = await response.json();
      setCountUser(res.length);
    }
  };

  return (
    <>
      {/* console.log(user) */}
      {user !== null && user !== undefined ? (
        <>
          <div className="row mb-5">
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  minHeight: "150px",
                  backgroundColor: "#088395",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countDepartment}
                      </div>
                      <div className="col-auto mt-3">Department</div>
                    </div>
                    <div className="col-auto">
                      <FcDepartment size={30} />
                      {/* <Image src={countEmployee} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>

                <div className="d-grid mt-5">
                  <Link
                    style={{ color: "#fff", paddingLeft: "15px" }}
                    href={{
                      pathname: "/department",
                      query: userInfo,
                    }}
                  >
                    <div className="link_text">
                      More info <FiChevronsRight />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  minHeight: "150px",
                  backgroundColor: "#3B9AE1",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countEmployee}
                      </div>
                      <div className="col-auto mt-3">Employee</div>
                    </div>

                    <div className="col-auto">
                      <FiUsers size={30} />
                      {/* <Image src={department} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-5">
                  <Link
                    style={{ color: "#fff", paddingLeft: "15px" }}
                    href={{
                      pathname: "/employee",
                      query: userInfo,
                    }}
                  >
                    <div className="link_text">
                      More info <FiChevronsRight />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {countUser !== 0 ? (
              <>
                <div className="col-sm-6 col-md-3 col-lg-3 col-12">
                  <div
                    className="card"
                    style={{
                      border: "solid 1px",
                      minHeight: "150px",
                      backgroundColor: "#FF8D29",
                      color: "#fff",
                      fontWeight: "bolder",
                    }}
                  >
                    <div class="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="col-auto">
                          <div className="col-auto h5 fw-bolder">
                            {countUser}
                          </div>
                          <div className="col-auto mt-3">User</div>
                        </div>

                        <div className="col-auto">
                          <FaUsers size={30} />
                          {/* <Image src={contract} width={70} height={70} alt="..." /> */}
                        </div>
                      </div>
                    </div>
                    <div className="d-grid mt-5">
                      <Link
                        style={{ color: "#fff", paddingLeft: "15px" }}
                        href={{
                          pathname: "/user",
                          query: userInfo,
                        }}
                      >
                        <div className="link_text">
                          More info <FiChevronsRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                
                  minHeight: "150px",
                  backgroundColor: "#F55353",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countObligation}
                      </div>
                      <div className="col-auto mt-3">Clause</div>
                    </div>

                    <div className="col-auto">
                      <HiClipboardList size={30} />
                      <Image src={contract} width={70} height={70} alt="..." />
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-info fw-bolder"
                    type="button"
                    style={{ color: "#fff" }}
                    onClick={handleClause}
                  >
                    More info <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="h3 mb-5">Recent Employee Data</div>
          {/* {console.log(employee)} */}
          {employee !== null &&
          employee !== undefined &&
          employee !== "No record is found" ? (
            <DataTable
              columns={columns}
              data={employee}
              pagination
              customStyles={customStyle}
              highlightOnHover
              dense
            />
          ) : (
            "There are no records to display"
          )}
          <Baarchart department={department} employee={employee}/>
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

export default Dashborard;
