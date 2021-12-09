import React, { useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import contextAuth from "../AuthContext";
import Spinner from "../Spinner";
export const ENF_SINT = gql`
  query Query($documento: String!) {
    getEnfermedadesPaciente(documento: $documento) {
      nombre
      sintomas
      medicina
    }
  }
`;

const GetEnfermedades = ({ paciente }) => {
  const {
    data: enfermedades,
    error,
    loading,
  } = useQuery(ENF_SINT, { variables: { documento: paciente.documento } });

  const { isAuth } = useContext(contextAuth);
  useEffect(() => {
    async function verifyAuth() {
      await isAuth();
    }
    verifyAuth();
  }, [paciente]);

  if (error) {
    console.log(error);
    return (
      "No existe una enfermedad registrada que coincida con alguno de los síntomas del paciente con documento:" +
      paciente.documento
    );
  }
  return (
    <div className="container_diagnostico">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        enfermedades.getEnfermedadesPaciente.map((enfermedad) => {
          return (
            <div className="container_enfermedad_filt" key={enfermedad.nombre}>
              <div>
                <p>
                  <strong>Nombre:</strong>
                  {enfermedad.nombre}
                </p>
              </div>
              <div>
                <p>
                  <strong>Síntomas:</strong>
                  {enfermedad.sintomas.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  <strong>Medicina:</strong>
                  {enfermedad.medicina.join(", ")}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GetEnfermedades;
