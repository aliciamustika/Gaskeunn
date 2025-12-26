import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "../../components/footer";

import {
  Clock,
  MapPin,
  User,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
} from "lucide-react";

function DriverOrder() {
  // Sample passenger data sorted by departure time
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      phone: "081234567890",
      departure: "Perempatan Tirtomoyo Security",
      destination: "BINUS University",
      departureTime: "6:00",
      arrivalTime: "7:10",
      date: "19 December 2025",
      status: "pending", // pending, picked-up, completed, cancelled
      passengerCount: 1,
      paymentMethod: "QRIS",
      notes: "Mohon tepat waktu",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      phone: "081298765432",
      departure: "Hotel Grand Cakra",
      destination: "BINUS University",
      departureTime: "6:00",
      arrivalTime: "7:10",
      date: "19 December 2025",
      status: "pending",
      passengerCount: 1,
      paymentMethod: "Transfer Bank",
      notes: "",
    },
    {
      id: 3,
      name: "Ahmad Fauzi",
      phone: "081387654321",
      departure: "Bundaran PBI",
      destination: "BINUS University",
      departureTime: "8:00",
      arrivalTime: "9:10",
      date: "19 December 2025",
      status: "picked-up",
      passengerCount: 2,
      paymentMethod: "QRIS",
      notes: "Ada 2 orang",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      phone: "081456789012",
      departure: "Telaga Golf",
      destination: "BINUS University",
      departureTime: "10:00",
      arrivalTime: "11:10",
      date: "19 December 2025",
      status: "pending",
      passengerCount: 1,
      paymentMethod: "QRIS",
      notes: "",
    },
    {
      id: 5,
      name: "Rudi Hermawan",
      phone: "081567890123",
      departure: "KDS",
      destination: "BINUS University",
      departureTime: "12:00",
      arrivalTime: "13:10",
      date: "19 December 2025",
      status: "completed",
      passengerCount: 1,
      paymentMethod: "Transfer Bank",
      notes: "",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState("19 December 2025");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, picked-up, completed

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          label: "Menunggu",
          icon: <AlertCircle className="w-4 h-4" />,
        };
      case "picked-up":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          label: "Dijemput",
          icon: <Clock className="w-4 h-4" />,
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Selesai",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: status,
          icon: null,
        };
    }
  };

  // Update passenger status
  const updateStatus = (id, newStatus) => {
    setPassengers(
      passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, status: newStatus } : passenger
      )
    );
  };

  // Filter passengers
  const filteredPassengers = passengers.filter((passenger) => {
    if (filterStatus === "all") return true;
    return passenger.status === filterStatus;
  });

  // Group passengers by departure time
  const groupedByTime = filteredPassengers.reduce((acc, passenger) => {
    const time = passenger.departureTime;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(passenger);
    return acc;
  }, {});

  // Get statistics
  const stats = {
    total: passengers.length,
    pending: passengers.filter((p) => p.status === "pending").length,
    pickedUp: passengers.filter((p) => p.status === "picked-up").length,
    completed: passengers.filter((p) => p.status === "completed").length,
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />

        {/* Main Content */}
        <div className="min-h-screen bg-linear-to-b from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.7_0.12_243.17)]">
          {/* Hero Section */}
          <div className="py-12 px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-left mb-2">
                Daftar Pesanan Penumpang
              </h1>
              <p className="text-white/90 text-lg text-left">
                {selectedDate}
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="pb-8 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Orders */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Pesanan</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Menunggu</p>
                      <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                {/* Picked Up */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Dijemput</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.pickedUp}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Completed */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Selesai</p>
                      <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="pb-8 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-gray-700">Filter Status:</p>
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      filterStatus === "all"
                        ? "bg-[oklch(0.6155_0.1314_243.17)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Semua ({stats.total})
                  </button>
                  <button
                    onClick={() => setFilterStatus("pending")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      filterStatus === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Menunggu ({stats.pending})
                  </button>
                  <button
                    onClick={() => setFilterStatus("picked-up")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      filterStatus === "picked-up"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Dijemput ({stats.pickedUp})
                  </button>
                  <button
                    onClick={() => setFilterStatus("completed")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      filterStatus === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Selesai ({stats.completed})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger List - Grouped by Time */}
          <div className="pb-16 px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {Object.keys(groupedByTime).length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-600">
                    Tidak ada pesanan untuk filter ini
                  </p>
                </div>
              ) : (
                Object.keys(groupedByTime)
                  .sort()
                  .map((time) => (
                    <div key={time}>
                      {/* Time Header */}
                      <div className="bg-white rounded-t-xl shadow-lg px-6 py-4 border-b-2 border-[oklch(0.6155_0.1314_243.17)]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-900">
                              Keberangkatan Jam {time}
                            </p>
                            <p className="text-sm text-gray-600 text-left">
                              {groupedByTime[time].length} penumpang
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Passenger Cards */}
                      <div className="bg-white rounded-b-xl shadow-lg divide-y divide-gray-200">
                        {groupedByTime[time].map((passenger) => {
                          const statusBadge = getStatusBadge(passenger.status);
                          return (
                            <div
                              key={passenger.id}
                              className="p-6 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Left Side - Passenger Info */}
                                <div className="flex-1 space-y-3">
                                  {/* Name and Status */}
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                      <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-lg font-bold text-gray-900">
                                          {passenger.name}
                                        </h3>
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text}`}
                                        >
                                          {statusBadge.icon}
                                          {statusBadge.label}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                        <Phone className="w-4 h-4" />
                                        <span>{passenger.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Route Info */}
                                  <div className="pl-14 space-y-2">
                                    <div className="flex items-start gap-2">
                                      <MapPin className="w-4 h-4 text-[oklch(0.6155_0.1314_243.17)] mt-0.5 shrink-0" />
                                      <div className="text-left">
                                        <p className="text-xs text-gray-500">
                                          Penjemputan
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                          {passenger.departure}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Target className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                      <div className="text-left">
                                        <p className="text-xs text-gray-500">Tujuan</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                          {passenger.destination}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Additional Info */}
                                  <div className="pl-14 flex flex-wrap gap-4 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <User className="w-3 h-3" />
                                      <span>{passenger.passengerCount} orang</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>💳</span>
                                      <span>{passenger.paymentMethod}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>
                                        Tiba: {passenger.arrivalTime}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Notes */}
                                  {passenger.notes && (
                                    <div className="pl-14">
                                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-yellow-800 mb-1">
                                          Catatan:
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                          {passenger.notes}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Right Side - Action Buttons */}
                                <div className="flex lg:flex-col gap-2 lg:w-48">
                                  {passenger.status === "pending" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          updateStatus(passenger.id, "picked-up")
                                        }
                                        className="flex-1 lg:w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                      >
                                        <Clock className="w-4 h-4" />
                                        Jemput
                                      </button>
                                    </>
                                  )}
                                  {passenger.status === "picked-up" && (
                                    <button
                                      onClick={() =>
                                        updateStatus(passenger.id, "completed")
                                      }
                                      className="flex-1 lg:w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Selesai
                                    </button>
                                  )}
                                  {(passenger.status === "completed" ||
                                    passenger.status === "cancelled") && (
                                    <button
                                      onClick={() =>
                                        updateStatus(passenger.id, "pending")
                                      }
                                      className="flex-1 lg:w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                                    >
                                      Reset Status
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default DriverOrder;