
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import contextAuth from "../AuthContext";
import { useHistory } from "react-router";
import Spinner from "../Spinner";
// import { ALL_ENFERMEDADES } from "./CreatePaciente";
import { ALL_ENFERMEDADES } from "./AllSintomas";
// const DELETE_PACIENTE = gql`
//   mutation Mutation($documento: String!) {
//     deletePaciente(documento: $documento)
//   }
// `;

const Enfermedad = ({ enfermedad }) => {
  const { isAuth } = useContext(contextAuth);
  const history = useHistory();
  const [loadingDelete, setLoadingDelete] = useState(false);
  console.log("hola")

//   const handleDeletePaciente = async () => {
//     setLoadingDelete(true);
//     const autenticado = await isAuth();
//     setLoadingDelete(false);

    // if (!autenticado) {
    //   history.push("/");
    //   console.log("no autenticado");
    //   return;
    // }

//     Swal.fire({
//       title: "Estas de acuerdo?",
//       text: `Deseas eliminar el paciente con ${paciente.tipoDocumento}:
//     ${paciente.documento} ?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Si, Eliminalo!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         eliminarPaciente({ variables: { documento: paciente.documento } })
//           .then((res) => {
//             console.log(res);
//             Swal.fire("Eliminado!", `${res.data.deletePaciente}`, "success");
//           })
//           .catch((error) =>
//             Swal.fire("Error!", `${error.data.deletePaciente}`, "error")
//           );
//       }
//     });
//   };

  return (
    <div className="enfermedad">
      <h3>{enfermedad.sintomas}</h3>
    </div>
  );
};

export default Enfermedad;