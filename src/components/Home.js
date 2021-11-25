import React from "react";
import imgSmall from "../assets/img-fondo.jpg";
import imgDesk from "../assets/img-fondo-desk.jpg";
import salud1 from "../assets/salud.jpg";
import salud2 from "../assets/salud-2.jpg";
import salud3 from "../assets/salud-3.png";

const Home = () => {
  return (
    <div className="main-container-home">
      <div className="container-img-home">
        <picture>
          <source media="(min-width:768px )" srcSet={imgDesk} />
          <img src={imgSmall} alt="img" />
        </picture>
        <div className="details-urgencias">
          <h2>CENTRO MEDICO</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            error dolores amet quam nostrum, ea sit deserunt cum repudiandae ex
            vitae nulla facilis illum.
          </p>
        </div>
      </div>
      <div className="container-presentacion-servicios">
        <div className="container-description">
          <h2>Servicios de la empresa</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            consectetur reprehenderit sunt laborum porro cumque! Quo dolore,
            placeat
          </p>
        </div>
        <div className="container-cards">
          <div className="card">
            <div className="container-img-card">
              <img src={salud1} alt="img" />
            </div>
            <div className="container-description-card">
              <h3>Creación de prototipos</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                esse veniam incidunt.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="container-img-card">
              <img src={salud2} alt="img" />
            </div>
            <div className="container-description-card">
              <h3>Creación de prototipos</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                esse veniam incidunt.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="container-img-card">
              <img src={salud3} alt="img" />
            </div>
            <div className="container-description-card">
              <h3>Creación de prototipos</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                esse veniam incidunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
