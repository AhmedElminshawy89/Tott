/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast, FormHelperText, useColorModeValue, Flex } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../Shared/CustomMpdal";
import DeleteCategoryDialog from "../Shared/AlertDialog";
import { FiUploadCloud } from "react-icons/fi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IUserData, IUserDataMap } from "../Interface";
import Select from "react-select";
import React from "react";
import { countryList } from "../assets/data/Countries";
import { cities } from "../assets/data/Cities";
import { useDelUserMutation, useUpdateUserMutation } from "../app/feature/UserSlice";

const ActionUser = ({ data }: IUserDataMap) => {
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [delUser, { isLoading: deleteLoading }] = useDelUserMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const toast = useToast();
    const [isEmail, setIsEmail] = useState<boolean | string>(false);
    const [isPassword, setIsPassword] = useState<boolean | string>(false);
    const [isFName, setIsFName] = useState<boolean | string>(false);
    const [isLName, setIsLName] = useState<boolean | string>(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState<boolean | string>(
        false
    );
    const [isPhone, setIsPhone] = useState<boolean | string>(false);
    const [isAge, setIsAge] = useState<boolean | string>(false);
    const [isGender, setIsGender] = useState<boolean | string>(false);
    const [user, setUser] = React.useState<IUserData>({
        id: String(data.id),
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        city: data.city,
        country: data.country,
        photo: data.photo,
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setUser((prevUser) => ({ ...prevUser, photo: file }));
        }
    };
    const handleSelectChange = (
        selectedOption: { label: string; value: string },
        type: string
    ) => {
        setUser((prevUser) => ({
            ...prevUser,
            [type]: selectedOption.value,
        }));
    };
    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            setUser((prevUser) => ({ ...prevUser, [name]: value }));

            if (name === "email") {
                if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
                    setIsEmail(
                        !value.trim() ? "Email is required" : "Invalid email address"
                    );
                } else {
                    setIsEmail(false);
                }
            } else if (name === "password") {
                const isLengthValid = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasNumber = /\d/.test(value);
                if (
                    !value.trim() ||
                    !(isLengthValid && hasUppercase && hasLowercase && hasNumber)
                ) {
                    setIsPassword(
                        !value.trim()
                            ? "Password is required"
                            : "Password must be at least 8 characters and meet additional criteria (uppercase, lowercase, number)."
                    );
                } else {
                    setIsPassword(false);
                }
            } else if (name === "fname") {
                setIsFName(value.trim() ? false : "First name is required");
            } else if (name === "lname") {
                setIsLName(value.trim() ? false : "Last name is required");
            } else if (name === "com_password") {
                setIsConfirmPassword(
                    value.trim() ? false : "Confirm Password is required"
                );
            } else if (name === "phone") {
                setIsPhone(value.trim() ? false : "Phone is required");
            } else if (name === "gender") {
                setIsGender(value.trim() ? false : "Gender is required");
            } else if (name === "age") {
                setIsAge(value.trim() ? false : "Age is required");
            }
        },
        []
    );

    const onBlurHandler = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            if (name === "email") {
                if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
                    setIsEmail(
                        !value.trim() ? "Email is required" : "Invalid email address"
                    );
                } else {
                    setIsEmail(false);
                }
            } else if (name === "fname") {
                setIsFName(value.trim() ? false : "First name is required");
            } else if (name === "lname") {
                setIsLName(value.trim() ? false : "Last name is required");
            } else if (name === "com_password") {
                setIsConfirmPassword(
                    value.trim() ? false : "Confirm Password is required"
                );
            } else if (name === "phone") {
                setIsPhone(value.trim() ? false : "Phone is required");
            } else if (name === "gender") {
                setIsGender(value.trim() ? false : "Gender is required");
            } else if (name === "age") {
                setIsAge(value.trim() ? false : "Age is required");
            }
        },
        []
    );
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();

            if (!user.email.trim()) {
                setIsEmail("Email is required");
            }
            if (!user.fname.trim()) {
                setIsFName("First name is required");
            }
            if (!user.lname.trim()) {
                setIsLName("Last name is required");
            }
            if (!user.age.toString().trim()) {
                setIsAge("Age is required");
            }
            if (!user.gender.trim()) {
                setIsGender("Gender is required");
            }
            if (!user.phone.trim()) {
                setIsPhone("Phone is required");
                return;
            }
            updateUser(user);
            setIsModalOpen(false);
            setUser({
                id: "",
                fname: "",
                lname: "",
                email: "",
                phone: "",
                age: "",
                gender: "",
                city: "",
                country: "",
                photo: null,
             });
            setSelectedImage(null);
            toast({
                title: "User Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        [toast, updateUser, user]
    );

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
            setUser({
                id: String(data.id),
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                phone: data.phone,
                age: data.age,
                gender: data.gender,
                city: data.city,
                country: data.country,
                photo: data.photo,
            });
        }
    }, [data.age, data.city, data.country, data.email, data.fname, data.gender, data.id, data.lname, data.phone, data.photo, isModalOpen]);
    const onDeleteConfirm = async () => {
        setIsConfirmOpen(false);
        try {
            if (data.id) {
                await delUser(data.id as any);
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
                    <Flex w={"100%"} justifyContent={"space-between"} gap={"12px"}>
                        <FormControl mb={'4'}>
                            <FormLabel color={'#000'}>First Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Fname"
                                name="fname"
                                isInvalid={!!isFName}
                                onBlur={onBlurHandler}
                                value={user.fname}
                                onChange={onChangeHandler}
                                autoComplete="off"
                                border={"1px solid #eee"}
                                color={'#000'} />
                            {isFName && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {isFName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl mb={'4'}>
                            <FormLabel color={'#000'}>Last Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Lname"
                                name="lname"
                                isInvalid={!!isLName}
                                onBlur={onBlurHandler}
                                value={user.lname}
                                onChange={onChangeHandler}
                                autoComplete="off"
                                border={"1px solid #eee"}
                                color={'#000'}
                            />
                            {isFName && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {isFName}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Flex>
                    <Flex w={"100%"} justifyContent={"space-between"} gap={"12px"}>
                        <FormControl>
                            <FormLabel color={'#000'}>Age</FormLabel>

                            <Input
                                type="text"
                                placeholder="age"
                                name="age"
                                isInvalid={!!isAge}
                                onBlur={onBlurHandler}
                                value={user.age}
                                onChange={onChangeHandler}
                                autoComplete="off"
                                border={"1px solid #eee"}
                                color={'#000'}
                            />
                            {isAge && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {isAge}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                className="mt-[-2px]"
                                name="gender"
                                value={
                                    user.gender ? { label: user.gender, value: user.gender } : null
                                }
                                onChange={(selectedOption) =>
                                    selectedOption && handleSelectChange(selectedOption, "gender")
                                }
                                options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                ]}
                                placeholder="Select Gender"
                                isSearchable

                            />
                            {isGender && (
                                <FormHelperText
                                    color={"red.500"}
                                    fontSize={"18px"}
                                    fontWeight={"500"}
                                >
                                    {isGender}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Flex>
                    <Flex w={"100%"} justifyContent={"space-between"} gap={"12px"}>
                        <FormControl>
                            <FormLabel>Country</FormLabel>

                            <Select
                                className="mt-[-2px]"
                                name="country"
                                value={
                                    user.country ? { label: user.country, value: user.country } : null
                                }
                                onChange={(selectedOption) =>
                                    selectedOption && handleSelectChange(selectedOption, "country")
                                }
                                options={countryList.map((country) => ({
                                    label: country,
                                    value: country,
                                }))}
                                placeholder="Select Country"
                                isSearchable
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>

                            <Select
                                className="mt-[-2px]"
                                name="city"
                                value={user.city ? { label: user.city, value: user.city } : null}
                                onChange={(selectedOption) =>
                                    selectedOption && handleSelectChange(selectedOption, "city")
                                }
                                options={
                                    cities[user.country]
                                        ? cities[user.country].map((city) => ({
                                            label: city,
                                            value: city,
                                        }))
                                        : []
                                }
                                placeholder="Select City"
                                isSearchable
                            />
                        </FormControl>
                    </Flex>
                    <FormControl>
                        <FormLabel color={'#000'}>Phone</FormLabel>

                        <Input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            isInvalid={!!isPhone}
                            onBlur={onBlurHandler}
                            value={user.phone}
                            onChange={onChangeHandler}
                            autoComplete="off"
                            border={"1px solid #eee"}
                            color={'#000'}
                        />
                        {isPhone && (
                            <FormHelperText
                                color={"red.500"}
                                fontSize={"18px"}
                                fontWeight={"500"}
                            >
                                {isPhone}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#000'}>Email</FormLabel>

                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            isInvalid={!!isEmail}
                            onBlur={onBlurHandler}
                            value={user.email}
                            onChange={onChangeHandler}
                            autoComplete="off"
                            border={"1px solid #eee"}
                            color={'#000'}
                        />
                        {isEmail && (
                            <FormHelperText
                                color={"red.500"}
                                fontSize={"18px"}
                                fontWeight={"500"}
                            >
                                {isEmail}
                            </FormHelperText>
                        )}
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
                    <Box className="flex justify-end">
                        <Button
                            className="flex justify-end items-end"
                            type="submit"
                            mt={"25px"}
                            bg={
                                isEmail ||
                                    isPassword ||
                                    isConfirmPassword ||
                                    isGender ||
                                    isFName ||
                                    isAge ||
                                    isPhone
                                    ? "red.500"
                                    : useColorModeValue("black", "black")
                            }
                            color={"white"}
                            _hover={{
                                bg:
                                    isEmail ||
                                        isPassword ||
                                        isConfirmPassword ||
                                        isGender ||
                                        isFName ||
                                        isAge ||
                                        isPhone
                                        ? "red.400"
                                        : useColorModeValue("black", "black"),
                            }}
                        >
                            {isLoading ? (
                                <>
                                    Save
                                    <Spinner size="sm" color="white" />
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

export default ActionUser;
