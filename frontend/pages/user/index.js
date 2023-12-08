import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Edit from "../user/edit";
import Delete from "../user/delete";
import Link from "next/link";
import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();
  const userInfo = router.query;
  const [filterUsers, setFilterUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const callBack = async (childData) => {
    setUserData(childData);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.userName,
      sortable: true,
      width: "250px",
    },
    {
      name: "First Name",
      selector: (row) => row.userFirstName,
      sortable: true,
      width: "250px",
    },
    {
      name: "User Last Name",
      selector: (row) => row.userLastName,
      sortable: true,
      width: "250px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    // {
    //   name: "Role",
    //   selector: (row) => row.role,
    //   sortable: true,
    //   width: "250px",
    // },

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
                      id: row.userName,
                      userName: row.userName,
                      userFirstName: row.userFirstName,
                      userLastName: row.userLastName,
                      email: row.email,
                      // role: row.role[0].roleName,
                      userPassword: row.userPassword,
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
                    id: row.userName,
                    userName: row.userName,
                    userFirstName: row.userFirstName,
                    userLastName: row.userLastName,
                    email: row.email,
                    // role: row.role[0].roleName,
                    userPassword: row.userPassword,
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
                      id: row.userName,
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
                    id: row.userName,
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
    const filtered = userData.filter((x) => {
      return x.userName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterUsers(filtered);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      let token = userInfo.jwtToken;
      setUser(userInfo);
      getRoleData(token);
      getUserData(token);
    }
  }, [props]);

  const getUserData = async (token) => {
    const response = await fetch("http://localhost:8083/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status==200) {
      const res = await response.json();
      setUserData(res);
    }
    if (response.status==403) {
      setUser([])
      setUserData([]);
    }
  };
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
    <>
      {user !== null && user.length!==0 ? (
        <>
          <div className="h3 mt-5 mb-5">User Information</div>

          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add User &nbsp;
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
          {console.log(userData)}
          {/* {console.log(filterUsers)} */}

          {userData !== null && userData.length !== 0 ? (
            <DataTable
              columns={columns}
              data={filterUsers.length != 0 ? filterUsers : userData}
              pagination
              customStyles={customStyle}
              highlightOnHover
              dense
            />
          ) : (
            "There are no records to display"
          )}

          <Add handleCallBack={callBack} />
          {/* {console.log(data)} */}
          <Edit data={data} handleCallBack={callBack} />

          <Delete id={data.id} handleCallBack={callBack} />
        </>
      ) : (
        <h4 className="mt-5">
          You are not allowed to view this page. <br />
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
