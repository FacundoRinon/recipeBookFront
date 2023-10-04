import React from "react";
import "./index.scss";
import RecipeCard from "../RecipeCard";

const Feed = () => {
  return (
    <>
      <div className="feed">
        <div className="feed__content">
          <h1>feed</h1>
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
