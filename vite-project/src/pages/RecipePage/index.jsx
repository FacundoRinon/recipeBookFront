import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { removeRecipe } from "../../redux/userSlice";

import "./index.scss";

const RecipePage = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [averageScore, setAverageScore] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const calculateAverageScore = () => {
      if (recipe && recipe.score.length > 0) {
        const totalScore = recipe.score.reduce(
          (sum, score) => sum + score.score,
          0
        );
        const avgScore = totalScore / recipe.score.length;
        setAverageScore(avgScore);
      } else {
        setAverageScore(0);
      }
    };

    calculateAverageScore();
  }, [recipe]);

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
  }, [recipe]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(removeRecipe({ user: user, recipe: recipe }));
      navigate("/");
    } catch (error) {
      console.log("RecipePage - handleDelete", error);
    }
  };

  return (
    <>
      <div className="recipePage">
        <Navbar />
        <Modal
          text={"Are you sure you want to delete this recipe?"}
          recipe={recipe}
          handle={handleDelete}
          isModalVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <Modal
          text={"Score this recipe"}
          child={true}
          recipe={recipe}
          isModalVisible={isModal2Visible}
          onClose={() => setIsModal2Visible(false)}
          id={id}
          setRecipe={setRecipe}
        />
        {recipe ? (
          <div className="recipePage__container">
            <div className="recipePage__header">
              <h2>{recipe.name}</h2>
              <p>
                Writer: {recipe.author.firstname} {recipe.author.lastname}
              </p>
              <small>
                Date:{" "}
                {format(new Date(recipe.createdAt), "PPpp", {
                  locale: enUS,
                })}
              </small>
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
            <div className="recipePage__buttons">
              {recipe.score.length > 0 ? (
                <p>
                  Average Score: {averageScore.toFixed(2)} (
                  {recipe.score.length} votes)
                </p>
              ) : (
                <p>Score: 0 ({recipe.score.length} votes)</p>
              )}
              <button
                onClick={() => setIsModal2Visible(true)}
                className="recipePage__button--score"
              >
                Score
              </button>
            </div>
            {user.id === recipe.author._id && (
              <div className="recipePage__buttons">
                {/* <button
                  onClick={() => navigate(`/recipe/edit/${recipe.id}`)}
                  className="recipePage__button--edit"
                >
                  Edit recipe
                </button> */}
                {/* ME FALTA ARREGLAR EL EDIT DE LAS RECETAS */}
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="recipePage__button--delete"
                >
                  Delete recipe
                </button>
              </div>
            )}
          </div>
        ) : (
          <h2 className="recipePage__loader">Loading</h2>
        )}
      </div>
    </>
  );
};

export default RecipePage;
