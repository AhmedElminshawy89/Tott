/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import TripPlane from "../TripPlanne/TripPlane";
import IconTut from "../../assets/Images/IconTut.png";
import IconTutBlack from "../../assets/Images/IconTutBlack.png";
import { Link } from "react-scroll";
import { BiSearch } from "react-icons/bi";
import CookiesServices from "../../Services/CookiesServices";

interface Props {
  children: React.ReactNode;
}
const Links = ["Dashboard", "Projects", "Team"];
const NavLinks = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "transparent",
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const jwt = CookiesServices.get("jwt");

  const GetData = localStorage.getItem("username");
  const userData = GetData ? JSON.parse(GetData) : null;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogOut = () => {
    CookiesServices.remove("jwt");
    localStorage.removeItem("userData");
    window.location.reload();
  };

  return (
    <>
      <Box className={`min-sm:px-4 px-1 bg-[#CA933F]`}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            backgroundColor={"transparent"}
            _hover={{ bg: "transparent" }}
            color={useColorModeValue("white", "black")}
            outline={"none"}
            fontSize={"25px"}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              as={NavLink}
              to={"/"}
            >
              <Image
                src={useColorModeValue(IconTut, IconTutBlack)}
                alt=""
                className=" min-sm:h-[50px] min-sm:w-[50px] h-[30px] w-[30px]"
              />
              <Text
                color={useColorModeValue("white", "black")}
                fontFamily={"Inria Serif"}
                className="min-sm:text-5xl text-3xl"
              >
                TUT
              </Text>
            </Box>
            <HStack
              color={useColorModeValue("white", "black")}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLinks key={link}>{link}</NavLinks>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack display={{ base: "none", md: "flex" }}>
              <TripPlane />
            </Stack>
            {!jwt ? (
              <Button
                variant="outline"
                mx={1}
                height={"33px"}
                px={"30px"}
                border={useColorModeValue("1px solid #fff", "1px solid #000")}
                color={useColorModeValue("white", "black")}
                _hover={useColorModeValue(
                  { bg: "#fff", color: "#CA933F", border: "1px solid #CA933F" },
                  { bg: "#000", color: "#CA933F", border: "1px solid #CA933F" }
                )}
                as={NavLink}
                to="/login"
              >
                Login
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"http://localhost:1337/uploads/me_8dee4a849c.jpg"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Welcome , {userData.username}</MenuItem>
                  <MenuItem as={NavLink} to="/account/MyPersonalInfo">
                    Account
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            )}

            <IconButton
              as={Link}
              to="search"
              spy={true}
              smooth={true}
              offset={-40}
              size={"md"}
              fontSize={"22px"}
              cursor={"pointer"}
              icon={<BiSearch />}
              aria-label={"Move to search"}
              display={{ md: "flex", base: "none" }}
              backgroundColor={"transparent"}
              _hover={{ bg: "transparent" }}
              color={useColorModeValue("white", "black")}
              outline={"none"}
            />
            <Button
              onClick={toggleColorMode}
              _hover={{ bg: "transparent" }}
              outline={"none"}
              backgroundColor={"transparent"}
              display={{ base: "none", md: "flex" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} bg="#CA933F">
            <Stack
              as={"nav"}
              spacing={4}
              color={useColorModeValue("white", "black")}
            >
              {Links.map((link) => (
                <NavLinks key={link}>{link}</NavLinks>
              ))}
              <Stack display={{ md: "none" }}>
                <TripPlane />
              </Stack>
              <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                <Button
                  onClick={toggleColorMode}
                  _hover={{ bg: "transparent" }}
                  backgroundColor={"transparent"}
                >
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <IconButton
                  as={Link}
                  to="search"
                  offset={-90}
                  spy={true}
                  smooth={true}
                  size={"md"}
                  fontSize={"22px"}
                  cursor={"pointer"}
                  icon={<BiSearch />}
                  aria-label={"Move to search"}
                  display={{ md: "none" }}
                  backgroundColor={"transparent"}
                  _hover={{ bg: "transparent" }}
                  color={useColorModeValue("white", "black")}
                  outline={"none"}
                  mb={-4}
                />
              </Flex>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 70 83" fill="none">
                  <path d="M40.7834 0.002188C23.6475 0.171938 13.3231 7.43367 7.71114 18.3066C2.09915 29.1527 0.706855 43.519 0.0706858 58.8501L0 60.5297C2.24908 60.494 4.51958 60.4403 6.76867 60.4046C9.29621 66.2654 12.8091 71.8404 17.7356 75.9501C23.0692 80.3815 29.9878 83.1869 39.6053 82.9903C49.1157 82.7937 55.4345 79.9705 60.2111 75.5392C64.6236 71.4473 67.601 65.8545 70 59.7792C68.7791 59.3861 67.5153 59.0287 66.2944 58.6892C63.3813 66.3369 59.3115 71.8583 54.3207 75.432C49.0086 79.2379 42.6469 80.6853 36.6493 80.0241C25.2968 78.8091 15.3152 70.9827 10.2815 60.351L18.5924 60.1902C23.0906 67.8379 30.6732 72.9125 37.6132 73.663C41.6616 74.1097 45.5171 73.2878 49.3084 70.5718C52.8427 68.0344 56.3127 63.6745 58.8831 56.9203C57.8764 56.7237 56.8911 56.545 55.8629 56.3663C52.9712 61.0657 50.2295 64.425 47.3807 66.7122C44.3819 69.1065 41.1047 70.2859 37.8274 70C34.5502 69.7319 31.5943 68.1595 28.724 65.7651C26.9033 64.2106 25.0826 62.3165 23.2191 60.1008C24.7399 60.1008 26.3678 60.0472 27.8244 59.9758C29.0667 61.3338 30.2876 62.531 31.4657 63.5137C33.9504 65.5865 36.2209 66.6586 38.213 66.8194C40.205 66.9981 42.2399 66.3905 44.7246 64.3893C46.9308 62.6382 49.3299 59.815 51.9002 55.8303C51.0863 55.7231 50.2509 55.6337 49.4155 55.5623C47.2093 58.2961 44.6175 61.441 41.3831 62.9241C39.5196 63.7639 37.4204 63.5495 35.8354 62.8705C33.8433 61.9234 32.5153 60.6726 31.2087 59.3861C32.451 59.0287 33.6077 58.5106 34.6144 57.8137C35.8996 58.8679 37.7846 60.8692 39.541 60.1008C41.3189 59.3146 44.1463 56.3485 46.3311 53.6503C48.0233 52.0243 49.0086 49.3619 51.1506 48.3077C54.4064 47.5393 59.0973 50.3626 61.1964 48.0933C61.9033 47.2892 62.396 46.4851 62.7387 45.681L59.3543 45.5917L57.4694 42.3218L63.4027 42.5005C63.3599 40.4098 62.9529 38.8553 62.5245 36.8004C64.388 37.0863 66.4872 37.265 68.1365 36.9255C67.2583 35.1923 66.1016 33.4412 64.3237 31.9402C55.4988 32.8872 47.7448 32.0296 43.0324 26.1508C49.9939 23.7029 58.2834 22.9703 62.5673 25.5791C62.5887 24.4712 62.5459 23.3634 62.3103 22.2734C63.8311 22.327 65.0734 22.4163 66.6371 22.5057L66.6799 20.8082C66.8299 16.3947 65.2662 11.2128 61.175 7.05485C57.0838 2.89687 50.3366 -0.0925146 40.7834 0.002188ZM40.8476 3.03982H41.6401C49.8439 3.11308 55.0061 5.60394 58.3048 8.95069C61.2179 11.9061 62.6316 15.6263 62.91 18.9677C56.5055 18.7354 51.5575 19.5038 47.7234 21.0762C43.5037 22.8094 40.7405 25.5254 39.0483 28.5631C35.6854 34.6205 36.1995 41.8929 35.7283 46.8603C35.3427 51.0594 34.2717 53.4895 32.858 54.8475C31.4443 56.2055 29.5379 56.7773 26.4321 56.9203L3.85557 57.3312C4.541 42.697 6.10465 29.2063 11.1383 19.4681C16.3862 9.34559 24.8684 3.19885 40.8476 3.03982ZM55.4988 26.8477C53.6995 26.9371 52.0716 27.1693 50.5508 27.5088C51.836 28.17 53.2711 28.6703 54.7277 29.0098C54.4706 28.2236 54.8776 27.2944 55.4988 26.8477ZM59.1402 27.5446C59.4829 28.1878 59.3972 28.9026 59.0331 29.4744C59.8684 29.4565 60.7038 29.4029 61.4749 29.2599C60.918 28.5095 59.9755 27.9555 59.1402 27.5446Z" fill="white"/>
                </svg> */
}

// const [isScrolled , setIsScrolled] = useState(false);
// useEffect(()=>{
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const scrollThreshold = 50;

//       setIsScrolled(scrollTop >= scrollThreshold);
//     }
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
// },[])
