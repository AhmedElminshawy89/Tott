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
  Spinner,
} from "@chakra-ui/react";
import { UserState } from "../../Interface";
import { useDispatch, useSelector } from "react-redux";
import CookiesServices from "../../Services/CookiesServices";
import { Navigate, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../app/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { adminLogin, selectAdminLogin } from "../../app/feature/LoginAdmin";

const LoginAdmin: React.FC = () => {
  type MyDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
  const isAuthentication = CookiesServices.get("jwtAdmin");
  if (isAuthentication) return <Navigate to="/dashboard/home" replace />;
  const { loading:loginLoading } = useSelector(selectAdminLogin);
  const dispatch = useDispatch<MyDispatch>();
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState<boolean | string>(false);
  const [isPassword, setIsPassword] = useState<boolean | string>(false);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    setTimeout(() => {
      navigate("/dashboard/home");
    }, 300);
  }, [navigate]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
              ? false
              : "Password must be at least 8 characters and meet additional criteria (uppercase, lowercase, number)."
          );
        } else {
          setIsPassword(false);
        }
      }
    },
    []
  );

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "email" && !value.trim()) {
        setIsEmail("Email is required");
      } else if (name === "password" && !value.trim()) {
        setIsPassword("Password is required");
      }
    },
    []
  );
  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!user.email.trim()) {
        setIsEmail("Email is required");
        return;
      }
      if (!user.password.trim()) {
        setIsPassword("Password is required");
        return;
      }
      await dispatch(adminLogin(user))
        .unwrap()
        .then(() => {
          const jwt = CookiesServices.get("jwtAdmin");
          if (jwt) {
            handleNavigate();
          }
        })
        .catch((error) => console.error("Login failed: ", error));
    },
    [dispatch, handleNavigate, user]
  );
  
  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <Text className="title" color={useColorModeValue("black.500", "white")}>
        Sign In
      </Text>
      <FormControl>
        <Input
          type="text"
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
          className="input"
          type="password"
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
      <div className="box-btn">
        <Button
          type="submit"
          mt={"25px"}
          bg={
            isEmail || isPassword
              ? "red.500"
              : useColorModeValue("orange.500", "orange.400")
          }
          color={"white"}
          _hover={{
            bg:
              isEmail || isPassword
                ? "red.400"
                : useColorModeValue("orange.400", "orange.500"),
          }}
        >
          {loginLoading ? (
            <>
              Loading...
              <Spinner size="sm" color="white" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(LoginAdmin);
