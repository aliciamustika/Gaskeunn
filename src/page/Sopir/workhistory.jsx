import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "../../components/footer";

import {
  Clock,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

function DriverWorkHistory() {
  // Sample work history data
  const [workHistory] = useState([
    {
      id: 1,
      date: "19 December 2025",
      dayName: "Kamis",
      totalStudents: 8,
      totalTrips: 6,
      routes: [
        {
          time: "6:00",
          pickupPoints: ["Perempatan Tirtomoyo Security", "Hotel Grand Cakra"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "8:00",
          pickupPoints: ["Bundaran PBI", "Telaga Golf"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "10:00",
          pickupPoints: ["KDS"],
          studentsCount: 1,
          destination: "BINUS University",
        },
        {
          time: "14:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Telaga Golf",
        },
        {
          time: "16:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Bundaran PBI",
        },
        {
          time: "18:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "KDS",
        },
      ],
      status: "completed",
    },
    {
      id: 2,
      date: "18 December 2025",
      dayName: "Rabu",
      totalStudents: 12,
      totalTrips: 8,
      routes: [
        {
          time: "6:00",
          pickupPoints: ["Perempatan Tirtomoyo Security", "Telaga Golf", "KDS"],
          studentsCount: 3,
          destination: "BINUS University",
        },
        {
          time: "8:00",
          pickupPoints: ["Hotel Grand Cakra", "Bundaran PBI"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "10:00",
          pickupPoints: ["Masjid Ramadhan", "GPIB Getsemani"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "12:00",
          pickupPoints: ["Taman Blok J"],
          studentsCount: 1,
          destination: "BINUS University",
        },
        {
          time: "14:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Hotel Grand Cakra",
        },
        {
          time: "16:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 2,
          destination: "Telaga Golf",
        },
        {
          time: "18:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "KDS",
        },
      ],
      status: "completed",
    },
    {
      id: 3,
      date: "17 December 2025",
      dayName: "Selasa",
      totalStudents: 10,
      totalTrips: 7,
      routes: [
        {
          time: "6:00",
          pickupPoints: ["Perempatan Tirtomoyo Security", "Bundaran PBI"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "8:00",
          pickupPoints: ["Hotel Grand Cakra", "KDS"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "10:00",
          pickupPoints: ["Telaga Golf"],
          studentsCount: 1,
          destination: "BINUS University",
        },
        {
          time: "12:00",
          pickupPoints: ["Masjid Ramadhan", "Taman Blok J"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "14:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Bundaran PBI",
        },
        {
          time: "16:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "KDS",
        },
        {
          time: "18:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Hotel Grand Cakra",
        },
      ],
      status: "completed",
    },
    {
      id: 4,
      date: "16 December 2025",
      dayName: "Senin",
      totalStudents: 15,
      totalTrips: 9,
      routes: [
        {
          time: "6:00",
          pickupPoints: ["Perempatan Tirtomoyo Security", "Telaga Golf", "Bundaran PBI"],
          studentsCount: 3,
          destination: "BINUS University",
        },
        {
          time: "8:00",
          pickupPoints: ["Hotel Grand Cakra", "KDS", "Masjid Ramadhan"],
          studentsCount: 3,
          destination: "BINUS University",
        },
        {
          time: "10:00",
          pickupPoints: ["GPIB Getsemani", "Taman Blok J"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "12:00",
          pickupPoints: ["Bundaran Roket"],
          studentsCount: 1,
          destination: "BINUS University",
        },
        {
          time: "14:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 2,
          destination: "Telaga Golf",
        },
        {
          time: "16:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 2,
          destination: "Hotel Grand Cakra",
        },
        {
          time: "18:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 2,
          destination: "KDS",
        },
      ],
      status: "completed",
    },
    {
      id: 5,
      date: "15 December 2025",
      dayName: "Minggu",
      totalStudents: 5,
      totalTrips: 4,
      routes: [
        {
          time: "10:00",
          pickupPoints: ["Telaga Golf"],
          studentsCount: 1,
          destination: "BINUS University",
        },
        {
          time: "12:00",
          pickupPoints: ["KDS", "Bundaran PBI"],
          studentsCount: 2,
          destination: "BINUS University",
        },
        {
          time: "16:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "Telaga Golf",
        },
        {
          time: "18:00",
          pickupPoints: ["BINUS University"],
          studentsCount: 1,
          destination: "KDS",
        },
      ],
      status: "completed",
    },
  ]);

  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // week, month, all

  // Calculate statistics
  const totalStudents = workHistory.reduce((sum, day) => sum + day.totalStudents, 0);
  const totalTrips = workHistory.reduce((sum, day) => sum + day.totalTrips, 0);
  const averageStudentsPerDay = (totalStudents / workHistory.length).toFixed(1);

  const toggleExpand = (id) => {
    setExpandedDay(expandedDay === id ? null : id);
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
                Riwayat Pekerjaan Sopir
              </h1>
              <p className="text-white/90 text-lg text-left">
                Statistik dan Detail Perjalanan Anda
              </p>
            </div>
          </div>

          {/* Overall Statistics */}
          <div className="pb-8 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Students */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Mahasiswa</p>
                  <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Rata-rata {averageStudentsPerDay}/hari
                  </p>
                </div>

                {/* Total Trips */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <Award className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Perjalanan</p>
                  <p className="text-3xl font-bold text-gray-900">{totalTrips}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {workHistory.length} hari kerja
                  </p>
                </div>

                {/* Performance Score */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-yellow-600" />
                    </div>
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Performa</p>
                  <p className="text-3xl font-bold text-gray-900">95%</p>
                  <p className="text-xs text-gray-500 mt-1">Excellent rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Period Filter */}
          <div className="pb-8 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-gray-700">Periode:</p>
                  <button
                    onClick={() => setSelectedPeriod("week")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPeriod === "week"
                        ? "bg-[oklch(0.6155_0.1314_243.17)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Minggu Ini
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("month")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPeriod === "month"
                        ? "bg-[oklch(0.6155_0.1314_243.17)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Bulan Ini
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("all")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPeriod === "all"
                        ? "bg-[oklch(0.6155_0.1314_243.17)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Semua Waktu
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Work History List */}
          <div className="pb-16 px-8">
            <div className="max-w-7xl mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                Detail Riwayat Harian
              </h2>

              {workHistory.map((day) => (
                <div
                  key={day.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Day Header - Clickable */}
                  <button
                    onClick={() => toggleExpand(day.id)}
                    className="w-full p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Date Circle */}
                        <div className="w-16 h-16 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex flex-col items-center justify-center text-white">
                          <span className="text-xs font-semibold">
                            {day.date.split(' ')[0]}
                          </span>
                          <span className="text-lg font-bold">
                            {day.date.split(' ')[1]}
                          </span>
                        </div>

                        {/* Day Info */}
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-900">
                            {day.dayName}, {day.date}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              <span className="font-semibold">{day.totalStudents}</span>
                              <span>mahasiswa</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Target className="w-4 h-4" />
                              <span className="font-semibold">{day.totalTrips}</span>
                              <span>perjalanan</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <ChevronDown
                          className={`w-6 h-6 text-gray-400 transition-transform ${
                            expandedDay === day.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Routes Details */}
                  {expandedDay === day.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Detail Perjalanan
                      </h4>
                      <div className="space-y-4">
                        {day.routes.map((route, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-start gap-4">
                              {/* Time Badge */}
                              <div className="shrink-0">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                                  <Clock className="w-5 h-5 text-blue-600 mb-1" />
                                  <span className="text-sm font-bold text-blue-600">
                                    {route.time}
                                  </span>
                                </div>
                              </div>

                              {/* Route Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                  <User className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-semibold text-gray-900">
                                    {route.studentsCount} mahasiswa
                                  </span>
                                </div>

                                {/* Pickup Points */}
                                <div className="mb-2">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                                    <div className="text-left">
                                      <p className="text-xs text-gray-500 mb-1">
                                        Penjemputan:
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {route.pickupPoints.map((point, idx) => (
                                          <span
                                            key={idx}
                                            className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                                          >
                                            {point}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Destination */}
                                <div>
                                  <div className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                                    <div className="text-left">
                                      <p className="text-xs text-gray-500 mb-1">
                                        Tujuan:
                                      </p>
                                      <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                                        {route.destination}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Daily Summary */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-blue-600 mb-1">
                              Total Mahasiswa
                            </p>
                            <p className="text-2xl font-bold text-blue-700">
                              {day.totalStudents}
                            </p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-purple-600 mb-1">
                              Total Perjalanan
                            </p>
                            <p className="text-2xl font-bold text-purple-700">
                              {day.totalTrips}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default DriverWorkHistory;