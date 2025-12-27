import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaMicrosoft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Data user untuk login (tanpa API)
const USERS = [
  {
    email: 'ni.saraswati@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    name: 'Ni Saraswati',
    redirectTo: '/home'
  },
  {
    email: 'verena.cheryl@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    name: 'Verena Cheryl',
    redirectTo: '/home'
  },
  {
    email: 'kyoko.angela@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    name: 'Kyoko Angela',
    redirectTo: '/home'
  },
  {
    email: 'alicia.mustika@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    name: 'Alicia Mustika',
    redirectTo: '/home'
  },
  {
    email: 'admin@gaskeunn.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin Gaskeunn',
    redirectTo: '/adminpage'
  }
];

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

function Authentication() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setSignInError("");
    setIsSignInLoading(true);

    // Validasi input kosong
    if (!signInEmail || !signInPassword) {
      setSignInError("Please fill in all fields");
      setIsSignInLoading(false);
      return;
    }

    // Simulasi delay seperti API call
    setTimeout(() => {
      // Cari user yang cocok
      const user = USERS.find(
        u => u.email.toLowerCase() === signInEmail.toLowerCase() && u.password === signInPassword
      );

      if (user) {
        // Login berhasil - simpan ke localStorage
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.name,
          role: user.role,
          isLoggedIn: true
        }));

        // Redirect sesuai role
        navigate(user.redirectTo);
      } else {
        // Login gagal
        setSignInError("Invalid email or password");
      }
      
      setIsSignInLoading(false);
    }, 800);
  };

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setSignUpError("");
    setIsSignUpLoading(true);

    // Validasi input kosong
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setSignUpError("Please fill in all fields");
      setIsSignUpLoading(false);
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      setSignUpError("Please enter a valid email address");
      setIsSignUpLoading(false);
      return;
    }

    // Validasi password minimal 6 karakter
    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters");
      setIsSignUpLoading(false);
      return;
    }

    // Cek apakah email sudah terdaftar
    const existingUser = USERS.find(
      u => u.email.toLowerCase() === signUpEmail.toLowerCase()
    );

    if (existingUser) {
      setSignUpError("Email is already registered");
      setIsSignUpLoading(false);
      return;
    }

    // Simulasi delay
    setTimeout(() => {
      // Tambahkan user baru ke array (dalam real app, ini akan ke database)
      const newUser = {
        email: signUpEmail,
        password: signUpPassword,
        role: 'penumpang',
        name: signUpName,
        redirectTo: '/passenger/home'
      };
      
      USERS.push(newUser);

      // Simpan ke localStorage
      localStorage.setItem('user', JSON.stringify({
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        isLoggedIn: true
      }));

      setSignUpSuccess(true);
      setIsSignUpLoading(false);

      // Redirect setelah 1 detik
      setTimeout(() => {
        navigate('/passenger/home');
      }, 1000);
    }, 800);
  };

  const handleMicrosoftSignIn = () => {
    console.log("Initiating Microsoft Sign In...");
    // Untuk demo, langsung redirect
    localStorage.setItem('user', JSON.stringify({
      email: 'microsoft.user@binus.ac.id',
      name: 'Microsoft User',
      role: 'penumpang',
      isLoggedIn: true
    }));
    navigate("/passenger/home");
  };

  const handleSocialSignIn = (provider) => {
    console.log(`Sign in with ${provider}`);
    // Untuk demo, langsung redirect
    localStorage.setItem('user', JSON.stringify({
      email: `${provider}.user@binus.ac.id`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: 'penumpang',
      isLoggedIn: true
    }));
    navigate("/passenger/home");
  };

  // Clear error when user types
  const handleSignInEmailChange = (e) => {
    setSignInEmail(e.target.value);
    if (signInError) setSignInError("");
  };

  const handleSignInPasswordChange = (e) => {
    setSignInPassword(e.target.value);
    if (signInError) setSignInError("");
  };

  const handleSignUpNameChange = (e) => {
    setSignUpName(e.target.value);
    if (signUpError) setSignUpError("");
  };

  const handleSignUpEmailChange = (e) => {
    setSignUpEmail(e.target.value);
    if (signUpError) setSignUpError("");
  };

  const handleSignUpPasswordChange = (e) => {
    setSignUpPassword(e.target.value);
    if (signUpError) setSignUpError("");
  };

  const socialProviders = [
    { Icon: FaGoogle, label: "Google", provider: "google" },
    { Icon: FaFacebookF, label: "Facebook", provider: "facebook" },
    { Icon: FaGithub, label: "GitHub", provider: "github" },
    { Icon: FaLinkedinIn, label: "LinkedIn", provider: "linkedin" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-[40px] shadow-2xl max-w-4xl w-full overflow-hidden"
        style={{ height: "550px" }}
      >
        {/* CONTAINER dengan relative positioning untuk forms */}
        <div className="relative h-full w-full">
          {/* PURPLE BLOB PANEL - Layer paling atas dengan animasi sliding */}
          <div
            className="absolute top-0 h-full w-full md:w-1/2 bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)]
              flex items-center justify-center p-8 md:p-12 text-white overflow-hidden
              transition-all duration-1000 ease-in-out z-30"
            style={{
              left: isSignUpMode ? "0%" : "50%",
              borderRadius: isSignUpMode ? "0 35% 35% 0" : "35% 0 0 35%",
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
                Hello, Binusian!
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                Sign In
              </h2>

              {/* Error Message */}
              {signInError && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{signInError}</p>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4 w-full">
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
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 mb-4
                  bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white rounded-lg
                  transition duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <FaMicrosoft className="text-lg" />
                  Sign in with Microsoft
                </button>

                <div className="flex justify-center gap-2 mb-4 w-full">
                  {socialProviders.map(({ Icon, label, provider }, index) => (
                    <SocialButton
                      key={index}
                      Icon={Icon}
                      label={`Sign in with ${label}`}
                      onClick={() =>
                        provider === "microsoft"
                          ? handleMicrosoftSignIn()
                          : handleSocialSignIn(provider)
                      }
                    />
                  ))}
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg w-full">
                <p className="text-xs text-gray-500 text-center mb-1">Demo Credentials:</p>
                <p className="text-xs text-gray-600 text-center">ni.putu@binus.ac.id / 11223344</p>
              </div>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                Create Account
              </h2>

              {/* Error Message */}
              {signUpError && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{signUpError}</p>
                </div>
              )}

              {/* Success Message */}
              {signUpSuccess && (
                <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 text-center">Account created successfully! Redirecting...</p>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-3 w-full">
                <AuthInput
                  type="text"
                  placeholder="Name"
                  value={signUpName}
                  onChange={handleSignUpNameChange}
                />
                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={handleSignUpEmailChange}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={handleSignUpPasswordChange}
                />

                <button
                  type="submit"
                  disabled={isSignUpLoading || signUpSuccess}
                  className="w-full py-3 bg-[oklch(0.6155_0.1314_243.17)] text-white font-semibold rounded-lg 
                    hover:bg-[oklch(0.55_0.14_243.17)] transition duration-300 shadow-md hover:shadow-lg uppercase mt-2
                    disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSignUpLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      CREATING ACCOUNT...
                    </>
                  ) : signUpSuccess ? (
                    'SUCCESS!'
                  ) : (
                    'SIGN UP'
                  )}
                </button>

                {/* Microsoft Sign Up Button - Prominent */}
                <button
                  type="button"
                  onClick={handleMicrosoftSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 mb-4
                  bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white rounded-lg
                  transition duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <FaMicrosoft className="text-lg" />
                  Sign up with Microsoft
                </button>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-2 mb-4 w-full">
                  {socialProviders.map(({ Icon, label, provider }, index) => (
                    <SocialButton
                      key={index}
                      Icon={Icon}
                      label={`Sign up with ${label}`}
                      onClick={() =>
                        provider === "microsoft"
                          ? handleMicrosoftSignIn()
                          : handleSocialSignIn(provider)
                      }
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;