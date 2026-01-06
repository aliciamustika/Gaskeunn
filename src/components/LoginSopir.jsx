import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaMicrosoft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Data sopir untuk login
const SOPIR_USERS = [
  {
    email: 'sopir.binus@gaskeunn.com',
    password: '11223344',
    name: 'Budi Santoso',
  },
  {
    email: 'sopir1@gaskeunn.com',
    password: '11223344',
    name: 'Ahmad Rizki',
  },
];

const AuthInput = ({ type, placeholder, value, onChange, icon: Icon }) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon className="text-lg" />
      </div>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full ${Icon ? 'pl-12 pr-4' : 'px-4'} py-3.5 rounded-xl bg-gray-50 text-gray-700 
        border border-gray-200 transition-all duration-300 ease-out outline-none
        hover:border-[#2B8CCD] focus:border-[#2B8CCD] 
        focus:ring-2 focus:ring-[#2B8CCD]/20 md:rounded-lg md:bg-gray-100`}
      required
    />
  </div>
);

const SocialButton = ({ Icon, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="w-12 h-12 md:w-9 md:h-9 border border-gray-300 rounded-full md:rounded-md 
      flex items-center justify-center text-gray-600 hover:text-[#2B8CCD] 
      hover:border-[#2B8CCD] transition duration-300 bg-white shadow-sm hover:shadow-md"
  >
    <Icon className="text-xl md:text-base" />
  </button>
);

function LoginSopir() {
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
      const user = SOPIR_USERS.find(
        u => u.email.toLowerCase() === signInEmail.toLowerCase() && u.password === signInPassword
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.name,
          role: 'sopir',
          isLoggedIn: true
        }));
        navigate('/homesopir');
      } else {
        setSignInError("Invalid email or password");
      }
      
      setIsSignInLoading(false);
    }, 800);
  };

  const handleMicrosoftSignIn = () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'microsoft.sopir@binus.ac.id',
      name: 'Microsoft Sopir',
      role: 'sopir',
      isLoggedIn: true
    }));
    navigate("/homesopir");
  };

  const handleSocialSignIn = (provider) => {
    localStorage.setItem('user', JSON.stringify({
      email: `${provider}.sopir@binus.ac.id`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Sopir`,
      role: 'sopir',
      isLoggedIn: true
    }));
    navigate("/homesopir");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* MOBILE VIEW */}
      <div className="md:hidden min-h-screen flex flex-col">
        {/* Header - Extended padding bottom for overlap */}
        <div className="bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)] pt-12 pb-20 px-6">
          <h1 className="text-4xl font-bold text-white mb-3">Hello, Sopir!</h1>
          <p className="text-white/90 text-sm leading-relaxed">
            Have a great day, have a smooth trip, and happy passengers!
          </p>
        </div>

        {/* Form Container - Overlapping with negative margin and relative z-index */}
        <div className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-6 -mt-8 relative z-10">
          <h2 className="text-3xl font-bold text-[#2B8CCD] mb-6">Sign In</h2>

          {signInError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600 text-center">{signInError}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <AuthInput
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={handleSignInEmailChange}
              icon={() => (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            />

            <AuthInput
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={handleSignInPasswordChange}
              icon={() => (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            />

            <div className="text-right">
              <a href="#" className="text-sm text-[#2B8CCD] hover:text-[#1e7ba8] transition duration-200">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSignInLoading}
              className="w-full py-3.5 bg-[#2B8CCD] text-white font-semibold rounded-full
                hover:bg-[#1e7ba8] transition duration-300 shadow-lg hover:shadow-xl
                disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isSignInLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Microsoft Sign In Button */}
            <button
              type="button"
              onClick={handleMicrosoftSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3
              bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white rounded-full
              transition duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <FaMicrosoft className="text-lg" />
              Sign in with Microsoft
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or login with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-3">
              {socialProviders.map(({ Icon, label, provider }, index) => (
                <SocialButton
                  key={index}
                  Icon={Icon}
                  label={`Sign in with ${label}`}
                  onClick={() => handleSocialSignIn(provider)}
                />
              ))}
            </div>
          </form>
        </div>
      </div>

      {/* DESKTOP VIEW - TIDAK DIUBAH */}
      <div className="hidden md:flex items-center justify-center p-4 min-h-screen">
        <div className="relative bg-white rounded-[40px] shadow-2xl max-w-4xl w-full overflow-hidden" style={{ height: "550px" }}>
          <div className="relative h-full w-full">
            {/* RIGHT PANEL - Info Panel */}
            <div
              className="absolute top-0 h-full w-1/2 bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)]
                flex items-center justify-center p-12 text-white overflow-hidden z-30"
              style={{
                left: "50%",
                borderRadius: "35% 0 0 35%",
                boxShadow: "10px 0 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-5">
                  Hello, Sopir!
                </h1>
                <p className="text-lg mb-4 leading-relaxed px-6 font-light">
                  Have a great day, have a smooth trip, and happy passengers!
                </p>
              </div>
            </div>

            {/* LEFT PANEL - Login Form */}
            <div className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-center p-12 bg-white z-10">
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
                      className="text-[#2B8CCD] hover:text-[#1e7ba8] transition duration-200"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSignInLoading}
                      className="w-full py-3 bg-[#2B8CCD] text-white font-semibold rounded-lg 
                        hover:bg-[#1e7ba8] transition duration-300 shadow-md hover:shadow-lg uppercase
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
    </div>
  );
}

export default LoginSopir;