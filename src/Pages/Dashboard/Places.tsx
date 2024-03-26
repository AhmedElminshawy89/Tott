/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Input,
  Box
} from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import { useFetchPlaceQuery } from "../../app/feature/PlaceSlice";
import ActionPlace from "../../actions/ActionPlace";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useCallback } from "react";
import { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";

const Places = () => {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(page);
  const { data, isLoading, error } = useFetchPlaceQuery(page);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    if (data && data.Places) {
      setLastPage(data.Places.last_page);
    }
  }, [data]);
  const handlePageClick = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(data?.Places?.data || []);
      return;
    }
    const filteredData = data?.Places?.data.filter((item: { name: string; }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData || []);
  }, [data, searchTerm]);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  }, []);
  if (error) return <h1>Error</h1>;
  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <h1 >
        <span className="text-black font-extrabold text-4xl font-sans">Places</span><br />
        <span className="text-xl text-gray-600">All of Places</span>
      </h1>
      <TableContainer
        bg={"white"}
        borderRadius={"10px"}
        p={2}
        color={"#000"}
        fontSize={"18px"}
        my={7}
      >
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
          <TableCaption>Places</TableCaption>
          <Thead bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>City Name</Th>
              <Th>Category Name</Th>
              <Th>Longitude</Th>
              <Th>Latitude</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchResults.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              searchResults.map((userData: any, i: number) => (
                <Tr key={i} border={"1px solid #eee"}>
                  <Td>{i + 1}</Td>
                  <Td>{userData?.name}</Td>
                  <Td>{userData?.desc}</Td>
                  <Td>
                    <Avatar src={userData?.photo} />
                  </Td>
                  <Td>{userData?.cities?.name}</Td>
                  <Td>{userData?.category_name}</Td>
                  <Td>{userData?.longitude}</Td>
                  <Td>{userData?.latitude}</Td>
                  <Td>
                    <ActionPlace dataPlace={userData} name={undefined} desc={""} city_id={""} photo={null} category_name={""} longitude={""} latitude={""} />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={9} textAlign={'center'}>
                  {searchTerm ? "No matching results found" : "No data available"}
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>City Name</Th>
              <Th>Category Name</Th>
              <Th>Longitude</Th>
              <Th>Latitude</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {lastPage > 1 && (
        <Box className="flex justify-center my-6">
          <ReactPaginate
            previousLabel='Previous'
            nextLabel='Next'
            breakLabel='...'
            pageCount={lastPage}
            marginPagesDisplayed={5}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            containerClassName={"pagination"}
            pageClassName={"page"}
            activeClassName={"activePage"}
            previousClassName={"previous"}
            nextClassName={"next"}
          />

        </Box>
      )}
    </>
  );
};

export default Places;
