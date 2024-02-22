/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent, useCallback, useState } from "react";
import {
  Input,
  FormHelperText,
  Button,
  Text,
  FormControl,
  useColorModeValue,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { UserSignUp } from "../Interface";
import { FiUploadCloud } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { selectRegister, userRegister } from "../app/feature/RegisterSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../app/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { countryList } from "../assets/data/Countries";
import Select, { GroupBase, StylesConfig } from "react-select";
import { cities } from "../assets/data/Cities";

const Signup: React.FC = () => {
  type MyDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
  const [isEmail, setIsEmail] = useState<boolean | string>(false);
  const [isPassword, setIsPassword] = useState<boolean | string>(false);
  const [isUserName, setIsUserName] = useState<boolean | string>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean | string>(
    false
  );
  const [isPhone, setIsPhone] = useState<boolean | string>(false);
  const [isAge, setIsAge] = useState<boolean | string>(false);
  const [isGender, setIsGender] = useState<boolean | string>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<MyDispatch>();
  const { loading } = useSelector(selectRegister);

  const [user, setUser] = React.useState<UserSignUp>({
    username: "",
    email: "",
    password: "",
    com_password: "",
    phone: "",
    age: "",
    gender: "",
    city: "",
    country: "",
    Media: null,
  });

  const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setUser((prevUser) => ({ ...prevUser, Media: file }));
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
      } else if (
        name === "com_password" &&
        value.trim() !== user.password.trim()
      ) {
        setIsConfirmPassword("Passwords do not match");
      } else if (name === "username") {
        setIsUserName(value.trim() ? false : "Username is required");
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
    [user.password]
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
      } else if (
        name === "com_password" &&
        value.trim() !== user.password.trim()
      ) {
        setIsConfirmPassword("Passwords do not match");
      } else if (name === "username") {
        setIsUserName(value.trim() ? false : "Username is required");
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
    [user.password]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!user.email.trim()) {
        setIsEmail("Email is required");
      }
      if (!user.username.trim()) {
        setIsUserName("Username is required");
      }
      if (!user.age.trim()) {
        setIsAge("Age is required");
      }
      if (!user.com_password.trim()) {
        setIsConfirmPassword("Confirm Password is required");
      }
      if (!user.password.trim()) {
        setIsPassword("Password is required");
      }
      if (!user.gender.trim()) {
        setIsGender("Gender is required");
      }
      if (!user.phone.trim()) {
        setIsPhone("Phone is required");
        return;
      }

      dispatch(userRegister(user));
    },
    [dispatch, user]
  );
  const customStyles: StylesConfig<
  { label: string; value: string },
  false,
  GroupBase<{ label: string; value: string }>
> = {
  control: (base) => ({
    ...base,
    background: useColorModeValue("#eee", "white"),
    border: "none",
  }),
  option: (provided) => ({
    ...provided,
    color: useColorModeValue("#555", "black"), 
  }),
};
  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <Text className="title" color={useColorModeValue("black.500", "white")}>
        Sign Up
      </Text>
      <Flex w={"100%"} justifyContent={"space-between"} gap={"12px"}>
        <FormControl>
          <Input
            type="text"
            className="input"
            placeholder="Fname"
            name="username"
            isInvalid={!!isUserName}
            onBlur={onBlurHandler}
            value={user.username}
            onChange={onChangeHandler}
            bg={useColorModeValue("#eee", "white")}
            autoComplete="off"
          />
          {isUserName && (
            <FormHelperText
              color={"red.500"}
              fontSize={"18px"}
              fontWeight={"500"}
            >
              {isUserName}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Input
            type="text"
            className="input"
            placeholder="Lname"
            name="Lname"
            // isInvalid={!!isEmail}
            onBlur={onBlurHandler}
            // value={user.Lname}
            onChange={onChangeHandler}
            bg={useColorModeValue("#eee", "white")}
            autoComplete="off"
          />
          {/* {isEmail && (
        <FormHelperText color={'red.500'} fontSize={'18px'} fontWeight={'500'}>
          {isEmail}
        </FormHelperText>
      )} */}
        </FormControl>
      </Flex>
      <Flex w={"100%"} justifyContent={"space-between"} gap={"12px"}>
        <FormControl>
          <Input
            type="text"
            className="input"
            placeholder="age"
            name="age"
            isInvalid={!!isAge}
            onBlur={onBlurHandler}
            value={user.age}
            onChange={onChangeHandler}
            bg={useColorModeValue("#eee", "white")}
            autoComplete="off"
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
          <Select
            className="mt-[15px]"
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
            styles={customStyles}
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
          <Select
            className="mt-[15px]"
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
            styles={customStyles}
            isSearchable
          />
        </FormControl>
        <FormControl>
          <Select
            className="mt-[15px]"
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
            styles={customStyles}
            isSearchable
          />
        </FormControl>
      </Flex>
      <FormControl>
        <Input
          type="text"
          className="input"
          placeholder="Phone"
          name="phone"
          isInvalid={!!isPhone}
          onBlur={onBlurHandler}
          value={user.phone}
          onChange={onChangeHandler}
          bg={useColorModeValue("#eee", "white")}
          autoComplete="off"
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
        <Input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          isInvalid={!!isEmail}
          onBlur={onBlurHandler}
          value={user.email}
          onChange={onChangeHandler}
          bg={useColorModeValue("#eee", "white")}
          autoComplete="off"
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
      <FormControl>
        <Input
          type="text"
          className="input"
          placeholder="Password"
          name="password"
          isInvalid={!!isPassword}
          onBlur={onBlurHandler}
          value={user.password}
          onChange={onChangeHandler}
          bg={useColorModeValue("#eee", "white")}
          autoComplete="off"
        />
        {isPassword && (
          <FormHelperText
            color={"red.500"}
            fontSize={"18px"}
            fontWeight={"500"}
          >
            {isPassword}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <Input
          type="text"
          className="input"
          placeholder="Confirm Password"
          name="com_password"
          isInvalid={!!isConfirmPassword}
          onBlur={onBlurHandler}
          value={user.com_password}
          onChange={onChangeHandler}
          bg={useColorModeValue("#eee", "white")}
          autoComplete="off"
        />
        {isConfirmPassword && (
          <FormHelperText
            color={"red.500"}
            fontSize={"18px"}
            fontWeight={"500"}
          >
            {isConfirmPassword}
          </FormHelperText>
        )}
      </FormControl>
      <div
        className={`w-[100%]  rounded-lg mt-5  flex flex-col justify-center items-center ${useColorModeValue(
          "bg-[#eee] text-black",
          "bg-[#fff] text-black"
        )}`}
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
                name="identifier"
                onChange={onChangeHandlerImg}
                bg={useColorModeValue("#eee", "white")}
                autoComplete="off"
              />
            </FormControl>
            <p className="text-2xl font-medium">Upload Imge</p>
            <em>(Upload only jpg, jpeg, and png images, please)</em>
            <FiUploadCloud className="mb-8 mt-4 text-2xl" />
          </>
        )}
      </div>
      <div className="box-btn">
        <Button
          type="submit"
          mt={"25px"}
          bg={
            isEmail ||
            isPassword ||
            isConfirmPassword ||
            isGender ||
            isUserName ||
            isAge ||
            isPhone
              ? "red.500"
              : useColorModeValue("orange.500", "orange.400")
          }
          color={"white"}
          // isLoading={loading}
          _hover={{
            bg:
              isEmail ||
              isPassword ||
              isConfirmPassword ||
              isGender ||
              isUserName ||
              isAge ||
              isPhone
                ? "red.400"
                : useColorModeValue("orange.400", "orange.500"),
          }}
        >
          {loading ? (
            <>
              Loading...
              <Spinner size="sm" color="white" />
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(Signup);
