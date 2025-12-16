import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 
      border border-gray-300 transition-all duration-300 ease-out outline-none
      hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
    required
  />
);

function Authentication() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign In:", { email: signInEmail, password: signInPassword });
    navigate("/passenger/home");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up:", {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    });
    navigate("/passenger/home");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-[40px] shadow-2xl max-w-4xl w-full overflow-hidden" style={{ height: "550px" }}>
        
        {/* CONTAINER dengan relative positioning untuk forms */}
        <div className="relative h-full w-full">
          
          {/* PURPLE BLOB PANEL - Layer paling atas dengan animasi sliding */}
          <div
            className="absolute top-0 h-full w-full md:w-1/2 bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)]
              flex items-center justify-center p-8 md:p-12 text-white overflow-hidden
              transition-all duration-1000 ease-in-out z-30"
            style={{
              left: isSignUpMode ? "0%" : "50%",
              borderRadius: isSignUpMode
                ? "0 35% 35% 0"
                : "35% 0 0 35%",
              boxShadow: isSignUpMode
                ? "-10px 0 30px rgba(0, 0, 0, 0.2)"
                : "10px 0 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* CONTENT FOR SIGN IN MODE (Panel di kanan) */}
            <div
              className={`text-center transition-all duration-500 ${
                isSignUpMode
                  ? "opacity-0 absolute pointer-events-none scale-95"
                  : "opacity-100 scale-100"
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-5">
                Hello, Friend!
              </h1>
              <p className="text-base md:text-lg mb-8 leading-relaxed px-6 font-light">
                Register with your personal details to use all of site features
              </p>
              <button
                onClick={() => setIsSignUpMode(true)}
                className="px-12 py-2.5 border-2 border-white rounded-full font-medium 
                  hover:bg-white hover:text-[oklch(0.6155_0.1314_243.17)] transition-all duration-300 
                  uppercase tracking-wide text-sm active:scale-95 shadow-lg hover:shadow-xl"
              >
                SIGN UP
              </button>
            </div>

            {/* CONTENT FOR SIGN UP MODE (Panel di kiri) */}
            <div
              className={`text-center transition-all duration-500 ${
                isSignUpMode
                  ? "opacity-100 scale-100"
                  : "opacity-0 absolute pointer-events-none scale-95"
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-5">
                Welcome Back!
              </h1>
              <p className="text-base md:text-lg mb-8 leading-relaxed px-6 font-light">
                Enter your personal details to use all of site features
              </p>
              <button
                onClick={() => setIsSignUpMode(false)}
                className="px-12 py-2.5 border-2 border-white rounded-full font-medium 
                  hover:bg-white hover:text-[oklch(0.6155_0.1314_243.17)] transition-all duration-300 
                  uppercase tracking-wide text-sm active:scale-95 shadow-lg hover:shadow-xl"
              >
                SIGN IN
              </button>
            </div>
          </div>

          {/* SIGN IN FORM - Layer bawah kiri */}
          <div
            className={`absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 
              bg-white transition-all duration-800 ease-in-out z-10
              ${
                isSignUpMode
                  ? "md:translate-x-full opacity-0 pointer-events-none"
                  : "md:translate-x-0 opacity-100"
              }`}
          >
            <div className="w-full max-w-sm flex flex-col items-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Sign In</h2>
              
              {/* Social Media Icons */}
              <div className="flex gap-2 mb-6">
                {[
                  { Icon: FaGoogle },
                  { Icon: FaFacebookF },
                  { Icon: FaGithub },
                  { Icon: FaLinkedinIn },
                ].map(({ Icon }, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center 
                      text-gray-600 hover:text-[oklch(0.6155_0.1314_243.17)] hover:border-[oklch(0.55_0.14_243.17)] 
                      transition duration-300 text-sm"
                  >
                    <Icon className="text-base" />
                  </button>
                ))}
              </div>

              <p className="text-gray-500 text-sm mb-6 text-center">
                or use your email password
              </p>

              <form onSubmit={handleSignIn} className="space-y-4">
                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />

                <div className="text-sm text-right">
                  <a
                    href="#"
                    className="text-[oklch(0.6155_0.1314_243.17)] hover:text-[oklch(0.55_0.14_243.17)] transition duration-200"
                  >
                    Forget Your Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[oklch(0.6155_0.1314_243.17)] text-white font-semibold rounded-lg 
                    hover:bg-[oklch(0.55_0.14_243.17)] transition duration-300 shadow-md hover:shadow-lg uppercase"
                >
                  SIGN IN
                </button>
              </form>
            </div>
          </div>

          {/* SIGN UP FORM - Layer bawah kanan */}
          <div
            className={`absolute right-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 
              bg-white transition-all duration-800 ease-in-out z-10
              ${
                isSignUpMode
                  ? "md:translate-x-0 opacity-100"
                  : "md:-translate-x-full opacity-0 pointer-events-none"
              }`}
          >
            <div className="w-full max-w-sm flex flex-col items-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Create Account</h2>

              {/* Social Media Icons */}
              <div className="flex gap-2 mb-6">
                {[
                  { Icon: FaGoogle },
                  { Icon: FaFacebookF },
                  { Icon: FaGithub },
                  { Icon: FaLinkedinIn },
                ].map(({ Icon }, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center 
                      text-gray-600 hover:text-[oklch(0.55_0.14_243.17)] hover:border-[oklch(0.55_0.14_243.17)] 
                      transition duration-300 text-sm"
                  >
                    <Icon className="text-base" />
                  </button>
                ))}
              </div>

              <p className="text-gray-500 text-sm mb-6 text-center">
                or use your email for registration
              </p>

              <form onSubmit={handleSignUp} className="space-y-4">
                <AuthInput
                  type="text"
                  placeholder="Name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[oklch(0.6155_0.1314_243.17)] text-white font-semibold rounded-lg 
                    hover:bg-[oklch(0.55_0.14_243.17)] transition duration-300 shadow-md hover:shadow-lg uppercase mt-2"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;