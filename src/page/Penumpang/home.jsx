import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext"; 
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import { useBooking } from "../../context/BookingContext";

// Import images
import Comic from "../../assets/img/comic.png";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import SchoolBus from "../../assets/img/school_bus.png";
import BarcodeImage from "../../assets/img/QRIS.png";
import NewsImage1 from "../../assets/img/wisuda.jpg";
import NewsImage2 from "../../assets/img/jembatan.jpg";
import NewsImage3 from "../../assets/img/BINUS-malang.jpeg";
import Campustour from "../../assets/video/campustour.mp4";

import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { 
  Ticket, Newspaper, Clock, Monitor, MapPin, Calendar, Package, 
  X, Check, CreditCard, Star, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Bus as BusIcon, CheckCircle, Navigation
} from "lucide-react";

// Fix default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom Bus Icon for map
const createBusIcon = () => {
  return L.divIcon({
    html: `
      <div style="background: oklch(0.805 0.1545 76.47); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 6v6"></path>
          <path d="M15 6v6"></path>
          <path d="M2 12h19.6"></path>
          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path>
          <circle cx="7" cy="18" r="2"></circle>
          <path d="M9 18h5"></path>
          <circle cx="16" cy="18" r="2"></circle>
        </svg>
      </div>
    `,
    className: "custom-bus-icon",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// Custom Halte Icon
const createHalteIcon = (isStart = false) => {
  const color = isStart ? "#22c55e" : "oklch(0.805 0.1545 76.47)";
  return L.divIcon({
    html: `
      <div style="background: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    className: "custom-halte-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to animate bus position
const AnimatedBusMarker = ({ route, progress }) => {
  const map = useMap();
  const [position, setPosition] = useState(route[0]);

  useEffect(() => {
    if (route.length < 2) return;
    
    const totalDistance = route.reduce((acc, point, i) => {
      if (i === 0) return 0;
      const prev = route[i - 1];
      return acc + Math.sqrt(Math.pow(point[0] - prev[0], 2) + Math.pow(point[1] - prev[1], 2));
    }, 0);

    const targetDistance = totalDistance * (progress / 100);
    let currentDistance = 0;

    for (let i = 1; i < route.length; i++) {
      const prev = route[i - 1];
      const curr = route[i];
      const segmentDistance = Math.sqrt(Math.pow(curr[0] - prev[0], 2) + Math.pow(curr[1] - prev[1], 2));

      if (currentDistance + segmentDistance >= targetDistance) {
        const ratio = (targetDistance - currentDistance) / segmentDistance;
        const lat = prev[0] + (curr[0] - prev[0]) * ratio;
        const lng = prev[1] + (curr[1] - prev[1]) * ratio;
        setPosition([lat, lng]);
        break;
      }
      currentDistance += segmentDistance;
    }
  }, [progress, route]);

  return <Marker position={position} icon={createBusIcon()} />;
};

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
  const { getNextUpcomingTicket, getAllTickets, cancelBooking } = useBooking();
  const { getHomeReviews } = useReviews();
  
  const [activeTab, setActiveTab] = useState("tickets");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [historyFilter, setHistoryFilter] = useState("all");
  const testimonialRef = useRef(null);

  // Tracking Popup State
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [selectedTicketForTracking, setSelectedTicketForTracking] = useState(null);
  const [busProgress, setBusProgress] = useState(25);
  const [trackingStatus, setTrackingStatus] = useState(1); // 1: menuju lokasi, 2: dalam perjalanan, 3: sampai

  // Get user name from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const getDisplayName = () => {
    if (!user.name) return "Binusian";
    const nameParts = user.name.split(' ');
    if (user.role === 'admin') {
      return nameParts[0];
    }
    if (nameParts.length >= 3 && (nameParts[0].toLowerCase() === 'ni' || nameParts[0].toLowerCase() === 'i')) {
      return nameParts[2];
    }
    if (nameParts.length >= 2) {
      return nameParts[1];
    }
    return nameParts[0];
  };
  const userName = getDisplayName();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate bus movement
  useEffect(() => {
    if (showTrackingPopup && trackingStatus < 3) {
      const interval = setInterval(() => {
        setBusProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 50 && trackingStatus === 1) {
            setTrackingStatus(2);
          }
          if (newProgress >= 100) {
            setTrackingStatus(3);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showTrackingPopup, trackingStatus]);

  // Driver data
  const driverData = {
    name: "Pak Budi Santoso",
    photo: "https://ui-avatars.com/api/?name=Budi+Santoso&background=3b82f6&color=fff&size=128",
    role: "Driver",
    rating: 4.9,
    phone: "+6281234567890",
    totalTrips: 1250,
    busNumber: "B 1234 XYZ",
  };

  // Route coordinates (Araya to BINUS)
  const routeCoordinates = [
    [-7.9368482258999595, 112.67512243871319],
    [-7.937506892617456, 112.65819299365303],
    [-7.938728078786892, 112.66125923921314],
    [-7.939326456906397, 112.68104383601565],
  ];

  // Handle ticket click for tracking
  const handleTicketClick = (ticket) => {
    setSelectedTicketForTracking(ticket);
    setShowTrackingPopup(true);
    setBusProgress(25);
    setTrackingStatus(1);
  };

  // Close tracking popup
  const closeTrackingPopup = () => {
    setShowTrackingPopup(false);
    setSelectedTicketForTracking(null);
    setBusProgress(25);
    setTrackingStatus(1);
  };

  // Tracking Popup Component
  const TrackingPopup = () => {
    if (!showTrackingPopup || !selectedTicketForTracking) return null;

    const statusSteps = [
      { id: 1, title: "Sopir menuju lokasi kamu", icon: Navigation, description: "Bus sedang dalam perjalanan ke halte jemput" },
      { id: 2, title: "Kamu sedang dalam perjalanan", icon: BusIcon, description: "Nikmati perjalananmu dengan nyaman" },
      { id: 3, title: "Kamu sudah sampai tujuan", icon: CheckCircle, description: "Terima kasih telah menggunakan Gaskeunn" },
    ];

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeTrackingPopup}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[oklch(0.805_0.1545_76.47)] to-[oklch(0.85_0.15_85)] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto brightness-0 invert" />
              <div>
                <h2 className="text-white font-bold text-lg">Live Tracking</h2>
                <p className="text-white/80 text-sm">Bus {selectedTicketForTracking?.bus || "01"} • {selectedTicketForTracking?.bookingCode || "BUS01150224"}</p>
              </div>
            </div>
            <button onClick={closeTrackingPopup} className="text-white hover:bg-white/20 p-2 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db #f3f4f6" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Map */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />
                  Real-Time Location
                </h3>
                <div className="h-80 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-inner">
                  <MapContainer
                    center={[-7.938, 112.67]}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Route Line */}
                    <Polyline
                      positions={routeCoordinates}
                      color="#e0a82e"
                      weight={4}
                      opacity={0.8}
                      dashArray="10, 10"
                    />

                    {/* Start Halte Marker */}
                    <Marker position={routeCoordinates[0]} icon={createHalteIcon(true)}>
                      <Popup>
                        <div className="text-center">
                          <p className="font-bold text-green-600">Halte Jemput</p>
                          <p className="text-sm text-gray-600">{selectedTicketForTracking?.departure?.location || "Araya"}</p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* End Halte Marker */}
                    <Marker position={routeCoordinates[routeCoordinates.length - 1]} icon={createHalteIcon(false)}>
                      <Popup>
                        <div className="text-center">
                          <p className="font-bold text-[oklch(0.65_0.15_76.47)]">Tujuan</p>
                          <p className="text-sm text-gray-600">{selectedTicketForTracking?.arrival?.location || "BINUS University"}</p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Animated Bus Marker */}
                    <AnimatedBusMarker route={routeCoordinates} progress={busProgress} />
                  </MapContainer>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{selectedTicketForTracking?.departure?.location || "Araya"}</span>
                    <span>{selectedTicketForTracking?.arrival?.location || "BINUS University"}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        trackingStatus === 3 
                          ? "bg-gradient-to-r from-green-500 to-green-400" 
                          : "bg-gradient-to-r from-[oklch(0.805_0.1545_76.47)] to-[oklch(0.85_0.15_85)]"
                      }`}
                      style={{ width: `${busProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {trackingStatus === 3 ? (
                      <span className="font-semibold text-green-600">🎉 Kamu sudah sampai di tujuan!</span>
                    ) : (
                      <>Estimasi tiba: <span className="font-semibold text-gray-900">{Math.max(1, Math.round((100 - busProgress) / 10))} menit</span></>
                    )}
                  </p>
                </div>
              </div>

              {/* Right Side - Tracking Status & Driver Info */}
              <div className="space-y-6">
                {/* Tracking Status */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />
                    Status Perjalanan
                  </h3>
                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const isActive = trackingStatus === step.id;
                      const isCompleted = trackingStatus > step.id;
                      const isFinalCompleted = trackingStatus === 3 && step.id === 3;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.id} className="flex gap-4">
                          {/* Timeline */}
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted || isFinalCompleted ? "bg-green-500" : isActive ? "bg-[oklch(0.805_0.1545_76.47)] animate-pulse" : "bg-gray-200"
                            }`}>
                              {isCompleted || isFinalCompleted ? (
                                <Check className="w-5 h-5 text-white" />
                              ) : (
                                <StepIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                              )}
                            </div>
                            {index < statusSteps.length - 1 && (
                              <div className={`w-0.5 h-12 mt-2 ${
                                isCompleted ? "bg-green-500" : "bg-gray-200"
                              }`}></div>
                            )}
                          </div>

                          {/* Content */}
                          <div className={`flex-1 pb-4 ${isActive || isFinalCompleted ? "" : "opacity-60"}`}>
                            <p className={`font-semibold ${isFinalCompleted ? "text-green-600" : isActive ? "text-[oklch(0.805_0.1545_76.47)]" : isCompleted ? "text-green-600" : "text-gray-600"}`}>
                              {step.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                            {isActive && !isFinalCompleted && (
                              <span className="inline-block mt-2 px-3 py-1 bg-[oklch(0.94_0.08_85)] text-[oklch(0.65_0.15_76.47)] text-xs font-semibold rounded-full animate-pulse">
                                Sedang berlangsung
                              </span>
                            )}
                            {isFinalCompleted && (
                              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                                Selesai
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Driver Information */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Informasi Driver</h3>
                  
                  <div className="flex items-start gap-4">
                    {/* Driver Photo */}
                    <div className="relative">
                      <img 
                        src={driverData.photo} 
                        alt={driverData.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                    </div>

                    {/* Driver Details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{driverData.name}</h4>
                      <p className="text-gray-500 text-sm">{driverData.role}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{driverData.rating}</span>
                        <span className="text-gray-400 text-sm">• {driverData.totalTrips} trips</span>
                      </div>

                      {/* Bus Number */}
                      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-[oklch(0.94_0.08_85)] rounded-full">
                        <BusIcon className="w-4 h-4 text-[oklch(0.65_0.15_76.47)]" />
                        <span className="text-sm font-semibold text-[oklch(0.65_0.15_76.47)]">{driverData.busNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-5">
                    <button 
                      onClick={() => window.open(`tel:${driverData.phone}`, '_self')}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-green-500/30"
                    >
                      <Phone className="w-5 h-5" />
                      Call Driver
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/${driverData.phone.replace('+', '')}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Message
                    </button>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-xs">Departure</p>
                      <p className="font-bold text-gray-900">{selectedTicketForTracking?.departure?.time || "06:45"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Arrival</p>
                      <p className="font-bold text-gray-900">{selectedTicketForTracking?.arrival?.time || "07:00"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Seat</p>
                      <p className="font-bold text-gray-900">{selectedTicketForTracking?.seat || "12"}</p>
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

  // ✅ PERBAIKAN: Ambil testimonials dari ReviewContext
  const testimonials = getHomeReviews();

  // ✅ DYNAMIC TESTIMONIALS PAGINATION
  const getCardsPerSlide = () => {
    if (testimonials.length <= 3) return testimonials.length; // Show all
    if (testimonials.length <= 6) return 2; // 2 cards per slide
    return 3; // 3 cards per slide (default)
  };

  const cardsPerSlide = getCardsPerSlide();
  const totalPages = Math.ceil(testimonials.length / cardsPerSlide);
  const scrollTimeoutRef = useRef(null);

  // FAQs
  const faqs = [
    {
      question: "What is Gaskeunn?",
      answer: "Gaskeunn adalah layanan shuttle bus BINUS University @Malang yang menyediakan transportasi untuk mahasiswa dari berbagai titik lokasi.",
    },
    {
      question: "How do I book a shuttle bus?",
      answer: "Anda dapat melakukan booking melalui aplikasi Gaskeunn dengan memilih rute, waktu keberangkatan, dan mengisi data diri.",
    },
    {
      question: "What if the shuttle is late?",
      answer: "Anda dapat melacak posisi shuttle secara real-time melalui fitur tracking di aplikasi.",
    },
    {
      question: "Who can use this service?",
      answer: "Layanan ini tersedia untuk seluruh mahasiswa BINUS University yang terdaftar.",
    },
  ];

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

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
      const pageWidth = (cardWidth + gap) * cardsPerSlide;
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
    const scrollPosition = pageIndex * ((cardWidth + gap) * cardsPerSlide);

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

  // Render My Tickets (Next upcoming ticket only - closest to current time, today only)
  const renderMyTickets = () => {
    const ticket = getNextUpcomingTicket();

    if (!ticket) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Ticket className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada tiket hari ini</h3>
          <p className="text-gray-500 mb-6 text-center">Kamu belum memesan tiket untuk hari ini.<br/>Yuk booking perjalananmu sekarang!</p>
          <button 
            onClick={() => navigate('/booking')}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg"
          >
            Book Ticket Sekarang
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-4">
        {/* Main Ticket Card - Clickable for tracking if ongoing */}
        <div 
          className={`flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow ${ticket.status === "ongoing" ? "cursor-pointer" : ""}`}
          onClick={() => ticket.status === "ongoing" && handleTicketClick(ticket)}
        >
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
              {/* Click to Track Indicator - Only show for ongoing tickets */}
              {ticket.status === "ongoing" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-orange-500 animate-pulse">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">Klik untuk Live Tracking</span>
                </div>
              )}
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

  // Render History Card
  const renderHistoryCard = (ticket) => {
    const statusBadge = getStatusBadge(ticket.status);

    return (
      <div key={ticket.id} className="flex gap-4 shrink-0">
        <div 
          className={`flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow ${ticket.status === "ongoing" ? "cursor-pointer" : ""}`}
          onClick={() => ticket.status === "ongoing" && handleTicketClick(ticket)}
        >
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
              {/* Click to Track Indicator - Only for ongoing */}
              {ticket.status === "ongoing" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-orange-500 animate-pulse">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">Klik untuk Live Tracking</span>
                </div>
              )}
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
      {/* Tracking Popup */}
      <TrackingPopup />
      
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

          {/* ✅ TESTIMONIALS - DYNAMIC LAYOUT */}
          <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-left mb-4">What Do Binusian Say About Us?</h2>
                  <p className="text-left text-gray-600">
                    Lihat bagaimana pengalaman para penumpang kami selama menggunakan layanan Gaskeunn.
                  </p>
                </div>

                {/* Navigation Buttons - Only show if needed */}
                {totalPages > 1 && (
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
                  className={`flex gap-6 ${totalPages > 1 ? 'overflow-x-scroll scroll-smooth' : 'justify-center'} scrollbar-hide pr-5`}
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollSnapType: totalPages > 1 ? "x mandatory" : "none",
                  }}
                >
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="testimonial-card bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-80 shrink-0 hover:border-[oklch(0.55_0.14_243.17)] transition-colors duration-300"
                      style={{
                        width: cardsPerSlide === 1 
                          ? "calc(100%)" 
                          : cardsPerSlide === 2 
                            ? "calc((100% - 24px) / 2)" 
                            : "calc((100% - 48px) / 3)",
                        scrollSnapAlign: idx % cardsPerSlide === 0 ? "start" : "none",
                        scrollSnapStop: idx % cardsPerSlide === 0 ? "always" : "normal",
                      }}
                    >
                      <div className="flex items-center gap-1 mb-4 shrink-0">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span className="font-bold text-lg">{testimonial.rating}</span>
                      </div>
                      <div className="grow overflow-y-auto mb-4 pr-1 custom-scrollbar">
                        <p className="text-gray-700 text-md leading-relaxed text-left">
                          {testimonial.comment}
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

              {/* Line Indicators - Only show if pagination needed */}
              {totalPages > 1 && (
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