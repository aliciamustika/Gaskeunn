import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaMicrosoft,
} from "react-icons/fa";
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

const SocialButton = ({ Icon, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center 
      text-gray-600 hover:text-[oklch(0.6155_0.1314_243.17)] hover:border-[oklch(0.55_0.14_243.17)] 
      transition duration-300 text-sm"
  >
    <Icon className="text-base" />
  </button>
);

function LoginAdmin() {
  const navigate = useNavigate();

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setSignInError("");
    setIsSignInLoading(true);

    if (!signInEmail || !signInPassword) {
      setSignInError("Please fill in all fields");
      setIsSignInLoading(false);
      return;
    }

    setTimeout(() => {
      // Validasi admin
      if (signInEmail === "admin@gaskeunn.com" && signInPassword === "admin123") {
        localStorage.setItem('user', JSON.stringify({
          email: signInEmail,
          name: 'Admin Gaskeunn',
          role: 'admin',
          isLoggedIn: true
        }));
        navigate('/admin');
      } else {
        setSignInError("Invalid email or password");
      }
      
      setIsSignInLoading(false);
    }, 800);
  };

  const handleMicrosoftSignIn = () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'microsoft.admin@gaskeunn.com',
      name: 'Microsoft Admin',
      role: 'admin',
      isLoggedIn: true
    }));
    navigate("/admin");
  };

  const handleSocialSignIn = (provider) => {
    localStorage.setItem('user', JSON.stringify({
      email: `${provider}.admin@gaskeunn.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Admin`,
      role: 'admin',
      isLoggedIn: true
    }));
    navigate("/admin");
  };

  const handleSignInEmailChange = (e) => {
    setSignInEmail(e.target.value);
    if (signInError) setSignInError("");
  };

  const handleSignInPasswordChange = (e) => {
    setSignInPassword(e.target.value);
    if (signInError) setSignInError("");
  };

  const socialProviders = [
    { Icon: FaGoogle, label: "Google", provider: "google" },
    { Icon: FaFacebookF, label: "Facebook", provider: "facebook" },
    { Icon: FaGithub, label: "GitHub", provider: "github" },
    { Icon: FaLinkedinIn, label: "LinkedIn", provider: "linkedin" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-[40px] shadow-2xl max-w-4xl w-full overflow-hidden" style={{ height: "550px" }}>
        <div className="relative h-full w-full">
          {/* RIGHT PANEL - Info Panel */}
          <div
            className="absolute top-0 h-full w-full md:w-1/2 bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)]
              flex items-center justify-center p-8 md:p-12 text-white overflow-hidden z-30"
            style={{
              left: "50%",
              borderRadius: "35% 0 0 35%",
              boxShadow: "10px 0 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-5">
                Welcome, Admin!
              </h1>
              <p className="text-base md:text-lg mb-4 leading-relaxed px-6 font-light">
                Manage the system wisely and ensure everything runs smoothly. 
              </p>
            </div>
          </div>

          {/* LEFT PANEL - Login Form */}
          <div className="absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white z-10">
            <div className="w-full max-w-sm flex flex-col items-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Sign In
              </h2>

              {signInError && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{signInError}</p>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-3 w-full">
                <AuthInput 
                  type="email" 
                  placeholder="Email" 
                  value={signInEmail} 
                  onChange={handleSignInEmailChange} 
                />
                <AuthInput 
                  type="password" 
                  placeholder="Password" 
                  value={signInPassword} 
                  onChange={handleSignInPasswordChange} 
                />

                <div className="text-sm text-right pb-2">
                  <a 
                    href="#" 
                    className="text-[oklch(0.6155_0.1314_243.17)] hover:text-[oklch(0.55_0.14_243.17)] transition duration-200"
                  >
                    Forget Your Password?
                  </a>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSignInLoading}
                    className="w-full py-3 bg-[oklch(0.6155_0.1314_243.17)] text-white font-semibold rounded-lg 
                      hover:bg-[oklch(0.55_0.14_243.17)] transition duration-300 shadow-md hover:shadow-lg uppercase
                      disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSignInLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SIGNING IN...
                      </>
                    ) : (
                      'SIGN IN'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleMicrosoftSignIn}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5
                    bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white rounded-lg
                    transition duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    <FaMicrosoft className="text-lg" />
                    Sign in with Microsoft
                  </button>

                  <div className="flex justify-center gap-2 w-full">
                    {socialProviders.map(({ Icon, label, provider }, index) => (
                      <SocialButton
                        key={index}
                        Icon={Icon}
                        label={`Sign in with ${label}`}
                        onClick={() => handleSocialSignIn(provider)}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;