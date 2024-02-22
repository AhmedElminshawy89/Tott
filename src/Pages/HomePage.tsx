/* eslint-disable react-refresh/only-export-components */
// import { Suspense } from "react";
import Spinner from "../Shared/SpinnerLoading";
import HomeSwiper from "../Components/HomeSwiper";
import MadeForYou from "../Components/MadeForYou";
import Recommended from "../Components/Recommended";
import HomeSearch from "../Components/HomeSearch";
import HomeCities from "../Components/HomeCities";
import Footer from "../Components/UI/Footer";
import IconBottom from "../assets/Images/IconBottom.png";

import { useSelector } from "react-redux";
import { selectNetwork } from "../app/feature/NetworkSlice";
import Helmet from "../Shared/Helmet";
import HomeHotels from "../Components/HomeHotels";
import HomeResturant from "../Components/HomeResturant";
import HomePlacesToGo from "../Components/HomePlacesToGo";

const HomePage = () => {
  const { isOnline } = useSelector(selectNetwork);

  if (!isOnline) return <Spinner />;

  return (
    <Helmet title="Home">
      <div>
        {/* <Suspense fallback={<Spinner />}> */}
          <HomeSwiper />
          <HomeSearch />
          <MadeForYou />
          <Recommended />
          <HomeCities />
          <HomeHotels />
          <HomeResturant />
          <HomePlacesToGo />
          <Footer />
          <img className="IconBottom" src={IconBottom} alt="" />
        {/* </Suspense> */}
      </div>
    </Helmet>
  );
};

export default HomePage;
