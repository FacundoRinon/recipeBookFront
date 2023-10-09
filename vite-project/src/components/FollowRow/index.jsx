import React from "react";
import "./index.scss";

const FollowRow = ({ user }) => {
  console.log(user.recipes);

  return (
    <>
      <div className="followRow">
        <div className="followRow__avatarRow">
          <img src={user.avatar} alt="" className="followRow__avatar" />
        </div>
        <div className="followRow__user">
          <div className="followRow__usernames">
            <h2 className="followRow__username">
              {user.firstname} {user.lastname}
            </h2>
            <small className="followRow__username">@{user.username}</small>
          </div>
          <div className="followRow__userRecipies">
            <small className="followRow__userRecipie">
              {user.recipes.length > 0 ? (
                <p>{user.recipes.length} recipies</p>
              ) : (
                <p>No recipes</p>
              )}
            </small>
          </div>
        </div>
        <div className="followRow__button">
          <p>follow</p>
        </div>
      </div>
    </>
  );
};

export default FollowRow;
