/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useDelCategoryMutation, useUpdateCategoryMutation } from "../app/feature/CategorySlice";
import { ICategoryData, ICategoryDataMap } from "../Interface";
import CustomModal from "../Shared/CustomMpdal";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DeleteCategoryDialog from "../Shared/AlertDialog"

const ActionCategory = ({ data }: ICategoryDataMap) => {
  const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [delCategory, { isLoading: deleteLoading }] = useDelCategoryMutation();
  const [categoryData, setCategoryData] = useState<ICategoryData>({
    id: String(data.id), 
    name: data.name,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const toast = useToast();

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
        await updateCategory(categoryData);
        setIsModalOpen(false);
        setCategoryData({ id: "", name: "" }); 
        toast({
          title: "Category Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error occurred while adding category:", error);
        toast({
          title: "Error",
          description: "Failed to update category. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCategory = () => {
    setIsConfirmOpen(true);
  };

  const onCloseConfirm = () => {
    setIsConfirmOpen(false);
  };
  useEffect(() => {
    if (!isModalOpen) {
      setCategoryData({ id:data.id, name: data.name });
    }
  }, [data.id, data.name, isModalOpen]);
  const onDeleteConfirm = async () => {
    setIsConfirmOpen(false);
    try {
      if (data.id) {
        await delCategory(data.id as any); 
        toast({
          title: "Category Deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error occurred while deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box className="flex gap-2">
        <Button onClick={handleOpenModal}>
          <BiEdit className="cursor-pointer text-2xl text-black" />
        </Button>
        <Button variant={"solid"} bg={'red'} _hover={{ bg: 'red' }} onClick={handleDeleteCategory}>
          {deleteLoading ? <Spinner color="white" /> : <MdOutlineDelete className="cursor-pointer text-2xl text-white" />}
        </Button>
      </Box>
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Category">
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
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </FormControl>
          <Box className="flex justify-end mt-4">
            <Button type="submit" bg={'black'} color={'white'} _hover={{ bg: 'black' }}>
              {updateLoading ? (
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
      <DeleteCategoryDialog isOpen={isConfirmOpen} onClose={onCloseConfirm} onDeleteConfirm={onDeleteConfirm} />
    </>
  );
};

export default ActionCategory;
