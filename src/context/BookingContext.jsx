import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // ✅ ADD: Track current user email to detect changes
  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.email || null;
      }
    } catch (error) {
      console.error('Error reading user email:', error);
    }
    return null;
  });

  // Listen for localStorage changes and update currentUserEmail
  useEffect(() => {
    const checkUserChange = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const newEmail = user.email || null;
          if (newEmail !== currentUserEmail) {
            console.log(`👤 User email changed: ${currentUserEmail} → ${newEmail}`);
            setCurrentUserEmail(newEmail);
          }
        } else {
          // User logged out
          if (currentUserEmail !== null) {
            console.log(`👤 User logged out (was: ${currentUserEmail})`);
            setCurrentUserEmail(null);
          }
        }
      } catch (error) {
        console.error('Error checking user change:', error);
      }
    };

    // Check every 100ms for user changes (logout/login)
    const interval = setInterval(checkUserChange, 100);
    
    // Also listen to storage events (for changes from other tabs)
    window.addEventListener('storage', checkUserChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkUserChange);
    };
  }, [currentUserEmail]);

  // Get user data from localStorage with proper fallback
  const getCurrentUser = useCallback(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          email: user.email || null,
          fullName: user.fullName || user.displayName || user.name || 'Guest',
          binusianId: user.profile?.academic?.binusianId || user.binusianId || '-',
          nim: user.profile?.personal?.nim || user.nim || '-',
          program: user.profile?.academic?.program || user.program || '-',
        };
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
    return null;
  }, []);

  // FIXED: Use user-specific storage key ONLY
  const getStorageKey = useCallback(() => {
    const user = getCurrentUser();
    if (user && user.email) {
      return `gaskeunn_bookings_${user.email}`;
    }
    return 'gaskeunn_bookings_guest';
  }, [getCurrentUser]);

  // Initialize bookings
  const [bookings, setBookings] = useState([]);

  // ✅ CRITICAL FIX: Reset/Load bookings when currentUserEmail changes
  useEffect(() => {
    if (!currentUserEmail) {
      // User logged out - clear bookings
      console.log('🔄 User logged out - clearing bookings state');
      setBookings([]);
      return;
    }

    // User logged in - load their bookings
    const storageKey = `gaskeunn_bookings_${currentUserEmail}`;
    const savedBookings = localStorage.getItem(storageKey);
    const loadedBookings = savedBookings ? JSON.parse(savedBookings) : [];
    
    console.log(`🔄 User changed - reloading bookings for: ${currentUserEmail}`);
    console.log(`📦 Loaded ${loadedBookings.length} bookings`);
    
    setBookings(loadedBookings);
  }, [currentUserEmail]); // ← Re-run when user email changes!

  // Save to localStorage whenever bookings change
  useEffect(() => {
    if (!currentUserEmail) {
      console.warn('⚠️ Cannot save bookings: No user logged in');
      return;
    }

    const storageKey = `gaskeunn_bookings_${currentUserEmail}`;
    localStorage.setItem(storageKey, JSON.stringify(bookings));
    console.log(`💾 Saved ${bookings.length} bookings to ${storageKey}`);
  }, [bookings, currentUserEmail]);

  // Check and expire pending bookings + auto-complete ongoing bookings
  const checkBookingStatus = useCallback(() => {
    const now = new Date().getTime();
    setBookings(prev =>
      prev.map(booking => {
        if (booking.status === 'pending' && booking.paymentDeadline) {
          const deadline = new Date(booking.paymentDeadline).getTime();
          if (now > deadline) {
            return { ...booking, status: 'expired', hasBarcode: false };
          }
        }
        if (booking.status === 'ongoing' && booking.completionDeadline) {
          const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
          const departureTime = departureDateTime.getTime();
          
          if (now >= departureTime) {
            const deadline = new Date(booking.completionDeadline).getTime();
            if (now > deadline) {
              return { 
                ...booking, 
                status: 'completed', 
                hasBarcode: false,
                completedAt: new Date().toISOString(),
              };
            }
          }
        }
        return booking;
      })
    );
  }, []);

  useEffect(() => {
    checkBookingStatus();
    const interval = setInterval(checkBookingStatus, 10000);
    return () => clearInterval(interval);
  }, [checkBookingStatus]);

  const generateBookingCode = () => {
    const prefix = "GAS";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`.substring(0, 12);
  };

  const generateBusSeat = () => {
    const bus = Math.floor(Math.random() * 3) + 1;
    const seat = Math.floor(Math.random() * 20) + 1;
    return { bus, seat };
  };

  const calculateArrivalTime = (departureTime) => {
    const [hours, minutes] = departureTime.split(':').map(Number);
    let arrivalHours = hours + 1;
    let arrivalMinutes = minutes + 10;
    
    if (arrivalMinutes >= 60) {
      arrivalHours += 1;
      arrivalMinutes -= 60;
    }
    
    return `${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes.toString().padStart(2, '0')}`;
  };

  const parseDepartureDateTime = (dateStr, timeStr) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const dateParts = dateStr.split(' ');
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1]];
    const year = parseInt(dateParts[2]);
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    return new Date(year, month, day, hours, minutes || 0, 0, 0);
  };

  const calculateCompletionDeadline = (departureDate, departureTime) => {
    const departureDateTime = parseDepartureDateTime(departureDate, departureTime);
    return new Date(departureDateTime.getTime() + 10 * 60 * 1000).toISOString();
  };

  const createBooking = (bookingData) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser || !currentUser.email) {
      console.error('❌ Cannot create booking: User not logged in');
      throw new Error('User must be logged in to create booking');
    }
    
    const { bus, seat } = generateBusSeat();
    const bookingCode = generateBookingCode();
    const payNow = bookingData.payNow !== false;
    
    const paymentDeadline = !payNow 
      ? new Date(Date.now() + 10 * 60 * 1000).toISOString() 
      : null;
    
    const completionDeadline = payNow 
      ? calculateCompletionDeadline(bookingData.departureDate, bookingData.departureTime)
      : null;
    
    const newBooking = {
      id: Date.now().toString(),
      bookingCode,
      userId: currentUser.email,
      userEmail: currentUser.email,
      status: payNow ? 'ongoing' : 'pending',
      departure: {
        time: bookingData.departureTime,
        date: bookingData.departureDate,
        location: bookingData.departure,
      },
      arrival: {
        time: calculateArrivalTime(bookingData.departureTime),
        date: bookingData.departureDate,
        location: bookingData.destination,
      },
      passenger: {
        name: currentUser.fullName,
        email: currentUser.email,
        binusianId: currentUser.binusianId,
        nim: currentUser.nim,
        program: currentUser.program,
      },
      bus,
      seat,
      duration: "70 min",
      stops: "3 stops",
      totalPrice: bookingData.totalPrice,
      paymentMethod: bookingData.paymentMethod,
      promoCode: bookingData.promoCode,
      hasBarcode: payNow,
      isPaid: payNow,
      paymentDeadline,
      completionDeadline,
      paidAt: payNow ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
    };

    console.log('✅ Creating booking for user:', currentUser.email);
    console.log('📋 Booking code:', bookingCode);
    console.log('🎫 Route:', `${bookingData.departure} → ${bookingData.destination}`);

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', hasBarcode: false }
          : booking
      )
    );
  };

  const cancelWithRefund = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => {
        if (booking.id === bookingId) {
          return { 
            ...booking, 
            status: 'refunded', 
            hasBarcode: false,
            refundedAt: new Date().toISOString(),
            refundAmount: booking.totalPrice,
          };
        }
        return booking;
      })
    );
  };

  const completeBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'completed', hasBarcode: false }
          : booking
      )
    );
  };

  const confirmPayment = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => {
        if (booking.id === bookingId) {
          const completionDeadline = calculateCompletionDeadline(
            booking.departure.date, 
            booking.departure.time
          );
          
          return { 
            ...booking, 
            status: 'ongoing', 
            hasBarcode: true, 
            isPaid: true,
            paidAt: new Date().toISOString(),
            paymentDeadline: null,
            completionDeadline,
          };
        }
        return booking;
      })
    );
  };

  const getRemainingPaymentTime = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.paymentDeadline || booking.status !== 'pending') {
      return 0;
    }
    const deadline = new Date(booking.paymentDeadline).getTime();
    const now = new Date().getTime();
    const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
    return remaining;
  };

  const getRemainingCompletionTime = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.completionDeadline || booking.status !== 'ongoing') {
      return 0;
    }
    
    const now = new Date().getTime();
    const deadline = new Date(booking.completionDeadline).getTime();
    
    const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
    const departureTime = departureDateTime.getTime();
    
    if (now < departureTime) {
      return -Math.floor((departureTime - now) / 1000);
    }
    
    const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
    return remaining;
  };

  const hasJourneyStarted = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || booking.status !== 'ongoing') {
      return false;
    }
    
    const now = new Date().getTime();
    const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
    return now >= departureDateTime.getTime();
  };

  const getTodayDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTodayTickets = () => {
    const todayString = getTodayDateString();
    return bookings.filter(booking => 
      booking.departure.date === todayString && 
      (booking.status === 'ongoing' || booking.status === 'pending')
    );
  };

  const getNextUpcomingTicket = () => {
    const todayString = getTodayDateString();
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todayTickets = bookings.filter(booking => 
      booking.departure.date === todayString && 
      (booking.status === 'ongoing' || booking.status === 'pending')
    );

    if (todayTickets.length === 0) return null;

    const getTimeInMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + (minutes || 0);
    };

    const sortedTickets = todayTickets.sort((a, b) => {
      const timeA = getTimeInMinutes(a.departure.time);
      const timeB = getTimeInMinutes(b.departure.time);
      return timeA - timeB;
    });

    let nextTicket = sortedTickets.find(ticket => {
      const departureMinutes = getTimeInMinutes(ticket.departure.time);
      return departureMinutes >= currentMinutes;
    });

    if (!nextTicket) {
      const ongoingTickets = sortedTickets.filter(t => t.status === 'ongoing');
      if (ongoingTickets.length > 0) {
        nextTicket = ongoingTickets[ongoingTickets.length - 1];
      } else {
        nextTicket = sortedTickets[0];
      }
    }

    return nextTicket;
  };

  const getAllTickets = () => {
    if (!currentUserEmail) {
      console.warn('⚠️ getAllTickets: No user logged in');
      return [];
    }
    
    console.log('🔍 getAllTickets for:', currentUserEmail);
    console.log('📦 Total bookings:', bookings.length);
    
    return bookings;
  };

  const getTicketsByStatus = (status) => {
    if (status === 'all') return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  const getTicketById = (ticketId) => {
    return bookings.find(booking => booking.id === ticketId);
  };

  const getBookingStats = () => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      ongoing: bookings.filter(b => b.status === 'ongoing').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      refunded: bookings.filter(b => b.status === 'refunded').length,
      expired: bookings.filter(b => b.status === 'expired').length,
    };
  };

  const clearAllBookings = () => {
    if (!currentUserEmail) {
      console.warn('⚠️ Cannot clear bookings: No user logged in');
      return;
    }
    
    const storageKey = `gaskeunn_bookings_${currentUserEmail}`;
    setBookings([]);
    localStorage.removeItem(storageKey);
    console.log('🗑️ Cleared all bookings for', currentUserEmail);
  };

  const value = {
    bookings,
    createBooking,
    cancelBooking,
    cancelWithRefund,
    completeBooking,
    confirmPayment,
    getRemainingPaymentTime,
    getRemainingCompletionTime,
    hasJourneyStarted,
    getTodayTickets,
    getNextUpcomingTicket,
    getAllTickets,
    getTicketsByStatus,
    getTicketById,
    getBookingStats,
    clearAllBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;