import React from "react";

const Enfermedad = ({ enfermedad }) => {
  return (
    <div className="enfermedad">
      <h3>{enfermedad.sintomas}</h3>
    </div>
  );
};

export default Enfermedad;
