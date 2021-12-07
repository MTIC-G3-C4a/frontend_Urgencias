import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../Spinner";
import Enfermedad from "./Enfermedad";
export const ALL_ENFERMEDADES = gql`
  query Query {
    getAllEnfermedades {
      sintomas
    }
  }
`;

var ViewsEnfermedades = () => {
  const { data, error, loading } = useQuery(ALL_ENFERMEDADES);
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  //var all_sintomas=this.enfermedad.sintomas.slice();
  console.log("View Enfermedades")

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-enfermedades">
          {data.getAllEnfermedades.map((enfermedad) => {
            
            var all_sintomas=new Array();
            all_sintomas = enfermedad.sintomas.join( ", \n" );
            //var all_sintomas=enfermedad.sintomas.slice();
            
            console.log(all_sintomas.length)
            //all_sintomas=all_sintomas.sort();
            //var all_sintomas=all_sintomas.length


            //for(var i=0;i<all_sintomas.length())

            // var all_sintomas_sort=Array.from(all_sintomas).sort()

            //Enfermedad enfermedad ={enfermedad} 
            // return <Enfermedad enfermedad={enfermedad}/>;
            //return all_sintomas_sort;
            return all_sintomas;
          })}
        </div>
      )}
    </div>
  );
};

export default ViewsEnfermedades;