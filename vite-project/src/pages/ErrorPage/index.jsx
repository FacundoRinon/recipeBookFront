import React from "react";

import { useNavigate } from "react-router";

import "./index.scss";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <div className="errorPage__container">
        <img src={`${import.meta.env.VITE_IMG_URL}/404.png`} alt="" />
        {message === "noUser" && <h2>User not found</h2>}
        {message === "noRecipe" && <h2>Recipe not found</h2>}
        {message === "notAllowed" && <h2>You are not allowed to do this</h2>}
        <p className="errorPage__button" onClick={() => navigate(-1)}>
          Go back
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
