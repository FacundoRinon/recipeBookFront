import React from "react";
import "./index.scss";
import RecipeCard from "../RecipeCard";

const Feed = () => {
  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h1>New recipies</h1>
        </div>
        <div className="feed__content">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </>
  );
};

export default Feed;
