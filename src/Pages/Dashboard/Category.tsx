import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ICategoryData, ICategoryDataMap } from "../../Interface";
import { useAddCategoryMutation, useFetchCategoryQuery } from "../../app/feature/CategorySlice";
import TableSkeleton from "./TableSkeleton";
import ActionCategory from "../../actions/ActionCategory";
import CustomModal from "../../Shared/CustomMpdal";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const Category = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const { data, isLoading, error } = useFetchCategoryQuery(page);
  const [addCategory, { isLoading: LoadingAddCategory }] = useAddCategoryMutation();
  const [categoryData, setCategoryData] = useState<ICategoryData>({
    name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICategoryDataMap[]>([]);
  const [fullData, setFullData] = useState<ICategoryDataMap[]>([]);
  useEffect(() => {
    if (data && data.Categories) {
      setFullData(data.Categories.data);
      setSearchResults(data.Categories.data);
      setLastPage(data.Categories.last_page);
    }
  }, [data]);
  const handlePageClick = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected + 1);
  };
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: value,
    }));
    if (errors.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
  }, [errors]);
  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchTerm(value);
      if (!value) {
        setSearchResults(fullData);
      } else {
        const filteredData = fullData.filter((item: ICategoryDataMap) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredData);
      }
    },
    [fullData]
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!categoryData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (categoryData.name.trim().length < 2) {
      newErrors.name = "Category name should be at least 2 characters long";
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        await addCategory(categoryData);
        onClose();
        setCategoryData({ name: "" })
      } catch (error) {
        console.error("Error occurred while adding category:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  if (error) return <h1>Error</h1>
  if (isLoading) return <TableSkeleton />
  return (
    <Box>
      <Box className="flex justify-end">
        <Box className="flex items-center justify-between flex-wrap">
          <h1 >
            <span className="text-black font-extrabold text-4xl font-sans">Categories</span><br />
            <span className="text-xl text-gray-600">All of Categories</span>
          </h1>
          <Button onClick={onOpen} bg={"#000"}
            color={"white"}
            _hover={{ bg: "#272626" }}>Add Category
          </Button>
        </Box>
        <CustomModal isOpen={isOpen} onClose={onClose} title="Create A Category">
          <form onSubmit={handleSubmit} className="p-0">
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Category name</FormLabel>
              <Input
                placeholder="Category name"
                onChange={onChangeHandler}
                value={categoryData.name}
                name="name"
                border={"1px solid #eee"}
                color={'#000'}
                pr="4.5rem"
                paddingRight="3rem"
                position="relative"
              />
              {errors.name && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <Box className="flex justify-end mt-4">
              <Button type="submit" bg={'black'} color={'white'} _hover={{ bg: 'black' }}>
                {LoadingAddCategory ? (
                  <>
                    Save <Spinner w={4} h={4} ml={2} />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </form>
        </CustomModal>
      </Box>
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
            onChange={onSearchChange}
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
          <TableCaption>Categories</TableCaption>
          <Thead bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Category Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchTerm.trim() === "" ? (
              fullData.length > 0 ? (
                fullData.map((data: ICategoryDataMap, i: number) => (
                  <Tr border="1px solid #eee" key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{data.name}</Td>
                    <Td>
                      <ActionCategory data={data} name={""} />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={3} textAlign={'center'}>
                    No data available
                  </Td>
                </Tr>
              )
            ) : (
              searchResults.length > 0 ? (
                searchResults.map((data: ICategoryDataMap, i: number) => (
                  <Tr border="1px solid #eee" key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{data.name}</Td>
                    <Td>
                      <ActionCategory data={data} name={""} />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={3} textAlign={'center'}>
                    No matching results found
                  </Td>
                </Tr>
              )
            )}

          </Tbody>
          <Tfoot bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Category Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
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
      </TableContainer>
    </Box>
  );
};

export default Category;
