import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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

      <div className="registro">
        <div className="container_registro">
          <h2>Registrarse</h2>

          <form>
            <input type="nombre" placeholder="NOMBRE" />
            <br />
            <input type="cedula" placeholder="CEDULA" />
            <br />
            <input type="password" placeholder="PASSWORD" />
            <br />
            <input type="correo" placeholder="CORREO" />
            <br />
            <input type="especialidad" placeholder="ESPECIALIDAD" />
            <br />
            <br />
            <br />
          </form>
          <div className="boton">
            <button type="submit">Registrarse</button>
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

export default Register;
