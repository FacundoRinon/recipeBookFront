import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import axios from "axios";

import FollowRow from "../../components/FollowRow";
import RecipeCard from "../../components/RecipeCard";
import Spinner from "../../components/Spinner";
import categories from "../../assets/constants";

import "./index.scss";

const Search = () => {
  const user = useSelector((state) => state.user);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("users");

  const [categoryValue, setCategoryValue] = useState();
  const [scoreValue, setScoreValue] = useState(0);
  const [votesValue, setVotesValue] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}user`,
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
          }recipes/search/${categoryValue}/${scoreValue}/${votesValue}`,
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
  }, [categoryValue, scoreValue, votesValue]);

  return (
    <>
      <div className="search">
        <div className="search__searcherRow">
          <div className="search__imgSpace">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`}
              alt=""
              className="search__userAvatar"
            />
          </div>
          {searchType === "users" ? (
            <div className="search__inputs">
              <input
                type="text"
                className="search__searcher"
                name="search"
                placeholder="Find by name or username"
                username={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          ) : (
            <div className="search__inputs">
              <label htmlFor="category" className="search__label">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={categoryValue}
                onChange={(event) => setCategoryValue(event.target.value)}
                className="search__select"
              >
                {categories.categories.map((category, index) => {
                  return (
                    <option key={index} value={`${category}`}>
                      {category}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="score" className="search__label">
                Score:
              </label>
              <select
                id="score"
                name="score"
                value={scoreValue}
                onChange={(event) => setScoreValue(event.target.value)}
                className="search__select"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <label htmlFor="votes" className="search__label">
                Votes:
              </label>
              <select
                id="votes"
                name="votes"
                value={votesValue}
                onChange={(event) => setVotesValue(event.target.value)}
                className="search__select"
              >
                <option key={1} value={0}>
                  All
                </option>
                <option key={10} value={10}>
                  +10 votes
                </option>
                <option key={100} value={100}>
                  +100 votes
                </option>
                <option key={1000} value={1000}>
                  +1000 votes
                </option>
              </select>
            </div>
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
              <div className="search__spinner">
                <Spinner />
              </div>
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
              <div className="search__spinner">
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
