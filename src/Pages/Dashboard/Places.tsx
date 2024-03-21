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
  
  const Places = () => {
   
    return (
        <TableContainer
        bg={"white"}
        borderRadius={"10px"}
        p={2}
        color={"#000"}
        fontSize={"18px"}
        my={12}
      >
        <Table variant="simple">
          <TableCaption>Places</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Category Name</Th>
              <Th>City Name</Th>
              <Th>Locaion</Th>
              <Th>Rate</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
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
                  <Button variant={"solid"} bg={"red"} _hover={{ bg: "red" }}>
                    {" "}
                    <MdOutlineDelete className=" cursor-pointer text-2xl text-white" />
                  </Button>
                </Box>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
            <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Category Name</Th>
              <Th>City Name</Th>
              <Th>Locaion</Th>
              <Th>Rate</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  };
  
  export default Places;
  