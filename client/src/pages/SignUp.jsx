import { useState } from "react";
import { Link } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
  };
  const nameStyle = "text-hibye-60 font-bold mb-2 text-lg";
  const inputStyle = "w-80 mb-4 p-2 text-hibye-100 bg-hibye-input rounded-lg";

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-hibye-20 to-hibye-40 w-screen h-screen">
      <div className="flex w-1/2">
        {/* left side */}
        <div className="flex flex-col justify-between w-2/3 bg-hibye-80 rounded-tl-xl rounded-bl-xl text-center p-12">
          {/* logo */}
          <div className="">
            <Link to="/" className="block text-hibye-10 text-3xl font-bold mb-2">
              HiBye
            </Link>
            <span className="block text-hibye-60 text-base">True love starts here.</span>
          </div>
          {/* text */}
          <div className="">
            <span className="block text-hibye-60 text-base">It's always better</span>
            <span className="block text-hibye-60 text-base">when we're together.</span>
          </div>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center w-2/3 bg-hibye-10 rounded-tr-xl rounded-br-xl">
          <div className="p-6">
            <div className={nameStyle}>Username</div>
            <input type="text" placeholder="Enter a unique username" className={inputStyle} onChange={onChange} />
            <div className={nameStyle}>Email address</div>
            <input type="text" placeholder="Enter your email address" className={inputStyle} />
            <div className={nameStyle}>Password</div>
            <input type="password" placeholder="Enter your password" className={inputStyle} />
            <div className={nameStyle}>Check your password</div>
            <input type="password" placeholder="Enter your password" className={inputStyle} />
            <div className="text-center text-hibye-80">{errorMessage}</div>
            <div className="button--pink--save mt-4">Sign Up</div>
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
