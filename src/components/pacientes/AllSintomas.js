import React, { useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import Spinner from "../Spinner";
import contextAuth from "../AuthContext";
export const ALL_ENFERMEDADES = gql`
  query Query {
    getAllEnfermedades {
      sintomas
    }

    getEnfermedadesPaciente(documento: $documento) {
      nombre
      sintomas
      medicina
    }
  }
`;

var ViewsEnfermedades = () => {
  const { enfermedades, errorEnfermedades, loadingenfermedades } =
    useContext(contextAuth);
  const [allSintomas, setAllSintomas] = useState([]);

  useEffect(() => {
    // SI ENFERMEDADES TIENE ALGO , ENTRA A ESTE IF
    if (enfermedades) {
      // UNIMOS TODOS LOS SINTOMAS , EN UNO SOLO
      enfermedades.getAllEnfermedades.forEach((enfermedad) => {
        setAllSintomas((state) => [...state, ...enfermedad.sintomas]);
      });
      //AQUI HACEMOS QUE NO SE REPITAN
      setAllSintomas((state) => {
        const arrNoRepeat = new Set([...state]);
        return [...arrNoRepeat];
      });
    }
  }, [enfermedades]);
  // SE ORDENAN ALFABETICAMENTE
  allSintomas.sort()
  console.log(allSintomas);
  console.log(enfermedades);
  if (errorEnfermedades) {
    console.log(errorEnfermedades);
    return <p style={{ color: "red" }}>error</p>;
  }
  return (
    <div>
      {loadingenfermedades ? (
        <Spinner />
      ) : (
        <div className="container-enfermedades-sintomas">
          {allSintomas.map((sintoma, i) => {
            return (
              <div className="container-sintomas" key={`${i}${sintoma}`}>
                <label>{sintoma}</label>
                <input type="checkbox" name="sintoma" />
              </div>
            );
          })}
        </div>
      )}
        <div className="container-btns-sintomas">
          <button className="btn-predecir" Diagnóstico Presuntivo> </button>
        </div>
    </div>
  );
};

export default ViewsEnfermedades;
