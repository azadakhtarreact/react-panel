import React from "react"
import { Navigate, Outlet, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
 
import { getToken } from "./AuthService"

// handle the private routes
function PrivateRoute({ children }) {
    const token = getToken()
    return token ? <Outlet>{children} </Outlet> : <Navigate to="/login" />
}

export default PrivateRoute

PrivateRoute.prototypes = {
    children: PropTypes.node.isRequired
}