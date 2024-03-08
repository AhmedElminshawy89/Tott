/* eslint-disable react-refresh/only-export-components */
import HomeSwiper from "../Components/HomeSwiper";
import MadeForYou from "../Components/MadeForYou";
import Recommended from "../Components/Recommended";
import HomeSearch from "../Components/HomeSearch";
import HomeCities from "../Components/HomeCities";
import IconBottom from "../assets/Images/IconBottom.png";

import { useSelector } from "react-redux";
import { selectNetwork } from "../app/feature/NetworkSlice";
import Helmet from "../Shared/Helmet";
import HomeHotels from "../Components/HomeHotels";
import HomeResturant from "../Components/HomeResturant";
import HomePlacesToGo from "../Components/HomePlacesToGo";
import Disconnect from "./Disconnect";

const HomePage = () => {
  const { isOnline } = useSelector(selectNetwork);

  if (!isOnline) return <Disconnect/>;

  return (
    <Helmet title="Home">
      <div>
        <HomeSwiper />
        <HomeSearch />
        <MadeForYou />
        <Recommended />
        <HomeCities />
        <HomeHotels />
        <HomeResturant />
        <HomePlacesToGo />
        <img className="IconBottom" src={IconBottom} alt="" />
      </div>
    </Helmet>
  );
};

export default HomePage;
