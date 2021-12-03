import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Navegacion from "../components/layout/Navegacion";
import AdminRouter from "./AdminRouter";
import NotFound from "../components/NotFound";
const HomeRouter = () => {
  const [open, setOpen] = useState(false);
  const handleToggleMenu = () => {
    setOpen(!open);
  };
  const handleClickOutCloseMenu = (e) => {
    if (!open) return;
    const menu = document.querySelector(".navegacion");
    if (!menu.contains(e.target)) {
      handleToggleMenu();
    }
  };
  return (
    <>
      <div onClick={handleClickOutCloseMenu} id="app-main-container">
        <Navegacion handleToggleMenu={handleToggleMenu} open={open} />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/about-us" component={AboutUs} />
          <Route path="/home/admin-pacientes" component={AdminRouter} />
          {/* <Route path="*" component={NotFound} /> */}
          <Route path="/*" component={NotFound}>
            <Redirect to="/page-not-found" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default HomeRouter;
