/* eslint-disable react-hooks/rules-of-hooks */
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
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
  } from "@chakra-ui/react";
  import img from "../../assets/Images/Cities.png";
  import { CgClose } from "react-icons/cg";
  import { ChangeEvent, useCallback, useState } from "react";
  import { FiUploadCloud } from "react-icons/fi";
  import { BiEdit } from "react-icons/bi";
  import { MdOutlineDelete } from "react-icons/md";
import ModelDash from "../../Shared/ModalDash";
import { ICityData } from "../../Interface";
  
  const City = () => {
    const [cityData, setCityDataData] = useState<ICityData>({
      cityName: "",
      description: "",
      Image: null,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedImage(file);
        setCityDataData((prevCategoryData) => ({
          ...prevCategoryData,
          Image: file,
        }));
      }
    };
  
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCityDataData((prevCategoryData) => ({
        ...prevCategoryData,
        [name]: value,
      }));
    }, []);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors: { [key: string]: string } = {};
  
      if (!cityData.cityName.trim()) {
        newErrors.cityName = "City name is required";
      }
      if (!cityData.description.trim()) {
        newErrors.description = "Description is required";
      }
      if (!cityData.Image) {
        newErrors.Image = "Image is required";
      }
  
      if (Object.keys(newErrors).length === 0) {
        console.log(cityData);
      } else {
        setErrors(newErrors);
      }
    };
    return (
      <Box>
        <Box className="flex justify-end">
        <ModelDash
            ButtonName="Add City"
            title="Create A City"
          >
            <form onSubmit={handleSubmit} className="p-0">
              <FormControl mb={4}>
                <FormLabel color={'#000'}>City name</FormLabel>
                <Input
                  placeholder="City name"
                  onChange={onChangeHandler}
                  value={cityData.cityName}
                  name="cityName"
                  border={"1px solid #eee"}
                  color={'#000'}
                />
                {errors.cityName && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.cityName}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel color={'#000'}>Description</FormLabel>
                <Input
                  placeholder="Description"
                  onChange={onChangeHandler}
                  value={cityData.description}
                  name="description"
                  border={"1px solid #eee"}
                  color={'#000'}
                />
                {errors.description && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>
              <FormLabel>Image</FormLabel>
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
                  name="Image"
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
                {errors.Image && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.Image}
                  </FormHelperText>
                )}
              </FormControl>
              <Box  className="flex justify-end mt-4">
              <Button type="submit" bg={'black'} color={'white'} _hover={{bg:'black'}}>Save</Button> 
              </Box>
            </form>
          </ModelDash>
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
              <Tr border={'1px solid #eee'}>
                <Td>1</Td>
                <Td>Alexandria</Td>
                <Td>Lorem ipsum dolor sit amet ...</Td>
                <Td>
                  <Avatar src={img} />
                </Td>
                <Td>
                  <Box className="flex gap-2">
                    <Button> <BiEdit className=" cursor-pointer text-2xl text-black" /></Button>
                    <Button variant={"solid"} bg={'red'} _hover={{bg:'red'}} > <MdOutlineDelete className=" cursor-pointer text-2xl text-white" /></Button>
                  </Box>
                </Td>
              </Tr>
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
        </TableContainer>
      </Box>
    );
  };
  
  export default City;
  