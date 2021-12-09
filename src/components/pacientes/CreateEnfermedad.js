import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import Swal from "sweetalert2";
import { ALL_ENFERMEDADES } from "./AllSintomas";
const CREATE_ENFERMEDAD = gql`
  mutation Mutation($enfermedad: EnfermedadInput!) {
    createEnfermedad(enfermedad: $enfermedad) {
      nombre
      sintomas
      medicina
    }
  }
`;
const UPDATE_ENFERMEDAD = gql`
  mutation Mutation($enfermedad: EnfermedadInput!) {
    updateEnfermedad(enfermedad: $enfermedad) {
      nombre
      sintomas
      medicina
    }
  }
`;
const initialState = {
  nombre: "",
  sintomas: "",
  medicina: "",
};

const CreateEnfermedad = () => {
  const [EnfermedadInput, setEnfermedad] = useState(initialState);
  const { setAccess, editandoEnfermedad, isAuth, setEditandoEnfermedad } =
    useContext(contextAuth);
  const [CreateEnfermedad] = useMutation(CREATE_ENFERMEDAD, {
    refetchQueries: [{ query: ALL_ENFERMEDADES }],
  });
  const [EditEnfermedad] = useMutation(UPDATE_ENFERMEDAD, {
    refetchQueries: [{ query: ALL_ENFERMEDADES }],
  });

  useEffect(() => {
    async function verifyAuth() {
      await isAuth();
    }
    verifyAuth();
    if (editandoEnfermedad.edit) {
      setEnfermedad(editandoEnfermedad.enfermedad);
    }
    return () => {
      setEnfermedad(initialState);
      setEditandoEnfermedad({ edit: false, enfermedad: initialState });
    };
  }, []);

  const handleChangeInputs = (e) => {
    setEnfermedad({ ...EnfermedadInput, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const autenticacion = await isAuth();
    if (!autenticacion) return;
    if (editandoEnfermedad.edit) {
      const { __typename, ...newEnfermedad } = EnfermedadInput;
      EditEnfermedad({
        variables: {
          enfermedad: {
            ...newEnfermedad,
            sintomas: newEnfermedad.sintomas.split(","),
          },
        },
      })
        .then((res) => {
          console.log(res);
          Swal.fire(
            "Exito",
            `${
              editandoEnfermedad.edit
                ? "Enfermedad Actualizada Exitosamente"
                : "Enfermedad Creada Exitosamente"
            }`,
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Hubo un error creando Enfermedad", "error");
        });
      setEnfermedad(initialState);
      setEditandoEnfermedad({ edit: false, enfermedad: initialState });

      return;
    }

    CreateEnfermedad({
      variables: {
        enfermedad: {
          ...EnfermedadInput,
          sintomas: EnfermedadInput.sintomas.split(","),
        },
      },
    })
      .then((res) => {
        console.log(res);

        const tokenAccess = res.data.signUpUser.access;
        const tokenRefresh = res.data.signUpUser.refresh;

        localStorage.setItem("token_access", tokenAccess);
        localStorage.setItem("token_refresh", tokenRefresh);

        setAccess(true);
      })
      .catch((error) => {
        Swal.fire("Enfermedad creada exitosamente", "success");
      });

    setEnfermedad(initialState);
  };
  return (
    <div className="container-crear-paciente">
      <div className="registro-paciente">
        <div className="container_registro-paciente">
          <br />
          <h2>
            {editandoEnfermedad.edit
              ? "Editar Enfermedad"
              : "Registrar Enfermedad"}
          </h2>
          <br />
          <form onSubmit={handleSubmitForm}>
            <input
              onChange={handleChangeInputs}
              type="text"
              value={EnfermedadInput.nombre}
              name="nombre"
              placeholder="Nombre"
            />
            <br />
            <input
              type="text"
              name="sintomas"
              value={EnfermedadInput.sintomas}
              onChange={handleChangeInputs}
              placeholder="Sintomas"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={EnfermedadInput.medicina}
              name="medicina"
              placeholder="Medicina"
            />
            <br />
            <br />
            <div className="boton-paciente">
              <button type="submit">
                {editandoEnfermedad.edit ? "Editar" : "Registrar"}
              </button>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEnfermedad;
