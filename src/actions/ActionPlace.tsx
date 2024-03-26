/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, Input, Spinner, useToast, FormHelperText, useColorModeValue, Select, FormLabel, Textarea } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../Shared/CustomMpdal";
import DeleteCategoryDialog from "../Shared/AlertDialog";
import { FiUploadCloud } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { IPlaceData, IPlaceDataMap } from "../Interface";
import React from "react";
import { useDelPlaceMutation, useUpdatePlaceMutation } from "../app/feature/PlaceSlice";
import { useFetchCategoryQuery } from "../app/feature/CategorySlice";
import { useFetchCityQuery } from "../app/feature/CitySlice";

const ActionPlace = ({ dataPlace }: IPlaceDataMap) => {
    const { data: CategoryData } = useFetchCategoryQuery("")
    const { data: CityData } = useFetchCityQuery(1);
    const [updatePlace, { isLoading }] = useUpdatePlaceMutation();
    const [delPlace, { isLoading: deleteLoading }] = useDelPlaceMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const toast = useToast();
    const [placeData, setPlaceData] = useState<IPlaceData>({
        id: String(dataPlace.id),
        name: dataPlace.name || "",
        desc: dataPlace.desc,
        city_id: String(dataPlace.city_id),
        photo: dataPlace.photo,
        category_name: dataPlace.category_name,
        longitude: dataPlace.longitude,
        latitude: dataPlace.latitude,
    });
    const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPlaceData((prevCourseData) => ({
                ...prevCourseData,
                photo: file,
            }));
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlaceData((prevCourseData) => ({
            ...prevCourseData,
            [name]: value,
        }));
    };
    const onChangeHandlerTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlaceData((prevCourseData) => ({
            ...prevCourseData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        if (!placeData.name.trim()) {
            newErrors.placeName = "Place name is required";
        }
        if (!placeData.city_id.trim()) {
            newErrors.cityName = "City name is required";
        }
        if (!placeData.category_name.trim()) {
            newErrors.categoryName = "Category name is required";
        }
        if (!placeData.desc.trim()) {
            newErrors.description = "Description is required";
        }
        if (!placeData.longitude.trim()) {
            newErrors.longitude = "Longitude is required";
        }
        if (!placeData.latitude.trim()) {
            newErrors.latitude = "Latitude is required";
        }
        if (!placeData.photo) {
            newErrors.Image = "Image is required";
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                const formDataFormatted = new FormData();
                for (const key in placeData) {
                    if (Object.prototype.hasOwnProperty.call(placeData, key)) {
                        formDataFormatted.append(key, placeData[key] as string | Blob);
                    }
                }
                await updatePlace(formDataFormatted);
                setIsModalOpen(false);
                setSelectedImage(null);
                setPlaceData({
                    id: "",
                    name: "",
                    desc: "",
                    city_id: "",
                    photo: "",
                    category_name: "",
                    longitude: "",
                    latitude: ""
                });
                toast({
                    title: "Place Updated",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                console.error("Error adding place:", error);
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
            setPlaceData({
                id: String(dataPlace.id),
                name: dataPlace.name || "",
                desc: dataPlace.desc,
                city_id: String(dataPlace.city_id),
                photo: dataPlace.photo,
                category_name: dataPlace.category_name,
                longitude: String(dataPlace.longitude),
                latitude: String(dataPlace.latitude)
            });
        }
    }, [dataPlace.category_name, dataPlace.city_id, dataPlace.desc, dataPlace.id, dataPlace.latitude, dataPlace.longitude, dataPlace.name, dataPlace.photo, isModalOpen]);
    const onDeleteConfirm = async () => {
        setIsConfirmOpen(false);
        try {
            if (dataPlace.id) {
                await delPlace(dataPlace.id as any);
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
            <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Admin">
                <form onSubmit={handleSubmit} className="p-0 block">
                    <>
                        <Box className="flex gap-3 sm:flex-row flex-col">
                            <FormControl mb={4}>
                                <FormLabel color={'#000'}>Place name</FormLabel>
                                <Input
                                    placeholder="Place name"
                                    border={"1px solid #eee"}
                                    color={'#000'}
                                    name="name"
                                    value={placeData.name}
                                    onChange={onChangeHandler}
                                />
                                {errors.placeName && (
                                    <FormHelperText
                                        color={"red.500"}
                                        fontSize={"18px"}
                                        fontWeight={"500"}
                                    >
                                        {errors.placeName}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel color={'#000'}>Category</FormLabel>
                                <Select
                                    border={"1px solid #eee"}
                                    color={'#000'}
                                    placeholder="Select Category"
                                    value={placeData.category_name}
                                    onChange={(e) => setPlaceData((prevData) => ({
                                        ...prevData,
                                        category_name: e.target.value
                                    }))}
                                >
                                    {CategoryData && CategoryData.Categories && CategoryData.Categories.data.map((data: { name: string }, i: number) => (
                                        <option key={i} value={data.name}>
                                            {data.name}
                                        </option>
                                    ))}
                                </Select>

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
                            <FormControl mb={4}>
                                <FormLabel color={'#000'}>City Name</FormLabel>
                                <Select
                                    placeholder="Select City"
                                    border={"1px solid #eee"}
                                    color={'#000'}
                                    value={placeData.city_id}
                                    onChange={(e) => setPlaceData((prevData) => ({
                                        ...prevData,
                                        city_id: e.target.value
                                    }))}
                                >
                                    {CityData && CityData.Cities && CityData.Cities.data.map((data: { id: string, name: string }, i: number) => (
                                        <option key={i} value={data.id}>{data.name}</option>
                                    ))}
                                </Select>
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
                        </Box>
                        <Box className="flex gap-3 sm:flex-row flex-col">
                            <FormControl mb={4}>
                                <FormLabel color={'#000'}>Longitude</FormLabel>
                                <Input
                                    placeholder="Location"
                                    border={"1px solid #eee"}
                                    color={'#000'}
                                    name="longitude"
                                    value={placeData.longitude}
                                    onChange={onChangeHandler}
                                />
                                {errors.longitude && (
                                    <FormHelperText
                                        color={"red.500"}
                                        fontSize={"18px"}
                                        fontWeight={"500"}
                                    >
                                        {errors.longitude}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel color={'#000'}>Latitude</FormLabel>
                                <Input
                                    placeholder="Location"
                                    border={"1px solid #eee"}
                                    color={'#000'}
                                    name="latitude"
                                    value={placeData.latitude}
                                    onChange={onChangeHandler}
                                />
                                {errors.latitude && (
                                    <FormHelperText
                                        color={"red.500"}
                                        fontSize={"18px"}
                                        fontWeight={"500"}
                                    >
                                        {errors.latitude}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                        <FormControl mb={4}>
                            <FormLabel color={'#000'}>Description</FormLabel>
                            <Textarea
                                resize={"none"}
                                height={"100px"}
                                placeholder="Description"
                                border={"1px solid #eee"}
                                color={'#000'}
                                name="desc"
                                value={placeData.desc}
                                onChange={onChangeHandlerTextarea}
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
                        <FormLabel color={'#000'}>Image</FormLabel>
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
                    </>
                    <Box className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="text-white bg-black px-4  py-2 rounded-lg duration-300  text-xl"
                        >
                            {isLoading ? (
                                <>
                                    Add Place <Spinner w={4} h={4} ml={2} />
                                </>
                            ) : (
                                "Add Place"
                            )}

                        </button>
                    </Box>
                </form>
            </CustomModal>
            <DeleteCategoryDialog isOpen={isConfirmOpen} onClose={onCloseConfirm} onDeleteConfirm={onDeleteConfirm} />
        </>
    );
};

export default ActionPlace;
