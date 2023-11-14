import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { toggleRecipeBook } from "../../redux/userSlice";

import "./index.scss";

const RecipeCard = ({ recipe }) => {
  const user = useSelector((state) => state.user);
  const url = recipe.id;
  const dispatch = useDispatch();

  const recipeExistsInCookingBook = user.cookingBook.some(
    (bookRecipe) => bookRecipe.id === recipe.id
  );

  const addToBook = async () => {
    try {
      const response = axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/user/book/${url}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(toggleRecipeBook({ user: user, recipe: recipe }));
    } catch (error) {
      console.log("Error in addToBook - RecipeCard");
    }
  };

  return (
    <>
      <div className="recipeCard">
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
              <p>{recipe.name}</p>
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
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
