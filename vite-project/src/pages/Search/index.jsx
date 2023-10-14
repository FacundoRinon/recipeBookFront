import "./index.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FollowRow from "../../components/FollowRow";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = () => {
  const user = useSelector((state) => state.user);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <>
      <Navbar />
      <div className="search">
        <div className="search__searcherRow">
          <h1 className="search__header">Search</h1>
          <img src={user.avatar} alt="" className="search__userAvatar" />
          <input
            type="text"
            className="search__searcher"
            name="search"
            placeholder="Find by name or username"
            username={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="search__results">
          {searchedUsers ? (
            searchedUsers.map((searchUser) => {
              return <FollowRow key={searchUser._id} follow={searchUser} />;
            })
          ) : (
            <p>Comienza a buscar chefs</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
