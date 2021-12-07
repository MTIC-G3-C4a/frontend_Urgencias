import { useMutation, gql, useLazyQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
const contextAuth = createContext();

const AuthContext = ({ children }) => {
  //  const { data, loading } = useQuery(All_pacientes);

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
  const [refreshSesion] = useMutation(REFRESH_SESION);
  const [
    getEnfermedades,
    {
      data: enfermedades,
      error: errorEnfermedades,
      loading: loadingenfermedades,
    },
  ] = useLazyQuery(ALL_ENFERMEDADES);

  // const {
  //   data: enfermedades,
  //   error: errorEnfermedades,
  //   loading: loadingenfermedades,
  // } = useQuery(ALL_ENFERMEDADES);

  console.log({
    data: enfermedades,
    error: errorEnfermedades,
    loading: loadingenfermedades,
  });
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
    isAuth().then((res) => {
      setAcceso(res);
    });
    return () => {
      // localStorage.removeItem();
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
  };
  return <contextAuth.Provider value={data}>{children}</contextAuth.Provider>;
};

export { AuthContext };
export default contextAuth;
