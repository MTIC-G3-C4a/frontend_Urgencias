import { useMutation, gql } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
const contextAuth = createContext();

const AuthContext = ({ children }) => {
  //  const { data, loading } = useQuery(All_pacientes);
  const history = useHistory();
  const REFRESH_SESION = gql`
    mutation Mutation($refresh: String!) {
      refreshToken(refresh: $refresh) {
        access
      }
    }
  `;
  const [acceso, setAcceso] = useState(false);
  const [refreshSesion] = useMutation(REFRESH_SESION);

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
      console.log(res);
      setAcceso(res);
    });
    return () => {
      // localStorage.removeItem();
    };
  }, []);

  const data = {
    auth: acceso,
    setAcceso,
    isAuth,
  };
  return <contextAuth.Provider value={data}>{children}</contextAuth.Provider>;
};

export { AuthContext };
export default contextAuth;
