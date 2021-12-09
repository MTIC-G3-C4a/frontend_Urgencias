import React, { useContext, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import ViewsEnfermedades from "./AllSintomas";
import Swal from "sweetalert2";
import { ALL_PACIENTES } from "./ViewsPacientes";
import { Link } from "react-router-dom";

const EDIT_PACIENTE = gql`
  mutation Mutation($paciente: PacienteInput!) {
    updatePaciente(paciente: $paciente) {
      documento
      tipoDocumento
      nombre
      edad
      genero
      celular
      correo
      observaciones
      sintomas
    }
  }
`;

const CREATE_PACIENTE = gql`
  mutation Mutation($paciente: PacienteInput!) {
    createPaciente(paciente: $paciente) {
      documento
      tipoDocumento
      nombre
      edad
      genero
      celular
      correo
      observaciones
      sintomas
    }
  }
`;

const initialState = {
  documento: "",
  tipoDocumento: "",
  nombre: "",
  edad: "",
  genero: "",
  celular: "",
  correo: "",
  observaciones: "",
  sintomas: [""],
};

const CreatePaciente = () => {
  const [PacienteInput, setPaciente] = useState(initialState);
  const { setAcceso, editandoPaciente, isAuth } = useContext(contextAuth);

  const [createPaciente] = useMutation(CREATE_PACIENTE, {
    refetchQueries: [{ query: ALL_PACIENTES }],
  });
  const [editPaciente] = useMutation(EDIT_PACIENTE, {
    refetchQueries: [{ query: ALL_PACIENTES }],
  });

  //edicion de paciente
  useEffect(() => {
    if (editandoPaciente.edit) {
      console.log("edit");
      console.log(editandoPaciente.paciente);
      setPaciente(editandoPaciente.paciente);
    }
    return () => {
      setPaciente(initialState);
    };
  }, [editandoPaciente]);

  const handleChangeInputs = (e) => {
    console.log("entrando");
    if (e.target.name === "edad" || e.target.name === "celular") {
      setPaciente({
        ...PacienteInput,
        [e.target.name]: Number(e.target.value),
      });
      return;
    }
    if (e.target.name === "sintoma") {
      console.log("sintoma cambiando?");
      return;
    }
    console.log("no puedo ser sintoma");
    setPaciente({ ...PacienteInput, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formulario = document.getElementById("formRegistro");
    const autenticado = await isAuth();
    if (!autenticado) return;

    const inputSintomas = document.querySelectorAll(
      "input[name=sintoma]:checked"
    );
    // console.log(inputSintomas);
    let arraySint = [];
    inputSintomas.forEach((input) => {
      arraySint.push(input.value);
    });

    let { sintoma, ...newpaciente } = PacienteInput;
    newpaciente.sintomas = arraySint;
    if (editandoPaciente.edit) {
      const { __typename, sintomas, ...newPacientes } = PacienteInput;
      editPaciente({
        variables: {
          paciente: { ...newPacientes, sintomas: arraySint },
        },
      })
        .then((res) => {
          console.log(res);
          Swal.fire("Exito", "Paciente editado correctamente", "success");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("error", "error al editar paciente", "error");
        });

      setPaciente(initialState);
      formulario.reset();
      return;
    }

    // const inputSintomas = document.querySelectorAll(
    //   "input[name=sintoma]:checked"
    // );
    // // console.log(inputSintomas);
    // let arraySint = [];
    // inputSintomas.forEach((input) => {
    //   arraySint.push(input.value);
    // });

    // let { sintoma, ...newpaciente } = PacienteInput;
    // newpaciente.sintomas = arraySint;
    createPaciente({
      variables: {
        paciente: newpaciente,
      },
    })
      .then((res) => {
        console.log(res);
        Swal.fire("Exito", "Paciente creado correctamente", "success");
        setAcceso(true);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("error", "datos incorrectos", "error");
      });
    setPaciente(initialState);
    formulario.reset();
  };

  return (
    <div className="container-crear-paciente">
      <div className="registro-paciente">
        <div className="container_registro-paciente">
          <br />
          <h2>
            {editandoPaciente.edit ? "Editar Paciente" : "Registrar Paciente"}
          </h2>
          <br />
          <br />
          <form onSubmit={handleSubmitForm} id="formRegistro">
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.documento}
              name="documento"
              placeholder="Documento"
            />
            <br />
            <input
              type="text"
              name="tipoDocumento"
              value={PacienteInput.tipoDocumento}
              onChange={handleChangeInputs}
              placeholder="Tipo de Documento"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.nombre}
              name="nombre"
              placeholder="Nombre"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="number"
              value={PacienteInput.edad}
              name="edad"
              placeholder="Edad"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.genero}
              name="genero"
              placeholder="Genero"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.celular}
              name="celular"
              placeholder="Celular"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.correo}
              name="correo"
              placeholder="Correo"
            />
            <br />
            <input
              onChange={handleChangeInputs}
              type="text"
              value={PacienteInput.observaciones}
              name="observaciones"
              placeholder="Observaciones"
            />
            <br />

            <br />
            <h3> Seleccione los síntomas: </h3>
            {/* <input
          onChange={handleChangeInputs}
          type="text"
          value={PacienteInput.sintomas}
          name="sintomas"
          placeholder="Sintomas"
          disabled
        /> */}
            {/* <br />
        <br /> */}
            <ViewsEnfermedades
              setPaciente={setPaciente}
              handleChangeInputs={handleChangeInputs}
            ></ViewsEnfermedades>
            <div className="boton-paciente">
              <button type="submit">
                {editandoPaciente.edit
                  ? "Editar Paciente"
                  : "Registrar Paciente"}
              </button>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePaciente;
