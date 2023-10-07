import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/Img/Logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../Authentication/firebaseConfig";
import DarkToggle from "./DarkToggle";
import ImgSrc from '../../assets/Img/Untitled.png';


// const ImgSrc = "https://ae01.alicdn.com/kf/H7cb2cbb2abdc4138a1e1a758225f3f7ah/Disney-Brand-Mickey-Minnie-s-profile-picture-cloth-patches-Heat-Vinyl-Ironing-Stickers-Decor-Cheap-firm.jpg"

const Navbar = () => {
  const nevigate = useNavigate();


  // Sinout Function
  const Sinout = () => {
    signOut(auth)
      .then((value) => {
        localStorage.removeItem("User");
        console.log(value);
        nevigate("/login");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const user = localStorage.getItem("User");

  const UserData = JSON.parse(user);
  const Data = [UserData];

  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>

      {!user && (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/sinup">Sign Up</Link>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <Link to="/dash">All Contact</Link>
          </li>
          <li>
            <Link to="/reg">Add Contact</Link>
          </li>

          <div className="dropdown dropdown-end dropdown-hover py-4 lg:py-0 ">
            <div tabIndex={0} className="ps-4 pt-1">
              {
                Data.map((user,ind) => (
                  <figure key={ind} className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                    src={user.photoURL || ImgSrc}
                    alt="User"
                  />
                  </figure>
                  
                ))
              }
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu py-4 shadow bg-base-100 rounded-box w-32 text-center flex items-center"
            >
              <li className="w-full">
                <Link to="/user">User Profile</Link>
              </li>
              <button className=" btn-outline btn-error btn-sm mt4 rounded w-full" onClick={Sinout}>Sign Out</button>
            </ul>
          </div>
        </>
      )}

      <li className="ms-3">
        <DarkToggle />
      </li>

    </>
  );


  return (
    <>
      <div className="navbar flex items-center justify-between">
        <div className="navbar-start flex items-center">
          <img className="w-12 rounded m-1 lg:m-4 ms-0" src={image} alt="" />
          <Link
            to="/"
            className="normal-case cursor-pointer font-bold text-xl lg:text-3xl"
          >
            Frienemie
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex items-center">
          <ul className="menu menu-horizontal items-center pt-2 px-1">{menu}</ul>
        </div>
        <div className="dropdown dropdown-hover dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" >{menu}</ul>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
