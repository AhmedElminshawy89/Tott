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
import { useFetchUserQuery } from "../../app/feature/UserSlice";
import TableSkeleton from "./TableSkeleton";
import ActionUser from "../../actions/ActionUser";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";


const Users = () => {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(page);
  const { data, isLoading, error } = useFetchUserQuery(page);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    if (data && data.Users) {
      setLastPage(data.Users.last_page);
    }
  }, [data]);
  const handlePageClick = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected + 1);
  };
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(data?.Users?.data || []);
      return;
    }
    const filteredData = data?.Users?.data.filter((item: { fname: string; }) =>
      item.fname.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Table variant="solid" border={"1px solid #eee"}>
          <TableCaption>Users</TableCaption>
          <Thead>
            <Tr bg="gray.100">
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Gender</Th>
              <Th>Country</Th>
              <Th>City</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Images</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchResults.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              searchResults.map((userData: any, i: number) => (
                <Tr key={i} border={"1px solid #eee"}>
                  <Td>{i + 1}</Td>
                  <Td>{userData?.fname}</Td>
                  <Td>{userData?.lname}</Td>
                  <Td>{userData?.age}</Td>
                  <Td>{userData?.gender}</Td>
                  <Td>{userData?.country}</Td>
                  <Td>{userData?.city}</Td>
                  <Td>{userData?.phone}</Td>
                  <Td>{userData?.email}</Td>
                  <Td>
                    <Avatar src={userData?.photo} />
                  </Td>
                  <Td>
                    <ActionUser data={userData} id={""} fname={""} lname={""} email={""} phone={""} age={""} gender={""} city={""} country={""} photo={undefined} />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={11} textAlign={'center'}>
                  {searchTerm ? "No matching results found" : "No data available"}
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Gender</Th>
              <Th>Country</Th>
              <Th>City</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Images</Th>
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

export default Users;
