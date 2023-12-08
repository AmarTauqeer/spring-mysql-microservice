import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const EmployeeClient = (props) => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const router = useRouter();
  const userData = router.query;
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
      setData(res);
    }
  };

  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      // console.log(userData)
      setUserInfo(userData);
      getDepartment(userData.jwtToken);
    }
  }, [props]);

  return (
    <>
      {console.log(data)}
      <h2 className="mb-5">Employee Information from Employee Service with FeignClient</h2>
      {data &&
        data.map((d) => {
          return (
            <>
            <div className="row mt-2 bg-info text-white">
                <div className="col-md-1"><h5 className="font-weight-bold mb-2">Dep#</h5></div>
                <div className="col-md-3"><h5 className="font-weight-bold mb-2">Dept.Name</h5></div>
            </div>
              {/* <div className="container w-50"> */}
              <div className="row">
                <div className="col-md-1">{d.id}</div>
                <div className="col-md-3">{d.departmentName}</div>
                <div className="row mt-2 ">
                <div className="col-md-1"><h5 className="font-weight-bold mb-2">Emp#</h5></div>
                <div className="col-md-3"><h5 className="font-weight-bold mb-2">Emp.Name</h5></div>
                <div className="col-md-2"><h5 className="font-weight-bold mb-2">Age</h5></div>
                <div className="col-md-3"><h5 className="font-weight-bold mb-2">Address</h5></div>
            </div>
                {d.employees.map((e) => {
                  return (
                    <div className="row">
                      <div className="col-md-1">{e.employeeId}</div>
                      <div className="col-md-3">{e.name}</div>
                      <div className="col-md-2">{e.age}</div>
                      <div className="col-md-3">{e.address}</div>
                    </div>
                    
                  );
                })}
                <br />
                <br />
                <br />

              </div>
              {/* </div> */}
            </>
          );
        })}
    </>
  );
};

export default EmployeeClient;
