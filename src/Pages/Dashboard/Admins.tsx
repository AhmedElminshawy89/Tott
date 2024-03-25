/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useFetchAdminQuery } from "../../app/feature/AdminSlice";
import TableSkeleton from "./TableSkeleton";
import {  ChangeEvent, useCallback, useEffect, useState } from "react";
import ActionAdmin from "../../actions/ActionAdmin";
import {  IAdminDataMap } from "../../Interface";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../Shared/Pagination";

const Admins = () => {
  const { data, isLoading,error } = useFetchAdminQuery("")
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(data?.Admins?.data || []);
      return;
    }
    const filteredData = data?.Admins?.data.filter((item: { fname: string; }) =>
      item.fname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData || []);
  }, [data, searchTerm]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  }, []);

  if (error) return <h1>Error</h1>
  if (isLoading) return <TableSkeleton />
  return (
    <>
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
        <TableCaption>Admins</TableCaption>
        <Thead>
          <Tr bg="gray.100">
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Phone</Th>
            <Th>Gender</Th>
            <Th>Email</Th>
            <Th>Images</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchResults.length > 0 ? (
           searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((adminData:IAdminDataMap,i:number ) => (
              <Tr key={i} border={'1px solid #eee'}>
                <Td>{i+1}</Td>
                <Td>{adminData.fname}</Td>
                <Td>{adminData.lname}</Td>
                <Td>{adminData.phone}</Td>
                <Td>{adminData.gender}</Td>
                <Td>{adminData.email}</Td>
                <Td>
                  <Avatar src={adminData.photo} />
                </Td>
                <Td>
                  <ActionAdmin data={adminData}/>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
            <Td colSpan={8} textAlign={'center'}>
              {searchTerm ? "No matching results found" : "No data available"}
            </Td>
          </Tr>
          )}

        </Tbody>
        <Tfoot>
          <Tr bg="gray.100">
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Phone</Th>
            <Th>Gender</Th>
            <Th>Email</Th>
            <Th>Images</Th>
            <Th>Actions</Th>
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

export default Admins;
