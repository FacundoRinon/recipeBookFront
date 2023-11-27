import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setToken } from "../../redux/userSlice";

import "./index.scss";

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [avatarValue, setAvatarValue] = useState(null);

  useEffect(() => {
    setFirstnameValue(user && user.firstname);
    setLastnameValue(user && user.lastname);
    setUsernameValue(user && user.username);
  }, [user]);

  const handleAvatar = (event) => {
    const image = event.target.files[0];
    setAvatarValue(image);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstnameValue);
    formData.append("lastname", lastnameValue);
    formData.append("username", usernameValue);
    formData.append("avatar", avatarValue);

    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}user`,
      data: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data === "ExistingUsername") {
      toast.error(`Username already exist`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    } else {
      const updatedUser = {
        ...user,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        username: response.data.username,
        avatar: response.data.avatar,
      };
      dispatch(setToken(updatedUser));
      navigate("/profile");
    }
  }

  return (
    <>
      <div className="editProfile">
        <div className="editProfile__container">
          <div className="editProfile__userRow">
            <div className="editProfile__userAvatar">
              <img
                className="editProfile__avatar"
                src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`}
                alt=""
              />
            </div>
            {user ? (
              <div className="editProfile__userData">
                <h2 className="editProfile__userProp">
                  {firstnameValue} {lastnameValue}
                </h2>
                <p className="editProfile__userProp">@{usernameValue}</p>
              </div>
            ) : (
              <div className="editProfile__userData">
                <h2 className="editProfile__userProp">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="editProfile__userProp">@{user.username}</p>
              </div>
            )}
          </div>
          <form className="editProfile__form" onSubmit={handleSubmit} action="">
            <div className="editProfile__formRow">
              <label className="editProfile__formLabel" htmlFor="firstname">
                Firstname:
              </label>
              <input
                id="firstname"
                name="firstname"
                className="editProfile__formInput"
                type="text"
                placeholder="firstname"
                value={firstnameValue}
                onChange={(event) => setFirstnameValue(event.target.value)}
              />
            </div>
            <div className="editProfile__formRow">
              <label className="editProfile__formLabel" htmlFor="lastname">
                Lastname:
              </label>
              <input
                id="lastname"
                name="lastname"
                className="editProfile__formInput"
                type="text"
                placeholder="lastname"
                value={lastnameValue}
                onChange={(event) => setLastnameValue(event.target.value)}
              />
            </div>
            <div className="editProfile__formRow">
              <label className="editProfile__formLabel" htmlFor="username">
                Username:
              </label>
              <input
                id="username"
                name="username"
                className="editProfile__formInput"
                type="text"
                placeholder="username"
                value={usernameValue}
                onChange={(event) => setUsernameValue(event.target.value)}
              />
            </div>
            <div className="editProfile__formRow">
              <label className="editProfile__formLabel" htmlFor="avatar">
                Avatar:
              </label>
              <input
                className="editProfile__formInput"
                type="file"
                id="avatar"
                onChange={handleAvatar}
              />
            </div>
            <div className="editProfile__formButtonRow">
              <button className="editProfile__formButton">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
