import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import HomeRouter from "./HomeRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../components/NotFound";
const AppRouter = () => {
  const [auth, setAuth] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" auth={auth} component={HomeRouter} />
          <PublicRoute exact path="/login" auth={auth} component={Login} />
          <PublicRoute
            exact
            path="/register"
            auth={auth}
            component={Register}
          />
          <Route path="/*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
