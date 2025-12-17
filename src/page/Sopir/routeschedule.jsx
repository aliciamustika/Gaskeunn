import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

// Bus Stop Icon seperti gambar referensi - lingkaran dengan bus dan tiang
const createBusStopSignIcon = (id, isMain = false, isHovered = false) => {
  const circleSize = isMain ? 36 : isHovered ? 34 : 32;
  const poleHeight = 20;
  const totalWidth = circleSize;
  const totalHeight = circleSize + poleHeight;
  const bgColor = isMain ? "#F59E0B" : "#DC2626"; // Oranye untuk main, Merah untuk lainnya
  const borderColor = isMain ? "#D97706" : "#B91C1C";
  const poleColor = "#9CA3AF";
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
      <!-- Tiang/Pole -->
      <rect x="${totalWidth/2 - 2}" y="${circleSize - 4}" width="4" height="${poleHeight + 4}" fill="${poleColor}"/>
      
      <!-- Lingkaran utama -->
      <circle cx="${totalWidth/2}" cy="${circleSize/2}" r="${circleSize/2 - 2}" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>
      
      <!-- Bus Icon -->
      <g transform="translate(${totalWidth/2 - 10}, ${circleSize/2 - 8})">
        <!-- Body bus -->
        <rect x="2" y="2" width="16" height="12" rx="2" fill="white"/>
        
        <!-- Jendela atas -->
        <rect x="4" y="4" width="5" height="4" rx="1" fill="${bgColor}"/>
        <rect x="11" y="4" width="5" height="4" rx="1" fill="${bgColor}"/>
        
        <!-- Garis bawah jendela -->
        <rect x="2" y="10" width="16" height="2" fill="#E5E7EB"/>
        
        <!-- Roda -->
        <circle cx="6" cy="14" r="2" fill="#374151"/>
        <circle cx="14" cy="14" r="2" fill="#374151"/>
        <circle cx="6" cy="14" r="1" fill="#9CA3AF"/>
        <circle cx="14" cy="14" r="1" fill="#9CA3AF"/>
      </g>
      
      <!-- ID Label di bawah -->
      <rect x="${totalWidth/2 - 10}" y="${circleSize + 6}" width="20" height="12" rx="2" fill="white" stroke="${bgColor}" stroke-width="1"/>
      <text x="${totalWidth/2}" y="${circleSize + 13}" 
            font-family="Arial, sans-serif" 
            font-size="8" 
            font-weight="bold" 
            fill="${bgColor}" 
            text-anchor="middle" 
            dominant-baseline="middle">${id}</text>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "custom-bus-stop-sign-icon",
    iconSize: [totalWidth, totalHeight],
    iconAnchor: [totalWidth / 2, totalHeight],
    popupAnchor: [0, -(totalHeight - 10)],
    tooltipAnchor: [totalWidth / 2 + 5, -(circleSize / 2)],
  });
};

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

  // Koordinat GPS titik jemput dengan detail info (sama seperti di route.jsx)
  const busStops = [
    {
      id: "T0",
      name: "BINUS University",
      fullName: "Titik Keberangkatan & Titik Akhir (BINUS)",
      position: [-7.939326456906397, 112.68104383601565],
      isMain: true,
      landmark: "Kampus BINUS Malang",
      description: "Titik keberangkatan dan tujuan akhir shuttle bus",
      schedule: "Berangkat: 06:30, 07:00, 07:30",
    },
    {
      id: "T1",
      name: "Perempatan Tirtomoyo Security",
      fullName: "Titik Jemput 1 (Perempatan Tirtomoyo Security)",
      position: [-7.9368482258999595, 112.67512243871319],
      landmark: "Pos Security Tirtomoyo",
      description: "Depan pos keamanan perempatan Tirtomoyo",
      schedule: "Estimasi: 06:35, 07:05, 07:35",
    },
    {
      id: "T2",
      name: "Telaga Golf",
      fullName: "Titik Jemput 2 (Telaga Golf)",
      position: [-7.941358235719524, 112.67013604607745],
      landmark: "Area Telaga Golf Araya",
      description: "Dekat pintu masuk Telaga Golf",
      schedule: "Estimasi: 06:38, 07:08, 07:38",
    },
    {
      id: "T3",
      name: "Seberang KDS",
      fullName: "Titik Jemput 3 (Seberang KDS)",
      position: [-7.940685087521296, 112.66265334474845],
      landmark: "Sebrang KDS Araya",
      description: "Di seberang KDS (Klub Dapur Sehat)",
      schedule: "Estimasi: 06:42, 07:12, 07:42",
    },
    {
      id: "T4",
      name: "Masjid Ramadhan",
      fullName: "Titik Jemput 4 (Masjid Ramadhan)",
      position: [-7.942076948819757, 112.6555424479944],
      landmark: "Masjid Ramadhan Araya",
      description: "Depan Masjid Ramadhan",
      schedule: "Estimasi: 06:45, 07:15, 07:45",
    },
    {
      id: "T5",
      name: "GPIB Getsemani",
      fullName: "Titik Jemput 5 (GPIB Getsemani)",
      position: [-7.939611350269796, 112.65383357900237],
      landmark: "Gereja GPIB Getsemani",
      description: "Depan Gereja GPIB Getsemani",
      schedule: "Estimasi: 06:48, 07:18, 07:48",
    },
    {
      id: "T6",
      name: "Taman Blok J",
      fullName: "Titik Jemput 6 (Taman Blok J)",
      position: [-7.9372648563697155, 112.65285223741527],
      landmark: "Taman Blok J Araya",
      description: "Area taman di Blok J perumahan Araya",
      schedule: "Estimasi: 06:50, 07:20, 07:50",
    },
    {
      id: "T7",
      name: "Hotel Grand Cakra",
      fullName: "Titik Jemput 7 (Hotel Grand Cakra)",
      position: [-7.935752031189624, 112.65120833667353],
      landmark: "Hotel Grand Cakra Malang",
      description: "Depan lobby Hotel Grand Cakra",
      schedule: "Estimasi: 06:53, 07:23, 07:53",
    },
    {
      id: "T8",
      name: "Bundaran PBI",
      fullName: "Titik Jemput 8 (Bundaran PBI)",
      position: [-7.936259176829228, 112.65531911245313],
      landmark: "Bundaran PBI Araya",
      description: "Di area bundaran PBI",
      schedule: "Estimasi: 06:56, 07:26, 07:56",
    },
    {
      id: "T9",
      name: "Bundaran Pujasera Nusantara",
      fullName: "Titik Jemput 9 (Bundaran Pujasera Nusantara)",
      position: [-7.937506892617456, 112.65819299365303],
      landmark: "Pujasera Nusantara",
      description: "Dekat bundaran Pujasera Nusantara",
      schedule: "Estimasi: 06:58, 07:28, 07:58",
    },
    {
      id: "T10",
      name: "Bundaran Roket",
      fullName: "Titik Jemput 10 (Bundaran Roket)",
      position: [-7.937979854196419, 112.65914221601237],
      landmark: "Bundaran Roket Araya",
      description: "Di bundaran dengan monumen roket",
      schedule: "Estimasi: 07:00, 07:30, 08:00",
    },
    {
      id: "T11",
      name: "Masjo Masakan Jawa",
      fullName: "Titik Jemput 11 (Masjo Masakan Jawa)",
      position: [-7.938728078786892, 112.66125923921314],
      landmark: "Restoran Masjo",
      description: "Depan restoran Masjo Masakan Jawa",
      schedule: "Estimasi: 07:03, 07:33, 08:03",
    },
    {
      id: "T12",
      name: "KDS",
      fullName: "Titik Jemput 12 (KDS)",
      position: [-7.940201961410049, 112.66124748741488],
      landmark: "KDS (Klub Dapur Sehat)",
      description: "Depan KDS Araya",
      schedule: "Estimasi: 07:05, 07:35, 08:05",
    },
    {
      id: "T13",
      name: "Djoglo/Djati Lounge",
      fullName: "Titik Jemput 13 (Djoglo/Djati Lounge)",
      position: [-7.93116074251041, 112.66417711204983],
      landmark: "Djoglo/Djati Lounge",
      description: "Depan Djoglo atau Djati Lounge",
      schedule: "Estimasi: 07:08, 07:38, 08:08",
    },
    {
      id: "T14",
      name: "Perempatan Kecil Tirtomoyo",
      fullName: "Titik Jemput 14 (Perempatan Kecil Tirtomoyo)",
      position: [-7.9376605829719065, 112.67452223651625],
      landmark: "Perempatan Kecil Tirtomoyo",
      description: "Di perempatan kecil area Tirtomoyo",
      schedule: "Estimasi: 07:12, 07:42, 08:12",
    },
    {
      id: "T15",
      name: "Ixora Valley",
      fullName: "Titik Jemput 15 (Ixora Valley)",
      position: [-7.93502926553001, 112.68385203667356],
      landmark: "Perumahan Ixora Valley",
      description: "Pintu masuk Ixora Valley",
      schedule: "Estimasi: 07:15, 07:45, 08:15",
    },
    {
      id: "T16",
      name: "Kvadra",
      fullName: "Titik Jemput 16 (Kvadra)",
      position: [-7.940862091410173, 112.68453817829278],
      landmark: "Kvadra Araya",
      description: "Depan area Kvadra",
      schedule: "Estimasi: 07:18, 07:48, 08:18",
    },
    {
      id: "T17",
      name: "M-House",
      fullName: "Titik Jemput 17 (M-House)",
      position: [-7.941645826513525, 112.68453102610313],
      landmark: "M-House Araya",
      description: "Depan M-House",
      schedule: "Estimasi: 07:20, 07:50, 08:20",
    },
  ];

  const center = [-7.938, 112.667];

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
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <svg width="24" height="32" viewBox="0 0 32 44">
                        <rect x="14" y="28" width="4" height="16" fill="#9CA3AF"/>
                        <circle cx="16" cy="14" r="12" fill="#DC2626" stroke="#B91C1C" strokeWidth="2"/>
                        <rect x="8" y="8" width="16" height="10" rx="2" fill="white"/>
                        <rect x="10" y="10" width="5" height="4" rx="1" fill="#DC2626"/>
                        <rect x="17" y="10" width="5" height="4" rx="1" fill="#DC2626"/>
                      </svg>
                      <span className="text-sm font-medium text-red-700">Halte Bus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Klik marker untuk detail
                      </span>
                    </div>
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

                    {/* Bus Stop Markers dengan Icon Halte */}
                    {busStops.map((stop) => (
                      <Marker
                        key={stop.id}
                        position={stop.position}
                        icon={createBusStopSignIcon(
                          stop.id,
                          stop.isMain,
                          hoveredStop?.id === stop.id
                        )}
                        eventHandlers={{
                          click: () => setSelectedStop(stop),
                          mouseover: () => setHoveredStop(stop),
                          mouseout: () => setHoveredStop(null),
                        }}
                      >
                        <Popup maxWidth={320}>
                          <div className="p-3">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  stop.isMain ? "bg-orange-500" : "bg-red-600"
                                }`}
                              >
                                {stop.id}
                              </div>
                              {stop.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">{stop.fullName}</p>
                            
                            {stop.isMain && (
                              <div className="mb-3 p-2 bg-orange-50 rounded border border-orange-200">
                                <p className="text-xs font-bold text-orange-700">
                                  ⭐ TITIK UTAMA - Keberangkatan & Tujuan Akhir
                                </p>
                              </div>
                            )}
                            
                            {/* Detail Info */}
                            <div className="space-y-2 mb-3">
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-gray-500">🏢</span>
                                <div>
                                  <p className="font-semibold text-gray-700">Landmark</p>
                                  <p className="text-gray-600">{stop.landmark}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-gray-500">📍</span>
                                <div>
                                  <p className="font-semibold text-gray-700">Deskripsi</p>
                                  <p className="text-gray-600">{stop.description}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-gray-500">🕐</span>
                                <div>
                                  <p className="font-semibold text-gray-700">Jadwal</p>
                                  <p className="text-gray-600">{stop.schedule}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-2">
                              <p className="font-semibold mb-1">📍 Koordinat GPS:</p>
                              <p className="font-mono">
                                Lat: {stop.position[0].toFixed(6)}
                                <br />
                                Lng: {stop.position[1].toFixed(6)}
                              </p>
                            </div>
                            <div className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-700">
                              🚌 Rute Gaskeunn
                            </div>
                          </div>
                        </Popup>
                      </Marker>
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
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-all ${
                              hoveredStop?.id === stop.id ? "scale-110" : ""
                            } ${
                              stop.isMain
                                ? "bg-linear-to-br from-orange-500 to-orange-600"
                                : "bg-linear-to-br from-red-500 to-red-600"
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

                  {/* Info Rute */}
                  <div className="rounded-xl p-5 bg-linear-to-br from-red-50 to-red-100 border-2 border-red-400 shadow-md mb-6">
                    <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2 text-lg">
                      <Bus className="w-5 h-5" />
                      Informasi Rute Gaskeunn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-red-600">
                      <div>
                        <p><span className="font-semibold">Titik Awal:</span> T0 BINUS University</p>
                        <p><span className="font-semibold">Titik Akhir:</span> T0 BINUS University</p>
                      </div>
                      <div>
                        <p><span className="font-semibold">Total Halte:</span> 18 titik jemput</p>
                        <p><span className="font-semibold">Area:</span> Perumahan Araya, Malang</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="text-xs text-gray-500 mb-1">Total Titik</p>
                      <p className="text-2xl font-bold text-blue-600">18</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="text-xs text-gray-500 mb-1">Estimasi Waktu</p>
                      <p className="text-2xl font-bold text-blue-600">~45 menit</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="text-xs text-gray-500 mb-1">Titik Utama</p>
                      <p className="text-lg font-bold text-orange-600">T0 BINUS</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="text-lg font-bold text-green-600">✓ Aktif</p>
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

        {/* Custom CSS for icon */}
        <style jsx>{`
          .custom-bus-stop-sign-icon {
            background: transparent !important;
            border: none !important;
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