import React, { useEffect, useState } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const RecipePage = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.log("getRecipe - RecipePage", error);
      }
    };
    getRecipe();
  }, []);

  //   console.log(recipe.ingredients);

  return (
    <>
      <div className="recipePage">
        <Navbar />
        {recipe ? (
          <div className="recipePage__container">
            <div className="recipePage__header">
              <h2>{recipe.name}</h2>
              <p>Writer: {recipe.author}</p>
              <small>Date: {recipe.createdAt}</small>
            </div>
            <div className="recipePage__PicAndDesc">
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${recipe.avatar}`}
                alt=""
                className="recipePage__Pic"
              />
              <div className="recipe__catAndDesc">
                <p>Category: {recipe.category}</p>
                <p>Description:</p>
                <small>{recipe.description}</small>
              </div>
            </div>
            <div className="recipePage__ingredientsRow">
              <p>Ingredients:</p>
              <table className="recipePage__table">
                <thead>
                  <tr>
                    <th className="recipePage__tableHeader">Name</th>
                    <th className="recipePage__tableHeader">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map((ingredient) => {
                    return (
                      <tr key={ingredient.name}>
                        <td className="recipePage__tableData">
                          {ingredient.name}
                        </td>
                        <td className="recipePage__tableData">
                          {ingredient.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="recipePage__instructionsRow">
              <p>Instructions:</p>
              <small>{recipe.instructions}</small>
            </div>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </>
  );
};

export default RecipePage;
