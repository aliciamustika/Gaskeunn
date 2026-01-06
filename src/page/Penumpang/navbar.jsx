import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosClose, IoIosPerson } from 'react-icons/io'; 
import { BellRing, LogOut, User } from 'lucide-react';
import Gaskeunn from '../../assets/img/Gaskeunn.png';
import { useNotifications } from './notificationContext';

const navItems = [
    { name: 'Home', path: '/home'},
    { name: 'Booking', path: '/booking'},
    { name: 'Route & Schedule', path: '/routeschedule'},
    { name: 'News', path: '/news'},
    { name: 'History', path: '/history'},
    { name: 'About Us', path: '/aboutus'},
    { name: 'Contact Us', path: '/contactus'},
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    
    // Gunakan context untuk mendapatkan unreadCount
    const { unreadCount } = useNotifications();
    
    // ✅ PERBAIKAN: Get user data from localStorage - GUNAKAN fullName
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.fullName || 'User';  // ⭐ GANTI dari user.name ke user.fullName
    
    const isActive = (path) => {
        return location.pathname === path;
    };
    
    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    // ✅ FIXED: Handle logout - Clear localStorage properly
    const handleLogout = () => {
        console.log('🚪 Logging out user:', user.email);
        
        // Clear user data
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        
        console.log('✅ User data cleared from localStorage');
        
        // Close modal
        setShowLogoutModal(false);
        
        // Redirect to welcome page
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        if (showProfileDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileDropdown]);

    return (
        <>
        <nav className="bg-white shadow-lg sticky top-0 z-30">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* 1. Grup Kiri: Tombol Menu (Mobile) + Logo Gambar */}
                    <div className="flex items-center">
                        {/* Tombol Menu (Hanya Muncul di Mobile/Tablet) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="lg:hidden bg-gray-100 inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[oklch(0.55_0.14_243.17)] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[oklch(0.6155_0.1314_243.17)] mr-4 transition duration-150"
                            aria-controls="sidebar-menu"
                            aria-expanded={isOpen ? "true" : "false"}
                        >
                            <span className="sr-only">{isOpen ? 'Tutup menu utama' : 'Buka menu utama'}</span>
                            {isOpen ? <IoIosClose className="block h-6 w-6" /> : <IoIosMenu className="block h-6 w-6" />} 
                        </button>

                        <Link to="/" className="flex items-center">
                            <img 
                                src={Gaskeunn} 
                                alt="Gaskeunn Logo" 
                                className="h-8 object-contain mr-2 rounded" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x32/000000/FFFFFF?text=Logo+Gaskeunn" }}
                            />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4 lg:space-x-8">

                    {/* 2. Grup Tengah: Navigasi Horizontal (Desktop) */}
                    <div className="hidden lg:flex lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`inline-flex items-end px-1 pt-1 text-base font-medium leading-5 transition duration-150 rounded-t-md ${
                                    isActive(item.path)
                                        ? 'text-[oklch(0.6155_0.1314_243.17)] font-semibold'
                                        : 'text-gray-700 hover:text-[oklch(0.55_0.14_243.17)]'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Grup Kanan: Ikon Aksi (Notifikasi + Profil Dropdown) */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <Link
                            to="/notification"
                            className="p-2 rounded-full text-gray-600 hover:text-[oklch(0.55_0.14_243.17)] hover:bg-gray-100 relative transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[oklch(0.6155_0.1314_243.17)]"
                            title="Lihat Notifikasi"
                        >
                            <span className="sr-only">Lihat notifikasi</span>
                            <BellRing className="w-6 h-6" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </Link>
                        
                        {/* Profile Dropdown - Hanya Icon */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="p-1 rounded-full hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[oklch(0.6155_0.1314_243.17)]"
                                title="Menu Profil"
                            >
                                <IoIosPerson className="h-8 w-8 text-white bg-gray-600 rounded-full p-1 border-2" />
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                                    {/* User Info - ✅ Menampilkan fullName */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">{user.fullName || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <Link
                                        to="/profile"
                                        onClick={() => setShowProfileDropdown(false)}
                                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[oklch(0.55_0.14_243.17)] transition duration-150"
                                    >
                                        <User className="w-4 h-4 mr-3" />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setShowProfileDropdown(false);
                                            setShowLogoutModal(true);
                                        }}
                                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            {/* Backdrop/Overlay gelap */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)} 
                    aria-hidden="true"
                ></div>
            )}
            
            {/* Sidebar itu sendiri */}
            <div 
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } rounded-r-xl`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sidebar-title"
            >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between h-16 bg-blue-50 rounded-tr-xl">
                    <img 
                        src={Gaskeunn} 
                        alt="Gaskeunn Logo" 
                        className="h-8 object-contain rounded" 
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x32/000000/FFFFFF?text=Logo+Gaskeunn" }}
                    />
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-gray-700 hover:text-[oklch(0.55_0.14_243.17)] p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-150"
                        title="Tutup Menu"
                    >
                        <IoIosClose className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3 text-base font-medium transition duration-150 ${
                                isActive(item.path)
                                    ? 'bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] border-l-4 border-[oklch(0.6155_0.1314_243.17)] font-semibold'
                                    : 'text-gray-700 hover:bg-blue-50 hover:text-[oklch(0.55_0.14_243.17)] border-l-4 border-transparent hover:border-[oklch(0.55_0.14_243.17)]'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                 <div className="absolute bottom-0 w-full p-4 border-t text-sm text-gray-500">
                    Gaskeunn - Shuttle Bus @Malang
                 </div>
            </div>
            
        </nav>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                        Konfirmasi Logout
                    </h3>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Apakah Anda yakin ingin keluar dari akun?
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-150"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-150"
                        >
                            Ya, Logout
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default Navbar