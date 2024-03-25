import { Outlet } from "react-router-dom";
import Footer from "../Components/UI/Footer";
import Navbar from "../Components/UI/Navbar";
import React from "react";

const Applayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Applayout;

