import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import { useHistory } from "react-router";
import Spinner from "../Spinner";
import Paciente from "./Paciente";
export const ENF_SINT=gql`

query Query($documento: String!) {
  getEnfermedadesPaciente(documento: $documento) {
    nombre
    sintomas
    medicina
  }
}
`;

const GetEnfermedades = ({paciente}) => {
    const {data: enfermedades, error, loading}=useQuery(ENF_SINT,{variables:{documento:paciente.documento}})
    console.log(paciente)

    // useEffect(() => {
    //     getDiagnostico({variables:{documento:paciente.documento}})
    //         .then((res)=>{
    //             console.log(res)
    //         })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    //   }, [paciente]);

    console.log(enfermedades)
    console.log(error)
    if(error){
        console.log(error.body)
        return("No existe una enfermedad registrada que coincida con alguno de los síntomas del paciente con documento:" + paciente.documento)
    }
    return (
            <div className = "container_diagnostico">
                {loading?<Spinner></Spinner>:enfermedades.getEnfermedadesPaciente.map((enfermedad)=>{
                    return(<div className="container_enfermedad_filt" key={enfermedad.nombre}>
                       <div>
                        <p>
                        <strong>
                            Nombre:   
                        </strong>
                            {enfermedad.nombre}
                        </p>
                        </div>
                        <div>
                        <p>
                        <strong>
                            Síntomas:  
                        </strong>
                            {enfermedad.sintomas.join(", ")}
                        </p>
                        </div>
                        <div>
                        <p>
                        <strong>
                            Medicina:  
                        </strong>
                            {enfermedad.medicina.join(", ")}
                        </p>
                        </div>
                    
                    </div>
                    )


                })}
            
            </div>
      )
}

export default GetEnfermedades;