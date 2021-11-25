import React, { useState } from "react";
import { Redirect } from "react-router";
import Login from "../components/Login";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return !auth ? <Redirect exact to="/login" /> : <Component {...rest} />;
};

export default PrivateRoute;
