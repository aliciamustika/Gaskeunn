import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import GaskeunnLogo from "../../assets/img/Gaskeunn.png";
import BarcodeImage from "../../assets/img/QRIS.png";
import QrisImage from "../../assets/img/qris.png";
import { useBooking } from "../../context/BookingContext";

import {
  Calendar, Clock, CreditCard, X, Check, Package, ChevronLeft, ChevronRight, Monitor, MapPin,
  Phone, MessageCircle, Bus as BusIcon, CheckCircle, Navigation, Star, AlertTriangle, Timer,
  Wallet, RotateCcw, QrCode, Building2, AlertCircle, XCircle, RefreshCw
} from "lucide-react";

// Leaflet Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createBusIcon = () => L.divIcon({
  html: `<div style="background: oklch(0.805 0.1545 76.47); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg></div>`,
  className: "custom-bus-icon", iconSize: [36, 36], iconAnchor: [18, 18],
});

const createHalteIcon = (isStart = false) => L.divIcon({
  html: `<div style="background: ${isStart ? "#22c55e" : "oklch(0.805 0.1545 76.47)"}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
  className: "custom-halte-icon", iconSize: [24, 24], iconAnchor: [12, 12],
});

const AnimatedBusMarker = ({ route, progress }) => {
  const [position, setPosition] = useState(route[0]);
  useEffect(() => {
    if (route.length < 2) return;
    const totalDistance = route.reduce((acc, point, i) => i === 0 ? 0 : acc + Math.sqrt(Math.pow(point[0] - route[i-1][0], 2) + Math.pow(point[1] - route[i-1][1], 2)), 0);
    const targetDistance = totalDistance * (progress / 100);
    let currentDistance = 0;
    for (let i = 1; i < route.length; i++) {
      const segmentDistance = Math.sqrt(Math.pow(route[i][0] - route[i-1][0], 2) + Math.pow(route[i][1] - route[i-1][1], 2));
      if (currentDistance + segmentDistance >= targetDistance) {
        const ratio = (targetDistance - currentDistance) / segmentDistance;
        setPosition([route[i-1][0] + (route[i][0] - route[i-1][0]) * ratio, route[i-1][1] + (route[i][1] - route[i-1][1]) * ratio]);
        break;
      }
      currentDistance += segmentDistance;
    }
  }, [progress, route]);
  return <Marker position={position} icon={createBusIcon()} />;
};

// Countdown Timer Component
const CountdownTimer = ({ deadline, onExpire, variant = "payment", bookingId, getRemainingCompletionTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false); // waiting for departure
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (variant === "ongoing" && getRemainingCompletionTime && bookingId) {
        // Use the context function for ongoing tickets
        const remaining = getRemainingCompletionTime(bookingId);
        if (remaining < 0) {
          // Negative means waiting for departure
          setIsWaiting(true);
          setTimeLeft(Math.abs(remaining));
        } else {
          setIsWaiting(false);
          setTimeLeft(remaining);
          if (remaining === 0 && onExpire) onExpire();
        }
      } else {
        // Standard countdown for payment
        const now = new Date().getTime();
        const deadlineTime = new Date(deadline).getTime();
        const remaining = Math.max(0, Math.floor((deadlineTime - now) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0 && onExpire) onExpire();
      }
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [deadline, onExpire, variant, bookingId, getRemainingCompletionTime]);

  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      return `${hours}j ${mins}m`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isUrgent = !isWaiting && timeLeft < 120; // Less than 2 minutes

  // Different styles based on variant and state
  const getStyle = () => {
    if (variant === "ongoing") {
      if (isWaiting) {
        return 'bg-blue-100 text-blue-600'; // Waiting for departure
      }
      return isUrgent 
        ? 'bg-green-100 text-green-600 animate-pulse' 
        : 'bg-orange-100 text-orange-600';
    }
    // Default payment variant
    return isUrgent 
      ? 'bg-red-100 text-red-600 animate-pulse' 
      : 'bg-purple-100 text-purple-600';
  };

  const getIcon = () => {
    if (variant === "ongoing") {
      if (isWaiting) {
        return <Clock className="w-4 h-4" />; // Waiting icon
      }
      return <BusIcon className="w-4 h-4" />;
    }
    return <Timer className="w-4 h-4" />;
  };

  const getLabel = () => {
    if (variant === "ongoing" && isWaiting) {
      return `Berangkat dalam ${formatTime(timeLeft)}`;
    }
    return formatTime(timeLeft);
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${getStyle()}`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </div>
  );
};

function History() {
  const navigate = useNavigate();
  const { getAllTickets, cancelBooking, cancelWithRefund, confirmPayment, getRemainingPaymentTime, getRemainingCompletionTime, hasJourneyStarted } = useBooking();
  
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Tracking Popup State
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [selectedTicketForTracking, setSelectedTicketForTracking] = useState(null);
  const [busProgress, setBusProgress] = useState(25);
  const [trackingStatus, setTrackingStatus] = useState(1);

  // Modal States
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (showTrackingPopup && trackingStatus < 3) {
      const interval = setInterval(() => {
        setBusProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 50 && trackingStatus === 1) setTrackingStatus(2);
          if (newProgress >= 100) { setTrackingStatus(3); clearInterval(interval); return 100; }
          return newProgress;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showTrackingPopup, trackingStatus]);

  const driverData = { name: "Pak Budi Santoso", photo: "https://ui-avatars.com/api/?name=Budi+Santoso&background=3b82f6&color=fff&size=128", role: "Driver", rating: 4.9, phone: "+6281234567890", totalTrips: 1250, busNumber: "N 2007 LDK" };
  const routeCoordinates = [[-7.9368482258999595, 112.67512243871319], [-7.937506892617456, 112.65819299365303], [-7.938728078786892, 112.66125923921314], [-7.939326456906397, 112.68104383601565]];

  const handleTicketClick = (ticket) => { if (ticket.status === "ongoing") { setSelectedTicketForTracking(ticket); setShowTrackingPopup(true); setBusProgress(25); setTrackingStatus(1); } };
  const closeTrackingPopup = () => { setShowTrackingPopup(false); setSelectedTicketForTracking(null); setBusProgress(25); setTrackingStatus(1); };

  // Cancel handlers
  const handleCancelClick = (e, ticket) => { e.stopPropagation(); setSelectedTicket(ticket); setShowCancelModal(true); };
  const confirmCancel = () => { if (selectedTicket) { cancelBooking(selectedTicket.id); setShowCancelModal(false); setSelectedTicket(null); } };

  // Refund handlers
  const handleRefundClick = (e, ticket) => { e.stopPropagation(); setSelectedTicket(ticket); setShowRefundModal(true); };
  const confirmRefund = () => { if (selectedTicket) { cancelWithRefund(selectedTicket.id); setShowRefundModal(false); setSelectedTicket(null); } };

  // Payment handlers
  const handlePaymentClick = (e, ticket) => { e.stopPropagation(); setSelectedTicket(ticket); setSelectedPaymentMethod(""); setShowPaymentModal(true); };
  const confirmPaymentHandler = () => { if (selectedTicket && selectedPaymentMethod) { confirmPayment(selectedTicket.id); setShowPaymentModal(false); setSelectedTicket(null); setSelectedPaymentMethod(""); } };

  const statusFilters = ["All Status", "Pending Payment", "Ongoing", "Completed", "Cancelled", "Refunded", "Expired"];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const formatDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const isSameDay = (date1, date2) => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  const changeMonth = (increment) => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));

  const allTickets = getAllTickets();
  const mapStatusForFilter = (status) => ({ pending: "Pending Payment", ongoing: "Ongoing", completed: "Completed", cancelled: "Cancelled", refunded: "Refunded", expired: "Expired" }[status] || status);
  const filteredJourneys = allTickets.filter(ticket => selectedStatus === "All Status" || mapStatusForFilter(ticket.status) === selectedStatus);

  const getStatusStyle = (status) => ({ ongoing: "bg-white text-orange-600 border-orange-500", cancelled: "bg-white text-red-600 border-red-500", completed: "bg-white text-green-600 border-green-500", pending: "bg-white text-purple-600 border-purple-500", refunded: "bg-white text-blue-600 border-blue-500", expired: "bg-white text-gray-600 border-gray-500" }[status] || "bg-white text-gray-600 border-gray-500");
  const getStatusText = (status) => ({ ongoing: "Ongoing", cancelled: "Cancelled", completed: "Completed", pending: "Pending Payment", refunded: "Refunded", expired: "Expired" }[status] || status);

  // Cancel Modal (for unpaid tickets)
  const CancelModal = () => {
    if (!showCancelModal || !selectedTicket) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCancelModal(false)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-8 h-8 text-red-500" /></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Batalkan Tiket?</h3>
            <p className="text-gray-600 mb-6">Apakah kamu yakin ingin membatalkan tiket dengan kode <span className="font-bold">{selectedTicket.bookingCode}</span>?</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2"><span className="text-gray-500 text-sm">Rute</span><span className="font-semibold text-gray-900 text-sm">{selectedTicket.departure?.location} → {selectedTicket.arrival?.location}</span></div>
              <div className="flex justify-between items-center mb-2"><span className="text-gray-500 text-sm">Tanggal</span><span className="font-semibold text-gray-900 text-sm">{selectedTicket.departure?.date}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Waktu</span><span className="font-semibold text-gray-900 text-sm">{selectedTicket.departure?.time}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">Kembali</button>
              <button onClick={confirmCancel} className="flex-1 py-3 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition">Ya, Batalkan</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Refund Modal (for paid tickets)
  const RefundModal = () => {
    if (!showRefundModal || !selectedTicket) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRefundModal(false)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><RotateCcw className="w-8 h-8 text-blue-500" /></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ajukan Refund?</h3>
            <p className="text-gray-600 mb-4">Tiket kamu akan dibatalkan dan dana akan dikembalikan.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2"><span className="text-blue-700 text-sm">Kode Booking</span><span className="font-bold text-blue-900">{selectedTicket.bookingCode}</span></div>
              <div className="flex justify-between items-center"><span className="text-blue-700 text-sm">Jumlah Refund</span><span className="font-bold text-blue-900 text-lg">Rp {selectedTicket.totalPrice?.toLocaleString('id-ID')}</span></div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-left">
              <div className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" /><p className="text-xs text-yellow-700">Refund akan diproses dalam 1-3 hari kerja ke metode pembayaran asal.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowRefundModal(false)} className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">Batal</button>
              <button onClick={confirmRefund} className="flex-1 py-3 px-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4" />Proses Refund</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Payment Modal
  const PaymentModal = () => {
    if (!showPaymentModal || !selectedTicket) return null;
    const remainingTime = getRemainingPaymentTime(selectedTicket.id);
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
            <h3 className="text-xl font-bold text-gray-900">Bayar Tiket</h3>
            <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {remainingTime > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-700 font-medium">Sisa waktu pembayaran:</span>
                  <CountdownTimer deadline={selectedTicket.paymentDeadline} onExpire={() => setShowPaymentModal(false)} />
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Kode Booking</span><span className="font-bold text-gray-900">{selectedTicket.bookingCode}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Rute</span><span className="font-semibold text-gray-900 text-sm text-right">{selectedTicket.departure?.location} → {selectedTicket.arrival?.location}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Tanggal</span><span className="font-semibold text-gray-900">{selectedTicket.departure?.date}</span></div>
              <div className="border-t border-gray-200 pt-3 mt-3"><div className="flex justify-between items-center"><span className="text-gray-700 font-medium">Total Bayar</span><span className="font-bold text-xl text-[oklch(0.6155_0.1314_243.17)]">Rp {selectedTicket.totalPrice?.toLocaleString('id-ID')}</span></div></div>
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3">Pilih Metode Pembayaran</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => setSelectedPaymentMethod("qris")} className={`p-4 rounded-xl border-2 transition-all ${selectedPaymentMethod === "qris" ? "border-[oklch(0.6155_0.1314_243.17)] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                <QrCode className={`w-8 h-8 mx-auto mb-2 ${selectedPaymentMethod === "qris" ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-400"}`} />
                <p className={`text-sm font-semibold ${selectedPaymentMethod === "qris" ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-700"}`}>QRIS</p>
              </button>
              <button onClick={() => setSelectedPaymentMethod("transfer")} className={`p-4 rounded-xl border-2 transition-all ${selectedPaymentMethod === "transfer" ? "border-[oklch(0.6155_0.1314_243.17)] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${selectedPaymentMethod === "transfer" ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-400"}`} />
                <p className={`text-sm font-semibold ${selectedPaymentMethod === "transfer" ? "text-[oklch(0.6155_0.1314_243.17)]" : "text-gray-700"}`}>Transfer Bank</p>
              </button>
            </div>

            {selectedPaymentMethod === "qris" && (
              <div className="border-2 border-[oklch(0.6155_0.1314_243.17)] rounded-xl p-4 mb-4">
                <p className="text-center text-sm font-bold text-gray-900 mb-3">Scan QRIS untuk Pembayaran</p>
                <div className="flex justify-center"><img src={QrisImage} alt="QRIS" className="w-48 h-48 object-contain" /></div>
              </div>
            )}

            {selectedPaymentMethod === "transfer" && (
              <div className="border-2 border-[oklch(0.6155_0.1314_243.17)] rounded-xl p-4 mb-4 space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">Bank</p><p className="text-sm font-bold">Bank Central Asia (BCA)</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">No. Rekening</p><p className="text-lg font-mono font-bold">1234567890</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-xs text-gray-600">Atas Nama</p><p className="text-sm font-bold">PT Gaskeunn Transportation</p></div>
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className="p-5 border-t border-gray-100 shrink-0">
            <button onClick={confirmPaymentHandler} disabled={!selectedPaymentMethod} className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${selectedPaymentMethod ? "bg-gradient-to-r from-[#2B8CCD] to-[#83B1D1] text-white hover:opacity-90" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
              <Wallet className="w-5 h-5" />Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tracking Popup
  const TrackingPopup = () => {
    if (!showTrackingPopup || !selectedTicketForTracking) return null;
    const statusSteps = [
      { id: 1, title: "Sopir menuju lokasi kamu", icon: Navigation, description: "Bus sedang dalam perjalanan ke halte jemput" },
      { id: 2, title: "Kamu sedang dalam perjalanan", icon: BusIcon, description: "Nikmati perjalananmu dengan nyaman" },
      { id: 3, title: "Kamu sudah sampai tujuan", icon: CheckCircle, description: "Terima kasih telah menggunakan Gaskeunn" },
    ];
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeTrackingPopup}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-[oklch(0.805_0.1545_76.47)] to-[oklch(0.85_0.15_85)] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto brightness-0 invert" />
              <div><h2 className="text-white font-bold text-lg">Live Tracking</h2><p className="text-white/80 text-sm">Bus {selectedTicketForTracking?.bus} • {selectedTicketForTracking?.bookingCode}</p></div>
            </div>
            <button onClick={closeTrackingPopup} className="text-white hover:bg-white/20 p-2 rounded-full transition"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />Real-Time Location</h3>
                <div className="h-80 rounded-2xl overflow-hidden border-2 border-gray-200">
                  <MapContainer center={[-7.938, 112.67]} zoom={14} style={{ height: "100%", width: "100%" }}>
                    <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline positions={routeCoordinates} color="#e0a82e" weight={4} opacity={0.8} dashArray="10, 10" />
                    <Marker position={routeCoordinates[0]} icon={createHalteIcon(true)}><Popup><p className="font-bold text-green-600">Halte Jemput</p></Popup></Marker>
                    <Marker position={routeCoordinates[routeCoordinates.length - 1]} icon={createHalteIcon(false)}><Popup><p className="font-bold text-orange-600">Tujuan</p></Popup></Marker>
                    <AnimatedBusMarker route={routeCoordinates} progress={busProgress} />
                  </MapContainer>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{selectedTicketForTracking?.departure?.location}</span><span>{selectedTicketForTracking?.arrival?.location}</span></div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${trackingStatus === 3 ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-[oklch(0.805_0.1545_76.47)] to-[oklch(0.85_0.15_85)]"}`} style={{ width: `${busProgress}%` }}></div></div>
                  <p className="text-center text-sm text-gray-500 mt-2">{trackingStatus === 3 ? <span className="font-semibold text-green-600">🎉 Kamu sudah sampai!</span> : <>Estimasi: <span className="font-semibold">{Math.max(1, Math.round((100 - busProgress) / 10))} menit</span></>}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-[oklch(0.805_0.1545_76.47)]" />Status Perjalanan</h3>
                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const isActive = trackingStatus === step.id, isCompleted = trackingStatus > step.id, isFinal = trackingStatus === 3 && step.id === 3;
                      const StepIcon = step.icon;
                      return (
                        <div key={step.id} className="flex gap-4 text-left">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted || isFinal ? "bg-green-500" : isActive ? "bg-[oklch(0.805_0.1545_76.47)] animate-pulse" : "bg-gray-200"}`}>{isCompleted || isFinal ? <Check className="w-5 h-5 text-white" /> : <StepIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />}</div>
                            {index < statusSteps.length - 1 && <div className={`w-0.5 h-12 mt-2 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`}></div>}
                          </div>
                          <div className={`flex-1 pb-4 ${isActive || isFinal ? "" : "opacity-60"}`}>
                            <p className={`font-semibold ${isFinal ? "text-green-600" : isActive ? "text-[oklch(0.805_0.1545_76.47)]" : isCompleted ? "text-green-600" : "text-gray-600"}`}>{step.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200 text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Informasi Driver</h3>
                  <div className="flex items-start gap-4">
                    <div className="relative"><img src={driverData.photo} alt={driverData.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" /><div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{driverData.name}</h4>
                      <p className="text-gray-500 text-sm">{driverData.role}</p>
                      <div className="flex items-center gap-1 mt-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="font-semibold text-gray-900">{driverData.rating}</span><span className="text-gray-400 text-sm">• {driverData.totalTrips} trips</span></div>
                      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-[oklch(0.94_0.08_85)] rounded-full"><BusIcon className="w-4 h-4 text-[oklch(0.65_0.15_76.47)]" /><span className="text-sm font-semibold text-[oklch(0.65_0.15_76.47)]">{driverData.busNumber}</span></div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => window.open(`tel:${driverData.phone}`, '_self')} className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-green-500/30"><Phone className="w-5 h-5" />Call</button>
                    <button onClick={() => window.open(`https://wa.me/${driverData.phone.replace('+', '')}`, '_blank')} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-500/30"><MessageCircle className="w-5 h-5" />Message</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TrackingPopup />
      <CancelModal />
      <RefundModal />
      <PaymentModal />

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white text-left">Your Journey Records, All in One Place.</h1>
            <p className="text-white/80 mt-2 text-lg text-left">Total {allTickets.length} perjalanan tercatat</p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Select Status</h3>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((status) => (
                  <button key={status} onClick={() => setSelectedStatus(status)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedStatus === status ? "bg-orange-500 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"}`}>{status}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Select Date</h3>
              <div className="relative">
                <div onClick={() => setShowCalendar(!showCalendar)} className="w-full px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 bg-white flex items-center justify-between">
                  <span className="text-gray-900">{formatDate(selectedDate)}</span><Calendar className="w-5 h-5 text-orange-500" />
                </div>
                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-full md:w-80">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                      <span className="font-bold text-gray-900">{currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                      <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (<div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>))}</div>
                    <div className="grid grid-cols-7 gap-1">{getDaysInMonth(currentMonth).map((day, index) => (<button key={index} onClick={() => { if (day) { setSelectedDate(day); setShowCalendar(false); } }} disabled={!day} className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${!day ? "invisible" : ""} ${day && isSameDay(day, selectedDate) ? "bg-orange-500 text-white font-bold" : day && isSameDay(day, new Date()) ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100 text-gray-700"}`}>{day ? day.getDate() : ""}</button>))}</div>
                    <button onClick={() => { setSelectedDate(new Date()); setCurrentMonth(new Date()); setShowCalendar(false); }} className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold">Today</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredJourneys.map((journey) => (
              <div key={journey.id} className="flex gap-4">
                <div className={`flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow ${journey.status === "ongoing" ? "cursor-pointer" : ""}`} onClick={() => handleTicketClick(journey)}>
                  <div className="flex">
                    <div className="flex-1 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <img src={GaskeunnLogo} alt="Gaskeunn" className="h-8 w-auto" />
                        {journey.status === "pending" && journey.paymentDeadline && (
                          <CountdownTimer deadline={journey.paymentDeadline} />
                        )}
                        {journey.status === "ongoing" && journey.completionDeadline && (
                          <CountdownTimer 
                            deadline={journey.completionDeadline} 
                            variant="ongoing" 
                            bookingId={journey.id}
                            getRemainingCompletionTime={getRemainingCompletionTime}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-left"><div className="text-gray-400 text-xs mb-1">Departure</div><div className="text-2xl font-bold text-gray-900">{journey.departure?.time}</div><div className="text-sm text-gray-600">{journey.departure?.date}</div><div className="text-sm text-gray-500">{journey.departure?.location}</div></div>
                        <div className="flex flex-col items-center px-4"><div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-full"></div><div className="w-16 h-0.5 border-t-2 border-dashed border-gray-300"></div><div className="w-2 h-2 bg-orange-400 rounded-full"></div></div><div className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1">{journey.duration}</div><div className="text-gray-400 text-xs mt-0.5">{journey.stops}</div></div>
                        <div className="text-left"><div className="text-gray-400 text-xs mb-1">Destination</div><div className="text-2xl font-bold text-gray-900">{journey.arrival?.time}</div><div className="text-sm text-gray-600">{journey.arrival?.date}</div><div className="text-sm text-gray-500">{journey.arrival?.location}</div></div>
                      </div>
                      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2 text-gray-500 flex-1"><Monitor size={16} className="mt-0.5 shrink-0" /><span className="text-xs leading-tight">Show e-tickets during check-in.</span></div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="flex items-start gap-2 text-gray-500 flex-1"><Clock size={16} className="mt-0.5 shrink-0" /><span className="text-xs leading-tight">Be at boarding gate 30 min before.</span></div>
                      </div>
                      {journey.status === "ongoing" && (<div className="mt-4 flex items-center justify-center gap-2 text-orange-500 animate-pulse"><MapPin size={16} /><span className="text-sm font-medium">Klik untuk Live Tracking</span></div>)}
                    </div>
                    <div className="relative"><div className="absolute top-4 bottom-4 w-px border-l-2 border-dashed border-yellow-400"></div><div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div><div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full"></div></div>
                    <div className="w-96 p-5 bg-white">
                      <div className="flex justify-end mb-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(journey.status)}`}>{getStatusText(journey.status)}</span></div>
                      <div className="space-y-4 mb-4">
                        <div className="grid grid-cols-2 gap-x-8"><div className="text-left"><div className="text-gray-400 text-xs mb-1">Name</div><div className="text-gray-900 font-semibold text-sm truncate">{journey.passenger?.name}</div></div><div className="text-left"><div className="text-gray-400 text-xs mb-1">Email</div><div className="text-gray-900 font-semibold text-sm truncate">{journey.passenger?.email}</div></div></div>
                        <div className="grid grid-cols-2 gap-x-8"><div className="text-left"><div className="text-gray-400 text-xs mb-1">BINUSIAN ID</div><div className="text-gray-900 font-semibold text-sm">{journey.passenger?.binusianId}</div></div><div className="text-left"><div className="text-gray-400 text-xs mb-1">NIM</div><div className="text-gray-900 font-semibold text-sm">{journey.passenger?.nim}</div></div></div>
                      </div>
                      <div className="flex items-center justify-center gap-8 pt-3 border-t border-gray-100"><div className="text-center bg-gray-50 rounded-lg px-8 py-2"><div className="text-gray-400 text-xs mb-1">Bus</div><div className="text-gray-900 font-bold text-2xl">{journey.bus}</div></div><div className="text-center bg-gray-50 rounded-lg px-8 py-2"><div className="text-gray-400 text-xs mb-1">Seat</div><div className="text-gray-900 font-bold text-2xl">{journey.seat}</div></div></div>
                    </div>
                  </div>
                </div>

                <div className="w-44 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center border border-gray-100">
                  {journey.status === "ongoing" && journey.bookingCode ? (
                    <>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">BARCODE</h3>
                      <img src={BarcodeImage} alt="Barcode" className="w-24 h-24 object-contain mb-2" />
                      <div className="text-center mb-2"><div className="text-gray-400 text-xs mb-0.5">Booking code</div><div className="text-gray-900 font-bold text-xs">{journey.bookingCode}</div></div>
                      <button onClick={(e) => handleRefundClick(e, journey)} className="text-blue-500 text-xs hover:text-blue-600 hover:underline font-medium flex items-center gap-1"><RotateCcw className="w-3 h-3" />Cancel & Refund</button>
                    </>
                  ) : journey.status === "cancelled" ? (
                    <><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3"><X className="w-8 h-8 text-red-500" /></div><div className="text-xs text-gray-500 text-center">Booking<br />Cancelled</div></>
                  ) : journey.status === "completed" ? (
                    <><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3"><Check className="w-8 h-8 text-green-500" /></div><div className="text-xs text-gray-500 text-center">Journey<br />Completed</div></>
                  ) : journey.status === "refunded" ? (
                    <><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3"><RotateCcw className="w-8 h-8 text-blue-500" /></div><div className="text-xs text-gray-500 text-center mb-1">Refunded</div><div className="text-xs text-blue-600 font-semibold">Rp {journey.totalPrice?.toLocaleString('id-ID')}</div></>
                  ) : journey.status === "expired" ? (
                    <><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3"><XCircle className="w-8 h-8 text-gray-500" /></div><div className="text-xs text-gray-500 text-center">Payment<br />Expired</div></>
                  ) : journey.status === "pending" ? (
                    <>
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3"><CreditCard className="w-8 h-8 text-purple-500" /></div>
                      <div className="text-xs text-gray-500 text-center mb-1">Awaiting<br />Payment</div>
                      <div className="text-sm font-bold text-purple-600 mb-2">Rp {journey.totalPrice?.toLocaleString('id-ID')}</div>
                      <button onClick={(e) => handlePaymentClick(e, journey)} className="w-full px-3 py-2 bg-purple-500 text-white text-xs font-semibold rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-1 mb-2"><Wallet className="w-3 h-3" />Bayar Sekarang</button>
                      <button onClick={(e) => handleCancelClick(e, journey)} className="text-red-500 text-xs hover:text-red-600 hover:underline font-medium">Batalkan</button>
                    </>
                  ) : (
                    <><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3"><Package className="w-8 h-8 text-gray-400" /></div><div className="text-xs text-gray-500 text-center">No barcode</div></>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredJourneys.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada perjalanan</h3>
              <p className="text-gray-500 mb-6">{selectedStatus === "All Status" ? "Kamu belum memiliki riwayat perjalanan." : `Tidak ada perjalanan dengan status "${selectedStatus}".`}</p>
              <button onClick={() => navigate('/booking')} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg">Book Ticket Sekarang</button>
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