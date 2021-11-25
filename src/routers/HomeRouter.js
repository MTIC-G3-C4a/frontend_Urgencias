import React, { useState } from "react";
import { Route, Switch } from "react-router";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Navegacion from "../components/layout/Navegacion";
import AdminRouter from "./AdminRouter";

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
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route path="/admin-pacientes" component={AdminRouter} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default HomeRouter;
