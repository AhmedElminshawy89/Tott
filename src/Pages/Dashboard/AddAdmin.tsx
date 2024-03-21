/* eslint-disable @typescript-eslint/no-unused-vars */
import { CgClose } from "react-icons/cg";
import { ChangeEvent, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { IAdminData } from "../../Interface";
const AddAdmin = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [adminData, setAdminData] = useState<IAdminData>({
    FName: "",
    LName: "",
    Phone: "",
    Age: "",
    Email: "",
    Password: "",
    com_password: "",
    Image: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setAdminData((prevSubCategoryData) => ({
        ...prevSubCategoryData,
        Image: file,
      }));
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevSubCategoryData) => ({
      ...prevSubCategoryData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!adminData.FName.trim()) {
      newErrors.FName = "First name is required";
    }
    if (!adminData.LName.trim()) {
      newErrors.LName = "Last name is required";
    }
    if (!adminData.Phone.trim()) {
      newErrors.Phone = "Phone is required";
    }
    if (!adminData.Password.trim()) {
      newErrors.Password = "Password is required";
    }
    if (!adminData.com_password.trim()) {
      newErrors.com_password = "Confirm Password is required";
    }
    if (!adminData.Age.trim()) {
      newErrors.Age = "Age Password is required";
    }
    if (!adminData.Email.trim()) {
      newErrors.Email = "Email Password is required";
    }
    if (!adminData.Image) {
      newErrors.Image = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log(adminData);
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <Box className="flex flex-col text-2xl  rounded-xl ">
      <form onSubmit={handleSubmit} className="p-0">
        <Box className="flex gap-3 sm:flex-row flex-col">
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Course name"
              border={"1px solid"}
              name="FName"
              value={adminData.FName}
              onChange={onChangeHandler}
            />
            {errors.FName && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.FName}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last name"
              border={"1px solid"}
              name="LName"
              value={adminData.LName}
              onChange={onChangeHandler}
            />
            {errors.LName && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.LName}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box className="flex gap-3 sm:flex-row flex-col">
          <FormControl mb={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              placeholder="Phone"
              border={"1px solid"}
              name="Phone"
              value={adminData.Phone}
              onChange={onChangeHandler}
            />
            {errors.Phone && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.Phone}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Age</FormLabel>
            <Input
              placeholder="Age"
              border={"1px solid"}
              name="Age"
              value={adminData.Age}
              onChange={onChangeHandler}
            />
            {errors.Age && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.Age}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            border={"1px solid"}
            name="Email"
            value={adminData.Email}
            onChange={onChangeHandler}
          />
          {errors.Email && (
            <FormHelperText
              color={"red.500"}
              fontSize={"18px"}
              fontWeight={"500"}
            >
              {errors.Email}
            </FormHelperText>
          )}
        </FormControl>
        <Box className="flex gap-3 sm:flex-row flex-col">
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              border={"1px solid"}
              name="Password"
              value={adminData.Password}
              onChange={onChangeHandler}
            />
            {errors.Password && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.Password}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Confoirm Password</FormLabel>
            <Input
              placeholder="Confoirm Password"
              type="password"
              border={"1px solid"}
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
          className="w-[100%] bg-transparent text-center  rounded-lg 
        flex flex-col justify-center items-center border-2 border-dotted border-primary"
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
              <p className="text-2xl font-medium">Upload Image</p>
              <em className=" text-gray-500">
                (Upload only jpg, jpeg, and png images, please)
              </em>
              <FiUploadCloud className="mb-8 mt-4 text-2xl" />
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
            Add Admin
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default AddAdmin;
