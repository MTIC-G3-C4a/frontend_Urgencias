import { useMutation, gql, useLazyQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
const contextAuth = createContext();
const initialStatePaciente = {
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
const AuthContext = ({ children }) => {
  //  const { data, loading } = useQuery(All_pacientes);

  const initialStateEnfermedad = {
    nombre: "",
    sintomas: "",
    medicina: "",
  };

  const ALL_ENFERMEDADES = gql`
    query Query {
      getAllEnfermedades {
        nombre
        sintomas
        medicina
      }
    }
  `;

  const REFRESH_SESION = gql`
    mutation Mutation($refresh: String!) {
      refreshToken(refresh: $refresh) {
        access
      }
    }
  `;
  const [acceso, setAcceso] = useState(false);
  const [editandoEnfermedad, setEditandoEnfermedad] = useState({
    edit: false,
    enfermedad: initialStateEnfermedad,
  });
  const [editandoPaciente, setEditandoPaciente] = useState({
    edit: false,
    paciente: initialStatePaciente,
  });
  const [refreshSesion] = useMutation(REFRESH_SESION);
  const [
    getEnfermedades,
    {
      data: enfermedades,
      error: errorEnfermedades,
      loading: loadingenfermedades,
    },
  ] = useLazyQuery(ALL_ENFERMEDADES);

  const isAuth = async () => {
    if (
      localStorage.getItem("token_refresh") === null ||
      localStorage.getItem("token_access") === null
    ) {
      setAcceso(false);
      return false;
    }

    try {
      const result = await refreshSesion({
        variables: {
          refresh: localStorage.getItem("token_refresh"),
        },
      });

      localStorage.setItem("token_access", result.data.refreshToken.access);
      return true;
    } catch (error) {
      localStorage.clear();
      console.log(error);
      alert("Su sesión expiró, por favor vuelva a iniciar sesión");
      setAcceso(false);

      return false;
    }
  };
  useEffect(() => {
    isAuth()
      .then((res) => {
        setAcceso(res);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      // localStorage.clear();
    };
  }, []);

  useEffect(() => {
    if (acceso) {
      getEnfermedades();
    }
  }, [acceso]);

  const data = {
    auth: acceso,
    setAcceso,
    isAuth,
    enfermedades,
    errorEnfermedades,
    loadingenfermedades,
    editandoEnfermedad,
    setEditandoEnfermedad,
    editandoPaciente,
    setEditandoPaciente,
  };
  return <contextAuth.Provider value={data}>{children}</contextAuth.Provider>;
};

export { AuthContext };
export default contextAuth;
