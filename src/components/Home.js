import React, { useContext } from "react";
import imgSmall from "../assets/img-fondo.jpg";
import imgDesk from "../assets/img-fondo-desk.jpg";
import salud1 from "../assets/salud.jpg";
import salud2 from "../assets/salud-2.jpg";
import salud3 from "../assets/salud-3.png";
import contextAuth from "./AuthContext";

const Home = () => {

  const { enfermedades } = useContext(contextAuth);
  console.log(enfermedades)
  return (
    <div className="main-container-home">
    <div className="container-img-home">
      <picture>
        <source media="(min-width:768px )" srcSet={imgDesk} />
        <img src={imgSmall} alt="img" />
      </picture>
      <div className="details-urgencias">
        <h2>URGENCIAS APP</h2>
        <p>
            Brindar a la población, especialmente a los pacientes de 
            area de urgencias, servicios de salud con calidad humana.
            URGENCIAS APP permite un trabajo más ágil y por lo tanto 
            una mejor atención.
        </p>
      </div>
    </div>
    
    <div className="container-presentacion-servicios">
      <div className="container-description">
        <h2>Servicios de URGENCIAS APP</h2>
        <p>
            En el momento de un accidente o una enfermedad grave que requiera de atención médica apremiante
            y multidisciplinaria.El servicio de urgencias se encarga de dar una atención inmediata, por lo
            es necesario el uso de sistemas de protocolos ágiles que permitan que la atención sea en el menor
            tiempo posible y con la mejor calidad y de eso se encarga URGENCIAS APP.
            
        </p>
      </div>
      <div className="container-cards">
        <div className="card">
          <div className="container-img-card">
            <img src={salud1} alt="img" />
          </div>
          <div className="container-description-card">
            <h3>Registro de Pacientes</h3>
            <p>             
                Con el registro de los pacientes se lleva un control de los síntomas al momento de ingresar 
                al centro medico y asi poder diagnosticar de una manera más efectiva, con esto se proporciona 
                al médico tratante la información del paciente mucho antes de su primer examen.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="container-img-card">
            <img src={salud2} alt="img" />
          </div>
          <div className="container-description-card">
            <h3>Registro de médico especialista</h3>
            <p>
                Al tener claro en el sistema cada uno de los profesionales
                que hacen parte del centro medico sé podra redirigir al paciente    
                directamente al profesional especialista de acuerdo a su necesidad   
                optimizando el tiempo de respuesta en la atención.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="container-img-card">
            <img src={salud3} alt="img" />
          </div>
          <div className="container-description-card">
          <br />
          <br />
            <h3>Diagnóstico</h3>
            <p>
                Con los datos síntomas recolectados del paciente, APP URGENCIAS 
                pre diagnostica la enfermedad o traumatismo a tratar,  
                y al momento de ser atendido por el médico especialista ya   
                tener una base para poder desarrollar su actividad de manera más optima y ágil.
            </p>
          </div>
          <br />
          <br />
        
        </div></div>
      
      <div className="container-enfermedades">
      <br />
      <br />
      <h3> El sistema de diagnóstico cuenta con la siguiente base de datos de enfermedades:  </h3>
      <br />
      <br />
        {enfermedades?.getAllEnfermedades.map((enfermedad)=>(
      <div className="paciente" key={enfermedad.nombre}>
      <p>
        <strong>Enfermedad: </strong>
        {enfermedad.nombre}
      </p>
      <div className="detalles-extras">
        <p>
          <strong>Sintomas: </strong>
          {enfermedad.sintomas.join(", ")}
        </p>
      </div>
            <div className="detalles-salud">
              <p>
                <strong>Medicina: </strong>
                {enfermedad.medicina.join(", ")}
              </p>
            </div>

    </div>
  </div>
  );
};
export default Home;