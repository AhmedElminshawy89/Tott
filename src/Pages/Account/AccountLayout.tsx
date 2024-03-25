/* eslint-disable react-hooks/rules-of-hooks */
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import log from "../../assets/Images/logo.png";
import CookiesServices from "../../Services/CookiesServices";
interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface NavItemProps extends FlexProps {
  to: string;
  icon: IconType;
  children: React.ReactNode;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", to: "/", icon: FiHome },
  {
    name: "My Personal Info",
    to: "MyPersonalInfo",
    icon: BsFillPersonCheckFill,
  },
  { name: "Plans", to: "Plans", icon: FiCompass },
  { name: "Favourites", to: "Favourites", icon: FiStar },
  { name: "About us", to: "Aboutus", icon: FiSettings },
  { name: "Log Out", to: "/", icon: FiLogOut },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const GetData = localStorage.getItem("username");
  const userData = GetData ? JSON.parse(GetData) : null;
  const location = useLocation();
  const handleLinkClick = () => {
    onClose();
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#CA933F", "#CA933F")}
      borderRight="1px"
      borderRightColor={useColorModeValue("#CA933F", "#CA933F")}
      w={"15rem"}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        alignItems="start"
        m="3 "
        justifyContent={{ base: "space-between", md: "center" }}
      >
        <Flex
          alignItems="center"
          m="3"
          justifyContent="center"
          flexDirection={"column"}
        >
          <Image
            src={userData.photo}
            w={40}
            h={40}
            borderRadius={"full"}
            objectFit={"contain"}
          />
          <Text fontSize="md" color={"#424242"}>
              {userData.fname}{" "}
              {userData.lname}
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          onClick={() => {
            handleLinkClick();
            link.name === "Log Out" ? CookiesServices.remove("jwt") : "";
          }}
          fontWeight={600}
          fontSize={"17px"}
          className={`${
            location.pathname === `/account/${link.to}`
              ? useColorModeValue(
                  "bg-white text-black shadow-xl transition-all duration-500",
                  "bg-black text-white shadow-xl transition-all duration-500"
                )
              : "text-black  hover:text-white hover:shadow-xl"
          }`}
          padding={"9px 10px"}
          margin={"15px"}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const AnimatedBox = motion(Box);

const NavItem = ({ to, icon, children, ...rest }: NavItemProps) => {
  return (
    <AnimatedBox
      as={Link}
      to={to}
      style={{ textDecoration: "none" }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={
        location.pathname === `/account/${to}`
          ? "bg-black text-white shadow-xl"
          : "text-black"
      }
    >
      <Flex
        align="center"
        p="1"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </AnimatedBox>
  );
};

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "black")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex justifyContent={"space-between"}>
        <Box>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
            margin={"14px"}
            border={"none"}
            fontSize={"28px"}
            color={"#CA933F"}
          />
        </Box>
        <Box as={NavLink} to="/">
          <Image
            src={log}
            w={50}
            h={50}
            display={{ base: "flex", md: "none" }}
            margin={"14px"}
            position={"absolute"}
            right={"10px"}
          />
        </Box>
      </Flex>
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Account;
