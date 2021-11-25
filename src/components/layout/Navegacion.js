import React from "react";
import { NavLink } from "react-router-dom";

const Navegacion = ({ handleToggleMenu, open }) => {
  return (
    <nav className="navegacion">
      <div className="main-container-navegacion">
        <div className="container-logo">
          <h1 className="logo">Urgencias</h1>
        </div>
        <div className="container-button-menu">
          <button onClick={handleToggleMenu} type="button">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className={`container-enlaces-navegacion ${
            open ? "menu-open" : "menu-close"
          }`}
        >
          <button className="btn-close" onClick={handleToggleMenu}>
            X
          </button>
          <NavLink exact to="/" activeClassName="active">
            Inicio
          </NavLink>
          <button>Pacientes</button>
          <NavLink exact to="/about-us" activeClassName="active">
            Sobre Nosotros
          </NavLink>
          <button>Log Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
