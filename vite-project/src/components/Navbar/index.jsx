import React from "react";
import "./index.scss";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../redux/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(removeToken());
    navigate("/login");
  }

  return (
    <>
      <div className="navBar">
        <div className="navBar__brand">
          <h3 className="navBar__name">Recipe Book</h3>
        </div>
        <div className="navBar__buttons">
          <p className="navBar__button">
            {user.firstname} {user.lastname}
          </p>
          <p className="navBar__button" onClick={handleLogout}>
            Cerrar Sesion
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
