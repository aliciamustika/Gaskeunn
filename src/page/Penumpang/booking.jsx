import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import QrisImage from "../../assets/img/qris.png";

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
} from "lucide-react";

function Booking() {
  const [bookingData, setBookingData] = useState({
    departure: "Perempatan Tirtomoyo Security",
    destination: "BINUS University",
    departureDate: "19 December 2025",
    departureTime: "6:00",
  });

  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [showQrisOptions, setShowQrisOptions] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [selectedQrisOption, setSelectedQrisOption] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  
  // Notification visibility
  const [showPaymentNotification, setShowPaymentNotification] = useState(false);
  
  // Dropdown visibility states
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Location options - Departure (without BINUS University)
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

  // Destination options - Only BINUS University
  const destinationLocations = [
    "BINUS University",
  ];

  // All locations including BINUS University
  const allLocations = [
    "BINUS University",
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

  // Get available locations based on current selection
  const getAvailableDepartureLocations = () => {
    if (bookingData.destination === "BINUS University") {
      return departureLocations;
    } else {
      // If destination is not BINUS, departure must be BINUS only
      return ["BINUS University"];
    }
  };

  const getAvailableDestinationLocations = () => {
    if (bookingData.departure === "BINUS University") {
      return departureLocations;
    } else {
      // If departure is not BINUS, destination must be BINUS only
      return ["BINUS University"];
    }
  };

  // Time options with arrival times
  const timeOptions = [
    { departure: "6:00", arrival: "7:10" },
    { departure: "8:00", arrival: "9:10" },
    { departure: "10:00", arrival: "11:10" },
    { departure: "12:00", arrival: "13:10" },
    { departure: "14:00", arrival: "15:10" },
    { departure: "16:00", arrival: "17:10" },
  ];

  // Price data (removed insurance)
  const [pricing, setPricing] = useState({
    subtotal: 5000,
    discount: 0,
  });

  // Promo codes with their benefits
  const promoCodes = {
    "MAHASISWA15": { name: "Diskon Mahasiswa 15%", discount: 15 },
    "NEWUSER20": { name: "Promo Pengguna Baru 20%", discount: 20 },
    "BUNDLING25": { name: "Diskon Bundling 25%", discount: 25 },
    "GASKEUNN10": { name: "Diskon Spesial 10%", discount: 10 },
    "HEMAT30": { name: "Hemat Maksimal 30%", discount: 30 },
  };

  const totalPrice = pricing.subtotal - (pricing.subtotal * pricing.discount / 100);

  // Auto-hide payment notification after 3 seconds
  useEffect(() => {
    if (showPaymentNotification) {
      const timer = setTimeout(() => {
        setShowPaymentNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPaymentNotification]);

  const handleSwapLocations = () => {
    // Swap departure and destination
    const tempDeparture = bookingData.departure;
    const tempDestination = bookingData.destination;
    
    setBookingData({
      ...bookingData,
      departure: tempDestination,
      destination: tempDeparture,
    });
  };

  const handleDepartureSelect = (location) => {
    setBookingData({
      ...bookingData,
      departure: location,
    });
    setShowDepartureDropdown(false);
  };

  const handleDestinationSelect = (location) => {
    setBookingData({
      ...bookingData,
      destination: location,
    });
    setShowDestinationDropdown(false);
  };

  const handleTimeSelect = (time) => {
    setBookingData({
      ...bookingData,
      departureTime: time.departure,
    });
    setShowTimeDropdown(false);
  };

  const closeAllDropdowns = () => {
    setShowDepartureDropdown(false);
    setShowDestinationDropdown(false);
    setShowDateDropdown(false);
    setShowTimeDropdown(false);
  };

  const handleQrisClick = () => {
    setPaymentMethod("qris");
    setShowQrisOptions(!showQrisOptions);
    setShowPromoInput(false);
  };

  const handlePromoClick = () => {
    setShowPromoInput(!showPromoInput);
    setShowQrisOptions(false);
    setPromoError("");
  };

  const handleQrisOptionSelect = (option) => {
    setSelectedQrisOption(option);
    setShowQrisOptions(false);
    setShowPaymentNotification(true);
  };

  const handleApplyPromo = () => {
    const upperCode = promoCode.trim().toUpperCase();
    
    if (!upperCode) {
      setPromoError("Masukkan kode promo terlebih dahulu");
      return;
    }

    const promo = promoCodes[upperCode];
    
    if (promo) {
      setAppliedPromo({ code: upperCode, ...promo });
      setPricing({
        ...pricing,
        discount: promo.discount,
      });
      setPromoError("");
      setShowPromoInput(false);
    } else {
      setPromoError("Kode promo tidak valid");
      setAppliedPromo(null);
      setPricing({
        ...pricing,
        discount: 0,
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPricing({
      ...pricing,
      discount: 0,
    });
    setPromoError("");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />

        {/* Main Content */}
        <div className="min-h-screen bg-linear-to-b from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.7_0.12_243.17)]">
          {/* Hero Section */}
          <div className="py-12 px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-left mb-2">
                Gaskeunn Book Your Journey Ticket
              </h1>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="pb-16 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
              {/* Left Column - Booking Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col">
                  {/* Departure & Destination */}
                  <div>
                  <div className="border border-gray-300 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      {/* Departure */}
                      <div className="relative">
                        <div
                          onClick={() => {
                            setShowDepartureDropdown(!showDepartureDropdown);
                            setShowDestinationDropdown(false);
                            setShowDateDropdown(false);
                            setShowTimeDropdown(false);
                            setShowQrisOptions(false);
                            setShowPromoInput(false);
                          }}
                          className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-left text-gray-500 mb-1">
                              Departure
                            </p>
                            <p className="text-lg text-left font-bold text-gray-900">
                              {bookingData.departure}
                            </p>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDepartureDropdown ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Departure Dropdown */}
                        {showDepartureDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                            {getAvailableDepartureLocations().map((location, index) => (
                              <button
                                key={index}
                                onClick={() => handleDepartureSelect(location)}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                                  index !== getAvailableDepartureLocations().length - 1 ? "border-b border-gray-100" : ""
                                } ${
                                  bookingData.departure === location ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm">{location}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Swap Button - Active */}
                      <button
                        onClick={() => {
                          handleSwapLocations();
                          closeAllDropdowns();
                        }}
                        className="w-12 h-12 flex items-center justify-center transition-all mx-auto hover:bg-blue-50 rounded-full hover:scale-110"
                        aria-label="Swap locations"
                        title="Tukar lokasi keberangkatan dan tujuan"
                      >
                        <ArrowLeftRight className="w-5 h-5 text-[oklch(0.6155_0.1314_243.17)]" />
                      </button>

                      {/* Destination */}
                      <div className="relative">
                        <div
                          onClick={() => {
                            setShowDestinationDropdown(!showDestinationDropdown);
                            setShowDepartureDropdown(false);
                            setShowDateDropdown(false);
                            setShowTimeDropdown(false);
                            setShowQrisOptions(false);
                            setShowPromoInput(false);
                          }}
                          className={`flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors ${
                            bookingData.destination === "BINUS University" ? "bg-gray-50" : ""
                          }`}
                        >
                          <div className="w-12 h-12 flex items-center justify-center">
                            <MapPinCheck className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-left text-gray-500 mb-1">
                              Destination
                            </p>
                            <p className="text-lg text-left font-bold text-gray-900">
                              {bookingData.destination}
                            </p>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDestinationDropdown ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Destination Dropdown */}
                        {showDestinationDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                            {getAvailableDestinationLocations().map((location, index) => (
                              <button
                                key={index}
                                onClick={() => handleDestinationSelect(location)}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                                  index !== getAvailableDestinationLocations().length - 1 ? "border-b border-gray-100" : ""
                                } ${
                                  bookingData.destination === location ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPinCheck className="w-4 h-4" />
                                  <span className="text-sm">{location}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div className="border border-gray-300 rounded-xl p-6 mb-6 relative">
                    <div
                      onClick={() => {
                        setShowDateDropdown(!showDateDropdown);
                        setShowDepartureDropdown(false);
                        setShowDestinationDropdown(false);
                        setShowTimeDropdown(false);
                        setShowQrisOptions(false);
                        setShowPromoInput(false);
                      }}
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" />
                        </div>
                        <div>
                          <p className="text-sm text-left text-gray-500 mb-1">
                            Departure Date
                          </p>
                          <p className="text-lg text-left font-bold text-gray-900">
                            {bookingData.departureDate}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center hover:bg-[oklch(0.55_0.14_243.17)] transition-colors">
                        <ChevronDown className={`w-5 h-5 text-white transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Date Picker Dropdown */}
                    {showDateDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
                        <input
                          type="date"
                          value={
                            bookingData.departureDate
                              ? new Date(bookingData.departureDate).toISOString().split('T')[0]
                              : ""
                          }
                          onChange={(e) => {
                            const date = new Date(e.target.value);
                            const formattedDate = date.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            });
                            setBookingData({
                              ...bookingData,
                              departureDate: formattedDate,
                            });
                            setShowDateDropdown(false);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.6155_0.1314_243.17)] text-gray-900"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                  </div>

                  {/* Departure Time */}
                  <div className="border border-gray-300 rounded-xl p-6 relative">
                    <div
                      onClick={() => {
                        setShowTimeDropdown(!showTimeDropdown);
                        setShowDepartureDropdown(false);
                        setShowDestinationDropdown(false);
                        setShowDateDropdown(false);
                        setShowQrisOptions(false);
                        setShowPromoInput(false);
                      }}
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-[oklch(0.6155_0.1314_243.17)]" />
                        </div>
                        <div>
                          <p className="text-sm text-left text-gray-500 mb-1">
                            Departure Time
                          </p>
                          <p className="text-lg text-left font-bold text-gray-900">
                            {bookingData.departureTime}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center hover:bg-[oklch(0.55_0.14_243.17)] transition-colors">
                        <ChevronDown className={`w-5 h-5 text-white transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Time Dropdown */}
                    {showTimeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                        {timeOptions.map((time, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimeSelect(time)}
                            className={`w-full px-4 py-4 text-left hover:bg-gray-50 ${
                              index !== timeOptions.length - 1 ? "border-b border-gray-100" : ""
                            } ${
                              bookingData.departureTime === time.departure ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)] font-semibold" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5" />
                                <div>
                                  <p className="text-sm font-bold">Berangkat: {time.departure}</p>
                                  <p className="text-xs text-gray-500">Tiba: {time.arrival}</p>
                                </div>
                              </div>
                              {bookingData.departureTime === time.departure && (
                                <svg className="w-5 h-5 text-[oklch(0.6155_0.1314_243.17)]" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Price Summary */}
              <div className="lg:col-span-1 lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col">
                  <div>
                    <h2 className="text-2xl text-left font-bold text-[oklch(0.6155_0.1314_243.17)] mb-3">
                      Your price summary
                    </h2>
                    <p className="text-sm text-left text-gray-600 mb-6">
                      The total cost consist of the subtotal and discount
                    </p>

                    {/* Price Breakdown */}
                    <div className="space-y-4 border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        Rp {pricing.subtotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Discount</span>
                      <span className="font-semibold text-green-600">
                        {pricing.discount > 0 ? `-${pricing.discount}%` : '0%'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[oklch(0.6155_0.1314_243.17)]">
                        Total Price
                      </span>
                      <span className="text-2xl font-bold text-[oklch(0.6155_0.1314_243.17)]">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  </div>

                  {/* Payment Method and Book Button */}
                  <div>
                  {/* Payment Method */}
                  <div className="mb-6">
                    <p className="text-sm text-left font-semibold text-gray-700 mb-3">
                      Metode Pembayaran
                    </p>
                    <div className="flex gap-2">
                      {/* QRIS Button */}
                      <div className="flex-1 relative">
                        <button
                          onClick={handleQrisClick}
                          className={`w-full py-3 px-4 rounded-lg border-2 transition-colors ${
                            paymentMethod === "qris"
                              ? "border-[oklch(0.6155_0.1314_243.17)] bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]"
                              : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {selectedQrisOption === "transfer" ? (
                              <Building2 className="w-5 h-5" />
                            ) : (
                              <QrCode className="w-5 h-5" />
                            )}
                            <span className="font-medium text-sm">
                              {selectedQrisOption === "transfer" ? "Transfer Bank" : "QRIS"}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showQrisOptions ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        
                        {/* QRIS Dropdown */}
                        {showQrisOptions && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleQrisOptionSelect("qris")}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 ${
                                selectedQrisOption === "qris" ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]" : ""
                              }`}
                            >
                              <QrCode className="w-5 h-5" />
                              <span className="font-medium text-sm">QRIS</span>
                            </button>
                            <button
                              onClick={() => handleQrisOptionSelect("transfer")}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                                selectedQrisOption === "transfer" ? "bg-blue-50 text-[oklch(0.6155_0.1314_243.17)]" : ""
                              }`}
                            >
                              <Building2 className="w-5 h-5" />
                              <span className="font-medium text-sm">Transfer Bank</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Promo Button */}
                      <div className="flex-1 relative">
                        <button
                          onClick={handlePromoClick}
                          className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Tag className="w-5 h-5" />
                            <span className="font-medium text-sm">Promo</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showPromoInput ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {/* Promo Input Dropdown - Wider and positioned to the right */}
                        {showPromoInput && (
                          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 w-80">
                            <p className="text-sm text-left font-semibold text-gray-700 mb-2">Masukkan Kode Promo</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => {
                                  setPromoCode(e.target.value.toUpperCase());
                                  setPromoError("");
                                }}
                                placeholder="Contoh: MAHASISWA15"
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.6155_0.1314_243.17)] text-sm"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleApplyPromo();
                                  }
                                }}
                              />
                              <button
                                onClick={handleApplyPromo}
                                className="px-4 py-2 bg-[oklch(0.6155_0.1314_243.17)] text-white rounded-lg hover:bg-[oklch(0.55_0.14_243.17)] transition-colors text-sm font-medium whitespace-nowrap"
                              >
                                Terapkan
                              </button>
                            </div>
                            {promoError && (
                              <p className="text-xs text-red-600 mt-2">⚠ {promoError}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* QRIS Barcode Display */}
                    {selectedQrisOption === "qris" && paymentMethod === "qris" && (
                      <div className="mt-4 p-4 bg-white rounded-lg border-2 border-[oklch(0.6155_0.1314_243.17)]">
                        <div className="text-center mb-3">
                          <p className="text-sm font-bold text-gray-900 mb-1">Scan QRIS untuk Pembayaran</p>
                          <p className="text-xs text-gray-600">Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                        
                        {/* QR Code Image */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-center">
                          <img 
                            src={QrisImage} 
                            alt="QRIS Payment Code" 
                            className="w-48 h-48 object-contain rounded-lg"
                          />
                        </div>
                        
                        <div className="mt-3 text-center">
                          <p className="text-xs text-gray-600 mb-2">
                            Scan QR code dengan aplikasi pembayaran digital
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xs font-mono bg-gray-100 px-3 py-1 rounded">
                              QRIS-GSK-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transfer Bank Display */}
                    {selectedQrisOption === "transfer" && paymentMethod === "qris" && (
                      <div className="mt-4 p-4 bg-white rounded-lg border-2 border-[oklch(0.6155_0.1314_243.17)]">
                        <div className="text-center mb-4">
                          <p className="text-sm font-bold text-gray-900 mb-1">Transfer Bank</p>
                          <p className="text-xs text-gray-600">Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                        
                        {/* Bank Account Information */}
                        <div className="space-y-3">
                          {/* Bank Name */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Bank</p>
                            <p className="text-sm font-bold text-gray-900">Bank Central Asia (BCA)</p>
                          </div>
                          
                          {/* Account Number */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Nomor Rekening</p>
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-mono font-bold text-gray-900">1234567890</p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText('1234567890');
                                  alert('Nomor rekening berhasil disalin!');
                                }}
                                className="px-3 py-1 bg-[oklch(0.6155_0.1314_243.17)] text-white text-xs rounded hover:bg-[oklch(0.55_0.14_243.17)] transition-colors"
                              >
                                Salin
                              </button>
                            </div>
                          </div>
                          
                          {/* Account Name */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Atas Nama</p>
                            <p className="text-sm font-bold text-gray-900">PT Gaskeunn Transportation</p>
                          </div>

                          {/* Transfer Amount */}
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Jumlah Transfer</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xl font-bold text-[oklch(0.6155_0.1314_243.17)]">
                                Rp {totalPrice.toLocaleString('id-ID')}
                              </p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(totalPrice.toString());
                                  alert('Jumlah transfer berhasil disalin!');
                                }}
                                className="px-3 py-1 bg-[oklch(0.6155_0.1314_243.17)] text-white text-xs rounded hover:bg-[oklch(0.55_0.14_243.17)] transition-colors"
                              >
                                Salin
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instructions */}
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-xs font-semibold text-yellow-800 mb-2">Instruksi Pembayaran:</p>
                          <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Transfer sesuai jumlah yang tertera</li>
                            <li>Simpan bukti transfer</li>
                            <li>Konfirmasi pembayaran akan dikirim via email</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Selected Payment Info */}
                    {selectedQrisOption && paymentMethod === "qris" && showPaymentNotification && selectedQrisOption !== "qris" && selectedQrisOption !== "transfer" && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300 ease-in-out">
                        <p className="text-sm text-[oklch(0.6155_0.1314_243.17)] font-medium">
                          ✓ {selectedQrisOption === "transfer" ? "Transfer Bank" : "QRIS"} dipilih
                        </p>
                      </div>
                    )}
                    
                    {/* Applied Promo Display */}
                    {appliedPromo && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-700 font-medium">
                              ✓ {appliedPromo.name}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Kode: {appliedPromo.code} • Hemat {appliedPromo.discount}%
                            </p>
                          </div>
                          <button
                            onClick={handleRemovePromo}
                            className="text-red-600 hover:text-red-700 text-xs font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book Button */}
                  <button className="w-full bg-linear-to-r from-[#2B8CCD] to-[#83B1D1] text-white font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition">
                    Book a Ticket
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Booking;