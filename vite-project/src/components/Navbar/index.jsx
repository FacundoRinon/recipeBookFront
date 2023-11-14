import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignOut,
  faUser,
  faBookOpen,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { removeToken } from "../../redux/userSlice";
import { removeRecipes } from "../../redux/recipesSlice";

import "./index.scss";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const [dropActive, setDropActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(removeToken());
    dispatch(removeRecipes());
    navigate("/login");
  }

  const toggleDrop = () => {
    if (dropActive === false) {
      setDropActive(true);
    } else {
      setDropActive(false);
    }
  };

  return (
    <>
      <div className="navBar">
        <div className="navBar__brand">
          <Link className="link" to="/">
            <h3 className="navBar__name">
              Recipe Book{" "}
              <FontAwesomeIcon className="navBar__icon" icon={faBookOpen} />
            </h3>
          </Link>
        </div>
        <div className="navBar__buttons">
          <Link className="link" to="/profile">
            <p className="navBar__button">
              {user.firstname} {user.lastname}
              <FontAwesomeIcon className="navBar__icon" icon={faUser} />
            </p>
          </Link>

          <Link className="link" to="/search">
            <p className="navBar__button">
              Search
              <FontAwesomeIcon className="navBar__icon" icon={faSearch} />
            </p>
          </Link>
          <p className="navBar__button" onClick={handleLogout}>
            Log Out{" "}
            <FontAwesomeIcon className="navBar__icon" icon={faSignOut} />
          </p>
        </div>
        <div className="navBar__select">
          <button
            onClick={() => toggleDrop()}
            className="navBar__selectButton"
            name=""
            id=""
          >
            <FontAwesomeIcon className="navBar__icon" icon={faBars} />
          </button>
        </div>
      </div>
      {dropActive && (
        <div className="navBar__drop">
          <Link className="link" to="/profile">
            <p className="navbar__dropButton">
              {user.firstname} {user.lastname}
              <FontAwesomeIcon className="navBar__icon" icon={faUser} />
            </p>
          </Link>
          <Link className="link" to="/search">
            <p className="navbar__dropButton">
              Search
              <FontAwesomeIcon className="navBar__icon" icon={faSearch} />
            </p>
          </Link>

          <p onClick={handleLogout} className="navbar__dropButton">
            Log out
            <FontAwesomeIcon className="navBar__icon" icon={faSignOut} />
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
