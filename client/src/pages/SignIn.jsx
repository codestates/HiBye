import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { setUserInfo } from "../redux/modules/user";

function SignIn() {
  const nameStyle = "text-hibye-60 font-bold mb-2 text-lg";
  const inputStyle = "w-80 mb-4 p-2 text-hibye-100 bg-hibye-input rounded-lg";

  const refEmail = useRef("");
  const refPassword = useRef("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const onSignIn = () => {
    if (!refEmail.current.value) {
      setErrorMessage("Please enter your email address.");
    } else if (!refPassword.current.value) {
      setErrorMessage("Please enter your password.");
    } else if (refEmail.current.value && refPassword.current.value) {
      axios
        .post("http://localhost:80/signin", {
          email: refEmail.current.value,
          password: refPassword.current.value,
        })
        .then((data) => {
          dispatch(setUserInfo(data.data.data));
          swal.fire({
            title: "Success!",
            text: "Success!",
            icon: "success",
            confirmButtonText: "Got it",
            confirmButtonColor: "#D70569",
          });
          navigate("/");
        })
        .catch((err) => {
          swal.fire({
            title: "Error",
            text: `${err}`,
            icon: "error",
            confirmButtonText: "Try again",
            confirmButtonColor: "#D70569",
          });
        });
    } else {
      swal.fire({
        title: `Error`,
        text: `Unexpected errors ocurred`,
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "#D70569",
      });
    }
  };

  return (
    <>
      {userInfo.id ? (
        <Navigate to="/" />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-hibye-10 p-6">
              <div className={nameStyle}>Email address</div>
              <input ref={refEmail} type="email" placeholder="Enter your email address" className={inputStyle} />
              <div className={nameStyle}>Password</div>
              <input ref={refPassword} type="password" placeholder="Enter your password" className={inputStyle} />
              <div className="text-center text-hibye-80">{errorMessage}</div>
              <div className="button--pink--save mt-4" onClick={onSignIn}>
                Sign In
              </div>
              <div className="flex justify-center text-center text-hibye-80 mt-4">
                <div className="mr-2">New to HiBye?</div>
                <Link to="/signup" className="underline decoration-solid">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
