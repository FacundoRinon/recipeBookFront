import React from "react";
import "./index.scss";

const Navbar = () => {
  return (
    <>
      <div className="navBar">
        <div className="navBar__brand">
          <h3 className="navBar__name">Recipe Book</h3>
        </div>
        <div className="navBar__buttons">
          <p className="navBar__button">Facundo Riñon</p>
          <p className="navBar__button">Cerrar Sesion</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
