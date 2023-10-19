import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../../components/Navbar";
import { addRecipe } from "../../redux/recipesSlice";

import "./index.scss";
import { setToken } from "../../redux/userSlice";

const NewRecipe = () => {
  const user = useSelector((state) => state.user);

  const categorys = [
    "None",
    "Burguer",
    "Salad",
    "Pizza",
    "Chicken",
    "Sushi",
    "Rice",
    "Other",
  ];

  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("none");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState([]);
  const [instructionsValue, setInstructionsValue] = useState("");
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
    formData.append("instructions", instructionsValue);
    formData.append("avatar", avatarValue);
    // Cuando pase el avatar capaz tengo que usar esto y mandar todo como content-type

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
          <label htmlFor="" className="newRecipe__label">
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
          <label htmlFor="" className="newRecipe__label">
            Select a category for your recipe
          </label>
          <select
            name=""
            value={categoryValue}
            onChange={(event) => setCategoryValue(event.target.value)}
            id=""
            className="newRecipe__select"
          >
            {categorys.map((category) => {
              return (
                <option key={categorys.indexOf(category)} value={`${category}`}>
                  {category}
                </option>
              );
            })}
          </select>
          <label htmlFor="" className="newRecipe__label">
            Write a small description of the recipe
          </label>
          <textarea
            type="text"
            className="newRecipe__textarea"
            name="description"
            placeholder="description"
            value={descriptionValue}
            onChange={(event) => setDescriptionValue(event.target.value)}
          />
          <label htmlFor="" className="newRecipe__label">
            Define your ingredients and their quantities
          </label>
          <input
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
          <button
            type="button"
            className="newRecipe__button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
          <label htmlFor="" className="newRecipe__label">
            Now describe how to prepare
          </label>
          <textarea
            type="text"
            className="newRecipe__textarea"
            name="intructions"
            placeholder="instructions"
            rows={20}
            value={instructionsValue}
            onChange={(event) => setInstructionsValue(event.target.value)}
          ></textarea>
          <label htmlFor="" className="newRecipe__label">
            Take a picture of your results
          </label>
          <input
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
                  </tr>
                </thead>
                <tbody>
                  {ingredientsValue.length > 0 ? (
                    ingredientsValue.map((ingredient, index) => (
                      <tr key={index}>
                        <td className="preview__data">{ingredient.name}</td>
                        <td className="preview__data">{ingredient.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key="none">
                      <td className="preview__data">none</td>
                      <td className="preview__data">none</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="preview__preparation">
              <h4>Preparation:</h4>
              {instructionsValue ? (
                <p>{instructionsValue}</p>
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
