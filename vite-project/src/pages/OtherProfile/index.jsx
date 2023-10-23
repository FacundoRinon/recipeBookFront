import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import { toggleFollow } from "../../redux/userSlice";

import "./index.scss";

const OtherProfile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [otherUser, setOtherUser] = useState(null);

  const [renderRecipes, setRenderRecipes] = useState([]);

  const dispatch = useDispatch();

  async function getOtherProfile(event) {
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

  async function handleFollow() {
    try {
      const response = axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/user/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(toggleFollow({ user: user, follow: otherUser }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOtherProfile();
  }, [user.following]);

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
                <div className="otherProfile__follow">
                  {otherUser && user.following.includes(otherUser._id) ? (
                    <p
                      onClick={handleFollow}
                      className="otherProfile__followButton--unfollow"
                    >
                      Unfollow
                    </p>
                  ) : (
                    <p
                      onClick={handleFollow}
                      className="otherProfile__followButton--follow"
                    >
                      Follow
                    </p>
                  )}
                </div>
                <div className="otherProfile__follows">
                  <Link
                    className="link"
                    to={`/follows/${otherUser._id}?type=followers`}
                  >
                    <p>{otherUser.followers.length} followers</p>
                  </Link>
                  <Link
                    className="link"
                    to={`/follows/${user.id}?type=followers`}
                  >
                    <p>{otherUser.following.length} following</p>
                  </Link>
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