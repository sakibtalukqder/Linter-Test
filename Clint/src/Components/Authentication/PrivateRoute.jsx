
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    const User = localStorage.getItem("User");
    if (!User) {
        return <Navigate to="/login" />
    } else {
        return <Outlet />
    }

};

export default PrivateRoute;