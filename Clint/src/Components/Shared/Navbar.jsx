import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>

      {!user && (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/sinup">Sign Up</NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink to="/dash">All Contact</NavLink>
          </li>
          <li>
            <NavLink to="/reg">Add Contact</NavLink>
          </li>


          {/* User Menu small Screen  */}
          <div className="lg:hidden block">
            <div tabIndex={0} className="ps-4 p-1 pb-2">
              {
                Data.map((user, ind) => (
                  <figure key={ind} className="w-12 h-12 overflow-hidden rounded-full flex justify-center items-center">
                    <img
                      src={user.photoURL || ImgSrc}
                      alt="User"
                    />
                  </figure>

                ))
              }
            </div>
            <ul className="w-[95%] mx-auto">
              <li className="w-full flex items-center">
                <NavLink className="btn-outline btn-sm mt4 text-center rounded w-full btn" to="/user">User Profile</NavLink>
              </li>
              <button className="btn btn-outline btn-error btn-sm mt4 rounded w-full mt-1" onClick={Sinout}>Sign Out</button>
            </ul>
          </div>


          {/* User Menu Large Screen  */}
          <div className="dropdown dropdown-end dropdown-hover py-4 lg:py-0 hidden lg:block">
            <div tabIndex={0} className="ps-3 pt-1">
              {
                Data.map((user, ind) => (
                  <Link to="/user">
                    <figure key={ind} className="w-9 h-9 overflow-hidden rounded-full flex justify-center items-center">
                      <img
                        src={user.photoURL || ImgSrc}
                        alt="User"
                      />
                    </figure>
                  </Link>
                ))
              }
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[11] menu py-4 shadow bg-base-100 rounded-none w-52 px-6 text-center flex items-center border"
            >
              <li className="w-full flex items-center">
                <NavLink className="btn-outline btn-sm mt-2 mx-auto text-center rounded w-full btn" to="/user">User Profile</NavLink>
              </li>
              <button className="btn btn-outline btn-error btn-sm mt-2 mx-auto rounded w-full" onClick={Sinout}>Sign Out</button>
            </ul>
          </div>
        </>
      )}

      <div className="pt-3 mx-auto lg:ps-5">
        <DarkToggle />
      </div>

    </>
  );


  return (
    <>
      <div className="mx-auto ms-4 me-5 md:ms-0 md:me-0 z-[1]">
        <div className="navbar flex items-center justify-between">
          <div className="navbar-start flex items-center">
            <img className="w-12 rounded m-1 lg:m-4 ms-0" src={image} alt="" />
            <NavLink
              to="/"
              className="normal-case cursor-pointer font-bold text-xl lg:text-3xl"
            >
              Frienemie
            </NavLink>
          </div>
          <div className="navbar-end hidden lg:flex items-center">
            <ul className="menu menu-horizontal items-center pt-2 px-1 z-[11]">{menu}</ul>
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
            <ul tabIndex={0} className="dropdown-content z-[21] menu p-4 py-4 shadow bg-base-100 rounded-box w-52" >{menu}</ul>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
