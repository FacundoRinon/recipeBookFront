import React, { useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import Feed from "../../components/Feed";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../redux/recipesSlice";

function Home() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const homeRecipes = response.data.recipes.filter(
        (recipe) =>
          user.following.includes(recipe.author._id) ||
          user.id === recipe.author._id
      );
      dispatch(setRecipes(homeRecipes));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <div className="home">
        <Navbar />
        <Feed />
      </div>
    </>
  );
}

export default Home;
