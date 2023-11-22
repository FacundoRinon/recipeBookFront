import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Navbar from "../../components/Navbar";
import { addRecipe } from "../../redux/recipesSlice";
import { setToken } from "../../redux/userSlice";
import categories from "../../assets/constants";

import "./index.scss";

const NewRecipe = () => {
  const user = useSelector((state) => state.user);

  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("none");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState([]);
  const [stepValue, setStepValue] = useState("");
  const [instructionsValue, setInstructionsValue] = useState([]);
  const [avatarValue, setAvatarValue] = useState(null);

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
      console.log(instructionsValue);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("description", descriptionValue);
    formData.append("category", categoryValue);
    formData.append("ingredients", JSON.stringify(ingredientsValue));
    formData.append("instructions", JSON.stringify(instructionsValue));
    formData.append("avatar", avatarValue);

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/recipes/`,
      data: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const updatedUser = {
      ...user,
      recipes: [...user.recipes, response.data.newRecipe],
    };
    dispatch(addRecipe(response.data.newRecipe));
    dispatch(setToken(updatedUser));
    navigate("/");
  }

  return (
    <>
      <Navbar />
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
            type="text"
            id="name"
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
            name=""
            value={categoryValue}
            onChange={(event) => setCategoryValue(event.target.value)}
            id="category"
            className="newRecipe__select"
          >
            {categories.map((category) => {
              return (
                <option
                  key={categories.indexOf(category)}
                  value={`${category}`}
                >
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
            Now describe how to prepare the recipe
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
          <input
            id="avatar"
            type="file"
            className="newRecipe__file"
            name="avatar"
            placeholder="avatar"
            onChange={handleAvatar}
          />
          <button className="newRecipe__submitButton" type="submit">
            Publish!!
          </button>
        </form>

        <div className="newRecipe__preview">
          {nameValue ? (
            <h3 className="preview__title">{nameValue}</h3>
          ) : (
            <h3 className="preview__title">Recipe name</h3>
          )}
          <div className="preview__descriptionRow">
            <div className="preview__imgSpace">
              <img
                src={`${import.meta.env.VITE_IMG_URL}/nullRecipeAvatar.jpg`}
                alt=""
                className="preview__pic"
              />
            </div>
            <div className="preview__catDes">
              <p>Category: {categoryValue}</p>
              {descriptionValue ? (
                <small>{descriptionValue}</small>
              ) : (
                <small>Compose a brief description of the recipe.</small>
              )}
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
                  {ingredientsValue.length > 0 ? (
                    ingredientsValue.map((ingredient, index) => (
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
                    ))
                  ) : (
                    <tr key="none">
                      <td className="preview__data">none</td>
                      <td className="preview__data">none</td>
                      <td className="preview__data"></td>
                    </tr>
                  )}
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
    </>
  );
};

export default NewRecipe;
