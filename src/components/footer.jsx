import React from "react";
import { FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import GaskeunnLogo from "../assets/img/Gaskeunn.png";

function Footer() {
  return (
    <footer className="bg-[oklch(0.92_0.0138_258.35)] py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between pb-8">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src={GaskeunnLogo}
                alt="Logo Gaskeunn"
                className="h-10 sm:h-12 w-auto"
              />
            </div>

            <p className="text-sm text-gray-600 mb-4 text-justify">
              Follow and contact us on:
            </p>

            <div className="flex space-x-3">
              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(0.6155_0.1314_243.17)] hover:bg-[oklch(0.55_0.14_243.17)] text-white rounded-full transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(0.6155_0.1314_243.17)] hover:bg-[oklch(0.55_0.14_243.17)] text-white rounded-full transition duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(0.6155_0.1314_243.17)] hover:bg-[oklch(0.55_0.14_243.17)] text-white rounded-full transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Kolom Navigasi */}
          <div className="w-full md:w-1/3 mt-5 md:mb-0 text-justify">
            {/* PERUBAHAN: Lebar kolom diubah dari md:w-1/4 menjadi md:w-1/3 agar lebih lega,
     mirip dengan kode yang ada di jawaban lengkap saya sebelumnya. */}

            <h3 className="text-md font-bold text-gray-800 mb-4 tracking-wider">
              NAVIGATION
            </h3>

            {/* Flex container untuk dua kolom navigasi */}
            <div className="flex space-x-25">
              {/* PERUBAHAN: space-x-10 diubah menjadi space-x-6 (atau space-x-8) 
       untuk merapatkan kolom menu seperti pada desain. */}

              {/* Kolom Kiri */}
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    HOME
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    BOOKING
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    ROUTE & SCHEDULE
                  </a>
                </li>
              </ul>

              {/* Kolom Kanan */}
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    NEWS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    HISTORY
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[oklch(0.55_0.14_243.17)] block">
                    ABOUT US
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom Kontak */}
          <div className="w-full mt-5 md:w-1/3 text-justify">
            <h3 className="text-md font-bold text-gray-800 mb-4 tracking-wider">
              CONTACTS
            </h3>

            <div className="space-y-3 mb-6">
              {/* Alamat */}
              <div className="flex items-start text-gray-600 text-sm">
                <FiMapPin className="text-xl mr-3 mt-1 text-[oklch(0.55_0.14_243.17)] min-w-5" />
                <span className="flex-1">
                  <span className="font-medium mr-1">Address:</span>
                  <span>Binus University, Kota Malang.</span>
                </span>
              </div>

              {/* Email */}
              <div className="flex items-start text-gray-600 text-sm">
                <FiMail className="text-xl mr-3 mt-1 text-[oklch(0.55_0.14_243.17)]" />
                <span className="flex-1">
                  <span className="font-medium mr-1">Email:</span>
                  <span>gaskeunn@gmail.com</span>
                </span>
              </div>
            </div>

            {/* Tombol Telepon dengan Gradient */}
            <div className="relative">
              <a
                href="tel:+62321159753"
                className="group flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition duration-300 shadow-lg w-full md:w-auto"
                style={{
                  background:
                    "linear-gradient(to right, #2B8CCD 0%, #83B1D1 100%)", // Biru muda ke biru tua
                  filter:
                    "drop-shadow(0 10px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.04))", // Shadow halus
                }}
              >
                <FiPhone className="mr-3 text-xl" />
                <div>
                  <span className="text-xs opacity-80 block leading-none">
                    Contact this number:
                  </span>
                  <span className="text-lg block leading-none">
                    +62 321 159 753
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="border-gray-300 mb-4" />

        {/* Bagian Copyright */}
        <div className="text-center text-xs text-gray-500">
          &copy; 2025 Gaskeunn. Reliable Shuttle Service for BINUS @Malang
          Students. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
