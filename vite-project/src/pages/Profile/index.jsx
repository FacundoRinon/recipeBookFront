import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import { useSelector } from "react-redux";
import { render } from "react-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [renderRecipes, setRenderRecipes] = useState(user.recipes);

  return (
    <>
      <div className="profile">
        <Navbar />
        <div className="profile__userRow">
          <div className="profile__avatar">
            <img src={user.avatar} alt="" className="profile__userAvatar" />
          </div>

          <div className="profile__data">
            <div className="profile__userInfo">
              <h1>
                {user.firstname} {user.lastname}
              </h1>
              <p>@{user.username}</p>
            </div>
            <div className="profile__bottomRow">
              <div className="profile__createRecipe">
                <Link to="/newRecipe" className="link">
                  <p className="profile__createRecipeButton">Add new recipe</p>
                </Link>
              </div>
              <div className="profile__follows">
                <p>{user.followers.length} followers</p>
                <p>{user.following.length} following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__userRecipes">
          <div className="profile__header">
            <h3
              className="profile__headerButton"
              onClick={() => setRenderRecipes(user.recipes)}
            >
              Your recipies
            </h3>
            <h3
              className="profile__headerButton"
              onClick={() => setRenderRecipes(user.cookingBook)}
            >
              Cooking book
            </h3>
          </div>
          <div className="profile__recipies">
            {renderRecipes ? (
              renderRecipes.map((recipe) => {
                return <RecipeCard key={recipe.id} recipe={recipe} />;
              })
            ) : (
              <p>There is no recipes</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
