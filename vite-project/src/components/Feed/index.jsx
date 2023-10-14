import React from "react";
import "./index.scss";
import RecipeCard from "../RecipeCard";
import { useSelector } from "react-redux";

const Feed = () => {
  const recipes = useSelector((state) => state.recipes);
  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h1>New recipies</h1>
        </div>
        <div className="feed__content">
          {recipes ? (
            recipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })
          ) : (
            <p>Start following chefs to discover new recipes</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
