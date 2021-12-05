import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "./AuthContext";

const LOGIN_DOCTOR = gql`
  mutation Mutation($credentials: CredentialsInput!) {
    logIn(credentials: $credentials) {
      refresh
      access
    }
  }
`;

const Login = () => {
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });
  const { setAcceso } = useContext(contextAuth);
  const [loginDoctor] = useMutation(LOGIN_DOCTOR);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(formLogin);
    loginDoctor({ variables: { credentials: formLogin } })
      .then((res) => {
        console.log(res.data);
        const tokenAccess = res.data.logIn.access;
        const tokenRefresh = res.data.logIn.refresh;

        localStorage.setItem("token_access", tokenAccess);
        localStorage.setItem("token_refresh", tokenRefresh);

        setAcceso(true);
      })
      .catch((err) => console.log(err));

    setFormLogin({ username: "", password: "" });
  };

  const handleChangeInputs = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
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

      <div className="login">
        <div className="container_login">
          <h2>Ingresar </h2>

          <form onSubmit={handleSubmitForm}>
            <br />
            <input
              type="text"
              value={formLogin.username}
              onChange={handleChangeInputs}
              name="username"
              placeholder="USERNAME"
            />
            <br />
            <input
              type="password"
              value={formLogin.password}
              onChange={handleChangeInputs}
              name="password"
              placeholder="PASSWORD"
            />

            <br />
            <br />
            <br />
            <div className="boton">
              <button type="submit">Iniciar sesión</button>
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

export default Login;
