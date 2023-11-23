import React from "react";
import { useNavigate } from "react-router";

import "./index.scss";

const AboutProyectButton = () => {
  const navigate = useNavigate();

  return (
    <div className="proyectButton">
      <small onClick={() => navigate("/aboutProyect")}>About Proyect</small>
    </div>
  );
};

export default AboutProyectButton;
