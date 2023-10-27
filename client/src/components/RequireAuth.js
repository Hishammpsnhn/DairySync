import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({children}) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to='/' />
        
    }
    return children;
};

export default RequireAuth;
