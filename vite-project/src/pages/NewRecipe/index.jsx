import React, { useState } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";

const NewRecipe = () => {
  const categorys = ["Burguer", "Salad", "Pizza", "Chicken", "Sushi", "Rice"];

  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("none");
  const [ingredientsValue, setIngredientsValue] = useState([]);
  const [instructionsValue, setInstructionsValue] = useState("");
  const [avatarValue, setAvatarValue] = useState(null);

  console.log(nameValue);
  console.log(categoryValue);
  console.log(descriptionValue);
  console.log(ingredientsValue);
  console.log(instructionsValue);

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
            className="newRecipe__input"
            name="ingredients"
            placeholder="ingredients"
            value={ingredientsValue}
            onChange={(event) => setIngredientsValue(event.target.value)}
          />
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
          <p>Aca va a estar el preview</p>
        </div>
      </div>
    </>
  );
};

export default NewRecipe;
