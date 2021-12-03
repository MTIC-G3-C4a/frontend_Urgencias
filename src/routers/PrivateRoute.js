import React, { useState } from "react";
import { Redirect, Route } from "react-router";
import Login from "../components/Login";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  // return !auth ? <Redirect exact to="/login" /> : <Component {...rest} />;
  return (
    <Route {...rest}> {!auth ? <Redirect to="/login" /> : <Component />}</Route>
  );
};

export default PrivateRoute;
