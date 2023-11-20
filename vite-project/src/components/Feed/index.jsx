import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import RecipeCard from "../RecipeCard";

import "./index.scss";

const Feed = () => {
  const recipes = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h1 className="feed__feed">Feed</h1>
        </div>
        <div className="feed__content">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })
          ) : (
            <div className="feed__emptyMessageContainer">
              <p>Start following chefs to discover new recipes</p>
              <button onClick={() => navigate("/search")}>Discover</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
