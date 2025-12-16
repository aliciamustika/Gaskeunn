import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Sopir/navbar";
import Footer from "../../components/footer";
import Comic from "../../assets/img/comic.png";
import Balai from "../../assets/img/horizon.jpg";
import Bus from "../../assets/video/bus.mp4";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import TicketBg from "../../assets/img/Group 2.png";
import SchoolBus from "../../assets/img/School_bus.png";

import { IoIosInformationCircle } from "react-icons/io";
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPhone,
} from "react-icons/fa";

import {
  Ticket,
  Newspaper,
  Clock,
  Monitor,
  MapPin,
  Calendar,
  Users,
  QrCode,
  ScanLine,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const images = [
  { url: Comic, alt: "TransJakarta", type: "image" },
  { url: Bus, alt: "Bus", type: "video" },
  { url: Balai, alt: "Balai Kota", type: "image" },
];

const AUTO_SCROLL_INTERVAL = 10000;

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  const totalImages = images.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalImages) % totalImages;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => goToSlide(currentIndex - 1);
  const nextSlide = () => goToSlide(currentIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [totalImages]);

  useEffect(() => {
    if (galleryRef.current) {
      const scrollPosition = currentIndex * galleryRef.current.offsetWidth;
      galleryRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-gray-100 shadow-xl rounded-none">
        <div
          ref={galleryRef}
          className="flex transition-transform duration-500 snap-x snap-mandatory overflow-x-hidden h-[367px]"
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="shrink-0 w-full snap-center relative h-full"
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white drop-shadow-lg hover:scale-110 transition z-10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white drop-shadow-lg hover:scale-110 transition z-10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400 opacity-70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// BARCODE SCANNER MODAL COMPONENT
const BarcodeScannerModal = ({ isOpen, onClose }) => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanResult({
        success: true,
        ticketId: "TKT-2024-" + Math.floor(Math.random() * 10000),
        passengerName: "Andre Nugroho",
        route: "T1 → BINUS University",
        seatNumber: "A" + Math.floor(Math.random() * 20 + 1),
        departureTime: "06:00",
      });
      setIsScanning(false);
    }, 2000);
  };

  const resetScan = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[oklch(0.6155_0.1314_243.17)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-[oklch(0.6155_0.1314_243.17)]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Scan Tiket Penumpang</h2>
          <p className="text-gray-600 text-sm mt-2">
            Arahkan kamera ke barcode tiket penumpang
          </p>
        </div>

        {!scanResult ? (
          <div className="space-y-4">
            {/* Scanner Area */}
            <div className="relative bg-gray-100 rounded-xl p-8 flex items-center justify-center" style={{ height: '250px' }}>
              {isScanning ? (
                <div className="text-center">
                  <ScanLine className="w-16 h-16 text-[oklch(0.6155_0.1314_243.17)] mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-600 font-medium">Memindai...</p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Posisikan barcode di area ini</p>
                </div>
              )}
            </div>

            <button
              onClick={handleScan}
              disabled={isScanning}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isScanning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[oklch(0.6155_0.1314_243.17)] text-white hover:bg-[oklch(0.55_0.14_243.17)]'
              }`}
            >
              {isScanning ? 'Memindai...' : 'Mulai Scan'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Success Result */}
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="font-bold text-green-700 text-lg">Tiket Valid!</h3>
                  <p className="text-green-600 text-sm">Penumpang dapat naik</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Nomor Tiket</span>
                  <span className="font-semibold text-gray-900">{scanResult.ticketId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Nama Penumpang</span>
                  <span className="font-semibold text-gray-900">{scanResult.passengerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Rute</span>
                  <span className="font-semibold text-gray-900">{scanResult.route}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Nomor Kursi</span>
                  <span className="font-semibold text-gray-900">{scanResult.seatNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Jam Keberangkatan</span>
                  <span className="font-semibold text-gray-900">{scanResult.departureTime}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetScan}
                className="py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Scan Lagi
              </button>
              <button
                onClick={onClose}
                className="py-3 rounded-lg font-semibold bg-[oklch(0.6155_0.1314_243.17)] text-white hover:bg-[oklch(0.55_0.14_243.17)] transition"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// DRIVER SCHEDULE TABLE COMPONENT
const DriverScheduleTable = () => {
  const scheduleData = [
    {
      day: "Senin",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Selasa",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Rabu",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Kamis",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Jumat",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Sabtu",
      shift: "Full Day",
      time: "06:00 - 17:10",
      route: "Rute Merah & Biru",
      status: "active",
      trips: 5,
    },
    {
      day: "Minggu",
      shift: "Off",
      time: "-",
      route: "-",
      status: "off",
      trips: 0,
    },
  ];

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Jadwal Kerja Minggu Ini</h2>
          <p className="text-gray-600">
            Kelola dan pantau jadwal shift Anda sebagai driver Gaskeunn
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-[oklch(0.6155_0.1314_243.17)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Shift</p>
                <p className="text-2xl font-bold text-[oklch(0.6155_0.1314_243.17)]">6 Hari</p>
              </div>
              <Calendar className="w-10 h-10 text-[oklch(0.6155_0.1314_243.17)] opacity-50" />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Trip</p>
                <p className="text-2xl font-bold text-green-600">30 Trip</p>
              </div>
              <FaBus className="text-3xl text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jam Kerja</p>
                <p className="text-2xl font-bold text-orange-600">67 Jam</p>
              </div>
              <Clock className="w-10 h-10 text-orange-500 opacity-50" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hari Libur</p>
                <p className="text-2xl font-bold text-purple-600">1 Hari</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.55_0.14_243.17)] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Hari</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Shift</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Jam Kerja</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rute</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Trip</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((schedule, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 transition-colors ${
                      schedule.day === today
                        ? 'bg-blue-50 hover:bg-blue-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${
                          schedule.day === today ? 'text-[oklch(0.6155_0.1314_243.17)]' : 'text-gray-900'
                        }`}>
                          {schedule.day}
                        </span>
                        {schedule.day === today && (
                          <span className="bg-[oklch(0.6155_0.1314_243.17)] text-white text-xs px-2 py-0.5 rounded-full">
                            Hari Ini
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.shift === 'Full Day' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {schedule.shift === 'Full Day' && '🚌'}
                        {schedule.shift === 'Off' && '🏖️'}
                        {schedule.shift}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-medium">{schedule.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{schedule.route}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        schedule.trips > 0 ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {schedule.trips > 0 ? `${schedule.trips} trip` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {schedule.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
                            <AlertCircle className="w-4 h-4" />
                            Libur
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <IoIosInformationCircle className="text-[oklch(0.6155_0.1314_243.17)] text-xl mt-0.5" />
          <div className="text-sm text-gray-700 text-left">
            <p className="font-semibold mb-1">Catatan Penting:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Harap datang 15 menit sebelum shift dimulai</li>
              <li>Laporkan jika ada perubahan jadwal atau ketidakhadiran</li>
              <li>Pastikan bus dalam kondisi baik sebelum memulai perjalanan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// BAGIAN 2: HOMEPAGE
function Home({ userName = "Zayn Kaieran" }) {
  const [activeTab, setActiveTab] = useState("tickets");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const testimonialRef = useRef(null);

  const destinations = [
    { name: "Perempatan Tirtomoyo Security", titik: "T1" },
    { name: "Telaga Golf", titik: "T2" },
    { name: "Seberang KDS", titik: "T3" },
    { name: "Jl. Raya Telaga Golf", titik: "T4" },
    { name: "Masjid Ramadhan", titik: "T5" },
    { name: "Taman Blok J", titik: "T6" },
    { name: "Hotel Grand Cakra", titik: "T7" },
    { name: "Bundaran PBI", titik: "T8" },
  ];

  const testimonials = [
    {
      rating: 4.8,
      text: "Menyenangkan banget dan akhirnya datang kuliah tepat waktu dan membantu sekali, Harapan saya untuk pihak developer lebih meningkatkan lagi aplikasi, dan juga sukses ya!",
      name: "Andre Nugroho",
      role: "Digital Communication",
      avatar:
        "https://ui-avatars.com/api/?name=Andre+Nugroho&background=3b82f6&color=fff&size=128",
    },
    {
      rating: 4.0,
      text: "Love banget sama Gaskeunn! 😍 Aksesnya Kesulitan, sekarang sudah bisa on time. Selain itu, drivernya ramah banget & tahu jalan",
      name: "Putu Ayu Verena Angela",
      role: "Computer Science",
      avatar:
        "https://ui-avatars.com/api/?name=Verena+Ayu&background=ec4899&color=fff&size=128",
    },
    {
      rating: 5,
      text: "Gaskeunn bener-bener ngebantu banget! Kulahnya sekarang ngga telat lagi, aplikasinya juga sangat mudah digunakan, dan gratis pula liat waktu laris lagi!",
      name: "Kadek Samuel",
      role: "Interior Design",
      avatar:
        "https://ui-avatars.com/api/?name=Kadek+Samuel&background=10b981&color=fff&size=128",
    },
    {
      rating: 4.5,
      text: "Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman! Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman!Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman!Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman!Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman!",
      name: "Pradipta Laksmana",
      role: "Business Management",
      avatar:
        "https://ui-avatars.com/api/?name=P+L&background=f59e0b&color=fff&size=128",
    },
    {
      rating: 4.7,
      text: "Pelayanan yang memuaskan, driver profesional, dan aplikasinya user-friendly. Recommended!",
      name: "Michael Vincent",
      role: "Information Systems",
      avatar:
        "https://ui-avatars.com/api/?name=M+V&background=8b5cf6&color=fff&size=128",
    },
    {
      rating: 4.9,
      text: "Gaskeunn solusi terbaik untuk transportasi ke kampus! Ngga perlu khawatir telat lagi.",
      name: "Joceline Sudigdo",
      role: "Accounting",
      avatar:
        "https://ui-avatars.com/api/?name=J+S&background=ef4444&color=fff&size=128",
    },
    {
      rating: 4.6,
      text: "Aplikasi sangat membantu! Shuttle selalu on time dan rutenya strategis. Recommend banget buat mahasiswa BINUS!",
      name: "Ametung Sutejo",
      role: "Marketing Communication",
      avatar:
        "https://ui-avatars.com/api/?name=A+S&background=06b6d4&color=fff&size=128",
    },
    {
      rating: 4.8,
      text: "Sejak pakai Gaskeunn, perjalanan ke kampus jadi lebih praktis dan hemat waktu. Terima kasih Gaskeunn!",
      name: "Dirgantara Sena",
      role: "International Relations",
      avatar:
        "https://ui-avatars.com/api/?name=D+S&background=14b8a6&color=fff&size=128",
    },
    {
      rating: 5,
      text: "Layanan shuttle yang sangat profesional dan nyaman. Aplikasinya juga mudah digunakan, best solution untuk mahasiswa!",
      name: "Arief Rahman",
      role: "Civil Engineering",
      avatar:
        "https://ui-avatars.com/api/?name=A+R&background=6366f1&color=fff&size=128",
    },
  ];

  const faqs = [
    {
      question: "What is Gaskeunn?",
      answer:
        "Gaskeunn adalah layanan shuttle bus BINUS University @Malang yang menyediakan transportasi untuk mahasiswa dari berbagai titik lokasi.",
    },
    {
      question: "How do I book a shuttle bus?",
      answer:
        "Anda dapat melakukan booking melalui aplikasi Gaskeunn dengan memilih rute, waktu keberangkatan, dan mengisi data diri.",
    },
    {
      question: "What if the shuttle is late?",
      answer:
        "Anda dapat melacak posisi shuttle secara real-time melalui fitur tracking di aplikasi.",
    },
    {
      question: "Who can use this service?",
      answer:
        "Layanan ini tersedia untuk seluruh mahasiswa BINUS University yang terdaftar.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Hitung jumlah halaman (3 cards per halaman)
  const totalPages = Math.ceil(testimonials.length / 3);
  const scrollTimeoutRef = useRef(null);

  // Handler untuk update indicator saat manual scroll
  const handleScroll = () => {
    const container = testimonialRef.current;
    if (!container) return;

    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout to update page indicator
    scrollTimeoutRef.current = setTimeout(() => {
      const firstCard = container.querySelector(".testimonial-card");
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // gap-6 = 24px
      const scrollLeft = container.scrollLeft;

      // Calculate current page based on scroll position
      const pageWidth = (cardWidth + gap) * 3;
      const newPage = Math.round(scrollLeft / pageWidth);

      // Update current page if it changed
      if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    }, 100); // Debounce 100ms
  };

  // Fungsi untuk scroll testimonials
  const scrollToPage = (pageIndex) => {
    const container = testimonialRef.current;
    if (!container) return;

    // Get the first card to calculate its width
    const firstCard = container.querySelector(".testimonial-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // gap-6 = 24px

    // Calculate scroll position: (cardWidth + gap) * 3 cards per page * pageIndex
    const scrollPosition = pageIndex * ((cardWidth + gap) * 3);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setCurrentPage(pageIndex);
  };

  const scrollTestimonials = (direction) => {
    if (direction === "next") {
      const nextPage = Math.min(currentPage + 1, totalPages - 1);
      scrollToPage(nextPage);
    } else {
      const prevPage = Math.max(currentPage - 1, 0);
      scrollToPage(prevPage);
    }
  };

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />

        {/* Floating Barcode Scanner Button */}
        <button
          onClick={() => setShowBarcodeScanner(true)}
          className="fixed left-6 bottom-6 w-16 h-16 bg-linear-to-br from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.55_0.14_243.17)] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-40 flex items-center justify-center group"
          aria-label="Scan Barcode"
        >
          <QrCode className="w-8 h-8" />
          <span className="absolute left-20 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Scan Tiket
          </span>
        </button>

        {/* Barcode Scanner Modal */}
        <BarcodeScannerModal 
          isOpen={showBarcodeScanner} 
          onClose={() => setShowBarcodeScanner(false)} 
        />

        <div className="bg-gray-50 min-h-screen">
          {/* Hero Section */}
          <div className="bg-white text-black pt-4 pb-4 md:pt-6 md:pb-6 shadow-lg">
            <div className="px-8 lg:px-12">
              <h1 className="text-2xl md:text-2xl font-bold mb-0 text-left">
                Halo, {userName}!
              </h1>
              <p className="text-xl font-light mt-1 mb-3 opacity-90 text-left">
                Selamat bertugas untuk mengantarkan Binusian!
              </p>

              <div className="flex items-start bg-yellow-400/70 p-4 rounded-lg border border-yellow-300 shadow-inner">
                <IoIosInformationCircle className="text-2xl mr-3 text-white" />
                <div className="grow text-left">
                  <span className="font-semibold text-lg">Pengumuman</span>
                  <p className="text-sm opacity-90 mt-1">
                    Jadwal shuttle telah diperbarui untuk bulan Desember 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="px-0 pb-4">
            <ImageGallery />
          </div>

          {/* Driver Schedule Table - NEW SECTION */}
          <DriverScheduleTable />

          {/* What We Do Section */}
          <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">What We Do?</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Gaskeunn adalah layanan shuttle bus BINUS University @Malang yang
                memudahkan perjalanan hari menuju lebih cepat, aman, dan teratur
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="text-center p-6 bg-gray-100 rounded-xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Shuttle Booking</h3>
                    <p className="text-gray-600 text-sm">
                      Pesan kursi shuttle kapan saja dan dari mana saja, 
                      tidak perlu antre atau bingung jadwal cukup buka aplikasi, pilih rute, dan konfirmasi.
                    </p>
                  </div>
                </div>

                <div className="text-center p-6">
                  <div className="text-center p-6 bg-gray-100 rounded-xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
                    <p className="text-gray-600 text-sm">
                      Pantau posisi shuttle secara langsung, mahasiswa dapat mengetahui lokasi bus dan estimasi kedatangan (ETA) dengan akurat.
                    </p>
                  </div>
                </div>

                <div className="text-center p-6">
                  <div className="text-center p-6 bg-gray-100 rounded-xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Schedule Management
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Atur jadwal perjalanan kamu tanpa ribet, jadwal shuttle ditampilkan lengkap, rapi, dan mudah dipahami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destination List Section */}
          <div className="bg-gray-50 py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Destination List
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Kolom Kiri - Index 0-3 */}
                <div className="space-y-3">
                  {destinations.slice(0, 4).map((dest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm w-full"
                    >
                      <MapPin className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />
                      <div className="flex-1">
                        <p className="font-medium text-md">{dest.name}</p>
                      </div>
                      <span className="text-xs font-medium bg-blue-100 text-[oklch(0.6155_0.1314_243.17)] px-3 py-1 rounded">
                        {dest.titik}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Kolom Kanan - Index 4-7 */}
                <div className="space-y-3">
                  {destinations.slice(4, 8).map((dest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm w-full"
                    >
                      <MapPin className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />
                      <div className="flex-1">
                        <p className="font-medium text-md">{dest.name}</p>
                      </div>
                      <span className="text-xs font-medium bg-blue-100 text-[oklch(0.6155_0.1314_243.17)] px-3 py-1 rounded">
                        {dest.titik}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left - Contact Text */}
                <div className="text-gray-500 text-sm">
                  <p>If you have not found your destination,</p>
                  <p>please contact us for more details.</p>
                </div>

                {/* Center - Phone Number */}
                <div className="flex items-center gap-2 text-gray-900">
                  <FaPhone className="text-[oklch(0.6155_0.1314_243.17)]" />
                  <span className="font-semibold text-lg">+62 321 159 753</span>
                </div>

                {/* Right - Social Media Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)]  transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/6232115975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)]  transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)] transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mb-5 mt-5">
              <button className="bg-[oklch(0.6155_0.1314_243.17)] text-white px-8 py-3 rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] transition shadow-md font-semibold">
                View More Destinations →
              </button>
            </div>
          </div>

          {/* About Us Section */}
          <div className="bg-[oklch(0.92_0.0138_258.35)] py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-6">About us</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Layanan shuttle bus yang dirancang untuk memudahkan mobilitas
                  mahasiswa BINUS University @Malang. Kami memberikan transportasi
                  yang mudah, cepat, dan efisien untuk perjalanan harian mahasiswa
                  ke kampus dan menyediakan berbagai fitur untuk memaksimalkan
                  untuk strategi di Kota Mandiri.
                </p>
                <Link to="/aboutus">
                <button 
                className="bg-[oklch(0.6155_0.1314_243.17)] text-white px-6 py-3 rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] transition">
                  Read more →
                </button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img
                  src={SchoolBus}
                  alt="About Us Illustration"
                  className="w-full max-w-md rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-left mb-4">
                    What Do Binusian Say About Us?
                  </h2>
                  <p className="text-left text-gray-600">
                    Lihat bagaimana pengalaman para penumpang kami selama
                    menggunakan layanan Gaskeunn.
                  </p>
                </div>

                {/* Navigation Buttons */}
                {testimonials.length > 3 && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => scrollTestimonials("prev")}
                      disabled={currentPage === 0}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                      aria-label="Previous testimonials"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollTestimonials("next")}
                      disabled={currentPage === totalPages - 1}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === totalPages - 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[oklch(0.6155_0.1314_243.17)] hover:bg-[oklch(0.55_0.14_243.17)] text-white"
                      }`}
                      aria-label="Next testimonials"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Testimonials Container */}
              <div className="relative overflow-hidden">
                <div
                  ref={testimonialRef}
                  onScroll={handleScroll}
                  className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide pr-5"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="testimonial-card bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-80 shrink-0 hover:border-[oklch(0.55_0.14_243.17)] transition-colors duration-300"
                      style={{
                        width: "calc((100% - 48px) / 3)",
                        scrollSnapAlign: idx % 3 === 0 ? "start" : "none",
                        scrollSnapStop: idx % 3 === 0 ? "always" : "normal",
                      }}
                    >
                      <div className="flex items-center gap-1 mb-4 shrink-0">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span className="font-bold text-lg">
                          {testimonial.rating}
                        </span>
                      </div>
                      <div className="grow overflow-y-auto mb-4 pr-1 custom-scrollbar">
                        <p className="text-gray-700 text-md leading-relaxed text-left">
                          {testimonial.text}
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100 shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl shrink-0">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                            />{" "}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-left">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-500 text-xs text-left">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line Indicators */}
              {testimonials.length > 3 && (
                <div className="flex justify-center gap-3 mt-8">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToPage(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentPage
                          ? "w-12 bg-[oklch(0.6155_0.1314_243.17)]"
                          : "w-8 bg-gray-300"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:items-center">
              <div className="flex flex-col justify-center text-left">
                <h2 className="text-5xl font-bold mb-4">
                  Frequently asked{" "}
                  <span className="text-yellow-500">questions</span>
                </h2>
                <p className="text-gray-600">
                  Temukan jawaban atas pertanyaan yang sering diajukan tentang
                  Gaskeunn. Shuttle Bus BINUS @Malang
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-800">
                        {faq.question}
                      </span>
                      <span className="text-yellow-500 text-xl">
                        {openFAQ === idx ? "−" : "+"}
                      </span>
                    </button>
                    {openFAQ === idx && (
                      <div className="px-4 pb-4 text-gray-600 text-sm">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;