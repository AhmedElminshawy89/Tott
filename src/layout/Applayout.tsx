import { Outlet } from "react-router-dom";
import { lazy } from "react";
// import Footer from "../Components/UI/Footer";
const Navbar = lazy(() => import("../Components/UI/Navbar"));
const Applayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default Applayout;
