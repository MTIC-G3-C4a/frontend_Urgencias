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
    const { setAccess, editandoPaciente, isAuth } = useContext(contextAuth);

    const [createPaciente] = useMutation(CREATE_PACIENTE, {
      refetchQueries: [{ query: ALL_PACIENTES }],
    });
    const [editPaciente] = useMutation(EDIT_PACIENTE, {
      refetchQueries: [{ query: ALL_PACIENTES }],
    });

    //edicion de paciente
  useEffect(() => {
    console.log("edit");
    console.log(editandoPaciente);
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
      if(e.target.name === "edad"|| e.target.name === "celular"){
        setPaciente({ ...PacienteInput, [e.target.name]: Number(e.target.value) });
        return
      }
      setPaciente({ ...PacienteInput, [e.target.name]: e.target.value });
      console.log(e.target.value)

    };
  
    // const [createPaciente] = useMutation(CREATE_PACIENTE);
  
    const handleSubmitForm = async(e) => {
      const formulario=document.getElementById("formRegistro")
      e.preventDefault();
      const autenticado = await isAuth();
    if (!autenticado) return;
    if (editandoPaciente.edit) {
      const { __typename, ...newPacientes } = PacienteInput;
      editPaciente({
        variables: {
          paciente: newPacientes,
        },
      })
        .then((res) => {
          console.log(res);
          // const tokenAccess = res.data.signUpUser.access;
          // const tokenRefresh = res.data.signUpUser.refresh;

          // localStorage.setItem("token_access", tokenAccess);
          // localStorage.setItem("token_refresh", tokenRefresh);
          Swal.fire("Exito", "Paciente editado correctamente", "success");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("error", "error al editar paciente", "error");
        });
  
      setPaciente(initialState);
      formulario.reset();
      return
    };
      console.log(PacienteInput);
      // setPaciente({ ...PacienteInput, edad: Number(PacienteInput.edad) });
      // console.log(PacienteInput);
      const inputSintomas= document.querySelectorAll("input[name=sintoma]:checked") 
      console.log(inputSintomas)
      let arraySint=[]
      inputSintomas.forEach((input)=>{
        arraySint.push(input.value)
      })
      console.log(PacienteInput)
      console.log(arraySint)
      createPaciente({ variables: { paciente : {...PacienteInput,sintomas:arraySint}} })
      .then((res) => {
        console.log(res);
         setAccess(true);
        Swal.fire("Exito", "Paciente creado correctamente", "success");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("error", "datos incorrectos", "error");
      });
      setPaciente(initialState);
      formulario.reset();
    }


    return (<div className="container-crear-paciente">
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
        <ViewsEnfermedades setPaciente={setPaciente} handleChangeInputs={handleChangeInputs}> </ViewsEnfermedades>
        <div className="boton-paciente">
          <button type="submit">{editandoPaciente.edit
                  ? "Editar Paciente"
                  : "Registrar Paciente"}</button>
        </div>
        <br></br>
        
      </form>
    </div>
  </div>
</div>)

  }

export default CreatePaciente;
