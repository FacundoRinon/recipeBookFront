import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.scss";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/user/`,
      data: {
        firstname: firstnameValue,
        lastname: lastnameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        password2: password2Value,
      },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    }
  }

  return (
    <>
      <div className="signUp">
        <p className="signUp__message">
          Register and start sharing your recipes
        </p>
        <div className="signUp__space">
          <div className="signUp__form">
            <form id="form" method="post" action="/" onSubmit={handleSubmit}>
              <input
                id="firstname"
                type="text"
                className="form__input"
                placeholder="First name"
                name="firstname"
                value={firstnameValue}
                onChange={(event) => setFirstnameValue(event.target.value)}
              />
              <input
                id="lastname"
                type="text"
                className="form__input"
                placeholder="Last name"
                name="lastname"
                value={lastnameValue}
                onChange={(event) => setLastnameValue(event.target.value)}
              />
              <input
                id="e-mail"
                type="text"
                className="form__input"
                placeholder="e-mail"
                name="e-mail"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
              />
              <input
                id="username"
                type="text"
                className="form__input"
                placeholder="Username"
                name="username"
                value={usernameValue}
                onChange={(event) => setUsernameValue(event.target.value)}
              />
              <input
                id="password"
                type="password"
                className="form__input"
                placeholder="password"
                name="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
              />
              <input
                id="password2"
                type="password"
                className="form__input"
                placeholder="password2"
                name="password2"
                value={password2Value}
                onChange={(event) => setPassword2Value(event.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
          <div className="signUp__carousell">
            <p>Hello madafakeeeeeers</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
