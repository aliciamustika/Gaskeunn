// context/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  BOOKINGS: 'gaskeunn_bookings',
  PASSENGERS: 'gaskeunn_passengers',
  TRANSACTIONS: 'gaskeunn_transactions'
};

// Generate unique booking code
const generateBookingCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'GSK';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Generate random seat number
const generateSeatNumber = () => {
  return Math.floor(Math.random() * 40) + 1;
};

// Generate random bus number
const generateBusNumber = () => {
  return Math.floor(Math.random() * 3) + 1;
};

// Get arrival time based on departure time
const getArrivalTime = (departureTime) => {
  const timeMap = {
    "6:00": "7:10",
    "8:00": "9:10",
    "10:00": "11:10",
    "12:00": "13:10",
    "14:00": "15:10",
    "16:00": "17:10",
  };
  return timeMap[departureTime] || "7:10";
};

// Format time to 12-hour format
const formatTimeTo12Hour = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes || '00'} ${ampm}`;
};

// Parse date string to Date object
const parseDate = (dateStr) => {
  // Handle format: "19 December 2025"
  const months = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
};

// Check if date is today
const isToday = (dateStr) => {
  const ticketDate = parseDate(dateStr);
  const today = new Date();
  return ticketDate.getDate() === today.getDate() &&
         ticketDate.getMonth() === today.getMonth() &&
         ticketDate.getFullYear() === today.getFullYear();
};

// Check if date is in the past
const isPastDate = (dateStr) => {
  const ticketDate = parseDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  ticketDate.setHours(0, 0, 0, 0);
  return ticketDate < today;
};

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Load user info
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  // Save bookings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    
    // Also update transactions for admin dashboard
    updateTransactionsForAdmin(bookings);
  }, [bookings]);

  // ============================================
  // SYNC DATA TO ADMIN DASHBOARD
  // ============================================
  const updateTransactionsForAdmin = (bookingsList) => {
    const transactions = bookingsList.map(booking => ({
      id: booking.id,
      bookingCode: booking.bookingCode,
      passengerName: booking.passenger.name,
      passengerEmail: booking.passenger.email,
      passengerNim: booking.passenger.nim,
      passengerBinusianId: booking.passenger.binusianId,
      departure: booking.departure,
      arrival: booking.arrival,
      bus: booking.bus,
      seat: booking.seat,
      status: booking.status,
      totalPrice: booking.totalPrice,
      paymentMethod: booking.paymentMethod,
      promoCode: booking.promoCode,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }));
    
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  };

  // Create new booking
  const createBooking = (bookingData) => {
    const user = JSON.parse(localStorage.getItem('user')) || {
      name: 'Ni Putu Saraswati',
      email: 'ni.saraswati@binus.ac.id',
      nim: '2902654051',
      binusianId: 'BN138092583'
    };

    const newBooking = {
      id: Date.now(),
      bookingCode: generateBookingCode(),
      status: 'ongoing', // ongoing, completed, cancelled, pending
      
      // Journey details
      departure: {
        time: formatTimeTo12Hour(bookingData.departureTime),
        date: bookingData.departureDate,
        location: bookingData.departure
      },
      arrival: {
        time: formatTimeTo12Hour(getArrivalTime(bookingData.departureTime)),
        date: bookingData.departureDate,
        location: bookingData.destination
      },
      
      // Passenger info
      passenger: {
        name: user.name || 'Ni Putu Saraswati',
        email: user.email || 'ni.saraswati@binus.ac.id',
        binusianId: user.binusianId || 'BN138092583',
        nim: user.nim || '2902654051'
      },
      
      // Seat info
      bus: generateBusNumber(),
      seat: generateSeatNumber(),
      
      // Additional info
      duration: '70 min',
      stops: '2 stops',
      hasBarcode: true,
      
      // Payment info
      totalPrice: bookingData.totalPrice || 5000,
      paymentMethod: bookingData.paymentMethod || 'qris',
      promoCode: bookingData.promoCode || null,
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled', hasBarcode: false, updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  // Complete booking (after journey is done)
  const completeBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'completed', hasBarcode: false, updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  // Get today's tickets (for Home - My Tickets section)
  const getTodayTickets = () => {
    return bookings.filter(booking => 
      isToday(booking.departure.date) && 
      (booking.status === 'ongoing' || booking.status === 'pending')
    );
  };

  // Get all tickets (for History)
  const getAllTickets = () => {
    // Auto-complete past tickets
    const updatedBookings = bookings.map(booking => {
      if (isPastDate(booking.departure.date) && booking.status === 'ongoing') {
        return { ...booking, status: 'completed', hasBarcode: false };
      }
      return booking;
    });

    // Update if there are changes
    if (JSON.stringify(updatedBookings) !== JSON.stringify(bookings)) {
      setBookings(updatedBookings);
    }

    return updatedBookings;
  };

  // Get booking by ID
  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === parseInt(bookingId));
  };

  // Filter tickets by status
  const getTicketsByStatus = (status) => {
    if (status === 'all') return getAllTickets();
    return getAllTickets().filter(booking => booking.status === status);
  };

  // Clear all bookings (for testing)
  const clearAllBookings = () => {
    setBookings([]);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  };

  // ============================================
  // ADMIN FUNCTIONS
  // ============================================
  
  // Get all transactions for admin
  const getAdminTransactions = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : [];
  };

  // Get transaction statistics for admin dashboard
  const getTransactionStats = () => {
    const allBookings = getAllTickets();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayBookings = allBookings.filter(b => {
      const bookingDate = parseDate(b.departure.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    });

    const totalRevenue = allBookings
      .filter(b => b.status === 'completed' || b.status === 'ongoing')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const todayRevenue = todayBookings
      .filter(b => b.status === 'completed' || b.status === 'ongoing')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    return {
      totalBookings: allBookings.length,
      todayBookings: todayBookings.length,
      completedBookings: allBookings.filter(b => b.status === 'completed').length,
      ongoingBookings: allBookings.filter(b => b.status === 'ongoing').length,
      cancelledBookings: allBookings.filter(b => b.status === 'cancelled').length,
      pendingBookings: allBookings.filter(b => b.status === 'pending').length,
      totalRevenue,
      todayRevenue
    };
  };

  // Update booking status (for admin)
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus, hasBarcode: newStatus === 'ongoing', updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  // Get bookings by date range (for admin reports)
  const getBookingsByDateRange = (startDate, endDate) => {
    return getAllTickets().filter(booking => {
      const bookingDate = parseDate(booking.departure.date);
      return bookingDate >= startDate && bookingDate <= endDate;
    });
  };

  // Get popular routes (for admin analytics)
  const getPopularRoutes = () => {
    const allBookings = getAllTickets();
    const routeCount = {};
    
    allBookings.forEach(booking => {
      const route = `${booking.departure.location} → ${booking.arrival.location}`;
      routeCount[route] = (routeCount[route] || 0) + 1;
    });

    return Object.entries(routeCount)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count);
  };

  const value = {
    bookings,
    createBooking,
    cancelBooking,
    completeBooking,
    getTodayTickets,
    getAllTickets,
    getBookingById,
    getTicketsByStatus,
    clearAllBookings,
    isToday,
    isPastDate,
    // Admin functions
    getAdminTransactions,
    getTransactionStats,
    updateBookingStatus,
    getBookingsByDateRange,
    getPopularRoutes
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook to use booking context
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export default BookingContext;