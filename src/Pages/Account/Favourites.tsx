/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useColorModeValue, Image, Flex, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import eye from "../../assets/Images/eye.png";
import log from "../../assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { favourites } from "../../assets/data";
import FavCard from "../../Components/Account/FavCard";
import FavResCard from "../../Components/Account/FavResCard";
import FavPlaceCard from "../../Components/Account/FavPlaceCard";

function Favourites() {
  const [activeTab, setActiveTab] = useState(favourites[0].id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Image
        src={eye}
        w={65}
        h={115}
        position={"absolute"}
        bottom={5}
        right={4}
      />
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text className=" md:text-4xl text-2xl text-main-400" fontWeight={900}>
          Favourites
        </Text>
        <Box as={NavLink} to="/" w={100}>
          <Image
            src={log}
            w={50}
            h={50}
            display={{ base: "none", md: "flex" }}
            margin={"14px"}
          />
        </Box>
      </Flex>
      <div
        className={`space-x-2 ml-8 mt-6 overflow-hidden  ${useColorModeValue(
          "text-black",
          "text-main-400"
        )}`}
      >
        {favourites.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id
                ? `${useColorModeValue("text-black", "text-white")}`
                : `${useColorModeValue(
                  "hover:text-black/60",
                  "hover:text-white/60"
                )}`
              } relative  outline-none px-3 py-1.5 sm:text-2xl font-normal transition-all z-40`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className={`absolute inset-0 rounded-t-lg bg-main-400 ${useColorModeValue(
                  "mix-blend-multiply",
                  "mix-blend-lighten"
                )}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className=" border-2 border-main-400 rounded-md p-4 lg:w-[90%] w-full lg:h-[76vh] h-full overflow-x-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duratio: 1 }}
        >
          {activeTab === "1" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
              <FavCard />
              <FavCard />
              <FavCard />
              <FavCard />
              <FavCard />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duratio: 1 }}
        >
          {activeTab === "2" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-4">
              <FavResCard />
              <FavResCard />
              <FavResCard />
              <FavResCard />
              <FavResCard />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duratio: 1 }}
        >
          {activeTab === "2" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-4">
              <FavResCard />
              <FavResCard />
              <FavResCard />
              <FavResCard />
              <FavResCard />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duratio: 1000 }}
        >
          {activeTab === "3" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-4">
              <FavPlaceCard />
              <FavPlaceCard />
              <FavPlaceCard />
              <FavPlaceCard />
              <FavPlaceCard />
            </div>
          )}
        </motion.div>
        <div className="p-10">
          {activeTab === "4" && (
            <Text className="text-4xl text-gray-500 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-[70px] lg:text-justify text-center">
              No Favourite Trips
            </Text>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Favourites;
