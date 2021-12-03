import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route {...rest}> {!auth ? <Redirect to="/login" /> : <Component />}</Route>
  );
};

export default PrivateRoute;
