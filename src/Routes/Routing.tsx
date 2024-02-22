import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Applayout from "../layout/Applayout";
import { Spinner } from "@chakra-ui/react";

const HomePage = lazy(() => import("../Pages/HomePage"));
const Registration = lazy(() => import("../Pages/Regestration"));
const Cities = lazy(() => import("../Pages/Cities"));
const TripsMaster = lazy(() => import("../Pages/TripsMaster"));
const Account = lazy(() => import("../Pages/Account/AccountLayout"));
const PersonalInf = lazy(() => import("../Pages/Account/PersonalInf"));
const Plans = lazy(() => import("../Pages/Account/Plans"));
const Favourites = lazy(() => import("../Pages/Account/Favourites"));
const Aboutus = lazy(() => import("../Pages/Account/Aboutus"));

const Routing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
    >
      <Suspense fallback={<Spinner className=" fixed top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>}>
        <Routes>
          <Route path="/" element={<Applayout />}>
            <Route index element={<HomePage />} />
            <Route path="/TripsMaster" element={<TripsMaster />} />
            <Route path="/cities" element={<Cities />} />
          </Route>
          <Route path="/account" element={<Account />}>
            <Route index element={<PersonalInf />} />
            <Route path="MyPersonalInfo" element={<PersonalInf />} />
            <Route path="Plans" element={<Plans />} />
            <Route path="Favourites" element={<Favourites />} />
            <Route path="Aboutus" element={<Aboutus />} />
          </Route>
          <Route path="/login" element={<Registration />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
};

export default Routing;
