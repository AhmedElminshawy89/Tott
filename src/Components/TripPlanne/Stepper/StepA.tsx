import { motion } from "framer-motion";
import { CgSearch } from "react-icons/cg";
import { Image } from "@chakra-ui/react";
import IMAGEBOX from "../../../assets/Images/giza.png";
import IMAGEBOX2 from "../../../assets/Images/siwa.png";
import IMAGEBOX3 from "../../../assets/Images/aswan.png";
import IMAGEBOX4 from "../../../assets/Images/alex.png";
import IMAGEBOX6 from "../../../assets/Images/giza2.png";
import IMAGEBOX5 from "../../../assets/Images/cairo.png";
import React from "react";
import { handleNextStepProps } from "../../../Interface";

const StepA: React.FC<handleNextStepProps> = ({ handleNextStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
    >
      <h1 className="flex justify-center text-4xl font-bold text-main-400">
        Where To go?
      </h1>
      <div className="my-4 relative w-[600px] max-w-full px-6 py-1 mx-auto inpt-stepA">
        <motion.input
          type="text"
          placeholder="Search by city or town..."
          className="searchInput p-2 pl-5 rounded-full pr-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.i
          className="absolute right-9 top-3 text-2xl text-main-400 i-stepA"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CgSearch />
        </motion.i>
      </div>
      <div className="mt-11 mb-8 relative">
        <h1 className="text-xl font-semibold mb-3 text-main-400">
          Popular destinations
        </h1>
        <div className="flex flex-wrap gap-4 box-stepA transition-none">
          <Image
            src={IMAGEBOX}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX2}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX3}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX4}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX5}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX6}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
          <Image
            src={IMAGEBOX2}
            w={"105px"}
            borderRadius={"15px"}
            transition={"none"}
            _hover={{ border: "2px solid #CA933F" }}
          />
        </div>
      </div>
      <div className="my-2 flex justify-end mx-4 items-center">
        <button
          className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default StepA;
