/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text } from "@chakra-ui/react";
import BoxCities from "../Components/Boxes/BoxCities";
import alex_city from "../assets/Images/alex-city.png";
import cloud from "../assets/Images/cloud 1.png";
import clear from "../assets/Images/clear.png";
import rain from "../assets/Images/rain.png";
import Drizzle from "../assets/Images/drizzle.png";
import mist from "../assets/Images/mist.png";
import snow from "../assets/Images/snow.png";
import Wind from "../assets/Images/wind.png";
import humidity from "../assets/Images/humidity.png";
import styled from "styled-components";
import Helmet from "../Shared/Helmet";
import { useEffect } from "react";
import { useGetWeatherDataQuery } from "../app/feature/weatherApi ";
import { IWeatherIcons } from "../Interface";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/feature/NetworkSlice";
import Disconnect from "./Disconnect";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;
const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.toLocaleString("default", { month: "short" });

const Cities = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    document.addEventListener("DOMContentLoaded", handleScroll);
    return () => document.addEventListener("DOMContentLoaded", handleScroll);
  }, []);

  const city = "Alexandria";
  const { data, error, isLoading } = useGetWeatherDataQuery(city);
  const { isOnline } = useSelector(selectNetwork);
  if (!isOnline) return <Disconnect />;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const weatherIcons: IWeatherIcons = {
    Clouds: cloud,
    Clear: clear,
    Rain: rain,
    Drizzle: Drizzle,
    Mist: mist,
    Snow: snow,
    Wind: Wind,
    Humidity: humidity,
  };

  const weatherCondition: string = data.weather[0].main;
  const iconSrc: string | undefined = weatherIcons[weatherCondition];

  return (
    <Helmet title="Cities">
      <div>
        <div>
          <div className="relative">
            <img
              src={alex_city}
              alt=""
              className="w-[100%] max-h-72 object-fill"
            />
          </div>
          <div
            className="absolute left-1/2 transform -translate-x-1/2 min-sm:-translate-y-1/2 -translate-y-1/3 min-sm:w-[90%] w-fit  min-sm:p-5 p-1 text-3xl bg-[#2D2D2D] text-white border-l-[1px] 
            border-r-[1px] border-b-2 border-solid border-main-400 rounded-md flex min-sm:justify-between justify-center  min-sm:flex-row flex-col items-center flex-wrap"
          >
            <div className=" space-x-2">
              <span className="border-r-2 border-main-400 pr-4">
                {currentDay}
              </span>
              <span>{currentMonth}</span>
            </div>
            <span>{city}</span>
            <div className="flex items-center justify-center">
              <img src={iconSrc} alt="" className="w-10 h-10" />
              <span className="relative mr-4 text-4xl">
                {/* {Math.round(data.main.temp)} */}
                {/* {parseFloat(data.main.temp).toFixed(1)} */}
                {data.main.temp}
                <span className="text-base absolute">°C</span>
              </span>
            </div>
          </div>
        </div>
        <Box className="min-sm:mt-[60px] mt-[90px]" px={"5"} mb={"60px"}>
          <Text
            color={"#CA933F"}
            fontWeight={"bold"}
            fontSize={"40px"}
            mb={"10px"}
          >
            Hotels
          </Text>
          <GridContainer>
            <BoxCities />
            <BoxCities />
            <BoxCities />
            <BoxCities />
            <BoxCities />
            <BoxCities />
          </GridContainer>
        </Box>
      </div>
    </Helmet>
  );
};

export default Cities;
