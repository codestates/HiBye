import { Link } from "react-router-dom";

function SignIn() {
  const nameStyle = "text-hibye-60 font-bold mb-2 text-lg";
  const inputStyle = "w-80 mb-4 p-2 text-hibye-100 bg-hibye-input rounded-lg";

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-hibye-10 w-32 mb-12">
          <Link to="/" className="block text-hibye-80 text-3xl font-bold mb-6">
            HiBye
          </Link>
          <span className="block text-hibye-60 text-base">Welcome back.</span>
        </div>
        <div className="bg-hibye-10 p-6">
          <div className={nameStyle}>Email address</div>
          <input type="text" placeholder="Enter your email address" className={inputStyle} />
          <div className={nameStyle}>Password</div>
          <input type="password" placeholder="Enter your password" className={inputStyle} />
          <div className="text-center text-hibye-80">Invalid email or password</div>
          <div className="button--pink--save mt-4">Sign In</div>
          <div className="flex justify-center text-center text-hibye-80 mt-4">
            <div className="mr-2">New to HiBye?</div>
            <Link to="/signup" className="underline decoration-solid">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
