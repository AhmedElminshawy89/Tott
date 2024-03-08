import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Applayout from "../layout/Applayout";
import HomePage from "../Pages/HomePage";
import Registration from "../Pages/Regestration";
import Cities from "../Pages/Cities";
import TripsMaster from "../Pages/TripsMaster";
import Account from "../Pages/Account/AccountLayout";
import PersonalInf from "../Pages/Account/PersonalInf";
import Plans from "../Pages/Account/Plans";
import Favourites from "../Pages/Account/Favourites";
import Aboutus from "../Pages/Account/Aboutus";
import NotFound from "../Pages/NotFound";

const Routing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
    >
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
};

export default Routing;
