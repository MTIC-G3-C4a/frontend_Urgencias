import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import ViewsEnfermedades from "./AllSintomas";
import Swal from "sweetalert2";
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
    const { setAccess } = useContext(contextAuth);
  
    const handleChangeInputs = (e) => {
      if(e.target.name === "edad"|| e.target.name === "celular"){
        setPaciente({ ...PacienteInput, [e.target.name]: Number(e.target.value) });
        return
      }
      // if(e.target.name == "sintoma"){
      //   setPaciente(state=>({...state, sintomas: [...state.sintomas,e.target.value]}))
      //   return
      // }
      setPaciente({ ...PacienteInput, [e.target.name]: e.target.value });
      console.log(e.target.value)

    };
  
    const [createPaciente] = useMutation(CREATE_PACIENTE);
  
    const handleSubmitForm = (e) => {
      const formulario=document.getElementById("formRegistro")
      e.preventDefault();
      console.log(PacienteInput);



      // setPaciente({ ...PacienteInput, edad: Number(PacienteInput.edad) });
      // console.log(PacienteInput);
    
      const inputSintomas= document.querySelectorAll("input[name=sintoma]:checked") 
      console.log(inputSintomas)
      let arraySint=[]
      inputSintomas.forEach((input)=>{
        arraySint.push(input.value)
      })

      createPaciente({ variables: { paciente : {...PacienteInput,sintomas:arraySint}} })
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
  
      setPaciente(initialState);
      formulario.reset();
    };
    console.log(PacienteInput)
    return <div className="container-crear-paciente">
  
  <div className="registro-paciente">
    <div className="container_registro-paciente">
    <br />
      <h2>Registrar Paciente</h2><br />
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
          <button type="submit">Registrar Paciente</button>
        </div>
        <br></br>
        
      </form>
    </div>
  </div>
</div>
};

export default CreatePaciente;

