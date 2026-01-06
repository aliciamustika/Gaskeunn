import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaMicrosoft,
  FaApple,
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Data user untuk login dengan profile lengkap
const USERS = [
  {
    email: 'ni.saraswati@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    fullName: 'Ni Putu Saraswati',
    displayName: 'Saras',
    redirectTo: '/home',
    profile: {
      personal: {
        nim: '2902624635',
        memberSince: 'August 2025',
        birthDate: '14 April 2007',
        gender: 'Perempuan',
        phone: '+62 812 3867 9998',
        linkedin: 'linkedin.com/in/niputusaraswati'
      },
      academic: {
        binusianId: 'BN138092583',
        program: 'Computer Science',
        degreeTitle: 'Bachelor of Computer Science',
        homeCampus: 'Malang',
        stream: 'Software Engineering',
        enrichmentTrack: 'Artificial Intelligence',
        class: 'LA20'
      }
    }
  },
  {
    email: 'verena.cheryl@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    fullName: 'Verena Cheryl Elby Mardani',
    displayName: 'Cheryl',
    redirectTo: '/home',
    profile: {
      personal: {
        nim: '2902583824',
        memberSince: 'December 2024',
        birthDate: '15 March 2007',
        gender: 'Perempuan',
        phone: '+62 877 5719 9244',
        linkedin: 'linkedin.com/in/verenacheryl'
      },
      academic: {
        binusianId: 'BN138092583',
        program: 'Computer Science',
        degreeTitle: 'Bachelor of Computer Science',
        homeCampus: 'Malang',
        stream: 'Software Engineering',
        enrichmentTrack: 'Data Science',
        class: 'LA20'
      }
    }
  },
  {
    email: 'kyoko.angela@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    fullName: 'Kyoko Angela Sientargo',
    displayName: 'Kyoko',
    redirectTo: '/home',
    profile: {
      personal: {
        nim: '2902606651',
        memberSince: 'August 2025',
        birthDate: '24 September 2007',
        gender: 'Perempuan',
        phone: '+62 895 3971 19270',
        linkedin: 'linkedin.com/in/kyokoangela'
      },
      academic: {
        binusianId: 'BN138092583',
        program: 'Computer Science',
        degreeTitle: 'Bachelor of Computer Science',
        homeCampus: 'Malang',
        stream: 'Software Engineering',
        enrichmentTrack: 'Cyber Security',
        class: 'LA20'
      }
    }
  },
  {
    email: 'alicia.mustika@binus.ac.id',
    password: '11223344',
    role: 'penumpang',
    fullName: 'Alicia Mustika Setyoayu',
    displayName: 'Alicia',
    redirectTo: '/home',
    profile: {
      personal: {
        nim: '2902654054',
        memberSince: 'August 2025',
        birthDate: '31 March 2007',
        gender: 'Perempuan',
        phone: '+62 857 8554 6217',
        linkedin: 'linkedin.com/in/aliciamustika'
      },
      academic: {
        binusianId: 'BN138092583',
        program: 'Computer Science',
        degreeTitle: 'Bachelor of Computer Science',
        homeCampus: 'Malang',
        stream: 'Software Engineering',
        enrichmentTrack: 'Mobile Development',
        class: 'LA20'
      }
    }
  },
  {
    email: 'sopir.binus@gaskeunn.com',
    password: '11223344',
    role: 'sopir',
    fullName: 'Budi Santoso',
    displayName: 'Pak Budi',
    redirectTo: '/homesopir',
    profile: {
      personal: {
        nim: '-',
        memberSince: 'November 2024',
        birthDate: '5 Juli 1985',
        gender: 'Laki-laki',
        phone: '+62 821 1234 5678',
        linkedin: '-'
      },
      academic: {
        binusianId: '-',
        program: 'Driver',
        degreeTitle: 'Professional Driver',
        homeCampus: 'Malang',
        stream: '-',
        enrichmentTrack: '-',
        class: '-'
      }
    }
  },
  {
    email: 'admin@gaskeunn.com',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin Gaskeunn',
    displayName: 'Admin',
    redirectTo: '/adminpage',
    profile: {
      personal: {
        nim: '-',
        memberSince: 'January 2024',
        birthDate: '1 Januari 1990',
        gender: 'Laki-laki',
        phone: '+62 811 9999 8888',
        linkedin: '-'
      },
      academic: {
        binusianId: '-',
        program: 'Administrator',
        degreeTitle: 'System Administrator',
        homeCampus: 'Headquarters',
        stream: '-',
        enrichmentTrack: '-',
        class: '-'
      }
    }
  }
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
  const [signUpNim, setSignUpNim] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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
      const user = USERS.find(
        u => u.email.toLowerCase() === signInEmail.toLowerCase() && u.password === signInPassword
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          fullName: user.fullName,
          displayName: user.displayName,
          role: user.role,
          isLoggedIn: true,
          profile: user.profile
        }));
        navigate(user.redirectTo);
      } else {
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

    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword || !signUpNim || !signUpPhone) {
      setSignUpError("Please fill in all required fields");
      setIsSignUpLoading(false);
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError("Passwords do not match");
      setIsSignUpLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      setSignUpError("Please enter a valid email address");
      setIsSignUpLoading(false);
      return;
    }

    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters");
      setIsSignUpLoading(false);
      return;
    }

    const existingUser = USERS.find(
      u => u.email.toLowerCase() === signUpEmail.toLowerCase()
    );

    if (existingUser) {
      setSignUpError("Email is already registered");
      setIsSignUpLoading(false);
      return;
    }

    setTimeout(() => {
      const newUser = {
        email: signUpEmail,
        password: signUpPassword,
        role: 'penumpang',
        fullName: signUpName || signUpEmail.split('@')[0],
        displayName: signUpName ? signUpName.split(' ')[0] : signUpEmail.split('@')[0],
        redirectTo: '/home',
        profile: {
          personal: {
            nim: signUpNim,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            birthDate: '-',
            gender: '-',
            phone: signUpPhone,
            linkedin: '-'
          },
          academic: {
            binusianId: '-',
            program: 'Computer Science',
            degreeTitle: 'Bachelor of Computer Science',
            homeCampus: 'Malang',
            stream: '-',
            enrichmentTrack: '-',
            class: '-'
          }
        }
      };
      
      USERS.push(newUser);

      localStorage.setItem('user', JSON.stringify({
        email: newUser.email,
        fullName: newUser.fullName,
        displayName: newUser.displayName,
        role: newUser.role,
        isLoggedIn: true,
        profile: newUser.profile
      }));

      setSignUpSuccess(true);
      setIsSignUpLoading(false);

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }, 800);
  };

  const handleMicrosoftSignIn = () => {
    const microsoftUser = {
      email: 'microsoft.user@binus.ac.id',
      fullName: 'Microsoft User Account',
      displayName: 'Microsoft User',
      role: 'penumpang',
      isLoggedIn: true,
      profile: {
        personal: {
          nim: '-',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          birthDate: '-',
          gender: '-',
          phone: '-',
          linkedin: '-'
        },
        academic: {
          binusianId: '-',
          program: 'Computer Science',
          degreeTitle: 'Bachelor of Computer Science',
          homeCampus: 'Malang',
          stream: '-',
          enrichmentTrack: '-',
          class: '-'
        }
      }
    };
    localStorage.setItem('user', JSON.stringify(microsoftUser));
    navigate("/home");
  };

  const handleSocialSignIn = (provider) => {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    const socialUser = {
      email: `${provider}.user@binus.ac.id`,
      fullName: `${providerName} User Account`,
      displayName: `${providerName} User`,
      role: 'penumpang',
      isLoggedIn: true,
      profile: {
        personal: {
          nim: '-',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          birthDate: '-',
          gender: '-',
          phone: '-',
          linkedin: '-'
        },
        academic: {
          binusianId: '-',
          program: 'Computer Science',
          degreeTitle: 'Bachelor of Computer Science',
          homeCampus: 'Malang',
          stream: '-',
          enrichmentTrack: '-',
          class: '-'
        }
      }
    };
    localStorage.setItem('user', JSON.stringify(socialUser));
    navigate("/home");
  };

  // Social providers untuk mobile dan desktop (sama: Google, Facebook, GitHub, LinkedIn)
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
        {!isSignUpMode ? (
          // MOBILE SIGN IN
          <div className="flex flex-col min-h-screen">
            {/* Header - Extended padding bottom for overlap */}
            <div className="bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)] pt-12 pb-20 px-6">
              <h1 className="text-4xl font-bold text-white mb-3">Hello, Binusian!</h1>
              <p className="text-white/90 text-sm leading-relaxed">
                Register with your personal details to use all of site features
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
                  onChange={(e) => {
                    setSignInEmail(e.target.value);
                    if (signInError) setSignInError("");
                  }}
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
                  onChange={(e) => {
                    setSignInPassword(e.target.value);
                    if (signInError) setSignInError("");
                  }}
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

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUpMode(true)}
                      className="text-[#2B8CCD] font-semibold hover:text-[#1e7ba8] transition duration-200"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // MOBILE SIGN UP
          <div className="flex flex-col min-h-screen">
            {/* Header with Back Button - Extended padding bottom for overlap */}
            <div className="bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)] pt-12 pb-20 px-6">
              <button
                onClick={() => setIsSignUpMode(false)}
                className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition"
              >
                <FaArrowLeft className="text-lg" />
                <span className="text-sm">Back to login</span>
              </button>
              <h1 className="text-4xl font-bold text-white mb-3">Create Account</h1>
              <p className="text-white/90 text-sm leading-relaxed">
                Register with your personal details to use all of site features
              </p>
            </div>

            {/* Form Container - Overlapping with negative margin and relative z-index */}
            <div className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-6 -mt-8 relative z-10 overflow-y-auto">
              <h2 className="text-3xl font-bold text-[#2B8CCD] mb-6">Sign Up</h2>

              {signUpError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600 text-center">{signUpError}</p>
                </div>
              )}

              {signUpSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-600 text-center">Account created successfully! Redirecting...</p>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                <AuthInput
                  type="text"
                  placeholder="Full Name"
                  value={signUpName}
                  onChange={(e) => {
                    setSignUpName(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                />

                <AuthInput
                  type="text"
                  placeholder="NIM"
                  value={signUpNim}
                  onChange={(e) => {
                    setSignUpNim(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  )}
                />

                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => {
                    setSignUpEmail(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                />

                <AuthInput
                  type="tel"
                  placeholder="Phone Number"
                  value={signUpPhone}
                  onChange={(e) => {
                    setSignUpPhone(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                />

                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => {
                    setSignUpPassword(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                />

                <AuthInput
                  type="password"
                  placeholder="Confirm Password"
                  value={signUpConfirmPassword}
                  onChange={(e) => {
                    setSignUpConfirmPassword(e.target.value);
                    if (signUpError) setSignUpError("");
                  }}
                  icon={() => (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                />

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isSignUpLoading || signUpSuccess}
                  className="w-full py-3.5 bg-[#2B8CCD] text-white font-semibold rounded-full
                    hover:bg-[#1e7ba8] transition duration-300 shadow-lg hover:shadow-xl
                    disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {isSignUpLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : signUpSuccess ? (
                    'Success!'
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex items-center justify-center p-4 min-h-screen">
        <div className="relative bg-white rounded-[40px] shadow-2xl max-w-4xl w-full overflow-hidden" style={{ height: "650px" }}>
          <div className="relative h-full w-full">
            {/* PURPLE BLOB PANEL */}
            <div
              className="absolute top-0 h-full w-1/2 bg-[linear-gradient(to_right,#2B8CCD_0%,#83B1D1_100%)]
                flex items-center justify-center p-12 text-white overflow-hidden
                transition-all duration-1000 ease-in-out z-30"
              style={{
                left: isSignUpMode ? "0%" : "50%",
                borderRadius: isSignUpMode ? "0 35% 35% 0" : "35% 0 0 35%",
                boxShadow: isSignUpMode
                  ? "-10px 0 30px rgba(0, 0, 0, 0.2)"
                  : "10px 0 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* CONTENT FOR SIGN IN MODE */}
              <div className={`text-center transition-all duration-500 ${isSignUpMode ? "opacity-0 absolute pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
                <h1 className="text-5xl font-bold mb-5">Hello, Binusian!</h1>
                <p className="text-lg mb-8 leading-relaxed px-6 font-light">
                  Register with your personal details to use all of site features
                </p>
                <button
                  onClick={() => setIsSignUpMode(true)}
                  className="px-12 py-2.5 border-2 border-white rounded-full font-medium 
                    hover:bg-white hover:text-[#2B8CCD] transition-all duration-300 
                    uppercase tracking-wide text-sm active:scale-95 shadow-lg hover:shadow-xl"
                >
                  SIGN UP
                </button>
              </div>

              {/* CONTENT FOR SIGN UP MODE */}
              <div className={`text-center transition-all duration-500 ${isSignUpMode ? "opacity-100 scale-100" : "opacity-0 absolute pointer-events-none scale-95"}`}>
                <h1 className="text-5xl font-bold mb-5">Welcome Back!</h1>
                <p className="text-lg mb-8 leading-relaxed px-6 font-light">
                  Enter your personal details to use all of site features
                </p>
                <button
                  onClick={() => setIsSignUpMode(false)}
                  className="px-12 py-2.5 border-2 border-white rounded-full font-medium 
                    hover:bg-white hover:text-[#2B8CCD] transition-all duration-300 
                    uppercase tracking-wide text-sm active:scale-95 shadow-lg hover:shadow-xl"
                >
                  SIGN IN
                </button>
              </div>
            </div>

            {/* SIGN IN FORM */}
            <div className={`absolute left-0 top-0 h-full w-1/2 flex items-center justify-center p-12 bg-white transition-all duration-800 ease-in-out z-10 ${isSignUpMode ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}>
              <div className="w-full max-w-sm flex flex-col items-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

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
                    onChange={(e) => {
                      setSignInEmail(e.target.value);
                      if (signInError) setSignInError("");
                    }} 
                  />
                  <AuthInput 
                    type="password" 
                    placeholder="Password" 
                    value={signInPassword} 
                    onChange={(e) => {
                      setSignInPassword(e.target.value);
                      if (signInError) setSignInError("");
                    }} 
                  />

                  <div className="text-sm text-right pb-2">
                    <a href="#" className="text-[#2B8CCD] hover:text-[#1e7ba8] transition duration-200">
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

            {/* SIGN UP FORM */}
            <div className={`absolute right-0 top-0 h-full w-1/2 flex items-center justify-center p-8 bg-white transition-all duration-800 ease-in-out z-10 overflow-y-auto ${isSignUpMode ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="w-full max-w-sm flex flex-col items-center py-4">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Create Account</h2>

                {signUpError && (
                  <div className="w-full mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600 text-center">{signUpError}</p>
                  </div>
                )}

                {signUpSuccess && (
                  <div className="w-full mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 text-center">Account created successfully! Redirecting...</p>
                  </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-2.5 w-full">
                  <AuthInput 
                    type="text" 
                    placeholder="Full Name" 
                    value={signUpName} 
                    onChange={(e) => {
                      setSignUpName(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />
                  <AuthInput 
                    type="text" 
                    placeholder="NIM" 
                    value={signUpNim} 
                    onChange={(e) => {
                      setSignUpNim(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />
                  <AuthInput 
                    type="email" 
                    placeholder="Email" 
                    value={signUpEmail} 
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />
                  <AuthInput 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={signUpPhone} 
                    onChange={(e) => {
                      setSignUpPhone(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />
                  <AuthInput 
                    type="password" 
                    placeholder="Password" 
                    value={signUpPassword} 
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />
                  <AuthInput 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={signUpConfirmPassword} 
                    onChange={(e) => {
                      setSignUpConfirmPassword(e.target.value);
                      if (signUpError) setSignUpError("");
                    }} 
                  />

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSignUpLoading || signUpSuccess}
                      className="w-full py-2.5 bg-[#2B8CCD] text-white font-semibold rounded-lg 
                        hover:bg-[#1e7ba8] transition duration-300 shadow-md hover:shadow-lg uppercase
                        disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {isSignUpLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          CREATING...
                        </>
                      ) : signUpSuccess ? (
                        'SUCCESS!'
                      ) : (
                        'SIGN UP'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleMicrosoftSignIn}
                      className="w-full flex items-center justify-center gap-3 px-4 py-2
                      bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white rounded-lg
                      transition duration-300 text-xs font-medium shadow-md hover:shadow-lg"
                    >
                      <FaMicrosoft className="text-base" />
                      Sign up with Microsoft
                    </button>

                    <div className="flex justify-center gap-2 w-full">
                      {socialProviders.map(({ Icon, label, provider }, index) => (
                        <SocialButton
                          key={index}
                          Icon={Icon}
                          label={`Sign up with ${label}`}
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

export default Authentication;