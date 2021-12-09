import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import contextAuth from "../AuthContext";
import { gql, useMutation } from "@apollo/client";
import { ALL_ENFERMEDADES } from "./AllSintomas";
import Spinner from "../Spinner";
import { useHistory } from "react-router";

const DELETE_ENFERMEDAD = gql`
  mutation Mutation($nombre: String!) {
    deleteEnfermedad(nombre: $nombre)
  }
`;

const AllEnfermedades = () => {
  const [eliminarEnfermedad] = useMutation(DELETE_ENFERMEDAD, {
    refetchQueries: [{ query: ALL_ENFERMEDADES }],
  });
  const { isAuth, setEditandoEnfermedad, enfermedades } =
    useContext(contextAuth);
  const history = useHistory();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    return () => {
      setLoadingDelete(false);
      setLoadingEdit(false);
    };
  }, []);

  //editar enfermedad
  const handleEditEnfermedad = async (enfermedad) => {
    setLoadingEdit(true);
    const autenticado = await isAuth();
    setLoadingEdit(false);
    if (!autenticado) {
      history.push("/");
      console.log("no autenticado");
      return;
    }
    setEditandoEnfermedad({ edit: true, enfermedad });
    history.push("/home/admin-pacientes/enfermedad/");
  };
  // eliminar paciente
  const handleDeleteEnfermedad = async (enfermedad) => {
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
      text: `Deseas eliminar la enfermedad: ${enfermedad.nombre} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEnfermedad({ variables: { nombre: enfermedad.nombre } })
          .then((res) => {
            Swal.fire("Eliminado!", `${res.data.deleteEnfermedad}`, "success");
          })
          .catch((error) =>
            Swal.fire("Error!", `${error.data.deleteEnfermedad}`, "error")
          );
      }
    });
  };
  return (
    <div className="container-pacientes">
      {enfermedades?.getAllEnfermedades.map((enfermedad) => (
        <div className="paciente" key={enfermedad.nombre}>
          <p>
            <strong>Enfermedad: </strong>
            {enfermedad.nombre}
          </p>
          <div className="detalles-extras">
            <p>
              <strong>Sintomas: </strong>
              {enfermedad.sintomas.join(", ")}
            </p>
          </div>
          <div className="detalles-salud">
            <p>
              <strong>Medicina: </strong>
              {enfermedad.medicina.join(", ")}
            </p>
          </div>
          <div className="container-btns-paciente">
            {/* <button className="btn-editar">Editar</button> */}
            <button
              onClick={() => handleEditEnfermedad(enfermedad)}
              className="btn-editar"
              disabled={loadingEdit}
            >
              {loadingEdit && <Spinner />}Editar
            </button>
            <button
              onClick={() => handleDeleteEnfermedad(enfermedad)}
              disabled={loadingDelete}
              className="btn-eliminar"
            >
              {loadingDelete && <Spinner />}Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllEnfermedades;
