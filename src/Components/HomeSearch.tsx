/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from "framer-motion";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { tabs } from "../assets/data";
import { useColorModeValue } from "@chakra-ui/react";

function HomeSearch() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div
        id="search"
        className={`flex space-x-1 justify-center mt-11 flex-wrap ${useColorModeValue(
          "text-black",
          "text-main-400"
        )}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id
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
                // style={{ color: "black",backgroundColor: "#CA933F" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="content">
        <div className="mt-6 relative">
          {activeTab === "1" && (
            <>
              <motion.input
                type="text"
                placeholder="Places to go, things to do, hotels...  "
                className="searchInput p-2 pl-5 pr-10 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.i
                className="absolute right-3 top-3 text-2xl text-main-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CgSearch />
              </motion.i>
            </>
          )}
        </div>
        <div className="mt-5 relative">
          {activeTab === "2" && (
            <>
              <motion.input
                type="text"
                placeholder="Destination"
                className="searchInput p-2 pl-5 pr-10 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.i
                className="absolute right-3 top-3 text-2xl text-main-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CgSearch />
              </motion.i>
            </>
          )}
        </div>
        <div className="mt-5 relative">
          {activeTab === "3" && (
            <>
              <motion.input
                type="text"
                placeholder="Hotel name or destination"
                className="searchInput p-2 pl-5 pr-10 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.i
                className="absolute right-3 top-3 text-2xl text-main-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CgSearch />
              </motion.i>
            </>
          )}
        </div>
        <div className="mt-6  relative">
          {activeTab === "4" && (
            <>
              <motion.input
                type="text"
                placeholder="Restaurant or destination"
                className=" searchInput m p-2 pl-5 pr-10 rounded-full mt-[-3]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.i
                className="absolute right-3 top-2 text-2xl text-main-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CgSearch />
              </motion.i>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSearch;
