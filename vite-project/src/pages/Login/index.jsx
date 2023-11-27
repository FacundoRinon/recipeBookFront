import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Carrousel from "../../components/Carrousel";

import "./index.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/user/login`,
      data: { username: usernameValue, password: passwordValue },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    } else {
      toast.error(`${response.data}`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  }

  async function handleInvited() {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/user/login`,
      data: { username: "Invited", password: "1234" },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    }
  }

  return (
    <>
      <div className="login">
        <ToastContainer />
        <div className="login__space">
          <div className="login__form">
            <p className="login__message">Welcome !!</p>
            <form id="form" method="post" action="/" onSubmit={handleSubmit}>
              <input
                id="username"
                type="text"
                className="form__input"
                placeholder="Username or email"
                name="username"
                autoComplete="name"
                value={usernameValue}
                onChange={(event) => setUsernameValue(event.target.value)}
              />
              <input
                id="password"
                type="password"
                className="form__input"
                placeholder="Password"
                name="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
              />

              <button type="submit" className="login__button">
                Login
              </button>
            </form>
            <div className="login__invitedRow">
              <button
                onClick={() => handleInvited()}
                className="login__button--invited"
              >
                Login as invited
              </button>
            </div>

            <p>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
          <div className="login__carousell">
            <Carrousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
