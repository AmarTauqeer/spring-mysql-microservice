import Link from "next/link";
import React, { useEffect, useState } from "react";
import photo from "../../public/images/photo.jpg";
import Image from "next/image";
import { useRouter } from "next/router";

const index = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const userData = router.query;

  const getUserDetail = async (token, name) => {
    const response = await fetch(`http://localhost:8083/user/${name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.status)
    if (response.status==200) {
      const res = await response.json();
      setUser(res);
    }
    
  };

  useEffect(() => {
    if (userData) {
      let token = userData.jwtToken;
      let name = userData["userName"];

      if (name && token) {
        getUserDetail(token, name);
      }
    }
  }, [props]);
  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="h3 mt-5 mb-5">User information</div>
          <div className="d-flex row justify-content-between m-4">
            <div className="col-sm-8 col-md-8 col-lg-8">
              <form>
                <div className="d-flex row align-items-center mb-2">
                  <div className="col-lg-2">
                    <span>Name</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control"
                      name="userLastName"
                      value={user.userName}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderRadius: "5px" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex row align-items-center mb-2">
                  <div className="col-lg-2">
                    <span>First Name</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control"
                      name="userFirstName"
                      value={user.userFirstName}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderRadius: "5px" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex row align-items-center mb-2">
                  <div className="col-lg-2">
                    <span>Last Name</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control"
                      name="role"
                      value={user.userLastName}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderRadius: "5px" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex row align-items-center mb-2">
                  <div className="col-lg-2">
                    <span>Email</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "5px" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex row align-items-center mb-2">
                  <div className="col-lg-2">
                    <span>Role</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control"
                      name="role"
                      type="role"
                      value={user.role[0].roleName}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "5px" }}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                src={photo}
                width={200}
                height={200}
                alt="Picture of the author"
                style={{ borderRadius: "50%" }}
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              />
            </div>
          </div>
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
