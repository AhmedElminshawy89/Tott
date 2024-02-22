/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import log from "../../assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import eye from "../../assets/Images/eye.png";
import reWrite from "../../assets/Images/reWrite.png";
import { motion } from "framer-motion";

const PersonalInf = () => {
  const GetData = localStorage.getItem("username");
  const userData = GetData ? JSON.parse(GetData) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duratio: 1 }}
    >
      <Box>
        <Image
          src={eye}
          w={65}
          h={115}
          position={"absolute"}
          bottom={5}
          right={4}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"120%"}
          >
            <Text
              className=" md:text-4xl text-2xl text-main-400"
              fontWeight={900}
            >
              {userData.username}
            </Text>
            <Image
              src={reWrite}
              w={35}
              h={35}
              display={{ base: "flex", md: "none" }}
              cursor={"pointer"}
            />
          </Flex>
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
        <Box maxW={{ base: "100%", md: "80%" }} mt={"20px"}>
          <Image
            src={reWrite}
            w={35}
            h={35}
            position={"absolute"}
            top={120}
            right={3}
            mx={10}
            display={{ base: "none", md: "flex" }}
            cursor={"pointer"}
          />
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              First name
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.username}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Last name
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.username}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Email
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4 break-all">
              {userData.email}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Phone
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4">
              {userData.phone}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Age
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.age}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Gender
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.gender}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Country
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.country}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              City
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.city}
            </Text>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PersonalInf;
