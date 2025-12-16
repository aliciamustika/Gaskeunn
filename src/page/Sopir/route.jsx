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
import { Navigation, Bus, MapPin, Info } from "lucide-react";
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

const RealBusRouteMap = () => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [hoveredStop, setHoveredStop] = useState(null);

  // Koordinat GPS - MIRRORED VERTIKAL
  // BINUS di KANAN (112.6535), Kvadra di KIRI (112.6095)
  const busStops = [
    {
      id: "T0",
      name: "BINUS University",
      fullName: "Titik Keberangkatan & Titik Akhir (BINUS)",
      position: [-7.939326456906397, 112.68104383601565], // KANAN
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
      position: [-7.940862091410173, 112.68453817829278], // KIRI
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

  // Single Blue Route Path - mengikuti semua cabang
  const mainRoutePath = [
    [-7.939326456906397, 112.68104383601565], // T0 BINUS (kanan)
    [-7.9368482258999595, 112.67512243871319], // T1 Tirtomoyo Security
    [-7.941358235719524, 112.67013604607745], // T2 Telaga Golf
    [-7.940685087521296, 112.66265334474845], // T3 Seberang KDS
    [-7.942076948819757, 112.6555424479944], // T4 Masjid Ramadhan
    [-7.939611350269796, 112.65383357900237], // T5 GPIB Getsemani
    [-7.936259176829228, 112.65531911245313], // T8 Bundaran PBI
    [-7.937506892617456, 112.65819299365303], // T9 Pujasera
    [-7.937979854196419, 112.65914221601237], // T10 Bundaran Roket
    [-7.938728078786892, 112.66125923921314], // T11 Masjo
    [-7.940201961410049, 112.66124748741488], // T12 KDS
    [-7.93116074251041, 112.66417711204983], // T13 Djoglo
  ];

  // Branch 1: T2 → T6 → T7
  const branch1 = [
    [-7.941358235719524, 112.67013604607745], // T2 Telaga Golf
    [-7.9372648563697155, 112.65285223741527], // T6 Taman Blok J
    [-7.935752031189624, 112.65120833667353], // T7 Hotel Grand Cakra
  ];

  // Branch 2: T13 → T14 → T15 → T16 (Kvadra)
  const branch2 = [
    [-7.93116074251041, 112.66417711204983], // T13 Djoglo
    [-7.9376605829719065, 112.67452223651625], // T14 Perempatan Kecil Tirtomoyo
    [-7.93502926553001, 112.68385203667356], // T15 Ixora Valley
    [-7.940862091410173, 112.68453817829278], // T16 Kvadra (kiri)
  ];

  // Branch 3: T13 → T17
  const branch3 = [
    [-7.93116074251041, 112.66417711204983], // T13 Djoglo
    [-7.941645826513525, 112.68453102610313], // T17 M-House
  ];

  const center = [-7.9475, 112.63]; // Center map

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.55_0.14_243.17)] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                    <Bus className="w-10 h-10" />
                    Peta Rute Gaskeunn
                  </h1>
                  <p className="text-blue-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Area Araya, Kota Malang - Rute Biru (18 Titik)
                  </p>
                </div>
                <Navigation className="w-12 h-12 md:w-16 md:h-16 opacity-80" />
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
              <div className="flex items-center justify-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Klik marker untuk detail titik jemput • BINUS (T0) di kanan, Kvadra (T16) di kiri
                </span>
              </div>
            </div>

            {/* Map Container */}
            <div className="h-150 relative">
              <MapContainer
                center={center}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                {/* Base Map Layer */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Main Blue Route */}
                <Polyline
                  positions={mainRoutePath}
                  color="#3B82F6"
                  weight={5}
                  opacity={0.8}
                  dashArray="15, 10"
                />

                {/* Branch 1: T2 → T6 → T7 */}
                <Polyline
                  positions={branch1}
                  color="#3B82F6"
                  weight={5}
                  opacity={0.8}
                  dashArray="15, 10"
                />

                {/* Branch 2: T13 → T14 → T15 → T16 */}
                <Polyline
                  positions={branch2}
                  color="#3B82F6"
                  weight={5}
                  opacity={0.8}
                  dashArray="15, 10"
                />

                {/* Branch 3: T13 → T17 */}
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
                    radius={stop.isMain ? 18 : (hoveredStop?.id === stop.id ? 15 : 12)}
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
                      <span className={`font-bold text-xs ${stop.isMain ? 'text-orange-600' : ''}`}>
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
                        <div className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                          🔵 Rute Biru Gaskeunn
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
                <h2 className="text-2xl font-bold text-gray-800">
                  DAFTAR TITIK JEMPUT - RUTE BIRU
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {busStops.map((stop) => {
                  return (
                    <div
                      key={stop.id}
                      className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                        hoveredStop?.id === stop.id ||
                        selectedStop?.id === stop.id
                          ? "bg-white shadow-lg scale-105 ring-2 ring-[oklch(0.6155_0.1314_243.17)]"
                          : "bg-white shadow hover:shadow-md hover:scale-102"
                      } ${stop.isMain ? 'ring-2 ring-orange-400 bg-orange-50' : ''}`}
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
                              : "bg-linear-to-br from-blue-500 to-blue-600"
                          }`}
                        >
                          {stop.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm leading-tight ${
                            stop.isMain ? 'text-orange-700' : 'text-gray-800'
                          }`}>
                            {stop.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {stop.isMain ? '⭐ Titik Utama' : stop.fullName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Route Summary */}
              <div className="rounded-xl p-6 bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-400 shadow-md">
                <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2 text-xl">
                  <div className="w-6 h-6 bg-blue-500 rounded-full shadow"></div>
                  Rute Biru Gaskeunn
                </h3>
                <p className="text-sm text-blue-600 font-medium leading-relaxed mb-4">
                  <span className="font-bold text-orange-600">🏫 BINUS University (Kanan)</span> → 
                  Tirtomoyo Security → Telaga Golf → Seberang KDS → Masjid Ramadhan → 
                  GPIB Getsemani → Bundaran PBI → Pujasera Nusantara → Bundaran Roket → 
                  Masjo Masakan Jawa → KDS → Djoglo/Djati Lounge
                </p>
                <div className="mb-4 p-3 bg-white rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-2">📍 Cabang Rute:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <span className="font-semibold">Cabang 1:</span> Telaga Golf → Taman Blok J → Hotel Grand Cakra</li>
                    <li>• <span className="font-semibold">Cabang 2:</span> Djoglo → Perempatan Kecil Tirtomoyo → Ixora Valley → <span className="font-bold text-blue-600">Kvadra (Kiri)</span></li>
                    <li>• <span className="font-semibold">Cabang 3:</span> Djoglo → M-House</li>
                  </ul>
                </div>
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

            {/* Footer Info */}
            <div className="bg-gray-800 text-white p-4">
              <div className="text-center text-sm">
                <p className="mb-1 font-semibold">
                  🚌 Gaskeunn Shuttle Bus Service - Area Araya, Malang
                </p>
                <p className="text-gray-400 text-xs">
                  Rute Biru • 18 Titik Jemput • BINUS di Kanan, Kvadra di Kiri
                </p>
              </div>
            </div>
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

export default RealBusRouteMap;