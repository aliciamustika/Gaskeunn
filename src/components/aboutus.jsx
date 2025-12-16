// src/components/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Konten Kiri (Teks) */}
        <div className="md:order-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            About Us
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Misi kami adalah menjadi mitra mobilitas kampus yang andal, menawarkan solusi transportasi yang nyaman, aman, dan efisien untuk komunitas kampus. Kami berkomitmen untuk meningkatkan pengalaman harian Anda dengan inovasi teknologi.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
            Read More
          </button>
        </div>

        {/* Konten Kanan (Ilustrasi Bus) */}
        <div className="md:order-2 flex justify-center">
          {/* Placeholder Gambar Ilustrasi Bus (Mencerminkan desain) */}
          <div className="w-full max-w-lg h-64 bg-transparent">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;