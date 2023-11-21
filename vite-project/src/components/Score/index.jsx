import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const Score = ({ setScore }) => {
  const [isHovered, setIsHovered] = useState(0);

  const handleMouseEnter = (starNumber) => () => {
    setIsHovered(starNumber);
  };

  return (
    <>
      <div className="score">
        <FontAwesomeIcon
          className="score__icon"
          onMouseEnter={handleMouseEnter(1)}
          onClick={() => setScore(1)}
          icon={isHovered >= 1 ? solidStar : regularStar}
        />
        <FontAwesomeIcon
          className="score__icon"
          onMouseEnter={handleMouseEnter(2)}
          onClick={() => setScore(2)}
          icon={isHovered >= 2 ? solidStar : regularStar}
        />
        <FontAwesomeIcon
          className="score__icon"
          onMouseEnter={handleMouseEnter(3)}
          onClick={() => setScore(3)}
          icon={isHovered >= 3 ? solidStar : regularStar}
        />
        <FontAwesomeIcon
          className="score__icon"
          onMouseEnter={handleMouseEnter(4)}
          onClick={() => setScore(4)}
          icon={isHovered >= 4 ? solidStar : regularStar}
        />
        <FontAwesomeIcon
          className="score__icon"
          onMouseEnter={handleMouseEnter(5)}
          onClick={() => setScore(5)}
          icon={isHovered === 5 ? solidStar : regularStar}
        />
      </div>
    </>
  );
};

export default Score;
