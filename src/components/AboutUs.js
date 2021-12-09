import React from "react";
import fondo_a from "../assets/fondo_a.PNG";
import fondo_c from "../assets/img_c.PNG";


const AboutUs = () => {
  return (
  <div className="container-au">
    <div className="container-img-au">
      <picture>
      <source media="(min-width:768px )" srcSet={fondo_a} />
      <img src={fondo_a} alt="img" />
    </picture>
      <div className="details-au">
        <h2>¿Quienes Somos?</h2>
        <p>
        Somos estudiantes de la MisiónTic proporcionado por la Universidad Nacional, que con
        el desarrollo de esta aplicación web denomina URGENCIAS APP buscamos dejar en evidencia
        nuestros conocimientos adquiridos en el trascurso de este programa de capacitación,
        fortaleciendo nuestras habilidades en lo que se denomina como la cuarte revolución industrial.
        </p>
        <h2>Nuestra aplicación </h2>
        <p>
        En la búsqueda de temas para poder desarrollar un app,
        se eligió el tema de la salud ya que es uno de los campos
        que más afecta al pueblo colombiano debido a los grandes
        problemas que se presentan a la hora sé recurrir al este
        derecho fundamental, lograr desarrollar una aplicación que
        permita mejorar la atención llamo la atención por lo tanto
        se genero la estructura del proyecto para lograr este fin.
      </p>      
      </div>
    </div>
    <div className="container-img-c">
    <picture>
      <source media="(min-width:768px )" srcSet={fondo_c} />
      <img src={fondo_c} alt="img" />
    </picture>
       
    </div>
    </div>
  
  );
};

export default AboutUs;
