import React from "react";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="container-page-not-found">
      <div>
        <h1>Pagina No Encontrada</h1>
        <p>
          La pagina solicitada,no existe. vamos a intentar redireccionarte en 10
          segundos.
        </p>
        <p>
          porfavor ve al Inicio de Urgencias haciendo click en el siguiente
          boton.
        </p>
        <button onClick={() => history.push("/home")}>Urgencias Home</button>
      </div>
    </div>
  );
};

export default NotFound;
