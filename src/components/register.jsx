import React from 'react';
import { useNavigate } from 'react-router-dom';

import GaskeunnLogo from '../assets/img/gaskeunnLogo.png'; 

function Register() {
    const navigate = useNavigate();
    
    const handleBackClick = () => {
        navigate('/login'); 
    };

    return (
        // Wrapper Utama: Latar Belakang Biru Penuh
        <div className="min-h-screen flex items-center justify-center p-8" 
             style={{ background: '#0070c9' }}> {/* Menggunakan warna biru solid yang umum */}

            {/* Kotak Formulir Putih */}
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl">
                
                {/* Logo (BINUS University/BINUSMAYA di contoh) */}
                <div className="flex items-center mb-10">
                    <img 
                        src={GaskeunnLogo} 
                        alt="Gaskeunn Logo" 
                        className="w-10 h-10 object-contain "
                    />
                    {/* Ganti teks BINUSMAYA dengan teks/logo Gaskeunn jika perlu */}
                    <span className="text-2xl font-bold text-gray-800">askeunn</span> 
                </div>
                
                {/* Judul Formulir */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    GET YOUR USERNAME
                </h1>

                {/* Input 1: Student ID / Lecturer ID / BINUSIAN ID */}
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    STUDENT ID / LECTURER ID / BINUSIAN ID
                </label>
                <input 
                    type="text" 
                    placeholder="Input your ID"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                />

                {/* Input 2: Date of Birth */}
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    DATE OF BIRTH
                </label>
                <div className="relative mb-6">
                    <input 
                        type="text" // Menggunakan type="text" atau type="date"
                        defaultValue="17 April 2005"
                        placeholder="DD Month YYYY"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Ikon Kalender/Kunci (Asumsi Font Awesome) */}
                    <i className="fas fa-calendar-alt absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                
                {/* reCAPTCHA Placeholder */}
                <div className="border border-gray-300 rounded p-4 flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <input type="checkbox" className="w-5 h-5 mr-3"/>
                        <span className="text-gray-700">I'm not a robot</span>
                    </div>
                    <div className="text-right">
                        {/* Placeholder untuk ikon reCAPTCHA */}
                        <div className="text-xs text-gray-500">reCAPTCHA</div>
                        <div className="text-xs text-gray-400">Privacy - Terms</div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-between space-x-4">
                    <button
                        className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-200"
                        onClick={handleBackClick}
                    >
                        BACK
                    </button>
                    <button
                        className="w-full bg-orange-500 text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition duration-200"
                        onClick={() => console.log('Tombol SUBMIT diklik')}
                    >
                        SUBMIT
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Register