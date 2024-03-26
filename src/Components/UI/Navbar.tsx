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
import { useEffect, useState } from "react";
interface Props {
  children: React.ReactNode;
  to: string;
}

const Links = [{ name: "Dashboard", to: "/LoginAdmin" }];

const NavLinks = (props: Props) => {
  const { onClose } = useDisclosure();
  const handleCloseNav = () => {
    onClose();
  };
  const { children, to } = props;

  return (
    <Box
      key={to}
      as={NavLink}
      to={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "transparent",
      }}
      onClick={handleCloseNav}
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 20;

      setIsScrolled(scrollTop >= scrollThreshold);
      onClose();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  function removeCookie(name: string) {
    if (document.cookie.indexOf(`${name}=`) !== -1) {
      document.cookie = `${name}=; path=/Tott/`;
    }
  }

  const handleLogOut = () => {
    removeCookie("jwt");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <>
      <Box
        className={`min-sm:px-4 px-1 bg-[#CA933F] ${
          isScrolled ? "navScroll shadow-2xl" : ""
        }`}
      >
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
                <NavLinks key={link.to} to={link.to}>
                  {link.name}
                </NavLinks>
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
                border={useColorModeValue(
                  "1px solid #fff",
                  "1px solid #000"
                )}
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
                  <Avatar size={"sm"} src={userData?.photo} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Welcome , {userData?.fname}</MenuItem>
                  {userData && (
                    <MenuItem as={NavLink} to="/account/MyPersonalInfo">
                      Account
                    </MenuItem>
                  )}
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
              offset={-150}
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
          <Box
            pb={4}
            display={{ md: "none" }}
            bg={`${isScrolled ? "rgb(202 147 63 / .9)" : "#CA933F"}`}
          >
            <Stack
              as={"nav"}
              spacing={4}
              color={useColorModeValue("white", "black")}
            >
              {Links.map((link) => (
                <NavLinks key={link.to} to={link.to}>
                  {link.name}
                </NavLinks>
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
                  offset={-260}
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
                  onClick={() => onClose()}
                />
              </Flex>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
