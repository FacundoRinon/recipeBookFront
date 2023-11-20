import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import axios from "axios";

import FollowRow from "../../components/FollowRow";
import RecipeCard from "../../components/RecipeCard";
import Navbar from "../../components/Navbar";
import categories from "../../assets/constants";

import "./index.scss";

const Search = () => {
  const user = useSelector((state) => state.user);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("users");
  const [categoryValue, setCategoryValue] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const filteredUsers = response.data.users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchedUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [searchValue]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${
            import.meta.env.VITE_API_URL
          }/recipes/search/${categoryValue}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setSearchedRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, [categoryValue]);

  return (
    <>
      <Navbar />
      <div className="search">
        <div className="search__searcherRow">
          <img
            src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`}
            alt=""
            className="search__userAvatar"
          />
          {searchType === "users" ? (
            <input
              type="text"
              className="search__searcher"
              name="search"
              placeholder="Find by name or username"
              username={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          ) : (
            <select
              name=""
              value={categoryValue}
              onChange={(event) => setCategoryValue(event.target.value)}
              id=""
              className="newRecipe__select"
            >
              {categories.map((category) => {
                return (
                  <option
                    key={categories.indexOf(category)}
                    value={`${category}`}
                  >
                    {category}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="search__type">
          <button
            className={cn("search__typeButton", {
              "search__typeButton--active": searchType === "users",
            })}
            onClick={() => setSearchType("users")}
          >
            Users
          </button>
          <button
            className={cn("search__typeButton", {
              "search__typeButton--active": searchType === "recipes",
            })}
            onClick={() => setSearchType("recipes")}
          >
            Recipes
          </button>
        </div>
        {searchType === "users" ? (
          <div className="search__results">
            {searchedUsers ? (
              searchedUsers.map((searchUser) => {
                return <FollowRow key={searchUser._id} follow={searchUser} />;
              })
            ) : (
              <p>Find other chefs</p>
            )}
          </div>
        ) : (
          <div className="search__recipeResults">
            {searchedRecipes ? (
              searchedRecipes.map((searchRecipe) => {
                return (
                  <RecipeCard key={searchRecipe.id} recipe={searchRecipe} />
                );
              })
            ) : (
              <p className="search__empty">Look for new recipes</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
