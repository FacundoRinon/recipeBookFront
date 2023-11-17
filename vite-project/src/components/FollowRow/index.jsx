import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { toggleFollow } from "../../redux/userSlice";

import "./index.scss";

const FollowRow = ({ follow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(user.following.includes(follow._id));
  }, [user]);

  async function handleFollow() {
    const url = follow._id;
    try {
      const response = axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/user/${url}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(toggleFollow({ follow: follow._id }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="followRow">
        <div className="followRow__avatarRow">
          {follow.avatar.includes("http") ? (
            <img src={follow.avatar} alt="" className="followRow__avatar" />
          ) : (
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${follow.avatar}`}
              alt=""
              className="followRow__avatar"
            />
          )}
        </div>
        <div className="followRow__user">
          <div className="followRow__usernames">
            <Link className="link" to={`/user/${follow._id}`}>
              <h2 className="followRow__username">
                {follow.firstname} {follow.lastname}
              </h2>
            </Link>
            <small className="followRow__username">@{follow.username}</small>
          </div>
          <div className="followRow__userRecipies">
            <small className="followRow__userRecipie">
              {follow.recipes.length > 0 ? (
                <p>{follow.recipes.length} recipies</p>
              ) : (
                <p>No recipes</p>
              )}
            </small>
          </div>
        </div>
        {follow._id !== user.id &&
          (isFollowing ? (
            <div onClick={handleFollow} className="followRow__button">
              <p>unfollow</p>
            </div>
          ) : (
            <div onClick={handleFollow} className="followRow__button">
              <p>follow</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FollowRow;
