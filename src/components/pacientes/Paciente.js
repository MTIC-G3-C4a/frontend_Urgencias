import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import { useHistory } from "react-router";
import Spinner from "../Spinner";
import { ALL_PACIENTES } from "./ViewsPacientes";
const DELETE_PACIENTE = gql`
  mutation Mutation($documento: String!) {
    deletePaciente(documento: $documento)
  }
`;

const Paciente = ({ paciente }) => {
  const [eliminarPaciente] = useMutation(DELETE_PACIENTE, {
    refetchQueries: [{ query: ALL_PACIENTES }],
  });
  const { isAuth } = useContext(contextAuth);
  const history = useHistory();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeletePaciente = async () => {
    setLoadingDelete(true);
    const autenticado = await isAuth();
    setLoadingDelete(false);

    if (!autenticado) {
      history.push("/");
      console.log("no autenticado");
      return;
    }

    Swal.fire({
      title: "Estas de acuerdo?",
      text: `Deseas eliminar el paciente con ${paciente.tipoDocumento}:
    ${paciente.documento} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPaciente({ variables: { documento: paciente.documento } })
          .then((res) => {
            console.log(res);
            Swal.fire("Eliminado!", `${res.data.deletePaciente}`, "success");
          })
          .catch((error) =>
            Swal.fire("Error!", `${error.data.deletePaciente}`, "error")
          );
      }
    });
  };

  return (
    <div className="paciente">
      <h3>{paciente.nombre}</h3>
      <p>
        <strong>{paciente.tipoDocumento}: </strong>
        {paciente.documento}
      </p>
      <div className="detalles-extras">
        <p>
          <strong>correo: </strong>
          {paciente.correo}
        </p>
        <p>
          <strong>celular: </strong>
          {paciente.celular}
        </p>
        <p>
          <strong>edad: </strong>
          {paciente.edad}
        </p>
      </div>
      <div className="detalles-salud">
        <p>
          <strong>Observaciones: </strong>
          {paciente.observaciones}
        </p>
        <p>
          <strong>Sintomas: </strong>
          {paciente.sintomas.join(",")}
        </p>
      </div>
      <div className="container-btns-paciente">
        <button className="btn-editar">Editar</button>
        <button
          onClick={handleDeletePaciente}
          disabled={loadingDelete}
          className="btn-eliminar"
        >
          {loadingDelete && <Spinner />}Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
