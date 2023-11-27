import React, { useState, useEffect } from "react";

import constants from "../../assets/constants";

import "./index.scss";

const Carrousel = () => {
  const pics = constants.carrouselPics;
  const [picIndex, setPicIndex] = useState(0);

  const handleIndex = () => {
    if (picIndex < pics.length - 1) {
      setPicIndex(picIndex + 1);
    } else {
      setPicIndex(0);
    }
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pics.length);
    setPicIndex(randomIndex);
  }, []);

  return (
    <div onClick={() => handleIndex()} className="carrousel">
      <img src={pics[picIndex]} alt="" />
    </div>
  );
};

export default Carrousel;
