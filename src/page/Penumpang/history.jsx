import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CreditCard,
  X,
  Check,
  Package,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import BarcodeImage from "../../assets/img/QRIS.png";

function History() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 8));
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const statusFilters = [
    "All Status",
    "Pending Payment",
    "Ongoing",
    "Completed",
    "Cancelled",
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const formatDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const isSameDay = (date1, date2) => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  const changeMonth = (increment) => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));

  const journeys = [
    { id: 1, status: "Ongoing", departure: { time: "06:45 AM", date: "8 Desember 2025", location: "Araya" }, arrival: { time: "07:00 AM", date: "8 Desember 2025", location: "BINUS University" }, passenger: { name: "Ni Putu Saraswati", email: "ni.saraswati@binus.ac.id", binusianId: "BN138092583", nim: "2902654051" }, bus: 1, seat: 12, barcode: "BUS01150224", duration: "15 min", stops: "2 stop" },
    { id: 2, status: "Cancelled", departure: { time: "06:45 AM", date: "8 Desember 2025", location: "Araya" }, arrival: { time: "07:00 AM", date: "8 Desember 2025", location: "BINUS University" }, passenger: { name: "Ni Putu Saraswati", email: "ni.saraswati@binus.ac.id", binusianId: "BN138092583", nim: "2902654051" }, bus: 1, seat: 12, duration: "15 min", stops: "2 stop" },
    { id: 3, status: "Completed", departure: { time: "06:45 AM", date: "8 Desember 2025", location: "Araya" }, arrival: { time: "07:00 AM", date: "8 Desember 2025", location: "BINUS University" }, passenger: { name: "Ni Putu Saraswati", email: "ni.saraswati@binus.ac.id", binusianId: "BN138092583", nim: "2902654051" }, bus: 1, seat: 12, duration: "15 min", stops: "2 stop" },
    { id: 4, status: "Pending Payment", departure: { time: "06:45 AM", date: "8 Desember 2025", location: "Araya" }, arrival: { time: "07:00 AM", date: "8 Desember 2025", location: "BINUS University" }, passenger: { name: "Ni Putu Saraswati", email: "ni.saraswati@binus.ac.id", binusianId: "BN138092583", nim: "2902654051" }, bus: 1, seat: 12, duration: "15 min", stops: "2 stop" },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      Ongoing: "bg-white text-orange-600 border-orange-500",
      Cancelled: "bg-white text-red-600 border-red-500",
      Completed: "bg-white text-green-600 border-green-500",
      "Pending Payment": "bg-white text-purple-600 border-purple-500",
    };
    return styles[status] || "bg-white text-gray-600 border-gray-500";
  };

  const filteredJourneys = selectedStatus === "All Status" ? journeys : journeys.filter((j) => j.status === selectedStatus);

  const handleViewDetailTicket = (ticketId) => {
    navigate(`/detail-ticket/${ticketId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-linear-to-r from-orange-500 to-amber-500 py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white">Your Journey Records, All in One Place.</h1>
          </div>
        </div>

        {/* Filter Section - Full Width */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Select Status</h3>
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

            {/* Date Picker */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Select Date</h3>
              <div className="relative">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 bg-white flex items-center justify-between"
                >
                  <span className="text-gray-900">{formatDate(selectedDate)}</span>
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>

                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-full md:w-80">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="font-bold text-gray-900">
                        {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((day, index) => (
                        <button
                          key={index}
                          onClick={() => { if (day) { setSelectedDate(day); setShowCalendar(false); } }}
                          disabled={!day}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${!day ? "invisible" : ""} ${day && isSameDay(day, selectedDate) ? "bg-orange-500 text-white font-bold shadow-md" : day && isSameDay(day, new Date()) ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100 text-gray-700"}`}
                        >
                          {day ? day.getDate() : ""}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { const today = new Date(); setSelectedDate(today); setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setShowCalendar(false); }}
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
              <div key={journey.id} className="flex gap-4">
                {/* Main Ticket Card - Much Wider */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex">
                    {/* Left Section - Journey Details */}
                    <div className="flex-1 p-5">
                      <div className="mb-4">
                        <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-gray-400 text-xs mb-1">Departure</div>
                          <div className="text-2xl font-bold text-gray-900">{journey.departure.time}</div>
                          <div className="text-sm text-gray-600">{journey.departure.date}</div>
                          <div className="text-sm text-gray-500">{journey.departure.location}</div>
                        </div>
                        <div className="flex flex-col items-center px-4">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <div className="w-16 h-0.5 border-t-2 border-dashed border-gray-300"></div>
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          </div>
                          <div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1">{journey.duration}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{journey.stops}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-gray-400 text-xs mb-1">Destination</div>
                          <div className="text-2xl font-bold text-gray-900">{journey.arrival.time}</div>
                          <div className="text-sm text-gray-600">{journey.arrival.date}</div>
                          <div className="text-sm text-gray-500">{journey.arrival.location}</div>
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
                          <span className="text-xs leading-tight">Please be at the boarding gate at least 30 minutes before boarding time.</span>
                        </div>
                      </div>
                    </div>

                    {/* Yellow Dashed Vertical Divider */}
                    <div className="relative">
                      <div className="absolute top-4 bottom-4 w-px border-l-2 border-dashed border-yellow-400"></div>
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
                      <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div>
                    </div>

                    {/* Right Section - Passenger Info - Much Wider */}
                    <div className="w-96 p-5 bg-white">
                      <div className="flex justify-end mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(journey.status)}`}>{journey.status}</span>
                      </div>
                      <div className="space-y-4 mb-4">
                        <div className="grid grid-cols-2 gap-x-8">
                          <div className="text-left">
                            <div className="text-gray-400 text-xs mb-1">Name</div>
                            <div className="text-gray-900 font-semibold text-sm whitespace-nowrap">{journey.passenger.name}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-gray-400 text-xs mb-1">Email</div>
                            <div className="text-gray-900 font-semibold text-sm whitespace-nowrap">{journey.passenger.email}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8">
                          <div className="text-left">
                            <div className="text-gray-400 text-xs mb-1">BINUSIAN ID</div>
                            <div className="text-gray-900 font-semibold text-sm">{journey.passenger.binusianId}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-gray-400 text-xs mb-1">NIM</div>
                            <div className="text-gray-900 font-semibold text-sm">{journey.passenger.nim}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-8 pt-3 border-t border-gray-100">
                        <div className="text-center bg-gray-50 rounded-lg px-8 py-2">
                          <div className="text-gray-400 text-xs mb-1">Bus</div>
                          <div className="text-gray-900 font-bold text-2xl">{journey.bus}</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg px-8 py-2">
                          <div className="text-gray-400 text-xs mb-1">Seat</div>
                          <div className="text-gray-900 font-bold text-2xl">{journey.seat}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barcode Section */}
                <div className="w-40 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-100">
                  {journey.status === "Ongoing" && journey.barcode ? (
                    <>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">BARCODE</h3>
                      <img src={BarcodeImage} alt="Barcode" className="w-24 h-24 object-contain mb-2" />
                      <div className="text-center mb-2">
                        <div className="text-gray-400 text-xs mb-0.5">Booking code</div>
                        <div className="text-gray-900 font-bold text-xs">{journey.barcode}</div>
                      </div>
                      <button 
                        onClick={() => handleViewDetailTicket(journey.id)}
                        className="text-orange-500 text-xs hover:text-orange-600 hover:underline font-medium"
                      >
                        View detail ticket...
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      {journey.status === "Cancelled" && (
                        <>
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                            <X className="w-8 h-8 text-red-500" />
                          </div>
                          <div className="text-xs text-gray-500 text-center">Booking<br />Cancelled</div>
                        </>
                      )}
                      {journey.status === "Completed" && (
                        <>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <Check className="w-8 h-8 text-green-500" />
                          </div>
                          <div className="text-xs text-gray-500 text-center">Journey<br />Completed</div>
                        </>
                      )}
                      {journey.status === "Pending Payment" && (
                        <>
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <CreditCard className="w-8 h-8 text-purple-500" />
                          </div>
                          <div className="text-xs text-gray-500 text-center mb-2">Awaiting<br />Payment</div>
                          <button className="text-purple-600 text-xs font-semibold hover:text-purple-700 hover:underline">Pay Now</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJourneys.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No journeys found</h3>
              <p className="text-gray-500">No journey records match the selected filter.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>

      {showCalendar && <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />}
    </>
  );
}

export default History;