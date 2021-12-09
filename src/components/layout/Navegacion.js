import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import contextAuth from "../AuthContext";

const Navegacion = ({ handleToggleMenu, open }) => {
  const [isActiveBtnArrow, setIsActiveBtnArrow] = useState(false);
  const [isActiveBtnArrow2, setIsActiveBtnArrow2] = useState(false);
  const location = useLocation();
  const { setAcceso } = useContext(contextAuth);
  const handleLogOut = () => {
    setAcceso(false);
    localStorage.clear();
  };

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
          <NavLink exact to="/home" activeClassName="active">
            Inicio
          </NavLink>
          <button
            onClick={() => setIsActiveBtnArrow(!isActiveBtnArrow)}
            className={`${
              location.pathname.includes("/home/admin-pacientes")
                ? "active"
                : ""
            }
            ${isActiveBtnArrow ? "buton-arrow btn-arrow-active" : "buton-arrow"}
            `}
          >
            <span>Pacientes</span>
            <i className="fas fa-chevron-right"></i>
            <div className="submenu-pacientes">
              <Link to="/home/admin-pacientes">Crear Paciente</Link>
              <Link to="/home/admin-pacientes/pacientes">Ver Todos</Link>
            </div>
          </button>
          <button
            onClick={() => setIsActiveBtnArrow2(!isActiveBtnArrow2)}
            className={`${
              location.pathname.includes("/home/admin-pacientes/enfermedad")
                ? "active"
                : ""
            }
            ${
              isActiveBtnArrow2 ? "buton-arrow btn-arrow-active" : "buton-arrow"
            }
            `}
          >
            <span>Enfermedades</span>
            <i className="fas fa-chevron-right"></i>
            <div className="submenu-pacientes">
              <Link to="/home/admin-pacientes/enfermedad">
                Crear Enfermedad
              </Link>
              <Link to="/home/admin-pacientes/enfermedades">Ver Todas</Link>
            </div>
          </button>
          <NavLink exact to="/home/about-us" activeClassName="active">
            Sobre Nosotros
          </NavLink>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
