/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useEffect, useState, useCallback, ChangeEvent } from "react";
import { Avatar, Box, IconButton, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useFetchReviewQuery } from "../../app/feature/ReviewSlice";
import { FaSearch } from "react-icons/fa";
import TableSkeleton from "./TableSkeleton";
import Pagination from "../../Shared/Pagination";

const Review = () => {
  const { data, isLoading, error } = useFetchReviewQuery("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(data?.Rating?.data || []);
    } else {
      const filteredData = data?.Rating?.data.filter((item: { review: string; }) =>
        item.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredData || []);
    }
  }, [data, searchTerm]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (error) return <h1>Error</h1>;
  if (isLoading) return <TableSkeleton />;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <>
      <h1>
        <span className="text-black font-extrabold text-4xl font-sans">Review</span><br />
        <span className="text-xl text-gray-600">All of Reviews</span>
      </h1>
      <TableContainer bg={"white"} borderRadius={"10px"} p={2} color={"#000"} fontSize={"18px"} my={7}>
        <Box position={'relative'}>
          <Input
            placeholder="Search here..."
            onChange={onChangeHandler}
            name="name"
            border={"1px solid #eee"}
            color={'#000'}
            pr="4.5rem"
            paddingRight="3rem"
            position="relative"
            _focus={{ border: 'none', outline: 'none' }}
            mb={3}
            autoComplete="off"
          />
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            position="absolute"
            right="0.75rem"
            fontSize={20}
            top="50%"
            transform="translateY(-63%)"
            color="gray.400"
            bg={'transparent'}
            _hover={{ bg: 'transparent' }}
          />
        </Box>
        <Table variant="solid" border={'1px solid #eee'}>
          <TableCaption>Review</TableCaption>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>UserName</Th>
              <Th>Rate</Th>
              <Th>Message</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((ratingData: { id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; users: { fname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; lname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; photo: string | undefined; }; rating: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; review: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, i: number) => (
              <Tr key={i} border={'1px solid #eee'}>
                <Td>{i + 1}</Td>
                <Td>{ratingData.users?.fname}{" "}{ratingData.users?.lname}</Td>
                <Td>{ratingData.rating}</Td>
                <Td>{ratingData.review}</Td>
                <Td>
                  <Avatar src={ratingData.users?.photo} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot bg="gray.100">
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
        {totalPages > 1 && (
          <Box className="flex justify-center my-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
    </>
  );
};

export default Review;
