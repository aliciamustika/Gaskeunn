import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  User,
  Bus,
  CreditCard,
  X,
  Check,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "../../components/footer";

function History() {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 8)); // 8 December 2025
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));

  const statusFilters = [
    "All Status",
    "Pending Payment",
    "Ongoing",
    "Completed",
    "Cancelled",
  ];

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const changeMonth = (increment) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1)
    );
  };

  // Data perjalanan
  const journeys = [
    {
      id: 1,
      status: "Ongoing",
      departure: {
        time: "06:45",
        date: "8 Desember 2025",
        location: "Araya",
      },
      arrival: {
        time: "07:00",
        date: "8 Desember 2025",
        location: "BINUS University",
      },
      passenger: {
        name: "Ni Putu Saraswati",
        email: "ni.saraswati@binus.ac.id",
        binusianId: "BN318092583",
        nim: "2902654051",
      },
      bus: 1,
      seat: 12,
      barcode: "BUS0R0224",
      notes: "Show e-tickets and passenger identities during check-in.",
      reminder:
        "Please be at the boarding gate at least 30 minutes before boarding time.",
    },
    {
      id: 2,
      status: "Cancelled",
      departure: {
        time: "06:45",
        date: "8 Desember 2025",
        location: "Araya",
      },
      arrival: {
        time: "07:00",
        date: "8 Desember 2025",
        location: "BINUS University",
      },
      passenger: {
        name: "Ni Putu Saraswati",
        email: "ni.saraswati@binus.ac.id",
        binusianId: "BN318092583",
        nim: "2902654051",
      },
      bus: 1,
      seat: 12,
      cancelReason: "No barcode available yet",
    },
    {
      id: 3,
      status: "Completed",
      departure: {
        time: "06:45",
        date: "8 Desember 2025",
        location: "Araya",
      },
      arrival: {
        time: "07:00",
        date: "8 Desember 2025",
        location: "BINUS University",
      },
      passenger: {
        name: "Ni Putu Saraswati",
        email: "ni.saraswati@binus.ac.id",
        binusianId: "BN318092583",
        nim: "2902654051",
      },
      bus: 1,
      seat: 12,
      completedMessage: "The journey has ended.",
    },
    {
      id: 4,
      status: "Pending Payment",
      departure: {
        time: "06:45",
        date: "8 Desember 2025",
        location: "Araya",
      },
      arrival: {
        time: "07:00",
        date: "8 Desember 2025",
        location: "BINUS University",
      },
      passenger: {
        name: "Ni Putu Saraswati",
        email: "ni.saraswati@binus.ac.id",
        binusianId: "BN318092583",
        nim: "2902654051",
      },
      bus: 1,
      seat: 12,
      paymentMessage: "No barcode available yet",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Ongoing: "bg-orange-100 text-orange-600 border-orange-200",
      Cancelled: "bg-red-100 text-red-600 border-red-200",
      Completed: "bg-green-100 text-green-600 border-green-200",
      "Pending Payment": "bg-purple-100 text-purple-600 border-purple-200",
    };
    return colors[status] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <Bus className="w-16 h-16 text-gray-300" />;
      case "Cancelled":
        return <Package className="w-16 h-16 text-gray-300" />;
      case "Completed":
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        );
      case "Pending Payment":
        return <Package className="w-16 h-16 text-gray-300" />;
      default:
        return null;
    }
  };

  // Filter journeys berdasarkan status yang dipilih
  const filteredJourneys =
    selectedStatus === "All Status"
      ? journeys
      : journeys.filter((j) => j.status === selectedStatus);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-linear-to-r from-orange-500 to-amber-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white">
              Your Journey Records, All in One Place.
            </h1>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                Select Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      selectedStatus === status
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker with Calendar */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                Select Date
              </h3>
              <div className="relative">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 bg-white flex items-center justify-between"
                >
                  <span className="text-gray-900">{formatDate(selectedDate)}</span>
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-full md:w-80">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => changeMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="font-bold text-gray-900">
                        {currentMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() => changeMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Calendar Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-semibold text-gray-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((day, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (day) {
                              setSelectedDate(day);
                              setShowCalendar(false);
                            }
                          }}
                          disabled={!day}
                          className={`
                            aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                            ${!day ? "invisible" : ""}
                            ${
                              day && isSameDay(day, selectedDate)
                                ? "bg-orange-500 text-white font-bold shadow-md"
                                : day && isSameDay(day, new Date())
                                ? "bg-orange-100 text-orange-600 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {day ? day.getDate() : ""}
                        </button>
                      ))}
                    </div>

                    {/* Today Button */}
                    <button
                      onClick={() => {
                        const today = new Date();
                        setSelectedDate(today);
                        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                        setShowCalendar(false);
                      }}
                      className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Today
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Journey Cards */}
          <div className="space-y-6">
            {filteredJourneys.map((journey) => (
              <div
                key={journey.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="grid lg:grid-cols-3 gap-6 p-6">
                  {/* Left Section - Journey Details */}
                  <div className="lg:col-span-2">
                    {/* Header with Logo and Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-black text-sm">
                            G
                          </span>
                        </div>
                        <span className="text-lg font-black">Gaskeunn</span>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(
                          journey.status
                        )}`}
                      >
                        {journey.status}
                      </span>
                    </div>

                    {/* Journey Timeline */}
                    <div className="grid grid-cols-2 gap-8 mb-6">
                      {/* Departure */}
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Berangkat
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                          {journey.departure.time}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {journey.departure.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {journey.departure.location}
                        </div>
                      </div>

                      {/* Arrival */}
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Datang</div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                          {journey.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {journey.arrival.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {journey.arrival.location}
                        </div>
                      </div>
                    </div>

                    {/* Visual Timeline */}
                    <div className="relative mb-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 mx-2 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-400 rounded-full px-3 py-1 text-xs font-bold text-white whitespace-nowrap">
                            🚌 2 min
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          {journey.notes ||
                            journey.cancelReason ||
                            journey.completedMessage ||
                            journey.paymentMessage}
                        </span>
                      </div>
                      {journey.reminder && (
                        <div className="flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <span className="text-gray-600">
                            {journey.reminder}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Passenger Info & Barcode */}
                  <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-6">
                    {/* Passenger Info */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-gray-500 mb-1">Name</div>
                          <div className="font-bold text-gray-900">
                            {journey.passenger.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Email</div>
                          <div className="font-medium text-gray-700 break-all">
                            {journey.passenger.email}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">BINUSIAN ID</div>
                          <div className="font-bold text-gray-900">
                            {journey.passenger.binusianId}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">NIM</div>
                          <div className="font-bold text-gray-900">
                            {journey.passenger.nim}
                          </div>
                        </div>
                      </div>

                      {/* Bus & Seat */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">Bus</div>
                          <div className="text-2xl font-black text-gray-900">
                            {journey.bus}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Seat</div>
                          <div className="text-2xl font-black text-gray-900">
                            {journey.seat}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Barcode or Status Icon */}
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px]">
                      {journey.status === "Ongoing" && journey.barcode ? (
                        <>
                          <div className="text-xs font-bold text-gray-900 mb-2">
                            BARCODE
                          </div>
                          <div className="w-32 h-32 bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-1 p-2">
                              {[...Array(16)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 ${
                                    Math.random() > 0.5
                                      ? "bg-white"
                                      : "bg-transparent"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs font-bold text-gray-600">
                            {journey.barcode}
                          </div>
                          <button className="text-xs text-orange-600 hover:text-orange-700 font-semibold mt-2">
                            View detail ticket
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getStatusIcon(journey.status)}
                          <div className="text-xs text-gray-500 mt-3 text-center">
                            {journey.status === "Cancelled" &&
                              "No barcode\navailable yet"}
                            {journey.status === "Completed" &&
                              "The journey has ended."}
                            {journey.status === "Pending Payment" &&
                              "No barcode\navailable yet"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJourneys.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No journeys found
              </h3>
              <p className="text-gray-500">
                No journey records match the selected filter.
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Close calendar when clicking outside */}
      {showCalendar && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCalendar(false)}
        />
      )}
    </>
  );
}

export default History;