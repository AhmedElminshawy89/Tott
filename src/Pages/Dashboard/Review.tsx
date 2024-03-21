/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
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

const Review = () => {
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
        <TableCaption>Review</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>UserName</Th>
            <Th>Rate</Th>
            <Th>Message</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Ahmed</Td>
            <Td>2</Td>
            <Td>Lorem ipsum dolor sit amet ...</Td>
            <Td>
              <Avatar src={img} />
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>ID</Th>
            <Th>UserName</Th>
            <Th>Rate</Th>
            <Th>Message</Th>
            <Th>Image</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Review;
