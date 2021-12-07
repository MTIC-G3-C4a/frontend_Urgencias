import React, { useContext, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Spinner from "../Spinner";
import Paciente from "./Paciente";
import contextAuth from "../AuthContext";
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
  const [getPacientes, { data, error, loading }] = useLazyQuery(ALL_PACIENTES);
  const { auth } = useContext(contextAuth);
  useEffect(() => {
    if (auth) {
      getPacientes();
    }
  }, [auth]);
  if (error) return <p style={{ color: "red" }}>error</p>;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-pacientes">
          {data?.getAllPacientes.map((paciente) => {
            return <Paciente paciente={paciente} key={paciente.documento} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ViewsPacientes;
