import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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

      <div className="login">
        <div className="container_login">
          <h2>Ingresar </h2>

          <form>
            <br />
            <input type="cedula" placeholder="CEDULA" />
            <br />
            <input type="password" placeholder="PASSWORD" />

            <br />
            <br />
            <br />
          </form>
          <div className="boton">
            <button type="submit">Iniciar sesión</button>
          </div>
        </div>
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

export default Login;
