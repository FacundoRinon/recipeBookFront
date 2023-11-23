import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import categories from "../../assets/constants";

import "./index.scss";

const EditRecipe = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("none");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState([]);
  const [stepValue, setStepValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState([]);
  const [avatarValue, setAvatarValue] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/recipes/${id}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRecipe(response.data);
      } catch (error) {
        console.log("getRecipe - EditRecipe", error);
      }
    }
    getRecipe();
  }, []);

  useEffect(() => {
    if (recipe !== null) {
      setNameValue(recipe.name);
      setCategoryValue(recipe.category);
      setDescriptionValue(recipe.description);
      setIngredientsValue(recipe.ingredients);
      setInstructionsValue(recipe.instructions);
      setAvatarValue(recipe.avatar);
    }
  }, [recipe]);

  const handleAddIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      const newIngredient = {
        name: ingredientName,
        quantity: ingredientQuantity,
      };
      setIngredientsValue([...ingredientsValue, newIngredient]);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...ingredientsValue];
    newIngredients.splice(index, 1);
    setIngredientsValue(newIngredients);
  };

  const handleAddStep = () => {
    if (instructionsValue) {
      setInstructionsValue((prevInstructions) => [
        ...prevInstructions,
        stepValue,
      ]);
      setStepValue("");
    }
  };

  const handleDeleteStep = (index) => {
    const newInstructions = [...instructionsValue];
    newInstructions.splice(index, 1);
    setInstructionsValue(newInstructions);
  };

  const handleAvatar = (event) => {
    const image = event.target.files[0];
    setAvatarValue(image);
  };

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("description", descriptionValue);
    formData.append("category", categoryValue);
    formData.append("ingredients", JSON.stringify(ingredientsValue));
    formData.append("instructions", JSON.stringify(instructionsValue));

    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/recipes/${id}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    navigate(`/recipe/${id}`);
  }

  return (
    <>
      {recipe !== null ? (
        <div className="newRecipe">
          <form
            className="newRecipe__form"
            method="post"
            action="/recipes/"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="newRecipe__label">
              Name of the recipe
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="name"
              className="newRecipe__input"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />
            <label htmlFor="category" className="newRecipe__label">
              Select a category for your recipe
            </label>
            <select
              name="category"
              value={categoryValue}
              onChange={(event) => setCategoryValue(event.target.value)}
              id="category"
              className="newRecipe__select"
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={`${category}`}>
                    {category}
                  </option>
                );
              })}
            </select>
            <label htmlFor="description" className="newRecipe__label">
              Write a small description of the recipe
            </label>
            <textarea
              id="description"
              type="text"
              className="newRecipe__textarea"
              name="description"
              placeholder="description"
              value={descriptionValue}
              onChange={(event) => setDescriptionValue(event.target.value)}
            />
            <label htmlFor="ingredient" className="newRecipe__label">
              Define your ingredients and their quantities
            </label>
            <input
              id="ingredient"
              type="text"
              className="newRecipe__ingredient"
              name="ingredient"
              placeholder="ingredient"
              value={ingredientName}
              onChange={(event) => setIngredientName(event.target.value)}
            />
            <input
              type="text"
              className="newRecipe__ingredient"
              name="quantity"
              placeholder="quantity"
              value={ingredientQuantity}
              onChange={(event) => setIngredientQuantity(event.target.value)}
            />
            <p className="newRecipe__button" onClick={handleAddIngredient}>
              Add <FontAwesomeIcon icon={faAdd} />
            </p>
            <label htmlFor="instructions" className="newRecipe__label">
              Now describe how to prepare
            </label>
            <textarea
              id="instructions"
              type="text"
              className="newRecipe__textarea"
              name="intructions"
              placeholder="instructions"
              rows={1}
              value={stepValue}
              onChange={(event) => setStepValue(event.target.value)}
            ></textarea>
            <p className="newRecipe__button" onClick={() => handleAddStep()}>
              New step <FontAwesomeIcon icon={faAdd} />
            </p>
            <label htmlFor="avatar" className="newRecipe__label">
              Take a picture of your results
            </label>
            <button className="newRecipe__submitButton" type="submit">
              Save changes
            </button>
          </form>

          <div className="newRecipe__preview">
            <h3 className="preview__title">{nameValue}</h3>

            <div className="preview__descriptionRow">
              <div className="preview__imgSpace">
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${avatarValue}`}
                  alt=""
                  className="preview__pic"
                />
              </div>
              <div className="preview__catDes">
                <p>Category: {categoryValue}</p>

                <small>{descriptionValue}</small>
              </div>
              <div className="preview__ingredients">
                <h4>Ingredients:</h4>
                <table className="preview__table">
                  <thead>
                    <tr>
                      <th className="preview__header">Name</th>
                      <th className="preview__header">Quantity</th>
                      <th className="preview__header">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientsValue.map((ingredient, index) => (
                      <tr key={index}>
                        <td className="preview__data">{ingredient.name}</td>
                        <td className="preview__data">{ingredient.quantity}</td>
                        <td
                          className="preview__data"
                          onClick={() => handleDeleteIngredient(index)}
                        >
                          <FontAwesomeIcon
                            className="preview__icon"
                            icon={faTrash}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="preview__preparation">
                <h4>Preparation:</h4>
                {instructionsValue ? (
                  instructionsValue.map((step, index) => {
                    return (
                      <div key={index} className="preview__step">
                        <h4>
                          <FontAwesomeIcon
                            className="preview__icon"
                            onClick={() => handleDeleteStep()}
                            icon={faTrash}
                          />{" "}
                          Step {index + 1}:
                        </h4>
                        <p>{step}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>Provide a step-by-step guide for preparing your recipe.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Add Loader</h1>
      )}
    </>
  );
};

export default EditRecipe;
