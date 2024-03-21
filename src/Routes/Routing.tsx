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
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Home";
import Category from "../Pages/Dashboard/Category";
import City from "../Pages/Dashboard/City";
import Places from "../Pages/Dashboard/Places";
import AddPlaces from "../Pages/Dashboard/AddPlaces";
import Review from "../Pages/Dashboard/Review";
import Setting from "../Pages/Dashboard/Setting";
import ProfilePage from "../Pages/Dashboard/Profile";

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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index path="home" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="city" element={<City />} />
          <Route path="place" element={<Places />} />
          <Route path="addplace" element={<AddPlaces />} />
          <Route path="review" element={<Review />} />
          <Route path="setting" element={<Setting />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
};

export default Routing;
