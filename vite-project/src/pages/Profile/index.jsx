import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cn from "classnames";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

import "./index.scss";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [renderRecipes, setRenderRecipes] = useState(user.recipes);

  return (
    <>
      <div className="profile">
        <Navbar />
        <div className="profile__userRow">
          <div className="profile__avatar">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`}
              alt=""
              className="profile__userAvatar"
            />
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
                <Link to="/editProfile" className="link">
                  <p className="profile__editProfileButton">Edit profile</p>
                </Link>
              </div>
              <div className="profile__follows">
                <Link
                  className="link"
                  to={`/follows/${user.id}?type=followers`}
                >
                  <p>{user.followers.length} followers</p>
                </Link>
                <Link
                  className="link"
                  to={`/follows/${user.id}?type=following`}
                >
                  <p>{user.following.length} following</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__userRecipes">
          <div className="profile__header">
            <h3
              className={cn("profile__headerButton", {
                "profile__headerButton--active": renderRecipes === user.recipes,
              })}
              onClick={() => setRenderRecipes(user.recipes)}
            >
              Your recipies
            </h3>
            <h3
              className={cn("profile__headerButton", {
                "profile__headerButton--active":
                  renderRecipes === user.cookingBook,
              })}
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
