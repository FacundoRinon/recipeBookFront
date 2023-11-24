import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import AboutProyectButton from "../AboutProyectButton";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <AboutProyectButton />
      <Outlet />
    </div>
  );
};

export default Layout;
