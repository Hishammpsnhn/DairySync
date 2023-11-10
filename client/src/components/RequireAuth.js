import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    console.log(user)

    if (!isAuthenticated) {
        return <Navigate to='/' />

    }
    return children;
};

export default RequireAuth;
