import React, { useState } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";

const NewRecipe = () => {
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

  return (
    <>
      <Navbar />
      <div className="newRecipe">
        <div className="newRecipe__form">
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
          />
        </div>
        <div className="newRecipe__preview">
          {nameValue ? (
            <h3 className="preview__title">{nameValue}</h3>
          ) : (
            <h3 className="preview__title">Recipe name</h3>
          )}
          <div className="preview__descriptionRow">
            <div className="preview__imgSpace">
              <img
                src="https://media.licdn.com/dms/image/D4D03AQHRpriPsqXNyw/profile-displayphoto-shrink_800_800/0/1674105280991?e=2147483647&v=beta&t=1HHq56exp6ajnbwS8rIVQBcxz-kie53VfW5WpfZcOW0"
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
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientsValue.length > 0 ? (
                    ingredientsValue.map((ingredient, index) => (
                      <tr key={index}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key="none">
                      <td>none</td>
                      <td>none</td>
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
