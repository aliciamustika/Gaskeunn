import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import QrisImage from "../../assets/img/qris.png";
import { useBooking } from "../../context/BookingContext";

import {
  Calendar,
  Clock,
  ArrowLeftRight,
  MapPin,
  MapPinCheck,
  ChevronDown,
  QrCode,
  Building2,
  Tag,
  CheckCircle,
  Loader2,
  Wallet,
  Timer,
  AlertCircle,
} from "lucide-react";

function Booking() {
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  const [bookingData, setBookingData] = useState({
    departure: "Perempatan Tirtomoyo Security",
    destination: "BINUS University",
    departureDate: formatDateToString(new Date()),
    departureTime: "6:00",
  });

  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [showQrisOptions, setShowQrisOptions] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [selectedQrisOption, setSelectedQrisOption] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  
  // Payment timing option
  const [payNow, setPayNow] = useState(true);
  
  // Booking state
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [newBooking, setNewBooking] = useState(null);
  
  // Dropdown visibility states
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  function formatDateToString(date) {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departureLocations = [
    "Perempatan Tirtomoyo Security",
    "Telaga Golf",
    "Seberang KDS",
    "Masjid Ramadhan",
    "GPIB Getsemani",
    "Taman Blok J",
    "Hotel Grand Cakra",
    "Bundaran PBI",
    "Bundara Pujasera Nusantara",
    "Bundaran Roket",
    "Masjo Masakan Jawa",
    "KDS",
    "Djoglo/Djati Longue",
    "Perempatan Kecil Tirtomoyo",
    "Ixora Valley",
    "Kvadra",
    "M-House",
  ];

  const getAvailableDepartureLocations = () => {
    return bookingData.destination === "BINUS University" ? departureLocations : ["BINUS University"];
  };

  const getAvailableDestinationLocations = () => {
    return bookingData.departure === "BINUS University" ? departureLocations : ["BINUS University"];
  };

  const timeOptions = [
    { departure: "6:00", arrival: "7:10" },
    { departure: "8:00", arrival: "9:10" },
    { departure: "10:00", arrival: "11:10" },
    { departure: "12:00", arrival: "13:10" },
    { departure: "14:00", arrival: "15:10" },
    { departure: "16:00", arrival: "17:10" },
  ];

  const [pricing, setPricing] = useState({ subtotal: 5000, discount: 0 });

  const promoCodes = {
    "MAHASISWA15": { name: "Diskon Mahasiswa 15%", discount: 15 },
    "NEWUSER20": { name: "Promo Pengguna Baru 20%", discount: 20 },
    "BUNDLING25": { name: "Diskon Bundling 25%", discount: 25 },
    "GASKEUNN10": { name: "Diskon Spesial 10%", discount: 10 },
    "HEMAT30": { name: "Hemat Maksimal 30%", discount: 30 },
  };

  const totalPrice = pricing.subtotal - (pricing.subtotal * pricing.discount / 100);

  const handleSwapLocations = () => {
    setBookingData({ ...bookingData, departure: bookingData.destination, destination: bookingData.departure });
  };

  const handleDepartureSelect = (location) => {
    setBookingData({ ...bookingData, departure: location });
    setShowDepartureDropdown(false);
  };

  const handleDestinationSelect = (location) => {
    setBookingData({ ...bookingData, destination: location });
    setShowDestinationDropdown(false);
  };

  const handleTimeSelect = (time) => {
    setBookingData({ ...bookingData, departureTime: time.departure });
    setShowTimeDropdown(false);
  };

  const closeAllDropdowns = () => {
    setShowDepartureDropdown(false);
    setShowDestinationDropdown(false);
    setShowDateDropdown(false);
    setShowTimeDropdown(false);
    setShowQrisOptions(false);
    setShowPromoInput(false);
  };

  const handleQrisOptionSelect = (option) => {
    setSelectedQrisOption(option);
    setShowQrisOptions(false);
  };

  const handleApplyPromo = () => {
    const upperCode = promoCode.trim().toUpperCase();
    if (!upperCode) { setPromoError("Masukkan kode promo terlebih dahulu"); return; }
    const promo = promoCodes[upperCode];
    if (promo) {
      setAppliedPromo({ code: upperCode, ...promo });
      setPricing({ ...pricing, discount: promo.discount });
      setPromoError("");
      setShowPromoInput(false);
    } else {
      setPromoError("Kode promo tidak valid");
      setAppliedPromo(null);
      setPricing({ ...pricing, discount: 0 });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPricing({ ...pricing, discount: 0 });
    setPromoError("");
  };

  const handleBookTicket = () => {
    if (payNow && !selectedQrisOption) {
      alert("Silakan pilih metode pembayaran terlebih dahulu");
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      const booking = createBooking({
        ...bookingData,
        totalPrice,
        paymentMethod: selectedQrisOption || 'pending',
        promoCode: appliedPromo?.code || null,
        payNow: payNow,
      });
      setNewBooking(booking);
      setIsBooking(false);
      setBookingSuccess(true);
      setTimeout(() => { navigate('/home'); }, 3000);
    }, 1500);
  };

  const SuccessModal = () => {
    if (!bookingSuccess || !newBooking) return null;
    const isPending = newBooking.status === 'pending';
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col animate-bounce-in">
          {/* Header - Fixed */}
          <div className="p-6 pb-4 text-center shrink-0">
            <div className={`w-16 h-16 ${isPending ? 'bg-purple-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {isPending ? <Timer className="w-10 h-10 text-purple-500" /> : <CheckCircle className="w-10 h-10 text-green-500" />}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{isPending ? 'Booking Berhasil!' : 'Pembayaran Berhasil!'}</h2>
            <p className="text-gray-600 text-sm">{isPending ? 'Tiket kamu sudah dipesan. Segera lakukan pembayaran.' : 'Tiket kamu sudah berhasil dipesan dan dibayar'}</p>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6">
            {isPending && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center gap-2 text-purple-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-semibold text-sm">Batas waktu pembayaran: 10 menit</span>
                </div>
                <p className="text-purple-600 text-xs mt-1 text-center">Tiket akan otomatis dibatalkan jika tidak dibayar dalam waktu tersebut</p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Booking Code</span><span className="font-bold text-[oklch(0.6155_0.1314_243.17)]">{newBooking.bookingCode}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Status</span><span className={`font-semibold text-sm ${isPending ? 'text-purple-600' : 'text-green-600'}`}>{isPending ? 'Menunggu Pembayaran' : 'Sudah Dibayar'}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Tanggal</span><span className="font-semibold text-gray-900 text-sm">{newBooking.departure.date}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Waktu</span><span className="font-semibold text-gray-900 text-sm">{newBooking.departure.time}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Dari</span><span className="font-semibold text-gray-900 text-right text-sm max-w-[180px]">{newBooking.departure.location}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Ke</span><span className="font-semibold text-gray-900 text-sm">{newBooking.arrival.location}</span></div>
              <div className="border-t border-gray-200 pt-2 mt-2"><div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Bus / Kursi</span><span className="font-bold text-gray-900 text-sm">Bus {newBooking.bus} / Seat {newBooking.seat}</span></div></div>
              <div className="border-t border-gray-200 pt-2"><div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Total</span><span className="font-bold text-lg text-[oklch(0.6155_0.1314_243.17)]">Rp {newBooking.totalPrice.toLocaleString('id-ID')}</span></div></div>
            </div>
          </div>
          
          {/* Footer - Fixed */}
          <div className="p-6 pt-4 shrink-0">
            <p className="text-xs text-gray-500 mb-3 text-center">Mengalihkan ke halaman utama dalam 3 detik...</p>
            <button onClick={() => navigate('/home')} className="w-full bg-[oklch(0.6155_0.1314_243.17)] text-white font-semibold py-3 rounded-xl hover:bg-[oklch(0.55_0.14_243.17)] transition">{isPending ? 'Lihat & Bayar Tiket' : 'Lihat Tiket Saya'}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SuccessModal />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.7_0.12_243.17)]">
          <div className="py-12 px-8"><div className="max-w-7xl mx-auto"><h1 className="text-4xl md:text-5xl font-bold text-white text-left mb-2">Gaskeunn Book Your Journey Ticket</h1></div></div>
          <div className="pb-16 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="border border-gray-300 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      <div className="relative">
                        <div onClick={() => { closeAllDropdowns(); setShowDepartureDropdown(!showDepartureDropdown); }} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="w-12 h-12 flex items-center justify-center"><MapPin className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" /></div>
                          <div className="flex-1"><p className="text-sm text-left text-gray-500 mb-1">Departure</p><p className="text-lg text-left font-bold text-gray-900">{bookingData.departure}</p></div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDepartureDropdown ? 'rotate-180' : ''}`} />
                        </div>
                        {showDepartureDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                            {getAvailableDepartureLocations().map((location, index) => (
                              <button key={index} onClick={() => handleDepartureSelect(location)} className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${bookingData.departure === location ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""}`}>
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span className="text-sm">{location}</span></div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button onClick={() => { handleSwapLocations(); closeAllDropdowns(); }} className="w-12 h-12 flex items-center justify-center mx-auto hover:bg-blue-50 rounded-full hover:scale-110 transition-all"><ArrowLeftRight className="w-5 h-5 text-[oklch(0.6155_0.1314_243.17)]" /></button>
                      <div className="relative">
                        <div onClick={() => { closeAllDropdowns(); setShowDestinationDropdown(!showDestinationDropdown); }} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="w-12 h-12 flex items-center justify-center"><MapPinCheck className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" /></div>
                          <div className="flex-1"><p className="text-sm text-left text-gray-500 mb-1">Destination</p><p className="text-lg text-left font-bold text-gray-900">{bookingData.destination}</p></div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDestinationDropdown ? 'rotate-180' : ''}`} />
                        </div>
                        {showDestinationDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                            {getAvailableDestinationLocations().map((location, index) => (
                              <button key={index} onClick={() => handleDestinationSelect(location)} className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${bookingData.destination === location ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""}`}>
                                <div className="flex items-center gap-2"><MapPinCheck className="w-4 h-4" /><span className="text-sm">{location}</span></div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-xl p-6 mb-6 relative">
                    <div onClick={() => { closeAllDropdowns(); setShowDateDropdown(!showDateDropdown); }} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-4"><div className="w-12 h-12 flex items-center justify-center"><Calendar className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" /></div><div><p className="text-sm text-left text-gray-500 mb-1">Departure Date</p><p className="text-lg text-left font-bold text-gray-900">{bookingData.departureDate}</p></div></div>
                      <div className="w-10 h-10 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center"><ChevronDown className={`w-5 h-5 text-white transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} /></div>
                    </div>
                    {showDateDropdown && (<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4"><input type="date" onChange={(e) => { const date = new Date(e.target.value); setBookingData({ ...bookingData, departureDate: formatDateToString(date) }); setShowDateDropdown(false); }} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.6155_0.1314_243.17)]" min={new Date().toISOString().split('T')[0]} /></div>)}
                  </div>
                  <div className="border border-gray-300 rounded-xl p-6 relative">
                    <div onClick={() => { closeAllDropdowns(); setShowTimeDropdown(!showTimeDropdown); }} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-4"><div className="w-12 h-12 flex items-center justify-center"><Clock className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" /></div><div><p className="text-sm text-left text-gray-500 mb-1">Departure Time</p><p className="text-lg text-left font-bold text-gray-900">{bookingData.departureTime}</p></div></div>
                      <div className="w-10 h-10 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center"><ChevronDown className={`w-5 h-5 text-white transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} /></div>
                    </div>
                    {showTimeDropdown && (<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">{timeOptions.map((time, index) => (<button key={index} onClick={() => handleTimeSelect(time)} className={`w-full px-4 py-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${bookingData.departureTime === time.departure ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""}`}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><Clock className="w-5 h-5" /><div><p className="text-sm font-bold">Berangkat: {time.departure}</p><p className="text-xs text-gray-500">Tiba: {time.arrival}</p></div></div>{bookingData.departureTime === time.departure && (<CheckCircle className="w-5 h-5 text-[oklch(0.6155_0.1314_243.17)]" />)}</div></button>))}</div>)}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl text-left font-bold text-[oklch(0.6155_0.1314_243.17)] mb-3">Your price summary</h2>
                  <p className="text-sm text-left text-gray-600 mb-6">The total cost consist of the subtotal and discount</p>
                  <div className="space-y-4 border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center"><span className="text-gray-700">Subtotal</span><span className="font-semibold text-gray-900">Rp {pricing.subtotal.toLocaleString('id-ID')}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-700">Discount</span><span className="font-semibold text-green-600">{pricing.discount > 0 ? `-${pricing.discount}%` : '0%'}</span></div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-6"><div className="flex justify-between items-center"><span className="text-xl font-bold text-[oklch(0.6155_0.1314_243.17)]">Total Price</span><span className="text-2xl font-bold text-[oklch(0.6155_0.1314_243.17)]">Rp {totalPrice.toLocaleString('id-ID')}</span></div></div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-left font-semibold text-gray-700 mb-3">Kapan ingin membayar?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPayNow(true)} className={`p-4 rounded-xl border-2 transition-all text-left ${payNow ? "border-[oklch(0.6155_0.1314_243.17)] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <div className="flex items-center gap-2 mb-2"><Wallet className={`w-5 h-5 ${payNow ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-400"}`} /><span className={`font-semibold text-sm ${payNow ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-700"}`}>Bayar Sekarang</span></div>
                        <p className="text-xs text-gray-500">Tiket langsung aktif</p>
                      </button>
                      <button onClick={() => setPayNow(false)} className={`p-4 rounded-xl border-2 transition-all text-left ${!payNow ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <div className="flex items-center gap-2 mb-2"><Timer className={`w-5 h-5 ${!payNow ? "text-purple-600" : "text-gray-400"}`} /><span className={`font-semibold text-sm ${!payNow ? "text-purple-600" : "text-gray-700"}`}>Bayar Nanti</span></div>
                        <p className="text-xs text-gray-500">Batas 10 menit</p>
                      </button>
                    </div>
                    {!payNow && (<div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200"><div className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" /><p className="text-xs text-purple-700">Tiket akan otomatis dibatalkan jika pembayaran tidak dilakukan dalam <span className="font-bold">10 menit</span> setelah booking.</p></div></div>)}
                  </div>

                  {payNow && (
                    <div className="mb-6">
                      <p className="text-sm text-left font-semibold text-gray-700 mb-3">Metode Pembayaran</p>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <button onClick={() => { closeAllDropdowns(); setShowQrisOptions(!showQrisOptions); }} className={`w-full py-3 px-4 rounded-lg border-2 transition-colors ${selectedQrisOption ? "border-[oklch(0.6155_0.1314_243.17)] bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}>
                            <div className="flex items-center justify-center gap-2">{selectedQrisOption === "transfer" ? <Building2 className="w-5 h-5" /> : <QrCode className="w-5 h-5" />}<span className="font-medium text-sm">{selectedQrisOption === "transfer" ? "Transfer Bank" : selectedQrisOption === "qris" ? "QRIS" : "Pilih Pembayaran"}</span><ChevronDown className={`w-4 h-4 transition-transform ${showQrisOptions ? 'rotate-180' : ''}`} /></div>
                          </button>
                          {showQrisOptions && (<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10"><button onClick={() => handleQrisOptionSelect("qris")} className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 ${selectedQrisOption === "qris" ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]" : ""}`}><QrCode className="w-5 h-5" /><span className="font-medium text-sm">QRIS</span></button><button onClick={() => handleQrisOptionSelect("transfer")} className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 ${selectedQrisOption === "transfer" ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]" : ""}`}><Building2 className="w-5 h-5" /><span className="font-medium text-sm">Transfer Bank</span></button></div>)}
                        </div>
                        <div className="flex-1 relative">
                          <button onClick={() => { closeAllDropdowns(); setShowPromoInput(!showPromoInput); }} className={`w-full py-3 px-4 rounded-lg border-2 transition-colors ${appliedPromo ? "border-green-500 bg-green-50 text-green-600" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}>
                            <div className="flex items-center justify-center gap-2"><Tag className="w-5 h-5" /><span className="font-medium text-sm">{appliedPromo ? "Promo Applied" : "Promo"}</span></div>
                          </button>
                          {showPromoInput && (<div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 w-80"><p className="text-sm text-left font-semibold text-gray-700 mb-2">Masukkan Kode Promo</p><div className="flex gap-2"><input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }} placeholder="Contoh: MAHASISWA15" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.6155_0.1314_243.17)] text-sm" onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()} /><button onClick={handleApplyPromo} className="px-4 py-2 bg-[oklch(0.6155_0.1314_243.17)] text-white rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] text-sm font-medium">Terapkan</button></div>{promoError && <p className="text-xs text-red-600 mt-2">⚠ {promoError}</p>}<div className="mt-3 text-xs text-gray-500"><p className="font-semibold mb-1">Kode tersedia:</p><p>MAHASISWA15, NEWUSER20, GASKEUNN10</p></div></div>)}
                        </div>
                      </div>
                      {selectedQrisOption === "qris" && (<div className="mt-4 p-4 bg-white rounded-lg border-2 border-[oklch(0.6155_0.1314_243.17)]"><div className="text-center mb-3"><p className="text-sm font-bold text-gray-900 mb-1">Scan QRIS untuk Pembayaran</p><p className="text-xs text-gray-600">Total: Rp {totalPrice.toLocaleString('id-ID')}</p></div><div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-center"><img src={QrisImage} alt="QRIS" className="w-48 h-48 object-contain rounded-lg" /></div></div>)}
                      {selectedQrisOption === "transfer" && (<div className="mt-4 p-4 bg-white rounded-lg border-2 border-[oklch(0.6155_0.1314_243.17)]"><p className="text-sm font-bold text-gray-900 mb-3 text-center">Transfer Bank</p><div className="space-y-2"><div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">Bank</p><p className="text-sm font-bold">Bank Central Asia (BCA)</p></div><div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">No. Rekening</p><p className="text-lg font-mono font-bold">1234567890</p></div><div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">Atas Nama</p><p className="text-sm font-bold">PT Gaskeunn Transportation</p></div><div className="bg-blue-50 p-3 rounded-lg border border-blue-200"><p className="text-xs text-gray-600">Jumlah Transfer</p><p className="text-xl font-bold text-[oklch(0.6155_0.1314_243.17)]">Rp {totalPrice.toLocaleString('id-ID')}</p></div></div></div>)}
                      {appliedPromo && (<div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200"><div className="flex items-center justify-between"><div><p className="text-sm text-green-700 font-medium">✓ {appliedPromo.name}</p><p className="text-xs text-green-600">Kode: {appliedPromo.code} • Hemat {appliedPromo.discount}%</p></div><button onClick={handleRemovePromo} className="text-red-600 hover:text-red-700 text-xs font-medium">Hapus</button></div></div>)}
                    </div>
                  )}

                  {!payNow && (
                    <div className="mb-6">
                      <p className="text-sm text-left font-semibold text-gray-700 mb-3">Punya Kode Promo?</p>
                      <div className="relative">
                        <button onClick={() => { closeAllDropdowns(); setShowPromoInput(!showPromoInput); }} className={`w-full py-3 px-4 rounded-lg border-2 transition-colors ${appliedPromo ? "border-green-500 bg-green-50 text-green-600" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}>
                          <div className="flex items-center justify-center gap-2"><Tag className="w-5 h-5" /><span className="font-medium text-sm">{appliedPromo ? `✓ ${appliedPromo.code}` : "Masukkan Kode Promo"}</span></div>
                        </button>
                        {showPromoInput && (<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4"><p className="text-sm text-left font-semibold text-gray-700 mb-2">Masukkan Kode Promo</p><div className="flex gap-2"><input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }} placeholder="Contoh: MAHASISWA15" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.6155_0.1314_243.17)] text-sm" onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()} /><button onClick={handleApplyPromo} className="px-4 py-2 bg-[oklch(0.6155_0.1314_243.17)] text-white rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] text-sm font-medium">Terapkan</button></div>{promoError && <p className="text-xs text-red-600 mt-2">⚠ {promoError}</p>}<div className="mt-3 text-xs text-gray-500"><p className="font-semibold mb-1">Kode tersedia:</p><p>MAHASISWA15, NEWUSER20, GASKEUNN10</p></div></div>)}
                      </div>
                      {appliedPromo && (<div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200"><div className="flex items-center justify-between"><div><p className="text-sm text-green-700 font-medium">✓ {appliedPromo.name}</p><p className="text-xs text-green-600">Hemat {appliedPromo.discount}%</p></div><button onClick={handleRemovePromo} className="text-red-600 hover:text-red-700 text-xs font-medium">Hapus</button></div></div>)}
                    </div>
                  )}

                  <button onClick={handleBookTicket} disabled={isBooking || (payNow && !selectedQrisOption)} className={`w-full font-bold py-4 rounded-lg shadow-lg transition flex items-center justify-center gap-2 ${isBooking || (payNow && !selectedQrisOption) ? 'bg-gray-400 cursor-not-allowed text-white' : payNow ? 'bg-gradient-to-r from-[#2B8CCD] to-[#83B1D1] text-white hover:opacity-90' : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:opacity-90'}`}>
                    {isBooking ? (<><Loader2 className="w-5 h-5 animate-spin" />Processing...</>) : payNow ? (<><Wallet className="w-5 h-5" />Bayar & Book Ticket</>) : (<><Timer className="w-5 h-5" />Book Ticket (Bayar Nanti)</>)}
                  </button>
                  {payNow && !selectedQrisOption && (<p className="text-xs text-center text-gray-500 mt-2">Pilih metode pembayaran untuk melanjutkan</p>)}
                  {!payNow && (<p className="text-xs text-center text-purple-600 mt-2 font-medium">Kamu bisa membayar dalam 10 menit setelah booking</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`@keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } } .animate-bounce-in { animation: bounce-in 0.5s ease-out; }`}</style>
    </>
  );
}

export default Booking;