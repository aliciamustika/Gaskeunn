import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext";
import Navbar from "../Sopir/navbar";
import Footer from "../../components/footer";

// Import icons
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  QrCode, 
  X, 
  Camera,
  CheckCircle,
  XCircle,
  User,
  MapPinIcon,
  Calendar,
  Clock,
  Upload
} from "lucide-react";

// Import images
import Comic from "../../assets/img/comic.png";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import SchoolBus from "../../assets/img/school_bus.png";
import Campustour from "../../assets/video/campustour.mp4";

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

// Barcode Scanner Modal Component
const BarcodeScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'upload'
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cleanup camera on unmount or close
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Stop camera when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setScannedData(null);
      setError('');
    }
  }, [isOpen]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const startCamera = async () => {
    try {
      setError('');
      setIsScanning(true);
      
      console.log('📹 Starting camera (demo mode)...');
      
      // In demo mode, we don't actually need real camera
      // Just simulate camera preview
      console.log('✅ Camera started (simulated)');
      
      // Note: Real camera code commented out for demo
      // Uncomment for production:
      /*
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      */
      
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera not available (Demo Mode - this is normal)');
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('📸 File uploaded, simulating scan...');
      // In demo mode, just simulate scan regardless of file content
      setTimeout(() => {
        simulateScan();
      }, 1000);
    }
  };

  const simulateScan = () => {
    // DEMO MODE: Simulate barcode reading
    console.log('🔄 Simulating scan...');
    
    // Generate mock ticket data
    const mockTicketData = {
      ticketId: 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      passengerName: 'Ni Putu Saraswati',
      route: 'T1 → BINUS @Malang',
      departure: 'Perempatan Tirtomoyo',
      destination: 'BINUS University',
      date: new Date().toLocaleDateString('id-ID'),
      time: '07:30',
      seat: 'A' + Math.floor(Math.random() * 20 + 1),
      status: 'valid'
    };
    
    console.log('✅ Scan complete!', mockTicketData);
    
    setScannedData(mockTicketData);
    onScanSuccess(mockTicketData);
    stopCamera();
  };

  const handleManualScan = () => {
    if (!isScanning) {
      startCamera();
      // Auto-trigger scan after camera starts (DEMO MODE)
      setTimeout(() => {
        simulateScan();
      }, 2000); // 2 seconds delay for demo
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <QrCode className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Scan Ticket</h3>
                <p className="text-sm text-gray-500">Scan passenger barcode/QR code</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Scan Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setScanMode('camera');
                stopCamera();
                setScannedData(null);
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                scanMode === 'camera'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              Camera
            </button>
            <button
              onClick={() => {
                setScanMode('upload');
                stopCamera();
                setScannedData(null);
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                scanMode === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>

          {/* Camera Mode */}
          {scanMode === 'camera' && !scannedData && (
            <div className="space-y-4">
              {/* Video Preview */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
                {isScanning ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border-4 border-white/50 rounded-2xl relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>
                        
                        {/* Scanning line animation */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute w-full h-1 bg-blue-500 animate-scan"></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Camera not started</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 text-center font-semibold">
                  📱 DEMO MODE: Click button below to auto-scan
                </p>
                <p className="text-xs text-blue-600 text-center mt-1">
                  No real camera needed - simulation will run automatically
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Scan Button */}
              <button
                onClick={handleManualScan}
                disabled={isScanning}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Auto-scanning in 2 seconds...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Start Auto-Scan (Demo)
                  </>
                )}
              </button>
            </div>
          )}

          {/* Upload Mode */}
          {scanMode === 'upload' && !scannedData && (
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 font-medium mb-2">Upload QR Code Image</p>
                <p className="text-sm text-gray-500">Click to browse files</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center font-semibold">
                  📸 DEMO MODE: Upload any image
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  System will auto-simulate scan - no real QR code needed
                </p>
              </div>
            </div>
          )}

          {/* Scanned Result */}
          {scannedData && (
            <div className="space-y-4 animate-fadeIn">
              {/* Success Badge */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
                <div>
                  <p className="font-bold text-green-900">Valid Ticket</p>
                  <p className="text-sm text-green-700">Passenger verified successfully</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-500">TICKET ID</span>
                  <span className="font-mono font-bold text-blue-600">{scannedData.ticketId}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Passenger Name</p>
                      <p className="font-semibold text-gray-900">{scannedData.passengerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Route</p>
                      <p className="font-semibold text-gray-900">{scannedData.route}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {scannedData.departure} → {scannedData.destination}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-semibold text-gray-900 text-sm">{scannedData.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-semibold text-gray-900 text-sm">{scannedData.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Seat Number</span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">
                      {scannedData.seat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setScannedData(null);
                    setError('');
                  }}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  Scan Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        
        .animate-scan {
          animation: scan 2s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

function Home({ userName = "Budi" }) {
  const { getHomeReviews } = useReviews();
  
  const [activeTab, setActiveTab] = useState("tickets");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scannedTickets, setScannedTickets] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const testimonialRef = useRef(null);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scan success
  const handleScanSuccess = (ticketData) => {
    setScannedTickets(prev => [
      {
        ...ticketData,
        scannedAt: new Date().toISOString()
      },
      ...prev
    ]);
    
    // Show success notification
    console.log('✅ Ticket scanned:', ticketData);
  };

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

  const testimonials = getHomeReviews();

  const getCardsPerSlide = () => {
    if (isMobile) return 1;
    if (testimonials.length <= 3) return testimonials.length;
    if (testimonials.length <= 6) return 2;
    return 3;
  };

  const cardsPerSlide = getCardsPerSlide();
  const totalPages = Math.ceil(testimonials.length / cardsPerSlide);
  const scrollTimeoutRef = useRef(null);

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

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />
        
        <div className="bg-gray-50 min-h-screen">
          {/* Header - Compact Version */}
          <div className="bg-white text-black pt-4 pb-3 md:pt-5 md:pb-4 shadow-lg">
            <div className="px-8 lg:px-12">
              <h1 className="text-2xl font-bold mb-0 text-left">Halo, {userName}!</h1>
              <p className="text-lg font-light mt-0.5 mb-2.5 opacity-90 text-left">Selamat bekerja hari ini!</p>
              
              {/* Stats Card - Matched with Pengumuman */}
              <div className="flex items-start bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg border border-blue-400 shadow-inner text-white">
                <QrCode className="text-2xl mr-3 shrink-0" />
                <div className="grow text-left">
                  <span className="font-semibold text-lg">Tickets Scanned Today</span>
                  <p className="text-sm opacity-90 mt-1">{scannedTickets.length} tiket berhasil discan hari ini 🚌</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="px-0 pb-4">
            <ImageGallery />
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
                      <MapPin className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
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
                      <MapPin className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
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
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative overflow-hidden">
                <div
                  ref={testimonialRef}
                  onScroll={handleScroll}
                  className={`flex gap-6 ${totalPages > 1 ? 'overflow-x-scroll scroll-smooth' : 'justify-center'} scrollbar-hide ${isMobile ? 'px-3' : 'pr-5'}`}
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
                        width: isMobile 
                          ? "calc(100% - 24px)" 
                          : cardsPerSlide === 1 
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
                        <span className="font-bold text-lg">
                          {testimonial.rating}
                        </span>
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

              {totalPages > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => scrollToPage(idx)} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentPage ? "w-12 bg-[oklch(0.6155_0.1314_243.17)]" : "w-8 bg-gray-300"
                      }`}
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

        {/* ✅ FLOATING BARCODE SCANNER BUTTON */}
        <button
          onClick={() => setShowBarcodeScanner(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group z-40"
          aria-label="Scan Ticket"
        >
          <QrCode className="w-7 h-7" />
          
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></span>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Scan Ticket
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>

        {/* Barcode Scanner Modal */}
        <BarcodeScannerModal
          isOpen={showBarcodeScanner}
          onClose={() => setShowBarcodeScanner(false)}
          onScanSuccess={handleScanSuccess}
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;