/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast, FormHelperText, useColorModeValue } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../Shared/CustomMpdal";
import DeleteCategoryDialog from "../Shared/AlertDialog";
import { useDelCityMutation, useUpdateCityMutation } from "../app/feature/CitySlice";
import { ICityData, ICityDataMap } from "../Interface";
import { FiUploadCloud } from "react-icons/fi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const ActionCity = ({ data }: ICityDataMap) => {
    const [updateCity, { isLoading: updateLoading }] = useUpdateCityMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delCity, { isLoading: deleteLoading }] = useDelCityMutation();
    const [cityData, setCityDataData] = useState<ICityData>({
        id: String(data.id),
        city_id: data.name,
        desc: data.desc,
        photo: data.photo,
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const toast = useToast();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onChangeHandlerImg = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setCityDataData((prevCategoryData) => ({
                ...prevCategoryData,
                photo: file,
            }));
        }
    }, []);

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
    }, [errors, setErrors]);

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
            try {
                const formData = {
                    id: cityData.id,
                    name: cityData.city_id,
                    desc: cityData.desc,
                    photo: selectedImage,
                };
                await updateCity(formData);
                setIsModalOpen(false);
                setCityDataData({ id: "", city_id: "", desc: "", photo: null });
                setSelectedImage(null);
                toast({
                    title: "City Updated",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                console.error("Error adding city:", error);
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
            setCityDataData({ id: data.id, city_id: data.name, desc: data.desc, photo: data.photo });
        }
    }, [data.desc, data.id, data.name, data.photo, isModalOpen]);
    const onDeleteConfirm = async () => {
        setIsConfirmOpen(false);
        try {
            if (data.id) {
                await delCity(data.id as any);
                console.log(data.id, "deleted")
                toast({
                    title: "City Deleted",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete City. Please try again later.",
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

export default ActionCity;
