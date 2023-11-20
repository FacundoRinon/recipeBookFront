import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../components/Navbar";
import FollowRow from "../../components/FollowRow";

import "./index.scss";

const Follows = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [show, setShow] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const type = queryParams.type;

  async function getOtherProfile(event) {
    const response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setProfile(response.data);
  }

  useEffect(() => {
    setShow(type);
    getOtherProfile();
  }, []);

  useEffect(() => {
    getOtherProfile();
  }, [show]);

  return (
    <>
      <Navbar />
      {profile && (
        <div className="follows">
          <div className="follows__userRow">
            <p className="follows__userRowBack">
              <FontAwesomeIcon
                onClick={() => navigate(-1)}
                className="follows__icon"
                icon={faUndo}
              />
            </p>
            <h2 className="follows__userRowName">
              {profile.firstname} {profile.lastname}
            </h2>
          </div>
          <div className="follows__followsButtons">
            {show === "following" ? (
              <p className="follows__button--active">Following</p>
            ) : (
              <p
                className="follows__button--inactive"
                onClick={() => setShow("following")}
              >
                Following
              </p>
            )}
            {show === "followers" ? (
              <p className="follows__button--active">Followers</p>
            ) : (
              <p
                className="follows__button--inactive"
                onClick={() => setShow("followers")}
              >
                Followers
              </p>
            )}
          </div>
          <div className="follows__follows">
            {show === "following" &&
              profile.following.map((person) => {
                return <FollowRow key={person._id} follow={person} />;
              })}
            {show === "followers" &&
              profile.followers.map((person) => {
                return <FollowRow key={person._id} follow={person} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Follows;
