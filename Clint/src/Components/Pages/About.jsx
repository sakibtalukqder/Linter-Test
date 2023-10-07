import React from "react";
import img from "../../assets/Img/Logo.jpg"
import { Link } from "react-router-dom";
import TeamMembers from "./TeamMembers";

const About = () => {
  return (
    <div>
      <div className="hero h-[100vh] md:h-[85vh]" style={{ backgroundImage: `url(${img})` }}>
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="hero-content flex-col lg:flex-row-reverse text-white">
          <img src={img} className=" hidden md:flex md:w-1/3 rounded" alt="" />
          <div className=" w-full lg:w-9/12">
            <div className=" max-w-2xl">
              <h1 className="mb-5 text-5xl font-bold">About Frienemie</h1>
              <p className="mb-5">Welcome to Frienemie - Your Trusted Contract Management Solution!<br /> At Frienemie, we are passionate about simplifying contract management for individuals and businesses alike. Our platform is built on a foundation of innovation, security, and user-friendliness. Our mission is to empower you with the tools you need to efficiently manage and store your contract information.</p>
              <Link to={"/reg"} className="btn btn-outline btn-accent">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="py-8 md:py-4">
        <Link to="/about/members#" className="btn btn-outline btn-accent w-full rounded-none">Haveing Troublr ? Meat Our Support Team</Link>
      </div>
      <div className=" flex justify-center items-center">
        <figure className=" w-4/5 md:w-1/3">
          <img src={img} alt="" className=" rounded" />
        </figure>
      </div>
      <br />
      <p className="text-center py-4 text-white text-3xl font-bold bg-blue-500">
        Stay With Frienemie, ❤
      </p>
    </div>
  );
};

export default About;