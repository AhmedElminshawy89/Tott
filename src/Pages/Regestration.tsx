/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback } from "react";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import "../Styles/Regestration.css";
import { useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/feature/NetworkSlice";
import Helmet from "../Shared/Helmet";
import login from "../assets/Images/login.png";
import signup from "../assets/Images/registration.png";
const Registration: React.FC = () => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  // const [isSignupSuccess,setIsSignupSuccess] = useState(false)
  const handleSignUpClick = useCallback(() => {
    setIsSignUpMode(true);
  }, []);

  const handleSignInClick = useCallback(() => {
    setIsSignUpMode(false);
  }, []);

  const { isOnline } = useSelector(selectNetwork);
  if (!isOnline) return null;

  return (
    <Helmet title="Regestration">
      <div
        className={`containerr ${isSignUpMode ? "sign-up-mode" : ""}`}
        style={{ backgroundColor: colorMode === "dark" ? "black" : "white" }}
      >
        <div className="form-container">
          <div className="signin-signup">
            <Signin />
            <Signup
            //  setIsSignupSuccess={setIsSignupSuccess}
            />
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="contentt">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Libero, mollitia.
              </p>
              <button
                className="btn transparent"
                onClick={handleSignUpClick}
                id="sign-up-btn"
              >
                Sign Up
              </button>
            </div>
            <img className="img" src={signup} alt="" />
          </div>
          <div className="panel right-panel">
            <div className="contentt">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Libero, mollitia.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <img loading="lazy" className="img" src={login} alt="" />
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default React.memo(Registration);
