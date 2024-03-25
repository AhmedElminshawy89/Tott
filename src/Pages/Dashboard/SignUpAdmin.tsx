/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CgClose } from "react-icons/cg";
import { ChangeEvent, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { IAdminData } from "../../Interface";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { selectRegisterAdmin, userRegister } from "../../app/feature/RegisterAdmin";
import { RootState } from "../../app/Store";
const SignUpAdmin = () => {
  type MyDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
  const dispatch = useDispatch<MyDispatch>();
  const { loading:isLoading } = useSelector(selectRegisterAdmin);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [adminData, setAdminData] = useState<IAdminData>({
    fname: "",
    lname: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    com_password: "",
    photo: null,
  });

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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevSubCategoryData) => ({
      ...prevSubCategoryData,
      [name]: value,
    }));
  
    const newErrors: { [key: string]: string } = { ...errors };
  
    if (name === "email") {
      if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = !value.trim() ? "Email is required" : "Invalid email address";
      } else {
        delete newErrors.email;
      }
    } else if (name === "password") {
      const isLengthValid = value.length >= 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      if (!value.trim() || !(isLengthValid && hasUppercase && hasLowercase && hasNumber)) {
        newErrors.password = !value.trim() ?
          "Password is required" :
          "Password must be at least 8 characters and meet additional criteria (uppercase, lowercase, number).";
      } else {
        delete newErrors.password;
      }
    } else if (name === "com_password" && value.trim() !== adminData.password?.trim()) {
      newErrors.com_password = "Passwords do not match";
    } else if (name === "fname") {
      newErrors.fname = value.trim() ? "" : "First name is required";
    } else if (name === "lname") {
      newErrors.lname = value.trim() ? "" : "Last name is required";
    } else if (name === "com_password") {
      newErrors.com_password = value.trim() ? "" : "Confirm Password is required";
    } else if (name === "phone") {
      newErrors.phone = value.trim() ? "" : "Phone is required";
    } else if (name === "gender") {
      newErrors.gender = value.trim() ? "" : "Gender is required";
    }
  
    setErrors(newErrors);
  };
  

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
    if (!adminData.password?.trim()) {
      newErrors.password = "Password is required";
    }
    if (!adminData.com_password?.trim()) {
      newErrors.com_password = "Confirm Password is required";
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
        const formData = new FormData();
        formData.append("fname", adminData.fname);
        formData.append("lname", adminData.lname);
        formData.append("email", adminData.email);
        formData.append("password", adminData.password || "");
        formData.append("com_password", adminData.com_password || "");        
        formData.append("phone", adminData.phone);
        formData.append("gender", adminData.gender);
        formData.append("photo", adminData.photo as Blob);
        // await AddAdmin(formData);
         dispatch(userRegister(formData as any));
      } catch (error) {
        console.error("Error adding city:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
      <form className="sign-up-form"  onSubmit={handleSubmit}>
        <Box className="flex gap-3 sm:flex-row flex-col">
          <FormControl mb={4}>
            <FormLabel >First Name</FormLabel>
            <Input
              placeholder="Course name"
              border={"1px solid #eee"}
              bg={'#eee'}
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
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last name"
              border={"1px solid #eee"}
              color={'#000'}
              bg={'#eee'}
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
            <FormLabel >Phone</FormLabel>
            <Input
              placeholder="Phone"
              border={"1px solid #eee"}
              color={'#000'}
              bg={'#eee'}
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
              onChange={(selectedOption, _) =>
                selectedOption && handleSelectChange(selectedOption, "gender")
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
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            border={"1px solid #eee"}
            color={'#000'}
            bg={'#eee'}
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
        <Box className="flex gap-3 sm:flex-row flex-col">
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              border={"1px solid #eee"}
              color={'#000'}
              bg={'#eee'}
              name="password"
              value={adminData.password}
              onChange={onChangeHandler}
            />
            {errors.password && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Confoirm Password</FormLabel>
            <Input
              placeholder="Confoirm Password"
              type="password"
              border={"1px solid #eee"}
              color={'#000'}
              bg={'#eee'}
              name="com_password"
              value={adminData.com_password}
              onChange={onChangeHandler}
            />
            {errors.com_password && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.com_password}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <FormLabel>Image</FormLabel>
        <div
          className="w-[100%] bg-[#eee] text-center  rounded-lg 
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
        <Box className="flex justify-center mt-4">
          <button
            type="submit"
            className="text-white  bg-main-400 px-4  py-2 rounded-lg duration-300  text-xl"
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
  );
};

export default SignUpAdmin;
