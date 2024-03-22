/* eslint-disable react-hooks/rules-of-hooks */
import img from "../../assets/Images/logo.png";
import me from "../../assets/Images/me.jpg";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCategory, BiSolidCity } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { FaPlaceOfWorship } from "react-icons/fa";
import { MdDomainAdd, MdReviews } from "react-icons/md";
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", to: "home", icon: SiHomebridge },
  { name: "Categories", to: "category", icon: BiCategory },
  { name: "Cities", to: "city", icon: BiSolidCity },
  { name: "Places", to: "place", icon: FaPlaceOfWorship },
  { name: "Add Places", to: "addplace", icon: MdDomainAdd },
  { name: "Review", to: "review", icon: MdReviews },
  { name: "Setting", to: "setting", icon: FiSettings },
  { name: "Log Out", to: "/", icon: FiLogOut },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const location = useLocation();
  const handleLinkClick = () => {
    onClose();
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#ca933f", "#ca933f")}
      borderRight="1px"
      borderRightColor={useColorModeValue("#ca933f", "#ca933f")}
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
          <Text
            fontSize="4xl"
            fontFamily={"Inria Serif"}
            mb={10}
            className="min-sm:text-5xl text-3xl flex items-center"

            color={'black'}

          >
            <img src={img} className=" min-sm:h-[50px] min-sm:w-[50px] h-[30px] w-[30px] mr-2"/>
            TUT
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
          }}
          fontWeight={600}
          fontSize={"17px"}
          className={`${
            location.pathname === `/dashboard/${link.to}`
              ? useColorModeValue(
                  "bg-black text-white  transition-all duration-500",
                  "bg-black text-white s transition-all duration-500"
                )
              : "text-black  hover:text-black hover:shadow-xl"
          }`}
          padding={"9px 10px"}
          margin={"10px"}
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
        location.pathname === `/dashboard/${to}`
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

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#ca933f", "#ca933f")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("#ca933f", "#ca933f")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="4xl"
        fontFamily={"Inria Serif"}
        color={'black'}
        className="min-sm:text-5xl text-3xl flex items-center"

      >
        <img src={img} className=" min-sm:h-[50px] min-sm:w-[50px] h-[30px] w-[30px] mr-2"
/>
        TUT
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={me} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Ahmed Elsaied</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue("White ", "White")}>
              {/* <MenuItem>Profile</MenuItem> */}
              <MenuItem as={NavLink} to={"setting"}>
                Settings
              </MenuItem>
              <MenuItem as={NavLink} to={"profile"}>
                Profile 
              </MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "White")}>
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
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
