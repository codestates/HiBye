import swal from "sweetalert2";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const onSignUp = () => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // 모든 항목이 채워진 경우
    if (refUsername.current.value && refEmail.current.value && refPassword.current.value) {
      // 이메일이 올바른 경우
      if (emailRegexp.test(refEmail.current.value)) {
        // 비밀번호가 일치하는 경우
        if (refPassword.current.value === refPasswordCheck.current.value) {
          const userinfo = { username: refUsername.current.value, email: refEmail.current.value, password: refPassword.current.value };
          setErrorMessage("");
          axios
            .post("http://localhost:80/signup", userinfo)
            .then((data) => {
              swal.fire({
                title: "Success",
                text: "Account successfully created.",
                icon: "success",
                confirmButtonText: "Let's go",
                confirmButtonColor: "#D70569",
              });
              navigate("/signin");
            })
            .catch((err) => {
              setErrorMessage("Account already exists.");
            });
        } else if (refPassword.current.value !== refPasswordCheck.current.value) {
          // 비밀번호가 일치하지 않는 경우
          setErrorMessage("Mismatched password.");
        } else {
          // 그 외 유효하지 않은 경우
          setErrorMessage("Invalid data.");
        }
      } else {
        // 이메일이 올바르지 않은 경우
        setErrorMessage("Invalid email address.");
      }
    } else {
      // 모든 항목이 채워지지 않은 경우
      setErrorMessage("Please fill in everything.");
    }
  };
  const refUsername = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refPasswordCheck = useRef("");

  const [errorMessage, setErrorMessage] = useState("");

  const nameStyle = "text-hibye-60 font-bold mb-2 text-lg";
  const inputStyle = "w-80 mb-4 p-2 text-hibye-100 bg-hibye-input rounded-lg";

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-hibye-20 to-hibye-40 w-screen h-screen">
      <div className="flex w-1/2">
        {/* left side */}
        <div className="flex flex-col justify-between relative w-2/3 bg-hibye-signup bg-cover bg-center rounded-tl-xl rounded-bl-xl text-center p-12">
          {/* logo */}
          <div className="z-50">
            <Link to="/" className="block text-hibye-10 text-3xl font-bold mb-2">
              HiBye
            </Link>
            <span className="block text-hibye-10 text-base">Your love starts here.</span>
          </div>
          {/* text */}
          <div className="z-50">
            <span className="block text-hibye-60 text-base">It's always better</span>
            <span className="block text-hibye-60 text-base">when we're together.</span>
          </div>
          <div className="w-full h-full absolute top-0 left-0 rounded-tl-xl rounded-bl-xl bg-hibye-signup bg-cover bg-center"></div>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center w-2/3 bg-hibye-10 rounded-tr-xl rounded-br-xl">
          <div className="p-6">
            <div className={nameStyle}>Username</div>
            <input ref={refUsername} type="text" placeholder="Enter a unique username" className={inputStyle} />
            <div className={nameStyle}>Email address</div>
            <input ref={refEmail} type="email" placeholder="Enter your email address" className={inputStyle} />
            <div className={nameStyle}>Password</div>
            <input ref={refPassword} type="password" placeholder="Enter your password" className={inputStyle} />
            <div className={nameStyle}>Check your password</div>
            <input ref={refPasswordCheck} type="password" placeholder="Enter your password" className={inputStyle} />
            <div className="text-center text-hibye-80">{errorMessage}</div>
            <div className="button--pink--save mt-4" onClick={onSignUp}>
              Sign Up
            </div>
            <div className="flex justify-center text-center text-hibye-80 mt-4">
              <div className="mr-2">Already have an account?</div>
              <Link to="/signin" className="underline decoration-solid">
                Sign In Now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
