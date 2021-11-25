import React, { useState } from "react";
import { Redirect } from "react-router";
import HomeRouter from "./HomeRouter";

const PublicRoute = ({ auth, component: Component, ...rest }) => {
  return auth ? <Redirect exact to="/" /> : <Component {...rest} />;
};

export default PublicRoute;
