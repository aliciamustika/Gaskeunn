import React from "react";
import { useNavigate } from "react-router-dom";

import PassengerIcon from "../assets/img/passenger 3.png";
import DriverIcon from "../assets/img/driver 3.png";
import PassengerIcon1 from "../assets/img/passenger 2.png";
import DriverIcon1 from "../assets/img/driver 2.png";
import RightArrow1 from "../assets/img/right-arrow 1.png";
import RightArrow from "../assets/img/right-arrow.png";

const ChoiceCard = ({
  iconDefault,
  iconSelected,
  title,
  description,
  isSelected,
  onClick,
}) => {
  const currentIcon = isSelected ? iconSelected : iconDefault;

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full max-w-md p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md transform scale-105"
            : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
        }
      `}
    >
      {/* Checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 text-blue-500">
          {/* Anda bisa menggunakan image checkmark atau ikon Font Awesome di sini */}
          <i className="fas fa-check-circle text-xl"></i>
        </div>
      )}

      {/* Container untuk Ikon/Gambar */}
      <div
        className={`
          mb-3 p-4 rounded-full transition-all duration-300
          ${isSelected ? "text-blue-500" : "text-gray-400"}
        `}
      >
        <img
          src={currentIcon}
          alt={`${title} icon`}
          className="w-20 h-20 object-contain transition-all duration-300"
        />
      </div>

      <h3
        className={`text-lg font-semibold ${
          isSelected ? "text-gray-800" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
};

function Welcome() {
  const [selectedRole, setSelectedRole] = React.useState(null);
  const navigate = useNavigate();

  const currentArrowIcon = selectedRole ? RightArrow : RightArrow1;
  const buttonTextColor = selectedRole ? "text-white" : "text-gray-400";

  const roleData = [
    {
      id: "Penumpang",
      iconDefault: PassengerIcon,
      iconSelected: PassengerIcon1,
      title: "Penumpang",
      description: "Pesan tiket dan lacak shuttle",
    },
    {
      id: "Sopir",
      iconDefault: DriverIcon,
      iconSelected: DriverIcon1,
      title: "Sopir",
      description: "Kelola shift dan scan tiket",
    },
  ];

  const handleLogin = () => {
    if (selectedRole) {
      if (selectedRole === "Penumpang") {
        // Penumpang harus melalui authentication
        navigate("/auth", { state: { role: selectedRole } });
        console.log(`Menavigasi ke /auth sebagai: ${selectedRole}`);
      } else if (selectedRole === "Sopir") {
        // Sopir langsung masuk ke home tanpa authentication
        navigate("/homesopir");
        console.log(`Menavigasi langsung ke home sebagai: ${selectedRole}`);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Selamat Datang di Gaskeunn!
        </h1>

        <p className="text-gray-500 text-lg mb-12">
          Sederhanakan Perjalanan Anda di Kampus
        </p>

        <div className="w-full max-w-lg mx-auto">
          <p className="text-gray-900 text-lg mb-4 text-left font-semibold">
            Pilih Tipe Akun
          </p>

          {/* Pilihan Card (Wrapper Card Sejajar) */}
          <div className="flex justify-center space-x-10">
            {roleData.map((role) => (
              <div key={role.id} className="relative">
                <ChoiceCard
                  iconDefault={role.iconDefault}
                  iconSelected={role.iconSelected}
                  title={role.title}
                  description={role.description}
                  isSelected={selectedRole === role.id}
                  onClick={() => setSelectedRole(role.id)}
                />
              </div>
            ))}
          </div>

          {/* Tambahkan elemen pemusat tambahan untuk tombol */}
        </div>

        <button
          className={`
            mt-12 text-gray-400 text-lg py-3 px-8 rounded-lg font-medium flex items-center justify-center mx-auto transition duration-200 space-x-2
            max-w-md w-full

            ${buttonTextColor}

            ${
              selectedRole
                ? "bg-blue-600 hover:bg-blue-700" // Aktif: Biru terang
                : "bg-gray-200 cursor-not-allowed" // Nonaktif: Abu-abu
            }
          `}
          // Tombol nonaktif jika selectedRole adalah null
          disabled={!selectedRole}
          onClick={handleLogin}
        >
          <span>Masuk</span>
          <img
            src={currentArrowIcon}
            alt="Arrow Right"
            className="w-4 h-4 ml-1 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}

export default Welcome;