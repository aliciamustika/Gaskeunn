import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import {
  Navigation,
  Bus,
  MapPin,
  Info,
  Clock,
  Calendar,
  ChevronDown,
  Route,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "./navbar";

// Fix default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RuteJadwal = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [hoveredStop, setHoveredStop] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  // Toggle section (rute or jadwal)
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Toggle day schedule
  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // Bus stops data
  const busStops = [
    {
      id: "T0",
      name: "BINUS University",
      fullName: "Titik Keberangkatan & Titik Akhir (BINUS)",
      position: [-7.939326456906397, 112.68104383601565],
      color: "blue",
      isMain: true,
    },
    {
      id: "T1",
      name: "Perempatan Tirtomoyo Security",
      fullName: "Titik Jemput 1 (Perempatan Tirtomoyo Security)",
      position: [-7.9368482258999595, 112.67512243871319],
      color: "blue",
    },
    {
      id: "T2",
      name: "Telaga Golf",
      fullName: "Titik Jemput 2 (Telaga Golf)",
      position: [-7.941358235719524, 112.67013604607745],
      color: "blue",
    },
    {
      id: "T3",
      name: "Seberang KDS",
      fullName: "Titik Jemput 3 (Seberang KDS)",
      position: [-7.940685087521296, 112.66265334474845],
      color: "blue",
    },
    {
      id: "T4",
      name: "Masjid Ramadhan",
      fullName: "Titik Jemput 4 (Masjid Ramadhan)",
      position: [-7.942076948819757, 112.6555424479944],
      color: "blue",
    },
    {
      id: "T5",
      name: "GPIB Getsemani",
      fullName: "Titik Jemput 5 (GPIB Getsemani)",
      position: [-7.939611350269796, 112.65383357900237],
      color: "blue",
    },
    {
      id: "T6",
      name: "Taman Blok J",
      fullName: "Titik Jemput 6 (Taman Blok J)",
      position: [-7.9372648563697155, 112.65285223741527],
      color: "blue",
    },
    {
      id: "T7",
      name: "Hotel Grand Cakra",
      fullName: "Titik Jemput 7 (Hotel Grand Cakra)",
      position: [-7.935752031189624, 112.65120833667353],
      color: "blue",
    },
    {
      id: "T8",
      name: "Bundaran PBI",
      fullName: "Titik Jemput 8 (Bundaran PBI)",
      position: [-7.936259176829228, 112.65531911245313],
      color: "blue",
    },
    {
      id: "T9",
      name: "Bundaran Pujasera Nusantara",
      fullName: "Titik Jemput 9 (Bundaran Pujasera Nusantara)",
      position: [-7.937506892617456, 112.65819299365303],
      color: "blue",
    },
    {
      id: "T10",
      name: "Bundaran Roket",
      fullName: "Titik Jemput 10 (Bundaran Roket)",
      position: [-7.937979854196419, 112.65914221601237],
      color: "blue",
    },
    {
      id: "T11",
      name: "Masjo Masakan Jawa",
      fullName: "Titik Jemput 11 (Masjo Masakan Jawa)",
      position: [-7.938728078786892, 112.66125923921314],
      color: "blue",
    },
    {
      id: "T12",
      name: "KDS",
      fullName: "Titik Jemput 12 (KDS)",
      position: [-7.940201961410049, 112.66124748741488],
      color: "blue",
    },
    {
      id: "T13",
      name: "Djoglo/Djati Lounge",
      fullName: "Titik Jemput 13 (Djoglo/Djati Lounge)",
      position: [-7.93116074251041, 112.66417711204983],
      color: "blue",
    },
    {
      id: "T14",
      name: "Perempatan Kecil Tirtomoyo",
      fullName: "Titik Jemput 14 (Perempatan Kecil Tirtomoyo)",
      position: [-7.9376605829719065, 112.67452223651625],
      color: "blue",
    },
    {
      id: "T15",
      name: "Ixora Valley",
      fullName: "Titik Jemput 15 (Ixora Valley)",
      position: [-7.93502926553001, 112.68385203667356],
      color: "blue",
    },
    {
      id: "T16",
      name: "Kvadra",
      fullName: "Titik Jemput 16 (Kvadra)",
      position: [-7.940862091410173, 112.68453817829278],
      color: "blue",
    },
    {
      id: "T17",
      name: "M-House",
      fullName: "Titik Jemput 17 (M-House)",
      position: [-7.941645826513525, 112.68453102610313],
      color: "blue",
    },
  ];

  // Route paths
  const mainRoutePath = [
    [-7.939326456906397, 112.68104383601565],
    [-7.9368482258999595, 112.67512243871319],
    [-7.941358235719524, 112.67013604607745],
    [-7.940685087521296, 112.66265334474845],
    [-7.942076948819757, 112.6555424479944],
    [-7.939611350269796, 112.65383357900237],
    [-7.936259176829228, 112.65531911245313],
    [-7.937506892617456, 112.65819299365303],
    [-7.937979854196419, 112.65914221601237],
    [-7.938728078786892, 112.66125923921314],
    [-7.940201961410049, 112.66124748741488],
    [-7.93116074251041, 112.66417711204983],
  ];

  const branch1 = [
    [-7.941358235719524, 112.67013604607745],
    [-7.9372648563697155, 112.65285223741527],
    [-7.935752031189624, 112.65120833667353],
  ];

  const branch2 = [
    [-7.93116074251041, 112.66417711204983],
    [-7.9376605829719065, 112.67452223651625],
    [-7.93502926553001, 112.68385203667356],
    [-7.940862091410173, 112.68453817829278],
  ];

  const branch3 = [
    [-7.93116074251041, 112.66417711204983],
    [-7.941645826513525, 112.68453102610313],
  ];

  const center = [-7.9375, 112.665];

  // Schedule data
  const scheduleData = [
    {
      day: "SENIN",
      color: "bg-sky-400",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
    {
      day: "SELASA",
      color: "bg-sky-500",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
    {
      day: "RABU",
      color: "bg-sky-600",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
    {
      day: "KAMIS",
      color: "bg-cyan-500",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
    {
      day: "JUMAT",
      color: "bg-sky-500",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
    {
      day: "SABTU",
      color: "bg-sky-400",
      schedules: [
        {
          departure: "6:00",
          arrival: "7:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "8:00",
          arrival: "9:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "10:00",
          arrival: "11:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "12:00",
          arrival: "13:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "14:00",
          arrival: "15:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
        {
          departure: "16:00",
          arrival: "17:10",
          route: "BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
              Rute & Jadwal Bus Gaskeunn
            </h1>
            <p className="text-center text-gray-600">
              Informasi Lengkap Rute Perjalanan dan Jadwal Keberangkatan
            </p>
          </div>

          {/* DROPDOWN 1: RUTE */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <button
              onClick={() => toggleSection("rute")}
              className="w-full p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center">
                    <Route className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Peta Rute Bus
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Area Araya, Kota Malang - 18 Titik Jemput
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    expandedSection === "rute" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded Route Content */}
            {expandedSection === "rute" && (
              <div className="border-t border-gray-200">
                {/* Info Banner */}
                <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                  <div className="flex items-center justify-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Klik marker untuk detail titik jemput • BINUS (T0) di
                      kanan, Kvadra (T16) di kiri
                    </span>
                  </div>
                </div>

                {/* Map Container */}
                <div className="h-96 md:h-125 relative">
                  <MapContainer
                    center={center}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Route Lines */}
                    <Polyline
                      positions={mainRoutePath}
                      color="#3B82F6"
                      weight={5}
                      opacity={0.8}
                      dashArray="15, 10"
                    />
                    <Polyline
                      positions={branch1}
                      color="#3B82F6"
                      weight={5}
                      opacity={0.8}
                      dashArray="15, 10"
                    />
                    <Polyline
                      positions={branch2}
                      color="#3B82F6"
                      weight={5}
                      opacity={0.8}
                      dashArray="15, 10"
                    />
                    <Polyline
                      positions={branch3}
                      color="#3B82F6"
                      weight={5}
                      opacity={0.8}
                      dashArray="15, 10"
                    />

                    {/* Bus Stop Markers */}
                    {busStops.map((stop) => (
                      <CircleMarker
                        key={stop.id}
                        center={stop.position}
                        radius={
                          stop.isMain
                            ? 18
                            : hoveredStop?.id === stop.id
                            ? 15
                            : 12
                        }
                        fillColor={stop.isMain ? "#F59E0B" : "#3B82F6"}
                        fillOpacity={hoveredStop?.id === stop.id ? 1 : 0.9}
                        color="white"
                        weight={stop.isMain ? 4 : 3}
                        eventHandlers={{
                          click: () => setSelectedStop(stop),
                          mouseover: () => setHoveredStop(stop),
                          mouseout: () => setHoveredStop(null),
                        }}
                      >
                        <Tooltip
                          permanent
                          direction="top"
                          offset={[0, -10]}
                          className="custom-tooltip"
                          opacity={1}
                        >
                          <span
                            className={`font-bold text-xs ${
                              stop.isMain ? "text-orange-600" : ""
                            }`}
                          >
                            {stop.id}
                          </span>
                        </Tooltip>
                        <Popup maxWidth={300}>
                          <div className="p-2">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  stop.isMain ? "bg-orange-500" : "bg-blue-500"
                                }`}
                              >
                                {stop.id}
                              </div>
                              {stop.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {stop.fullName}
                            </p>
                            {stop.isMain && (
                              <div className="mb-2 p-2 bg-orange-50 rounded border border-orange-200">
                                <p className="text-xs font-bold text-orange-700">
                                  ⭐ TITIK UTAMA - Keberangkatan & Tujuan Akhir
                                </p>
                              </div>
                            )}
                            <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-2">
                              <p className="font-semibold mb-1">
                                📍 Koordinat GPS:
                              </p>
                              <p className="font-mono">
                                Lat: {stop.position[0].toFixed(6)}
                                <br />
                                Lng: {stop.position[1].toFixed(6)}
                              </p>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>

                {/* Legend */}
                <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-7 h-7 text-[oklch(0.6155_0.1314_243.17)]" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Daftar Titik Jemput
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {busStops.map((stop) => (
                      <div
                        key={stop.id}
                        className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                          hoveredStop?.id === stop.id ||
                          selectedStop?.id === stop.id
                            ? "bg-white shadow-lg scale-105 ring-2 ring-[oklch(0.6155_0.1314_243.17)]"
                            : "bg-white shadow hover:shadow-md hover:scale-102"
                        } ${
                          stop.isMain
                            ? "ring-2 ring-orange-400 bg-orange-50"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredStop(stop)}
                        onMouseLeave={() => setHoveredStop(null)}
                        onClick={() => setSelectedStop(stop)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                              stop.isMain
                                ? "bg-orange-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {stop.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-semibold text-sm leading-tight ${
                                stop.isMain ? "text-orange-700" : "text-gray-800"
                              }`}
                            >
                              {stop.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {stop.isMain ? "⭐ Titik Utama" : stop.fullName}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Route Summary */}
                  <div className="rounded-xl p-6 bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-400 shadow-md">
                    <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2 text-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full shadow"></div>
                      Rute Biru Gaskeunn
                    </h4>
                    <p className="text-sm text-blue-600 font-medium leading-relaxed mb-4">
                      <span className="font-bold text-orange-600">
                        🏫 BINUS University (Kanan)
                      </span>{" "}
                      → Tirtomoyo Security → Telaga Golf → Seberang KDS →
                      Masjid Ramadhan → GPIB Getsemani → Bundaran PBI →
                      Pujasera Nusantara → Bundaran Roket → Masjo Masakan Jawa
                      → KDS → Djoglo/Djati Lounge
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs text-gray-500 mb-1">
                          Total Titik
                        </p>
                        <p className="text-2xl font-bold text-blue-600">18</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs text-gray-500 mb-1">
                          Estimasi Waktu
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ~45 menit
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs text-gray-500 mb-1">
                          Titik Utama
                        </p>
                        <p className="text-lg font-bold text-orange-600">
                          T0 BINUS
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-lg font-bold text-green-600">
                          ✓ Aktif
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DROPDOWN 2: JADWAL */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection("jadwal")}
              className="w-full p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[oklch(0.6155_0.1314_243.17)] rounded-full flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Jadwal Bus
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Senin - Sabtu • 6 Perjalanan/Hari
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    expandedSection === "jadwal" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded Schedule Content */}
            {expandedSection === "jadwal" && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="space-y-4">
                  {scheduleData.map((dayData, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow overflow-hidden"
                    >
                      {/* Day Header */}
                      <button
                        onClick={() => toggleDay(dayData.day)}
                        className="w-full p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 ${dayData.color} rounded-lg flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-sm">
                                {dayData.day.substring(0, 3)}
                              </span>
                            </div>
                            <div className="text-left">
                              <h3 className="text-lg font-bold text-gray-900">
                                {dayData.day}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {dayData.schedules.length} perjalanan
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedDay === dayData.day ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expanded Schedule Details */}
                      {expandedDay === dayData.day && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                          <div className="space-y-3">
                            {dayData.schedules.map((schedule, idx) => (
                              <div
                                key={idx}
                                className="bg-white rounded-lg p-4 border border-gray-200"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="shrink-0">
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                                      <Clock className="w-5 h-5 text-blue-600 mb-1" />
                                      <span className="text-sm font-bold text-blue-600">
                                        {schedule.departure}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-sm font-semibold text-gray-900">
                                        Tiba: {schedule.arrival}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <span className="font-medium">Rute:</span>{" "}
                                      {schedule.route}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom CSS for tooltip */}
        <style jsx>{`
          .custom-tooltip {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            font-weight: bold;
            color: #1f2937;
            text-shadow: 0 0 3px white, 0 0 3px white, 0 0 3px white;
          }
          .custom-tooltip::before {
            display: none !important;
          }
          .leaflet-container {
            font-family: inherit;
          }
        `}</style>
      </div>
    </>
  );
};

export default RuteJadwal;