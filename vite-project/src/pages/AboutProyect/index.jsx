import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./index.scss";
import {
  faClock,
  faLaptopCode,
  faSimCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AboutProyect = () => {
  return (
    <div className="aboutProyect">
      <div className="aboutProyect__container">
        <div className="aboutProyect__header">
          <h1>About this proyect</h1>
          <p>
            This project aims to establish a social network platform dedicated
            to recipe sharing among users. It provides a space where individuals
            can showcase their culinary creations to followers and discover new
            recipes contributed by other members. The ability to rate and
            evaluate recipes enhances the platform by helping users identify
            particularly enticing culinary offerings. The genesis of this
            project stems from a keen interest in creating a network that
            encourages the expansion of gastronomic repertoires, inspiring users
            to explore and enjoy a diverse array of culinary experiences.
          </p>
        </div>
        <div className="aboutProyect__duration">
          <h2>
            <FontAwesomeIcon icon={faClock} /> Duration
          </h2>
          <p>
            The project spanned a total duration of one month but was divided
            into two distinct phases. A temporary pause was necessitated by my
            commitment to a React.js development course. It is noteworthy that
            the project was undertaken as an individual effort. Throughout this
            timeframe, comprehensive work was undertaken, encompassing the
            development of both the API and the application's frontend. This
            underscores a versatile skill set capable of addressing various
            facets of the development process.
          </p>
        </div>
        <h2>
          <FontAwesomeIcon icon={faUser} /> About me
        </h2>
        <div className="aboutProyect__aboutMe">
          <div className="aboutProyect__description">
            <p>
              My name is Facundo Riñon, and I am a developer graduate from Hack
              Academy's Coding Bootcamp. I have recently completed a React.js
              development bootcamp, where I deepened my knowledge and received
              instruction in adhering to industry best practices. In 2022, I
              graduated from the Jóvenes a Programar course, serving as the
              starting point in my journey as a developer. Additionally, I am an
              advanced student in Psychology. Presently, I am actively seeking
              my first professional experience in the field, which motivates me
              to remain in a continuous learning mode to be considered in
              selection processes.
            </p>
            <p>
              If you would like to learn more about me, I invite you to check
              out my{" "}
              <a
                href="https://web-portfolio-facundorinon.vercel.app/"
                target="_blank"
              >
                web portfolio
              </a>
              , where you can see my other projects, or visit my social media
              profiles listed on my business card.
            </p>
            <h2>
              <FontAwesomeIcon icon={faSimCard} /> Technologies
            </h2>
            <div className="aboutProyect__techRow">
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/react.png`} />
                <p>React.js</p>
              </div>
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/redux.png`} />
                <p>Redux.js</p>
              </div>
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/JS.png`} />
                <p>JavaScript</p>
              </div>
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/node.png`} />
                <p>Node.js</p>
              </div>
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/mongoDB.png`} />
                <p>MongoDB</p>
              </div>
              <div className="aboutProyect__tech">
                <img src={`${import.meta.env.VITE_IMG_URL2}/Git.png`} />
                <p>Git/hub</p>
              </div>
            </div>
          </div>
          <div className="aboutProyect__card">
            <img src={`${import.meta.env.VITE_IMG_URL}/yo.jpeg`} alt="" />
            <h2>Facundo Riñón</h2>
            <p>Montevideo, UY</p>
            <p>Full stack developer</p>
            <div className="aboutProyect__brands">
              <a
                className="no-link"
                href="https://www.linkedin.com/in/facundo-ri%C3%B1%C3%B3n-93b730220/"
                target="_blank"
              >
                <FontAwesomeIcon
                  className="aboutProyect__icon"
                  icon={faLinkedin}
                />
              </a>
              <a
                className="no-link"
                href="https://github.com/FacundoRinon"
                target="_blank"
              >
                <FontAwesomeIcon
                  className="aboutProyect__icon"
                  icon={faGithub}
                />
              </a>
              <a
                className="no-link"
                href="https://web-portfolio-facundorinon.vercel.app/"
                target="_blank"
              >
                <FontAwesomeIcon
                  className="aboutProyect__icon"
                  icon={faLaptopCode}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProyect;
