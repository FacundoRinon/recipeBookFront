import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="profile">
        <Navbar />
        <div className="profile__userRow">
          <div className="profile__avatar">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQHRpriPsqXNyw/profile-displayphoto-shrink_800_800/0/1674105280991?e=2147483647&v=beta&t=1HHq56exp6ajnbwS8rIVQBcxz-kie53VfW5WpfZcOW0"
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
            <h3 className="profile__headerButton">Your recipies</h3>
            <h3 className="profile__headerButton">Cooking book</h3>
          </div>
          <div className="profile__recipies">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
