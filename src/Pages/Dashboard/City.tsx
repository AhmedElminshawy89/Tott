/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
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
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { ICityData, ICityDataMap } from "../../Interface";
import CustomModal from "../../Shared/CustomMpdal";
import { useAddCityMutation, useFetchCityQuery } from "../../app/feature/CitySlice";
import TableSkeleton from "./TableSkeleton";
import ActionCity from "../../actions/ActionCity";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../Shared/Pagination";

const City = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error } = useFetchCityQuery("");
  const [addCity, { isLoading: LoadingAddCity }] = useAddCityMutation();
  const [cityData, setCityDataData] = useState<ICityData>({
    city_id: "",
    desc: "",
    photo: null,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchResults, setSearchResults] = useState<ICityDataMap[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(data?.Cities?.data || []);
      return;
    }
    const filteredData = data?.Cities?.data.filter((item: ICityDataMap) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData || []);
  }, [data, searchTerm]);
  
  const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setCityDataData((prevCategoryData) => ({
        ...prevCategoryData,
        photo: file,
      }));
    }
  };

const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCityDataData((prevCityData) => ({
      ...prevCityData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  }, [errors]);
  const onChangeSearchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);

  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!cityData.city_id.trim()) {
      newErrors.name = "City name is required";
    } else if (cityData.city_id.trim().length < 2) {
      newErrors.name = "City name should be at least 2 characters long";
    }

    if (!cityData.desc.trim()) {
      newErrors.desc = "Description is required";
    } else if (cityData.desc.trim().length < 2) {
      newErrors.desc = "Description should be at least 2 characters long";
    }

    if (!cityData.photo) {
      newErrors.photo = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", cityData.city_id);
      formData.append("desc", cityData.desc);
      formData.append("photo", cityData.photo as Blob);

      try {
        await addCity(formData);

        setCityDataData({
          city_id: "",
          desc: "",
          photo: null,
        });
        setSelectedImage(null);
        onClose();
      } catch (error) {
        console.error("Error adding city:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (error) return <h1>Error</h1>;
  if (isLoading) return <TableSkeleton />;
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  return (
    <Box>
      <Box className="flex justify-end">
        <Box className="flex items-center justify-between flex-wrap">
          <h1 >
            <span className="text-black font-extrabold text-4xl font-sans">Cities</span><br />
            <span className="text-xl text-gray-600">All of Cities</span>
          </h1>
          <Button onClick={onOpen} bg={"#000"}
            color={"white"}
            _hover={{ bg: "#272626" }}>Add Category
          </Button>
        </Box>
        <CustomModal isOpen={isOpen} onClose={onClose} title="Create A City">
          <form onSubmit={handleSubmit} className="p-0">
            <FormControl mb={4}>
              <FormLabel color={'#000'}>City name</FormLabel>
              <Input
                placeholder="City name"
                onChange={onChangeHandler}
                value={cityData.city_id}
                name="city_id"
                border={"1px solid #eee"}
                color={'#000'}
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
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Description</FormLabel>
              <Input
                placeholder="Description"
                onChange={onChangeHandler}
                value={cityData.desc}
                name="desc"
                border={"1px solid #eee"}
                color={'#000'}
              />
              {errors.desc && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.desc}
                </FormHelperText>
              )}
              <FormLabel>Image</FormLabel>
            </FormControl>
            <div
              className="w-[100%] bg-transparent text-center  rounded-lg 
        flex flex-col justify-center items-center border-2 border-dotted border-[#eee]"
            >
              {selectedImage ? (
                <div className="relative  py-5">
                  <img
                    className="w-[100%] h-[160px]"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                  />
                  <p
                    onClick={() => setSelectedImage(null)}
                    className="cursor-pointer w-[25px] h-[25px] absolute top-2 -right-4 w-25 h-25 bg-[#000] text-white rounded-bl-xl rounded-tr-xl flex justify-center items-center"
                  >
                    <CgClose />
                  </p>
                </div>
              ) : (
                <>
                  <FormControl>
                    <Input
                      height="423%"
                      opacity={0}
                      type="file"
                      className="v"
                      placeholder="photo"
                      name="photo"
                      onChange={onChangeHandlerImg}
                      bg={useColorModeValue("transparent", "transparent")}
                      autoComplete="off"
                    />
                  </FormControl>
                  <p className="text-2xl font-medium text-black">Upload Image</p>
                  <em className=" text-gray-500">
                    (Upload only jpg, jpeg, and png images, please)
                  </em>
                  <FiUploadCloud className="mb-8 mt-4 text-2xl text-black" />
                </>
              )}
            </div>
            <FormControl>
              {errors.photo && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.photo}
                </FormHelperText>
              )}
            </FormControl>
            <Box className="flex justify-end mt-4">
              <Button type="submit" bg={'black'} color={'white'} _hover={{ bg: 'black' }}>
                {LoadingAddCity ? (
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
            onChange={onChangeSearchHandler}
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
          <TableCaption>City</TableCaption>
          <Thead bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Category Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchResults.length > 0 ? (
              searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data: ICityDataMap, i: number) => (
                <Tr border="1px solid #eee" key={i}>
                  <Td>{i+1}</Td>
                  <Td>{data.name}</Td>
                  <Td>{data?.desc}</Td>
                  <Td>
                    <Avatar src={data.photo} />
                  </Td>
                  <Td>
                    <ActionCity data={data} name={""} desc={""} photo={undefined} />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign={'center'}>
                  {searchTerm ? "No matching results found" : "No data available"}
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Category Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
        {totalPages > 1 && (
          <Box className="flex justify-center my-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default City;
