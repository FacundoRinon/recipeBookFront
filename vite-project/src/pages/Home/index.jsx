import React from "react";
import "./index.scss";
import Navbar from "../../components/Navbar/Index";
import Feed from "../../components/Feed";

function Home() {
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
