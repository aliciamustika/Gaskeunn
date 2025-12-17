// page/Penumpang/profile.jsx
import React, { useState } from 'react';
import { 
  Cake, Mail, Phone, User, Linkedin, Camera, Pencil, X, Check
} from 'lucide-react';
import Navbar from './navbar';
import Footer from '../../components/footer';
import BinusLogo from '../../assets/img/binus-putih.png';

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // User data state - editable fields (data dari code ke-1)
  const [userData, setUserData] = useState({
    personal: {
      name: 'Budi Santoso',
      nim: '2902654051',
      memberSince: 'December 2024',
      birthDate: '15 Agustus 2003',
      gender: 'Laki-laki',
      email: 'budi.santoso@binus.ac.id',
      phone: '+62 812 3456 7890',
      linkedin: 'linkedin.com/in/budisantoso'
    }
  });

  // Temporary state for editing
  const [editData, setEditData] = useState({
    birthDate: userData.personal.birthDate,
    gender: userData.personal.gender,
    phone: userData.personal.phone,
    linkedin: userData.personal.linkedin
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setEditData({
      birthDate: userData.personal.birthDate,
      gender: userData.personal.gender,
      phone: userData.personal.phone,
      linkedin: userData.personal.linkedin
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      birthDate: userData.personal.birthDate,
      gender: userData.personal.gender,
      phone: userData.personal.phone,
      linkedin: userData.personal.linkedin
    });
  };

  const handleSaveEdit = () => {
    setUserData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        birthDate: editData.birthDate,
        gender: editData.gender,
        phone: editData.phone,
        linkedin: editData.linkedin
      }
    }));
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Full Screen Profile Card */}
      <div className="flex-1 flex">
        <div className="w-full bg-white flex flex-col lg:flex-row">
          
          {/* Left Side - Blue Banner */}
          <div className="lg:w-1/4 xl:w-1/5 bg-gradient-to-b from-blue-600 to-blue-700 p-6 lg:p-8 relative overflow-hidden lg:min-h-[calc(100vh-64px)]">
            {/* Decorative curves */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/30 rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mb-16"></div>
            <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-blue-500/20 rounded-full -ml-12"></div>
            
            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
              {/* BINUS Logo */}
              <div className="mb-8">
                <img 
                  src={BinusLogo} 
                  alt="BINUS University" 
                  className="h-10 lg:h-12 w-auto object-contain"
                />
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <User className="w-12 h-12 lg:w-16 lg:h-16 text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button Overlay */}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* User Name */}
              <div className="text-center mb-6">
                <h1 className="text-xl lg:text-2xl font-bold text-white mb-1">
                  {userData.personal.name}
                </h1>
                <p className="text-blue-200 text-sm mb-1">
                  {userData.personal.nim}
                </p>
                <p className="text-blue-200 text-sm">
                  BINUS @Malang
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-sm transition-colors w-full"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm transition-colors w-full"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full font-medium text-sm transition-colors border border-white/30 w-full"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Member Since - Push to bottom */}
              <div className="mt-auto pt-6 border-t border-white/20">
                <p className="text-blue-200 text-xs text-center">
                  Member since <span className="font-semibold text-white">{userData.personal.memberSince}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Profile Details */}
          <div className="lg:w-3/4 xl:w-4/5 p-6 lg:p-10 overflow-y-auto lg:max-h-[calc(100vh-64px)]">
            
            {/* Page Title */}
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">My Personal Identity</h2>
              <p className="text-gray-500 mt-1">Manage your personal information</p>
            </div>

            {/* Personal Information Section */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Birth Information */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Cake className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Birth Information</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900 truncate">{userData.personal.birthDate}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Email</p>
                    <p className="text-base font-semibold text-gray-900 truncate">{userData.personal.email}</p>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">LinkedIn</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a 
                        href={`https://${userData.personal.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-blue-600 hover:underline truncate block"
                      >
                        {userData.personal.linkedin}
                      </a>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Gender</p>
                    {isEditing ? (
                      <select
                        value={editData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    ) : (
                      <p className="text-base font-semibold text-gray-900">{userData.personal.gender}</p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Phone Number</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900">{userData.personal.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;