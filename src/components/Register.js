import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "./AuthContext";
import Swal from "sweetalert2";
const CREATE_DOCTOR = gql`
  mutation SignUpUser($userInput: SignUpInput) {
    signUpUser(userInput: $userInput) {
      refresh
      access
    }
  }
`;
const initialState = {
  username: "",
  cedula: "",
  password: "",
  nombre: "",
  correo: "",
  especialidad: "",
};
const Register = () => {
  const [user, setUser] = useState(initialState);
  const { setAccess } = useContext(contextAuth);

  const handleChangeInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [createDoctor] = useMutation(CREATE_DOCTOR);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(user);

    createDoctor({ variables: { userInput: user } })
      .then((res) => {
        console.log(res);

        const tokenAccess = res.data.signUpUser.access;
        const tokenRefresh = res.data.signUpUser.refresh;

        localStorage.setItem("token_access", tokenAccess);
        localStorage.setItem("token_refresh", tokenRefresh);

        setAccess(true);
      })
      .catch((error) => {
        Swal.fire("error", "datos incorrectos", "error");
      });

    setUser(initialState);
  };
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

          <form onSubmit={handleSubmitForm}>
            <input
              onChange={handleChangeInputs}
              type="nombre"
              value={user.username}
              name="username"
              placeholder="USERNAME"
            />
            <br />
            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={handleChangeInputs}
              placeholder="NOMBRE"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="cedula"
              value={user.cedula}
              name="cedula"
              placeholder="CEDULA"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="password"
              value={user.password}
              name="password"
              placeholder="PASSWORD"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="correo"
              value={user.correo}
              name="correo"
              placeholder="CORREO"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="especialidad"
              value={user.especialidad}
              name="especialidad"
              placeholder="ESPECIALIDAD"
            />
            <br />
            <br />
            <br />
            <div className="boton">
              <button type="submit">Registrarse</button>
            </div>
          </form>
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
