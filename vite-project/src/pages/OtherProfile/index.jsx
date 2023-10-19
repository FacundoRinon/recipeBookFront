import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

import "./index.scss";

const OtherProfile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [otherUser, setOtherUser] = useState(null);

  const [renderRecipes, setRenderRecipes] = useState([]);

  async function getOtherProfile(event) {
    // event.preventDefault();
    const response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setOtherUser(response.data);
    setRenderRecipes(response.data.recipes);
  }

  useEffect(() => {
    getOtherProfile();
  }, []);

  return (
    <>
      {otherUser ? (
        <div className="otherProfile">
          <Navbar />
          <div className="otherProfile__userRow">
            <div className="otherProfile__avatar">
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${otherUser.avatar}`}
                alt=""
                className="otherProfile__userAvatar"
              />
            </div>

            <div className="otherProfile__data">
              <div className="otherProfile__userInfo">
                <h1>
                  {otherUser.firstname} {otherUser.lastname}
                </h1>
                <p>@{otherUser.username}</p>
              </div>
              <div className="otherProfile__bottomRow">
                <div className="otherProfile__createRecipe">
                  <Link to="/newRecipe" className="link">
                    <p className="otherProfile__createRecipeButton">Follow</p>
                  </Link>
                </div>
                <div className="otherProfile__follows">
                  <p>{otherUser.followers.length} followers</p>
                  <p>{otherUser.following.length} following</p>
                </div>
              </div>
            </div>
          </div>
          <div className="otherProfile__userRecipes">
            <div className="otherProfile__header">
              <h3
                className="otherProfile__headerButton"
                onClick={() => setRenderRecipes(otherUser.recipes)}
              >
                Your recipies
              </h3>
              <h3
                className="otherProfile__headerButton"
                onClick={() => setRenderRecipes(otherUser.cookingBook)}
              >
                Cooking book
              </h3>
            </div>
            <div className="otherProfile__recipies">
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
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default OtherProfile;
