import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext";
import Navbar from "../Sopir/navbar";
import Footer from "../../components/footer";

// Import icons
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// Import images (sesuaikan dengan struktur project Anda)
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

function Home({ userName = "Budi" }) {
  const { getHomeReviews } = useReviews();
  
  const [activeTab, setActiveTab] = useState("tickets");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const testimonialRef = useRef(null);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // ✅ PERBAIKAN: Ambil testimonials dari ReviewContext dengan mapping
  const testimonials = getHomeReviews().map(review => ({
    ...review,
    text: review.comment  // Map "comment" ke "text" karena driver home pakai field "text"
  }));

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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />
        
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white text-black pt-4 pb-4 md:pt-6 md:pb-6 shadow-lg">
            <div className="px-8 lg:px-12">
              <h1 className="text-2xl font-bold mb-0 text-left">Halo, {userName}!</h1>
              <p className="text-xl font-light mt-1 mb-3 opacity-90 text-left">Selamat bekerja hari ini!</p>
              <div className="flex items-start bg-yellow-400/70 p-4 rounded-lg border border-yellow-300 shadow-inner">
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
                        <span className="font-bold text-lg">
                          {testimonial.rating}
                        </span>
                      </div>
                      <div className="grow overflow-y-auto mb-4 pr-1 custom-scrollbar">
                        <p className="text-gray-700 text-md leading-relaxed text-left">
                          {/* ✅ PERBAIKAN: Pakai testimonial.text hasil mapping */}
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