/* eslint-disable no-dupe-else-if */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, Spinner, Text, useToast } from "@chakra-ui/react";
import log from "../../assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import eye from "../../assets/Images/eye.png";
import reWrite from "../../assets/Images/reWrite.png";
import { motion } from "framer-motion";
import React, { ChangeEvent, useCallback, useState ,useEffect} from "react";
import {
  Input,
  FormHelperText,
  Button,
  FormControl,
  useColorModeValue,
  Flex,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { UserSignUp } from "../../Interface";
import { FiUploadCloud } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { countryList } from "../../assets/data/Countries";
import Select from "react-select";
import { cities } from "../../assets/data/Cities";
import { useUpdateUserMutation } from "../../app/feature/UserSlice";
import CustomModal from "../../Shared/CustomMpdal";

const PersonalInf = () => {
  const GetData = localStorage.getItem("username");
  const userData = GetData ? JSON.parse(GetData) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const toast = useToast();
  const [isEmail, setIsEmail] = useState<boolean | string>(false);
  const [isFName, setIsFName] = useState<boolean | string>(false);
  const [isLName, setIsLName] = useState<boolean | string>(false);
  const [isPhone, setIsPhone] = useState<boolean | string>(false);
  const [isAge, setIsAge] = useState<boolean | string>(false);
  const [isGender, setIsGender] = useState<boolean | string>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [user, setUser] = React.useState<UserSignUp>({
    id: String(userData.id) || "",
    fname: userData.fname || "",
    lname: userData.lname || "",
    email: userData.email || "",
    phone: userData.phone || "",
    age: userData.age || "",
    gender: userData.gender || "",
    city: userData.city || "",
    country: userData.country || "",
    photo: userData.photo || null,
  });

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
      }
      else if (name === "fname") {
        setIsFName(value.trim() ? false : "First name is required");
      } else if (name === "lname") {
        setIsLName(value.trim() ? false : "Last name is required");
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
    const formDataFormatted = new FormData();
    for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
            formDataFormatted.append(key, user[key] as string | Blob);
        }
    }
    updateUser(formDataFormatted);
      localStorage.setItem("username", JSON.stringify(user))
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
      setIsModalOpen(false);
      toast({
        title: `User Updated`,
        description: `${userData.fname} Your Information is Updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast, updateUser, user, userData.fname]
  );
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setUser({
        id: String(userData.id) || "",
        fname: userData.fname || "",
        lname: userData.lname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        age: userData.age || "",
        gender: userData.gender || "",
        city: userData.city || "",
        country: userData.country || "",
        photo: userData.photo || null,
      })
    }
  }, [isModalOpen, userData.age, userData.city, userData.country, userData.email, userData.fname, userData.gender, userData.id, userData.lname, userData.phone, userData.photo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duratio: 1 }}
    >
      <Box>
        <Image
          src={eye}
          w={65}
          h={115}
          position={"absolute"}
          bottom={5}
          right={4}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"120%"}
          >
            <Text
              className=" md:text-4xl text-2xl text-main-400"
              fontWeight={900}
            >
              {userData.fname} {""}
              {userData.lname}
            </Text>
            <Box position={"absolute"} top={85} right={15}>
              <Button onClick={handleOpenModal} bg={'transparent'} _hover={{bg:'transparent'}}>
                <Image
                  src={reWrite}
                  w={35}
                  h={35}
                />
              </Button>
              <CustomModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Edit User"
              >
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
            </Box>
          </Flex>
          <Box as={NavLink} to="/" w={100}>
            <Image
              src={log}
              w={50}
              h={50}
              display={{ base: "none", md: "flex" }}
              margin={"14px"}
            />
          </Box>
        </Flex>
        <Box maxW={{ base: "100%", md: "80%" }} mt={"20px"}>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              First name
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.fname}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Last name
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.lname}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Email
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4 break-all">
              {userData.email}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Phone
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4">
              {userData.phone}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Age
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.age}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Gender
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.gender}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              Country
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.country}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text className="md:text-3xl text-2xl text-[#737373] mt-4  break-all">
              City
            </Text>
            <Text className="md:text-3xl text-2xl text-main-400 mt-4  break-all">
              {userData.city}
            </Text>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PersonalInf;
