import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../Spinner";
import Paciente from "./Paciente";
export const ALL_PACIENTES = gql`
  query Query {
    getAllPacientes {
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

const ViewsPacientes = () => {
  const { data, error, loading } = useQuery(ALL_PACIENTES);
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-pacientes">
          {data.getAllPacientes.map((paciente) => {
            return <Paciente paciente={paciente} key={paciente.documento} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ViewsPacientes;
