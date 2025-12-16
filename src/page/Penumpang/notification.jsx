import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

import {
  ArrowLeft,
  Bell,
  Bus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Megaphone,
  Ticket,
  Trash2,
  Check,
} from "lucide-react";

function Notification() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "Booking Berhasil!",
      message: "Tiket shuttle Anda untuk tanggal 19 Desember 2025 telah dikonfirmasi. Bus 1, Kursi 12.",
      time: "5 menit yang lalu",
      date: "16 Des 2025",
      isRead: false,
      icon: "ticket",
    },
    {
      id: 2,
      type: "reminder",
      title: "Pengingat Keberangkatan",
      message: "Shuttle Anda akan berangkat dalam 30 menit dari Perempatan Tirtomoyo Security. Jangan sampai ketinggalan!",
      time: "30 menit yang lalu",
      date: "16 Des 2025",
      isRead: false,
      icon: "clock",
    },
    {
      id: 3,
      type: "announcement",
      title: "Jadwal Baru Tersedia",
      message: "Jadwal shuttle untuk bulan Januari 2026 telah tersedia. Silakan cek dan booking sekarang!",
      time: "2 jam yang lalu",
      date: "16 Des 2025",
      isRead: false,
      icon: "megaphone",
    },
    {
      id: 4,
      type: "tracking",
      title: "Bus Dalam Perjalanan",
      message: "Bus 1 sedang menuju titik penjemputan Anda. Estimasi tiba: 5 menit lagi.",
      time: "3 jam yang lalu",
      date: "16 Des 2025",
      isRead: true,
      icon: "bus",
    },
    {
      id: 5,
      type: "info",
      title: "Tips Perjalanan",
      message: "Pastikan Anda sudah berada di titik penjemputan 10 menit sebelum jadwal keberangkatan untuk menghindari keterlambatan.",
      time: "5 jam yang lalu",
      date: "16 Des 2025",
      isRead: true,
      icon: "info",
    },
    {
      id: 6,
      type: "success",
      title: "Perjalanan Selesai",
      message: "Terima kasih telah menggunakan Gaskeunn! Perjalanan Anda dari Araya ke BINUS University telah selesai.",
      time: "1 hari yang lalu",
      date: "15 Des 2025",
      isRead: true,
      icon: "check",
    },
    {
      id: 7,
      type: "announcement",
      title: "Promo Akhir Tahun!",
      message: "Dapatkan diskon 20% untuk booking shuttle selama periode 20-31 Desember 2025. Gunakan kode: NEWYEAR20",
      time: "2 hari yang lalu",
      date: "14 Des 2025",
      isRead: true,
      icon: "megaphone",
    },
    {
      id: 8,
      type: "alert",
      title: "Perubahan Rute Sementara",
      message: "Rute via Jl. Telaga Golf akan dialihkan sementara karena perbaikan jalan. Mohon perhatikan titik penjemputan alternatif.",
      time: "3 hari yang lalu",
      date: "13 Des 2025",
      isRead: true,
      icon: "alert",
    },
  ]);

  const getIcon = (iconType) => {
    switch (iconType) {
      case "ticket":
        return <Ticket className="w-5 h-5" />;
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "megaphone":
        return <Megaphone className="w-5 h-5" />;
      case "bus":
        return <Bus className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      case "check":
        return <CheckCircle className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-green-100 text-green-600";
      case "reminder":
        return "bg-orange-100 text-orange-600";
      case "announcement":
        return "bg-blue-100 text-[oklch(0.6155_0.1314_243.17)]";
      case "tracking":
        return "bg-purple-100 text-purple-600";
      case "info":
        return "bg-gray-100 text-gray-600";
      case "success":
        return "bg-emerald-100 text-emerald-600";
      case "alert":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filterOptions = [
    { key: "all", label: "Semua", count: notifications.length },
    { key: "unread", label: "Belum Dibaca", count: notifications.filter(n => !n.isRead).length },
    { key: "booking", label: "Booking", count: notifications.filter(n => n.type === "booking").length },
    { key: "announcement", label: "Pengumuman", count: notifications.filter(n => n.type === "announcement").length },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notif.isRead;
    return notif.type === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notif) => {
    const date = notif.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notif);
    return groups;
  }, {});

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
        <Navbar />

        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-linear-to-r from-[oklch(0.6155_0.1314_243.17)] to-[oklch(0.7_0.12_243.17)] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6">
              {/* Back Button and Title */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Kembali"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">Notifikasi</h1>
                  <p className="text-white/80 text-sm">
                    {unreadCount > 0 
                      ? `${unreadCount} notifikasi belum dibaca` 
                      : "Semua notifikasi sudah dibaca"}
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeFilter === filter.key
                        ? "bg-white text-[oklch(0.6155_0.1314_243.17)]"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        activeFilter === filter.key
                          ? "bg-[oklch(0.6155_0.1314_243.17)] text-white"
                          : "bg-white/30"
                      }`}>
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          {unreadCount > 0 && (
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm text-[oklch(0.6155_0.1314_243.17)] hover:text-[oklch(0.55_0.14_243.17)] font-medium transition-colors"
              >
                <Check className="w-4 h-4" />
                Tandai semua sudah dibaca
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-8">
            {filteredNotifications.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center mt-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Tidak ada notifikasi
                </h3>
                <p className="text-gray-500 text-sm">
                  {activeFilter === "unread" 
                    ? "Semua notifikasi sudah dibaca"
                    : "Belum ada notifikasi untuk kategori ini"}
                </p>
              </div>
            ) : (
              /* Grouped Notifications */
              Object.entries(groupedNotifications).map(([date, notifs]) => (
                <div key={date} className="mb-6">
                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">{date}</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  {/* Notification Cards */}
                  <div className="space-y-3">
                    {notifs.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                          !notif.isRead ? "border-l-4 border-[oklch(0.6155_0.1314_243.17)]" : ""
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getIconBgColor(notif.type)}`}>
                            {getIcon(notif.icon)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className={`font-semibold text-gray-900 ${!notif.isRead ? "text-[oklch(0.6155_0.1314_243.17)]" : ""}`}>
                                {notif.title}
                              </h3>
                              <div className="flex items-center gap-2 shrink-0">
                                {!notif.isRead && (
                                  <span className="w-2 h-2 bg-[oklch(0.6155_0.1314_243.17)] rounded-full"></span>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notif.id);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                  aria-label="Hapus notifikasi"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notif.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{notif.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Spacing for Mobile */}
          <div className="h-8"></div>
        </div>
      </div>
    </>
  );
}

export default Notification;