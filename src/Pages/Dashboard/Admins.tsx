/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import img from "../../assets/Images/Cities.png";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Admins = () => {
  return (
    <TableContainer
      bg={"white"}
      borderRadius={"10px"}
      p={2}
      color={"#000"}
      fontSize={"18px"}
      my={12}
    >
      <Table variant="solid" border={'1px solid #eee'}>
        <TableCaption>Admins</TableCaption>
        <Thead>
          <Tr bg="gray.100">
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th>Email</Th>
            <Th>Images</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr  border={'1px solid #eee'}>
            <Td>1</Td>
            <Td>Ahmed</Td>
            <Td>Ahmed Elsaied</Td>
            <Td>0132565320230</Td>
            <Td>23</Td>
            <Td>Ahmd@gmail.com</Td>
            <Td>
              <Avatar src={img} />
            </Td>
            <Td>
              <Box className="flex gap-2">
                <Button>
                  {" "}
                  <BiEdit className=" cursor-pointer text-2xl text-black" />
                </Button>
                <Button variant={"solid"} bg={"red"} _hover={{ bg: "red" }}>
                  {" "}
                  <MdOutlineDelete className=" cursor-pointer text-2xl text-white" />
                </Button>
              </Box>
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr bg="gray.100">
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th>Email</Th>
            <Th>Images</Th>
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Admins;
