import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import HomeRouter from "./HomeRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../components/NotFound";
import Inicio from "../components/Inicio";
import contextAuth from "../components/AuthContext";

const AppRouter = () => {
  const { auth } = useContext(contextAuth);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/" auth={auth} component={Inicio} />
          <PublicRoute exact path="/login" auth={auth} component={Login} />
          <PublicRoute
            exact
            path="/register"
            auth={auth}
            component={Register}
          />
          <Route exact path="/page-not-found" component={NotFound} />
          <PrivateRoute path="/home" auth={auth} component={HomeRouter} />
          <Route path="/*" component={NotFound}>
            <Redirect to="/page-not-found" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
