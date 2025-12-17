import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import { useBooking } from "../../context/BookingContext";

// Import images
import Comic from "../../assets/img/comic.png";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import SchoolBus from "../../assets/img/School_bus.png";
import BarcodeImage from "../../assets/img/QRIS.png";
import NewsImage1 from "../../assets/img/wisuda.jpg";
import NewsImage2 from "../../assets/img/jembatan.jpg";
import NewsImage3 from "../../assets/img/BINUS-malang.jpeg";
import Campustour from "../../assets/video/campustour.mp4";

import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { 
  Ticket, Newspaper, Clock, Monitor, MapPin, Calendar, Package, 
  X, Check, CreditCard, Star, ChevronLeft, ChevronRight 
} from "lucide-react";

// Image Gallery Component
const images = [
  { url: Comic, alt: "Comic Gaskeunn", type: "image" },
  { url: Campustour, alt: "Campus Tour", type: "video" },
];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  const goToSlide = (index) => setCurrentIndex((index + images.length) % images.length);
  const prevSlide = () => goToSlide(currentIndex - 1);
  const nextSlide = () => goToSlide(currentIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (galleryRef.current) galleryRef.current.scrollTo({ left: currentIndex * galleryRef.current.offsetWidth, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 shadow-xl rounded-none">
      <div ref={galleryRef} className="flex transition-transform duration-500 snap-x snap-mandatory overflow-x-hidden h-91.75">
        {images.map((item, index) => (
          <div key={index} className="shrink-0 w-full snap-center relative h-full">
            {item.type === "video" ? (
              <video src={item.url} className="w-full h-full object-cover" autoPlay loop muted playsInline controls />
            ) : (
              <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white drop-shadow-lg hover:scale-110 transition z-10">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white drop-shadow-lg hover:scale-110 transition z-10">
        <ChevronRight className="w-8 h-8" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400 opacity-70"}`} />
        ))}
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const { getTodayTickets, getAllTickets, cancelBooking } = useBooking();
  
  const [activeTab, setActiveTab] = useState("tickets");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [historyFilter, setHistoryFilter] = useState("all");
  const testimonialRef = useRef(null);

  // Get user name from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  // Untuk penumpang dengan nama "Ni Putu Saraswati", ambil nama kedua atau ketiga
  // Untuk admin, ambil nama pertama
  const getDisplayName = () => {
    if (!user.name) return "Binusian";
    const nameParts = user.name.split(' ');
    if (user.role === 'admin') {
      return nameParts[0]; // Admin
    }
    // Untuk penumpang, coba ambil nama yang lebih personal (bukan "Ni" atau "I")
    if (nameParts.length >= 3 && (nameParts[0].toLowerCase() === 'ni' || nameParts[0].toLowerCase() === 'i')) {
      return nameParts[2]; // Saraswati
    }
    if (nameParts.length >= 2) {
      return nameParts[1]; // Putu
    }
    return nameParts[0];
  };
  const userName = getDisplayName();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // News data
  const newsData = [
    { id: 1, image: NewsImage1, source: "CNN Indonesia", title: "Wisuda Binus Malang, 85,93 Persen Lulus dan Langsung Dapat Kerja", link: "#" },
    { id: 2, image: NewsImage2, source: "Radio Republik Indonesia", title: "BINUS–Microsoft Perluas Program Talenta Digital AI", link: "#" },
    { id: 3, image: NewsImage3, source: "Jatimnow Malang Raya", title: "BINUS Malang Wisuda 398 Lulusan Siap Jadi Digital Technopreneur", link: "#" },
  ];

  // Destinations
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

  // Testimonials
  const testimonials = [
    { rating: 4.8, text: "Menyenangkan banget dan akhirnya datang kuliah tepat waktu dan membantu sekali, Harapan saya untuk pihak developer lebih meningkatkan lagi aplikasi, dan juga sukses ya!", name: "Andre Nugroho", role: "Digital Communication", avatar: "https://ui-avatars.com/api/?name=Andre+Nugroho&background=3b82f6&color=fff&size=128" },
    { rating: 4.0, text: "Love banget sama Gaskeunn! 😍 Aksesnya mudah, sekarang sudah bisa on time. Selain itu, drivernya ramah banget & tahu jalan", name: "Putu Ayu Verena", role: "Computer Science", avatar: "https://ui-avatars.com/api/?name=Verena+Ayu&background=ec4899&color=fff&size=128" },
    { rating: 5, text: "Gaskeunn bener-bener ngebantu banget! Kuliahnya sekarang ngga telat lagi, aplikasinya juga sangat mudah digunakan, dan gratis pula!", name: "Kadek Samuel", role: "Interior Design", avatar: "https://ui-avatars.com/api/?name=Kadek+Samuel&background=10b981&color=fff&size=128" },
    { rating: 4.5, text: "Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus. Jadwalnya juga tepat waktu dan busnya nyaman!", name: "Pradipta Laksmana", role: "Business Management", avatar: "https://ui-avatars.com/api/?name=P+L&background=f59e0b&color=fff&size=128" },
    { rating: 4.7, text: "Pelayanan yang memuaskan, driver profesional, dan aplikasinya user-friendly. Recommended!", name: "Michael Vincent", role: "Information Systems", avatar: "https://ui-avatars.com/api/?name=M+V&background=8b5cf6&color=fff&size=128" },
    { rating: 4.9, text: "Gaskeunn solusi terbaik untuk transportasi ke kampus! Ngga perlu khawatir telat lagi.", name: "Joceline Sudigdo", role: "Accounting", avatar: "https://ui-avatars.com/api/?name=J+S&background=ef4444&color=fff&size=128" },
    { rating: 4.6, text: "Aplikasi sangat membantu! Shuttle selalu on time dan rutenya strategis. Recommend banget buat mahasiswa BINUS!", name: "Ametung Sutejo", role: "Marketing Communication", avatar: "https://ui-avatars.com/api/?name=A+S&background=06b6d4&color=fff&size=128" },
    { rating: 4.8, text: "Sejak pakai Gaskeunn, perjalanan ke kampus jadi lebih praktis dan hemat waktu. Terima kasih Gaskeunn!", name: "Dirgantara Sena", role: "International Relations", avatar: "https://ui-avatars.com/api/?name=D+S&background=14b8a6&color=fff&size=128" },
    { rating: 5, text: "Layanan shuttle yang sangat profesional dan nyaman. Aplikasinya juga mudah digunakan, best solution untuk mahasiswa!", name: "Arief Rahman", role: "Civil Engineering", avatar: "https://ui-avatars.com/api/?name=A+R&background=6366f1&color=fff&size=128" },
  ];

  // FAQs
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

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  // Testimonials pagination
  const totalPages = Math.ceil(testimonials.length / 3);
  const scrollTimeoutRef = useRef(null);

  // Handler untuk update indicator saat manual scroll
  const handleScroll = () => {
    const container = testimonialRef.current;
    if (!container) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const firstCard = container.querySelector(".testimonial-card");
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 24;
      const scrollLeft = container.scrollLeft;
      const pageWidth = (cardWidth + gap) * 3;
      const newPage = Math.round(scrollLeft / pageWidth);

      if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    }, 100);
  };

  const scrollToPage = (pageIndex) => {
    const container = testimonialRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".testimonial-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
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

  // Get status badge style
  const getStatusBadge = (status) => {
    const badges = {
      ongoing: { text: "Ongoing", className: "bg-white text-orange-600 border border-orange-500" },
      cancelled: { text: "Cancelled", className: "bg-white text-red-600 border border-red-500" },
      completed: { text: "Completed", className: "bg-white text-green-600 border border-green-500" },
      pending: { text: "Pending Payment", className: "bg-white text-purple-600 border border-purple-500" },
    };
    return badges[status] || { text: status, className: "bg-white text-gray-600 border border-gray-500" };
  };

  // Handle cancel booking
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Apakah kamu yakin ingin membatalkan tiket ini?')) {
      cancelBooking(bookingId);
    }
  };

  // Render My Tickets (Today's tickets only)
  const renderMyTickets = () => {
    const todayTickets = getTodayTickets();

    if (todayTickets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Ticket className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada tiket hari ini</h3>
          <p className="text-gray-500 mb-6 text-center">Kamu belum memesan tiket untuk hari ini.<br/>Yuk booking perjalananmu sekarang!</p>
          <button 
            onClick={() => navigate('/passenger/booking')}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg"
          >
            Book Ticket Sekarang
          </button>
        </div>
      );
    }

    const ticket = todayTickets[0]; // Show first ticket

    return (
      <div className="flex gap-4">
        {/* Main Ticket Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex">
            {/* Left Section */}
            <div className="flex-1 p-5">
              <div className="mb-4">
                <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-gray-400 text-xs mb-1">Departure</div>
                  <div className="text-2xl font-bold text-gray-900">{ticket.departure.time}</div>
                  <div className="text-sm text-gray-600">{ticket.departure.date}</div>
                  <div className="text-sm text-gray-500">{ticket.departure.location}</div>
                </div>
                <div className="flex flex-col items-center px-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="w-16 h-0.5 border-t-2 border-dashed border-gray-300"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  <div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1">{ticket.duration}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{ticket.stops}</div>
                </div>
                <div className="text-left">
                  <div className="text-gray-400 text-xs mb-1">Destination</div>
                  <div className="text-2xl font-bold text-gray-900">{ticket.arrival.time}</div>
                  <div className="text-sm text-gray-600">{ticket.arrival.date}</div>
                  <div className="text-sm text-gray-500">{ticket.arrival.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-2 text-gray-500 flex-1">
                  <Monitor size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs leading-tight">Show e-tickets and passenger identities during check-in.</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-start gap-2 text-gray-500 flex-1">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs leading-tight">Please be at the boarding gate at least 30 minutes before.</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute top-4 bottom-4 w-px border-l-2 border-dashed border-yellow-400"></div>
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
            </div>

            {/* Right Section - Passenger Info */}
            <div className="w-96 p-5 bg-white">
              <div className="flex justify-end mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(ticket.status).className}`}>
                  {getStatusBadge(ticket.status).text}
                </span>
              </div>
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">Name</div>
                    <div className="text-gray-900 font-semibold text-sm whitespace-nowrap">{ticket.passenger.name}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">Email</div>
                    <div className="text-gray-900 font-semibold text-sm whitespace-nowrap truncate">{ticket.passenger.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">BINUSIAN ID</div>
                    <div className="text-gray-900 font-semibold text-sm">{ticket.passenger.binusianId}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">NIM</div>
                    <div className="text-gray-900 font-semibold text-sm">{ticket.passenger.nim}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-8 pt-3 border-t border-gray-100">
                <div className="text-center bg-gray-50 rounded-lg px-8 py-2">
                  <div className="text-gray-400 text-xs mb-1">Bus</div>
                  <div className="text-gray-900 font-bold text-2xl">{ticket.bus}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg px-8 py-2">
                  <div className="text-gray-400 text-xs mb-1">Seat</div>
                  <div className="text-gray-900 font-bold text-2xl">{ticket.seat}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode Section */}
        <div className="w-40 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-2">BARCODE</h3>
          <img src={BarcodeImage} alt="Barcode" className="w-24 h-24 object-contain mb-2" />
          <div className="text-center mb-2">
            <div className="text-gray-400 text-xs mb-0.5">Booking code</div>
            <div className="text-gray-900 font-bold text-xs">{ticket.bookingCode}</div>
          </div>
          <button 
            onClick={() => navigate(`/detail-ticket/${ticket.id}`)}
            className="text-orange-500 text-xs hover:text-orange-600 hover:underline font-medium"
          >
            View detail ticket...
          </button>
        </div>
      </div>
    );
  };

  // Render Latest News
  const renderLatestNews = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {newsData.map((news) => (
        <div key={news.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="h-48 overflow-hidden">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="p-5">
            <p className="text-gray-500 text-sm mb-2">{news.source}</p>
            <h3 className="font-bold text-gray-900 text-lg mb-4 leading-tight line-clamp-3">{news.title}</h3>
            <div className="flex justify-end">
              <a href={news.link} className="text-blue-500 hover:text-blue-600 font-medium text-sm hover:underline">Read More</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render History Card
  const renderHistoryCard = (ticket) => {
    const statusBadge = getStatusBadge(ticket.status);

    return (
      <div key={ticket.id} className="flex gap-4 shrink-0">
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex">
            <div className="flex-1 p-5">
              <div className="mb-4">
                <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-gray-400 text-xs mb-1">Departure</div>
                  <div className="text-2xl font-bold text-gray-900">{ticket.departure.time}</div>
                  <div className="text-sm text-gray-600">{ticket.departure.date}</div>
                  <div className="text-sm text-gray-500">{ticket.departure.location}</div>
                </div>
                <div className="flex flex-col items-center px-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="w-16 h-0.5 border-t-2 border-dashed border-gray-300"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  <div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1">{ticket.duration}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{ticket.stops}</div>
                </div>
                <div className="text-left">
                  <div className="text-gray-400 text-xs mb-1">Destination</div>
                  <div className="text-2xl font-bold text-gray-900">{ticket.arrival.time}</div>
                  <div className="text-sm text-gray-600">{ticket.arrival.date}</div>
                  <div className="text-sm text-gray-500">{ticket.arrival.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-2 text-gray-500 flex-1">
                  <Monitor size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs leading-tight">Show e-tickets during check-in.</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-start gap-2 text-gray-500 flex-1">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span className="text-xs leading-tight">Be at boarding gate 30 min before.</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-4 bottom-4 w-px border-l-2 border-dashed border-yellow-400"></div>
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
            </div>

            <div className="w-80 p-5 bg-white">
              <div className="flex justify-end mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>{statusBadge.text}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">Name</div>
                    <div className="text-gray-900 font-semibold text-sm truncate">{ticket.passenger.name}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400 text-xs mb-1">NIM</div>
                    <div className="text-gray-900 font-semibold text-sm">{ticket.passenger.nim}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 pt-3 border-t border-gray-100">
                <div className="text-center bg-gray-50 rounded-lg px-6 py-2">
                  <div className="text-gray-400 text-xs mb-1">Bus</div>
                  <div className="text-gray-900 font-bold text-xl">{ticket.bus}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg px-6 py-2">
                  <div className="text-gray-400 text-xs mb-1">Seat</div>
                  <div className="text-gray-900 font-bold text-xl">{ticket.seat}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Icon */}
        <div className="w-32 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-100">
          {ticket.status === "ongoing" && ticket.hasBarcode ? (
            <>
              <h3 className="text-xs font-bold text-gray-900 mb-2">BARCODE</h3>
              <img src={BarcodeImage} alt="Barcode" className="w-20 h-20 object-contain mb-2" />
              <div className="text-gray-900 font-bold text-xs text-center">{ticket.bookingCode}</div>
            </>
          ) : ticket.status === "cancelled" ? (
            <>
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <X className="w-7 h-7 text-red-500" />
              </div>
              <div className="text-xs text-gray-500 text-center">Cancelled</div>
            </>
          ) : ticket.status === "completed" ? (
            <>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Check className="w-7 h-7 text-green-500" />
              </div>
              <div className="text-xs text-gray-500 text-center">Completed</div>
            </>
          ) : ticket.status === "pending" ? (
            <>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <CreditCard className="w-7 h-7 text-purple-500" />
              </div>
              <div className="text-xs text-gray-500 text-center mb-2">Pending</div>
              <button className="text-purple-600 text-xs font-semibold hover:underline">Pay Now</button>
            </>
          ) : (
            <>
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <Package className="w-7 h-7 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500 text-center">No barcode</div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Render Histories
  const renderHistories = () => {
    const allTickets = getAllTickets();
    const filteredTickets = historyFilter === "all" 
      ? allTickets 
      : allTickets.filter(t => t.status === historyFilter);

    return (
      <div className="h-full flex flex-col">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 shrink-0 flex-wrap">
          {["all", "ongoing", "cancelled", "completed", "pending"].map((filter) => (
            <button 
              key={filter} 
              onClick={() => setHistoryFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                historyFilter === filter 
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              {filter === "all" ? "All Status" : filter === "pending" ? "Pending" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: "thin", maxHeight: "340px" }}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => renderHistoryCard(ticket))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="font-semibold">Belum ada tiket</p>
              <p className="text-sm mt-1">Yuk booking perjalanan pertamamu!</p>
              <button 
                onClick={() => navigate('/passenger/booking')}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600"
              >
                Book Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />
        
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white text-black pt-4 pb-4 md:pt-6 md:pb-6 shadow-lg">
            <div className="px-8 lg:px-12">
              <h1 className="text-2xl font-bold mb-0 text-left">Halo, {userName}!</h1>
              <p className="text-xl font-light mt-1 mb-3 opacity-90 text-left">Mau kemana hari ini?</p>
              <div className="flex items-start bg-yellow-400/70 p-4 rounded-lg border border-yellow-300 shadow-inner">
                <IoIosInformationCircle className="text-2xl mr-3 text-white" />
                <div className="grow text-left">
                  <span className="font-semibold text-lg">Pengumuman</span>
                  <p className="text-sm opacity-90 mt-1">Jadwal shuttle telah diperbarui untuk bulan Desember 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="px-0 pb-4">
            <ImageGallery />
          </div>

          {/* Tabs Section */}
          <div className="bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="bg-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                <div className="bg-gray-800 px-6 pt-6">
                  <div className="flex gap-0 w-fit">
                    {[
                      { id: "tickets", label: "My Tickets", icon: Ticket },
                      { id: "news", label: "Latest News", icon: Newspaper },
                      { id: "histories", label: "Histories", icon: Clock }
                    ].map((tab) => (
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)} 
                        className={`flex items-center gap-2 px-5 py-2.5 font-medium transition-colors rounded-t-lg ${
                          activeTab === tab.id ? "bg-gray-50 text-gray-800" : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                      >
                        <tab.icon size={18} className={activeTab === tab.id ? "text-orange-500" : "text-white"} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 min-h-[420px]">
                  {activeTab === "tickets" && renderMyTickets()}
                  {activeTab === "news" && renderLatestNews()}
                  {activeTab === "histories" && renderHistories()}
                </div>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">What We Do?</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Gaskeunn adalah layanan shuttle bus BINUS University @Malang yang memudahkan perjalanan hari menuju lebih cepat, aman, dan teratur
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
                    <h3 className="text-xl font-bold mb-3">Schedule Management</h3>
                    <p className="text-gray-600 text-sm">
                      Atur jadwal perjalanan kamu tanpa ribet, jadwal shuttle ditampilkan lengkap, rapi, dan mudah dipahami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destination List */}
          <div className="bg-gray-50 py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Destination List</h2>

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
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)] transition"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/6232115975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)] transition"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center text-white hover:bg-[oklch(0.55_0.14_243.17)] transition"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="text-center mb-5 mt-5">
                <Link to="/routeschedule">
                  <button className="bg-[oklch(0.6155_0.1314_243.17)] text-white px-8 py-3 rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] transition shadow-md font-semibold">
                    View More Destinations →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="bg-[oklch(0.92_0.0138_258.35)] py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-6">About us</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Layanan shuttle bus yang dirancang untuk memudahkan mobilitas
                  mahasiswa BINUS University @Malang. Kami memberikan transportasi
                  yang mudah, cepat, dan efisien untuk perjalanan harian mahasiswa
                  ke kampus dan menyediakan berbagai fitur untuk memaksimalkan
                  pengalaman perjalanan di Kota Malang.
                </p>
                <Link to="/aboutus">
                  <button className="bg-[oklch(0.6155_0.1314_243.17)] text-white px-6 py-3 rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] transition">
                    Read more →
                  </button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img src={SchoolBus} alt="About Us Illustration" className="w-full max-w-md rounded-lg" />
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-left mb-4">What Do Binusian Say About Us?</h2>
                  <p className="text-left text-gray-600">
                    Lihat bagaimana pengalaman para penumpang kami selama menggunakan layanan Gaskeunn.
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
                      <ChevronLeft className="w-5 h-5" />
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
                      <ChevronRight className="w-5 h-5" />
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
                        <span className="font-bold text-lg">{testimonial.rating}</span>
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
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-left">{testimonial.name}</p>
                            <p className="text-gray-500 text-xs text-left">{testimonial.role}</p>
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
                        idx === currentPage ? "w-12 bg-[oklch(0.6155_0.1314_243.17)]" : "w-8 bg-gray-300"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:items-center">
              <div className="flex flex-col justify-center text-left">
                <h2 className="text-5xl font-bold mb-4">
                  Frequently asked <span className="text-yellow-500">questions</span>
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
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <span className="text-yellow-500 text-xl">{openFAQ === idx ? "−" : "+"}</span>
                    </button>
                    {openFAQ === idx && (
                      <div className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>
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