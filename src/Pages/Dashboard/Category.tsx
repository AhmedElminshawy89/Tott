/* eslint-disable react-hooks/rules-of-hooks */
import {
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
    // useColorModeValue,
  } from "@chakra-ui/react";
  import { ChangeEvent, useCallback, useState } from "react";
  import { BiEdit } from "react-icons/bi";
  import { MdOutlineDelete } from "react-icons/md";
import ModelDash from "../../Shared/ModalDash";
import { ICategoryData } from "../../Interface";
  
  const Category = () => {
    const [categoryData, setCategoryData] = useState<ICategoryData>({
      categoryName: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCategoryData((prevCategoryData) => ({
        ...prevCategoryData,
        [name]: value,
      }));
    }, []);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors: { [key: string]: string } = {};
  
      if (!categoryData.categoryName.trim()) {
        newErrors.categoryName = "Category name is required";
      }  
      if (Object.keys(newErrors).length === 0) {
        console.log(categoryData);
      } else {
        setErrors(newErrors);
      }
    };
    return (
      <Box>
        <Box className="flex justify-end">
          <ModelDash
            ButtonName="Add Category"
            title="Create A Category"
            handleSubmit={handleSubmit}
          >
            <>
              <FormControl mb={4}>
                <FormLabel>Category name</FormLabel>
                <Input
                  placeholder="Course name"
                  onChange={onChangeHandler}
                  value={categoryData.categoryName}
                  name="categoryName"
                />
                {errors.categoryName && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.categoryName}
                  </FormHelperText>
                )}
              </FormControl>
            </>
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
          <Table variant="simple">
            <TableCaption>Categories</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Category Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Primary</Td>
                <Td>
                  <Box className="flex gap-2">
                    <Button> <BiEdit className=" cursor-pointer text-2xl text-black" /></Button>
                    <Button variant={"solid"} bg={'red'} _hover={{bg:'red'}} > <MdOutlineDelete className=" cursor-pointer text-2xl text-white" /></Button>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
              <Th>ID</Th>
                <Th>Category Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default Category;
  