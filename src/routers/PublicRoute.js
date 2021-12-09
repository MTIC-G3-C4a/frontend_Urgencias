import React from "react";
import { Redirect, Route } from "react-router";

const PublicRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route {...rest}>{auth ? <Redirect to="/home" /> : <Component />}</Route>
  );
};

export default PublicRoute;
