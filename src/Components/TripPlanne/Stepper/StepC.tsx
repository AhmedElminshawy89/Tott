import React, { useState } from "react";
import { handleNextStepProps } from "../../../Interface";
import { motion } from "framer-motion";
import { Button, Image } from "@chakra-ui/react";
import solo from "../../../assets/Images/solo.png";
import { Link } from "react-router-dom";

const StepC: React.FC<handleNextStepProps> = ({
  handlePrevStep,
  // handleNextStep,
}) => {
  const [chooseOne, sethooseOne] = useState("");
  const handleSendStateValue = () => {
    localStorage.setItem("chooseOne", chooseOne);
  };
  const [TripDate] = useState({
    sd: localStorage.getItem("StartDate"),
    ed: localStorage.getItem("EndDate"),
    count: localStorage.getItem("count"),
    chooseOne: localStorage.getItem("chooseOne"),
  });
  const handleSubmit = () => {
    console.log(TripDate);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="flex justify-center text-4xl font-bold text-main-400">
        Who’s coming with you?
      </h1>
      <div className="mt-11 mb-8 relative">
        <h1 className="text-xl font-semibold mb-3 text-main-400">
          Choose one {chooseOne}
        </h1>
        <div className="flex flex-wrap gap-8   ">
          <div
            onClick={() => sethooseOne("solo")}
            className={`border-solid border-2 border-main-400 p-5 rounded-xl ${
              chooseOne === "solo" ? "bg-main-400" : ""
            }`}
          >
            <Image src={solo} w={"25px"} />
            <p
              className={` text-2xl ${
                chooseOne === "solo" ? "text-black" : "text-main-400"
              }`}
            >
              Solo
            </p>
          </div>
          <div
            onClick={() => sethooseOne("partner")}
            className={`border-solid border-2 border-main-400 p-5 rounded-xl ${
              chooseOne === "partner" ? "bg-main-400" : ""
            }`}
          >
            <Image src={solo} w={"25px"} />
            <p
              className={` text-2xl ${
                chooseOne === "partner" ? "text-black" : "text-main-400"
              }`}
            >
              Partner
            </p>
          </div>
          <div
            onClick={() => sethooseOne("family")}
            className={`border-solid border-2 border-main-400 p-5 rounded-xl ${
              chooseOne === "family" ? "bg-main-400" : ""
            }`}
          >
            <Image src={solo} w={"25px"} />
            <p
              className={` text-2xl ${
                chooseOne === "family" ? "text-black" : "text-main-400"
              }`}
            >
              Family
            </p>
          </div>
          <div
            onClick={() => sethooseOne("friends")}
            className={`border-solid border-2 border-main-400 p-5 rounded-xl ${
              chooseOne === "friends" ? "bg-main-400" : ""
            }`}
          >
            <Image src={solo} w={"25px"} />
            <p
              className={` text-2xl ${
                chooseOne === "friends" ? "text-black" : "text-main-400"
              }`}
            >
              Friends
            </p>
          </div>
        </div>
      </div>
      <div className="my-2 flex justify-between mx-4 items-center">
        <button
          className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <Button
          as={Link}
          to={"/TripsMaster"}
          bg={"transparent"}
          color={"#CA933F"}
          _hover={{ bg: "#CA933F", color: "black" }}
          px={8}
          height={"38px"}
          borderRadius={"12px"}
          border={"2px solid #CA933F"}
          mb={-6}
          onClick={() => {
            handleSendStateValue();
            handleSubmit();
          }}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default StepC;
