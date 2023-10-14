import React from "react";
import "./index.scss";

import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../redux/userSlice";
import { removeRecipes } from "../../redux/recipesSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(removeToken());
    dispatch(removeRecipes());
    navigate("/login");
  }

  return (
    <>
      <div className="navBar">
        <div className="navBar__brand">
          <Link to="/">
            <h3 className="navBar__name">Recipe Book</h3>
          </Link>
        </div>
        <div className="navBar__buttons">
          <Link to="/profile">
            <p className="navBar__button">
              {user.firstname} {user.lastname}
            </p>
          </Link>
          <Link to="/search">
            <p className="navBar__button">Buscar</p>
          </Link>
          <p className="navBar__button" onClick={handleLogout}>
            Cerrar Sesion
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
