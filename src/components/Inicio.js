import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Inicio = () => {
  return (
    <div className="container-img-bg">
      <div className="header">
        <h1>URGENCIAS APP</h1>
        <div className="enlaces-inicio-sesion">
          <Link to="/">inicio</Link>
          <Link to="/login">login</Link>
          <Link to="/register">registrarse</Link>
        </div>
      </div>

      <div className="main-component">
        <img id="logo" src={logo} alt="imagen logo" />
      </div>
      <div className="footer">
        <h2>
          “Donde quiera que se ame el arte de la Medicina, se ama también a la
          Humanidad” Platón.
        </h2>
      </div>
    </div>
  );
};

export default Inicio;
