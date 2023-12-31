import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import { toggleRecipeBook } from "../../redux/userSlice";

import "./index.scss";

const RecipeCard = ({ recipe }) => {
  const user = useSelector((state) => state.user);
  const url = recipe.id;
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();

  const recipeExistsInCookingBook = user.cookingBook.some(
    (bookRecipe) => bookRecipe.id === recipe.id
  );

  const addToBook = async () => {
    try {
      const response = axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}user/book/${url}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(toggleRecipeBook({ user: user, recipe: recipe }));
      if (user.cookingBook.some((bookRecipe) => bookRecipe.id === recipe.id)) {
        toast.error(
          `${recipe.name} recipe from ${recipe.author.firstname} ${recipe.author.lastname} was removed from your book!`,
          {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            theme: "dark",
          }
        );
      } else {
        toast.success(
          `${recipe.name} recipe from ${recipe.author.firstname} ${recipe.author.lastname} added to your book!`,
          {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            theme: "dark",
          }
        );
      }
    } catch (error) {
      console.log("Error in addToBook - RecipeCard");
    }
  };

  useEffect(() => {
    const calculateAverageScore = () => {
      if (recipe && recipe.score.length > 0) {
        const totalScore = recipe.score.reduce(
          (sum, score) => sum + score.score,
          0
        );
        const avgScore = totalScore / recipe.score.length;
        setScore(avgScore);
      } else {
        setScore(0);
      }
    };

    calculateAverageScore();
  }, []);

  return (
    <>
      <div className="recipeCard">
        <ToastContainer />
        <div className="recipeCard__userRow">
          <div className="recipeCard__picSpace">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${recipe.author.avatar}`}
              alt=""
              className="recipeCard__userImg"
            />
          </div>
          <div className="recipeCard__userData">
            <Link className="link" to={`/user/${recipe.author._id}`}>
              <h2>
                {recipe.author.firstname} {recipe.author.lastname}
              </h2>
            </Link>
            <p>
              {format(new Date(recipe.createdAt), "PPpp", {
                locale: enUS,
              })}
            </p>
          </div>
        </div>
        <Link className="link" to={`/recipe/${url}`}>
          <div className="recipeCard__contentRow">
            <div className="recipeCard__description">
              <h3>{recipe.name}</h3>
              <small>{recipe.description}</small>
            </div>
            <div className="recipeCard__recipePicSpace">
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${recipe.avatar}`}
                alt=""
                className="recipeCard__recipeImg"
              />
            </div>
          </div>
        </Link>
        <div className="recipeCard__footerRow">
          {recipeExistsInCookingBook ? (
            <button onClick={addToBook} className="recipeCard__button">
              Remove from cooking book
            </button>
          ) : (
            <button onClick={addToBook} className="recipeCard__button">
              Add to cooking book
            </button>
          )}
          <p>
            {score.toFixed(2)} of 5{" "}
            <FontAwesomeIcon className="recipeCard__icon" icon={solidStar} /> (
            {recipe.score.length} votes)
          </p>
        </div>
      </div>
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
