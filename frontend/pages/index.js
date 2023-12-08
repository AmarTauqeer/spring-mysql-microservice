"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Index = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorDiv, setErrorDiv] = useState("");
  const [errorDivRegister, setErrorDivRegister] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "admin",
      password: "admin@pass",
    },
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    let token = "";
    console.log(data);

    if (data) {
      try {
        const response = await fetch(`http://localhost:8083/authenticate`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            userName: data.name,
            userPassword: data.password,
          }),
        });

        let status = await response.status;
        if (status === 401) {
          setErrorDiv("Invalid username or password.");
          return false;
        }
        if (status === 200) {
          let res = await response.json();
          setErrorDiv("");
          console.log(res);
          let data={
            "userName":res.user["userName"],
            "userPassword":res.user["userPassword"],
            "email":res.user["email"],
            "userFirstName":res.user["userFirstName"],
            "userLastName":res.user["userLastName"],
            "role":res.user.role[0].roleName,
            "jwtToken":res.jwtToken
          }
          localStorage.setItem("userInfo", JSON.stringify(data));
          router.push({
            pathname: "/dashboard",
          });
          return true;
        }

      } catch (error) {
        console.log(error.status);
      }
    }
  };

  const onRegister = async (data) => {
    // console.log(data);
    if (data) {
      const fetchData = await fetch(`http://localhost:8083/user/addUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userName: data.name,
          userPassword: data.password,
          email: data.email,
          userFirstName:"",
          userLastName:""
        }),
      });
      // console.log(fetchData.status)
      const res = await fetchData.json();
      // console.log(res);
      if (res) {
        if (res.error === "User already exist with this email") {
          setErrorDivRegister(res.error);
          return false;
        }
        setErrorDivRegister("");
        router.push("/");
        window.location.reload(false);
        return true;
      }
    }
  };
  return (
    <>
      <Head>
        <script src="../js/loginscreen.js" defer></script>
      </Head>
      <div className="login-div">
        <div class="login-container" id="login-container">
          <div class="form-container sign-up-container">
            <form
              className="login-form"
              key={2}
              onSubmit={handleSubmit(onRegister)}
            >
              <h2 className="mb-5">Create Account</h2>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="enter name"
                  name="name"
                  {...register2("name", {
                    required: true,
                    // pattern: /\S+@\S+\.\S+/,
                  })}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors2.name?.type === "required" && "name is required"}
              </error>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="enter email"
                  name="email"
                  {...register2("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors2.email?.type === "required" && "email is required"}
                {errors2.email?.type === "pattern" && "email is invalid"}
              </error>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="enter password"
                  type="password"
                  {...register2("password", {
                    required: true,
                    minLength: 4,
                  })}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors2.password?.type === "required" &&
                  "password is required"}
                {errors2.password?.type === "minLength" &&
                  "password length must be greator or equal 4"}
              </error>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleSubmit2(onRegister)}
                  className="login-button"
                >
                  SIGN UP
                </button>
                {errorDivRegister && (
                  <div style={{ color: "red" }}>{errorDivRegister}</div>
                )}
              </div>
            </form>
            <button>Sign Up</button>
          </div>
          <div class="form-container sign-in-container">
            <form
              className="login-form"
              key={1}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="mb-5">Sign in</h2>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="admin"
                  {...register("name", {
                    required: true,
                    // pattern: /\S+@\S+\.\S+/,
                  })}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors.name?.type === "required" && "name is required"}
              </error>

              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="admin@pass"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                  })}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors.password?.type === "required" && "password is required"}
                {errors.password?.type === "minLength" &&
                  "password length must be greator or equal 4"}
              </error>
              <div className="d-grid gap-2 mt-5">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="login-button"
                >
                  LOGIN
                </button>
                {errorDiv && <div style={{ color: "red" }}>{errorDiv}</div>}
              </div>
            </form>
            {/* <a href="#">Forgot your password?</a>
          <button>Sign In</button> */}
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="login-button ghost"
                  id="signIn"
                  style={{ borderRadius: "25px" }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="login-button ghost"
                  id="signUp"
                  style={{ borderRadius: "25px" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
