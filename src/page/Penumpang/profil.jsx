// page/Penumpang/profile.jsx
import React, { useState } from 'react';
import { 
  Cake, Mail, Phone, User, GraduationCap, Home, 
  FileText, BookOpen, Lightbulb, Users, Linkedin, 
  Camera, Download
} from 'lucide-react';
import Navbar from './navbar';
import Footer from '../../components/footer';

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  
  // Sample user data - replace with real data from API/state
  const userData = {
    personal: {
      name: 'Ni Putu Saraswati',
      nim: '2902654051',
      memberSince: 'December 2024',
      birthDate: '15 Agustus 2003',
      gender: 'Perempuan',
      email: 'ni.saraswati@binus.ac.id',
      phone: '+62 812 3456 7890',
      linkedin: 'linkedin.com/in/niputusaraswati'
    },
    academic: {
      binusianId: 'BN318092583',
      program: 'Computer Science',
      degreeTitle: 'Bachelor of Computer Science',
      homeCampus: 'Kemanggisan',
      stream: 'Software Engineering',
      enrichmentTrack: 'Artificial Intelligence',
      class: 'L1BC'
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Header with BINUS Banner */}
      <div className="relative bg-linear-to-r from-blue-600 to-blue-700 pb-24 sm:pb-32">
        {/* BINUS Banner Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-2/3 h-full bg-blue-500/20 rounded-r-3xl border-4 border-white/20">
            <div className="p-8">
              {/* BINUS Logo Area */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-black text-sm text-center leading-tight">
                    BINUS<br/>UNIVERSITY
                  </div>
                </div>
              </div>
              
              {/* Slogan */}
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                People. Innovation. Excellence
              </h2>
              
              {/* Decorative Pattern */}
              <div className="mt-12 grid grid-cols-8 gap-4 opacity-20">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/30 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Picture & Info */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            {/* Left side - spacer for banner */}
            <div className="w-full md:w-2/3"></div>
            
            {/* Right side - Profile Info */}
            <div className="w-full md:w-1/3 flex flex-col items-center mt-8 md:mt-0">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-gray-200">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-300 to-gray-400">
                      <User className="w-16 h-16 text-gray-500" />
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

              {/* User Name & NIM */}
              <div className="mt-6 text-center">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
                  {userData.personal.name}
                </h1>
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white font-bold text-sm">
                    {userData.personal.nim}
                  </span>
                  <button className="w-6 h-6 bg-amber-500 hover:bg-amber-600 rounded flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  Member since <span className="font-semibold">{userData.personal.memberSince}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
        
        {/* My Personal Identity Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            My Personal Identity
          </h2>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h3 className="text-xl font-black text-gray-900 mb-6">Personal Information</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Birth Information */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Cake className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Birth Information
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.personal.birthDate}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Email
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.personal.email}
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  LinkedIn
                </div>
                <div className="text-sm font-bold text-blue-600 truncate hover:underline cursor-pointer">
                  {userData.personal.linkedin}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Gender
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.personal.gender}
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Phone Number
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.personal.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-black text-gray-900 mb-6">Academic Information</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Binusian ID */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Binusian ID
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.binusianId}
                </div>
              </div>
            </div>

            {/* Program */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Program
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.program}
                </div>
              </div>
            </div>

            {/* Degree Title */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Degree Title
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.degreeTitle}
                </div>
              </div>
            </div>

            {/* Home Campus */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Home Campus
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.homeCampus}
                </div>
              </div>
            </div>

            {/* Stream */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Stream
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.stream}
                </div>
              </div>
            </div>

            {/* Enrichment Track */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Enrichment Track
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.enrichmentTrack}
                </div>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Class
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {userData.academic.class}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;