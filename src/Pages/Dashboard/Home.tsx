import {
  // Avatar,
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import img from "../../assets/Images/Cities.png";
import { FaCity, FaPlaceOfWorship } from "react-icons/fa";

import { MdCategory, MdOutlineRateReview } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
const Dashboard = () => {
  return (
    <Box>
      <Box className="flex items-center justify-between flex-wrap gap-8">
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Categoris
              </Text>
              <Text className="text-[#344767] text-lg font-medium">4</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <MdCategory className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Cities
              </Text>
              <Text className="text-[#344767] text-lg font-medium">300</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <FaCity className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Places
              </Text>
              <Text className="text-[#344767] text-lg font-medium">4</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <FaPlaceOfWorship className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Review
              </Text>
              <Text className="text-[#344767] text-lg font-medium">105</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <MdOutlineRateReview className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
      </Box>
      <TableContainer
  bg={"white"}
  borderRadius={"10px"}
  p={2}
  color={"#000"}
  fontSize={"18px"}
  my={12}
>
  <Table variant="solid" border={'1px solid #eee'}>
    <TableCaption>Categories</TableCaption>
    <Thead bg="gray.100">
      <Tr>
        <Th>ID</Th>
        <Th>Place Name</Th>
        <Th>Category Name</Th>
        <Th>City Name</Th>
        <Th>Location</Th>
        <Th>Rate</Th>
        <Th>Description</Th>
        <Th>Image</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr border={'1px solid #eee'}>
        <Td>1</Td>
        <Td>Svsj</Td>
        <Td>Hotel</Td>
        <Td>Alexandria</Td>
        <Td>cairo,alx</Td>
        <Td>3</Td>
        <Td>Lorem ipsum dolor sit amet ...</Td>
        <Td>
          <Avatar src={img} />
        </Td>
        <Td>
          <Box className="flex gap-2">
            <Button>
              {" "}
              <BiEdit className=" cursor-pointer text-2xl text-black" />
            </Button>
            <Button
              variant={"solid"}
              bg={"red"}
              _hover={{ bg: "red" }}
            >
              {" "}
              <MdOutlineDelete className=" cursor-pointer text-2xl text-white" />
            </Button>
          </Box>
        </Td>
      </Tr>
    </Tbody>
    <Tfoot bg="gray.100">
      <Tr>
        <Th>ID</Th>
        <Th>Place Name</Th>
        <Th>Category Name</Th>
        <Th>City Name</Th>
        <Th>Location</Th>
        <Th>Rate</Th>
        <Th>Description</Th>
        <Th>Image</Th>
        <Th>Actions</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>

    </Box>
  );
};

export default Dashboard;
