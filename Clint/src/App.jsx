import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import Sinup from "./Components/Authentication/Sinup";
import UserProfile from "./Components/Authentication/UserProfile";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Dashboard/Register";
import Update from "./Components/Dashboard/Update";
import ViewContact from "./Components/Dashboard/ViewContact";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import Error from "./Components/Pages/Error";
import Footer from "./Components/Shared/Footer";
import Navbar from "./Components/Shared/Navbar";
import "./index.css";
import TeamMembers from "./Components/Pages/TeamMembers";
import ScrollTop from "./Components/Shared/ScrollTop";


const App = () => {

  const User = localStorage.getItem("User");

  const AppComponents = (
    <>

      <Route path="/*" element={<PrivateRoute />} >
        <Route path="dash" element={<Dashboard />} />
        <Route path="dash/:id" element={<Update />} />
        <Route path="dash/view/:id" element={<ViewContact />} />
        <Route path="reg" element={<Register />} />
        <Route path="user" element={<UserProfile />} />
        <Route path="*" element={<Error />} />
      </Route>


      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about/members" element={<TeamMembers />} />
      <Route path="*" element={<Error />} />

      {
        !User && (
          <>
            <Route path="/sinup" element={<Sinup />} />
            <Route path="/login" element={<Login />} />
          </>
        )
      }

    </>
  );

  return (
    <div className="container mx-auto px-1 lg:px-16">
      <ScrollTop />
      <Navbar />
      <Routes>{AppComponents}</Routes>
      <br />
      <Footer />
    </div>
  );
};

export default App;
