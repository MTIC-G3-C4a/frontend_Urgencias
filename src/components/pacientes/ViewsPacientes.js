import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../Spinner";
const ALL_PACIENTES = gql`
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
  console.log(data);
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-pacientes">
          {data.getAllPacientes.map((paciente) => {
            return (
              <div key={paciente.documento} className="paciente">
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewsPacientes;
