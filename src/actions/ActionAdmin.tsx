/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast, FormHelperText, useColorModeValue } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../Shared/CustomMpdal";
import DeleteCategoryDialog from "../Shared/AlertDialog";
import { FiUploadCloud } from "react-icons/fi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IAdminData, IAdminDataMap } from "../Interface";
import { useDelAdminMutation, useUpdateAdminMutation } from "../app/feature/AdminSlice";
import Select from "react-select";

interface ActionAdminProps {
    data: IAdminDataMap;
}

const ActionAdmin = ({ data }: ActionAdminProps) => {
    const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
    const [delAdmin, { isLoading: deleteLoading }] = useDelAdminMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const toast = useToast();

    const [adminData, setAdminData] = useState<IAdminData>({
        id: data.id,
        fname: data.fname,
        lname: data.lname,
        phone: data.phone,
        gender: data.gender,
        email: data.email,
        photo: data.photo,
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setAdminData((prevSubCategoryData) => ({
                ...prevSubCategoryData,
                photo: file,
            }));
        }
    };
    const handleSelectChange = (
        selectedOption: { label: string; value: string },
        type: string
    ) => {
        setAdminData((prevUser) => ({
            ...prevUser,
            [type]: selectedOption.value,
        }));
    };
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminData((prevSubCategoryData) => ({
            ...prevSubCategoryData,
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

        if (!adminData.fname.trim()) {
            newErrors.fname = "First name is required";
        }
        if (!adminData.lname.trim()) {
            newErrors.lname = "Last name is required";
        }
        if (!adminData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }
        if (!adminData.gender.trim()) {
            newErrors.gender = "Gender is required";
        }
        if (!adminData.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!adminData.photo) {
            newErrors.Image = "Image is required";
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                const formData = {
                    id: adminData.id,
                    fname: adminData.fname,
                    lname: adminData.lname,
                    phone: adminData.phone,
                    gender: adminData.gender,
                    email: adminData.email,
                    photo: adminData.photo,
                };
                await updateAdmin(formData);
                setIsModalOpen(false);
                setAdminData({id: "",
                    fname: "",
                    lname: "",
                    phone: "",
                    gender: "",
                    email: "",
                    password: "",
                    com_password: "",
                    photo: null, });
                setSelectedImage(null);
                toast({
                    title: "Admin Updated",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } 
             catch (error) {
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
            setAdminData({
                id: data.id,
                fname: data.fname,
                lname: data.lname,
                phone: data.phone,
                gender: data.gender,
                email: data.email,
                password: data.password,
                com_password: data.com_password,
                photo: data.photo,
            });
        }
    }, [data.com_password, data.email, data.fname, data.gender, data.id, data.lname, data.password, data.phone, data.photo, isModalOpen]);
    const onDeleteConfirm = async () => {
        setIsConfirmOpen(false);
        try {
            if (data.id) {
                await delAdmin(data.id as any);
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
                <form onSubmit={handleSubmit} className="p-0">
                    <Box className="flex gap-3 sm:flex-row flex-col">
                        <FormControl mb={4}>
                            <FormLabel color={'#000'}>First Name</FormLabel>
                            <Input
                                placeholder="Course name"
                                border={"1px solid #eee"}
                                color={'#000'}
                                name="fname"
                                value={adminData.fname}
                                onChange={onChangeHandler}
                            />
                            {errors.fname && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {errors.fname}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel
                                color={'#000'}>Last Name</FormLabel>
                            <Input
                                placeholder="Last name"
                                border={"1px solid #eee"}
                                color={'#000'}
                                name="lname"
                                value={adminData.lname}
                                onChange={onChangeHandler}
                            />
                            {errors.lname && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {errors.lname}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box className="flex gap-3 sm:flex-row flex-col">
                        <FormControl mb={4}>
                            <FormLabel color={"#000"}>Phone</FormLabel>
                            <Input
                                placeholder="Phone"
                                border={"1px solid #eee"}
                                color={'#000'}
                                name="phone"
                                value={adminData.phone}
                                onChange={onChangeHandler}
                            />
                            {errors.phone && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mt={'20px'}>
                            <Select
                                className="mt-[15px]"
                                name="gender"
                                value={
                                    adminData.gender
                                        ? { label: adminData.gender, value: adminData.gender }
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    handleSelectChange(selectedOption as { label: string; value: string }, "gender")
                                }
                                options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                ]}
                                placeholder="Select Gender"
                                isSearchable
                            />

                            {errors.gender && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {errors.gender}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <FormControl mb={4}>
                        <FormLabel color={'#000'}>Email</FormLabel>
                        <Input
                            placeholder="Email"
                            type="email"
                            border={"1px solid #eee"}
                            color={'#000'}
                            name="email"
                            value={adminData.email}
                            onChange={onChangeHandler}
                        />
                        {errors.email && (
                            <FormHelperText
                                color={"red.500"}
                                fontSize={"18px"}
                                fontWeight={"500"}
                            >
                                {errors.email}
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
                    <Box className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="text-white  bg-black px-4  py-2 rounded-lg duration-300  text-xl"
                        >
                            {isLoading ? (
                                <>
                                    Add Admin <Spinner w={4} h={4} ml={2} />
                                </>
                            ) : (
                                "Add Admin"
                            )}

                        </button>
                    </Box>
                </form>
            </CustomModal>
            <DeleteCategoryDialog isOpen={isConfirmOpen} onClose={onCloseConfirm} onDeleteConfirm={onDeleteConfirm} />
        </>
    );
};

export default ActionAdmin;
