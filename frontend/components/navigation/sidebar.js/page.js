"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { BsListNested } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { BsFillFilePersonFill } from "react-icons/bs";
import { BsListTask } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { MdAccountCircle } from "react-icons/md";

const Sidebar = (props) => {
  // console.log(props.userInfo);
  const [userInfo, setUserInfo] = useState(null);

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const route = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    route.push("/");
  };

  useEffect(() => {
    if (props.userInfo !== "" && props.userInfo !== null) {
      setUserInfo(props.userInfo);
    }
  }, [props]);

  return (
    <div className="sidebar_container">
      <div style={{ width: isOpen ? "270px" : "70px" }} className="sidebar">
        <div className="top_section  mb-4 mt-2">
          <div style={{ display: isOpen ? "block" : "none" }} className="logo">
            Admin Dashboard
          </div>
          <hr />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <Link
          className="link"
          // activeclassName="active"
          href="/dashboard"
        >
          <div className="icon">
            <RiDashboardLine size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Dashboard
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href={{
            pathname: "/department",
            query: userInfo, // the data
          }}
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Department
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href={{
            pathname: "/department/employee-client",
            query: userInfo, // the data
          }}
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Communication Between Services (FeignClient)
          </div>
        </Link>
        <Link
          className="link"
          href={{
            pathname: "/employee",
            query: userInfo, // the data
          }}
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Employee
          </div>
        </Link>
        <br />
        <hr />
        <div className="bottom_section  mt-100">
          <Link
            className="link"
            // activeclassName="active"
            href={{
              pathname: "/account",
              query: userInfo, // the data
            }}
          >
            <div className="icon">
              <MdAccountCircle size={20} onClick={handleLogOut} />
            </div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              Account Information
            </div>
          </Link>
          <Link
            className="link"
            href={{
              pathname: "/user",
              query: userInfo, // the data
            }}
          >
            <div className="icon">
              <BsListTask size={20} />
            </div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              User Management
            </div>
          </Link>
        </div>
        <div className="bottom_section  mt-100">
          <Link
            className="link"
            // activeclassName="active"
            href="/"
            onClick={handleLogOut}
          >
            <div className="icon">
              <IoMdLogOut size={20} onClick={handleLogOut} />
            </div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              Logout
            </div>
          </Link>
        </div>
        <hr />
        {/* <Link
          className="link"
          // activeclassName="active"
          href="/contractor"
        >
          <div className="icon">
            <BsFillFilePersonFill size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contractor
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/obligation"
        >
          <div className="icon">
            <BsListNested size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Obligation/Clause
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/term"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Term
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/signature"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contract Signature
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/contract"
        >
          <div className="icon">
            <FaFileContract size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contract
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/compliance"
        >
          <div className="icon">
            <GrCompliance size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Compliance Verification
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
