import React, { useState } from "react";
import { Redirect, Route } from "react-router";
import HomeRouter from "./HomeRouter";

const PublicRoute = ({ auth, component: Component, ...rest }) => {
  // return auth ? <Redirect exact to="/" /> : <Component {...rest} />;
  return (
    <Route {...rest}>{auth ? <Redirect to="/home" /> : <Component />}</Route>
  );
};

export default PublicRoute;
