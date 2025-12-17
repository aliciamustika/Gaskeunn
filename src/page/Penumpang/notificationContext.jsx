import React, { createContext, useContext, useState } from 'react';

// Data notifikasi awal
const initialNotifications = [
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
];

// Buat Context
const NotificationContext = createContext();

// Provider Component
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(initialNotifications);

    // Hitung jumlah notifikasi yang belum dibaca
    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Tandai satu notifikasi sebagai sudah dibaca
    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    // Tandai semua notifikasi sebagai sudah dibaca
    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    // Hapus notifikasi
    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    // Tambah notifikasi baru
    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const value = {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

// Custom Hook untuk menggunakan NotificationContext
export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}

export default NotificationContext;