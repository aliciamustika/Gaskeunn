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
  // Initialize bookings from localStorage or empty array
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('gaskeunn_bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // Save to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('gaskeunn_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Check and expire pending bookings + auto-complete ongoing bookings
  const checkBookingStatus = useCallback(() => {
    const now = new Date().getTime();
    setBookings(prev => 
      prev.map(booking => {
        // Auto-expire pending bookings after payment deadline
        if (booking.status === 'pending' && booking.paymentDeadline) {
          const deadline = new Date(booking.paymentDeadline).getTime();
          if (now > deadline) {
            return { ...booking, status: 'expired', hasBarcode: false };
          }
        }
        // Auto-complete ongoing bookings after completion deadline
        // Only if the journey has actually started (current time >= departure time)
        if (booking.status === 'ongoing' && booking.completionDeadline) {
          // Parse departure time
          const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
          const departureTime = departureDateTime.getTime();
          
          // Only check completion if journey has started
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

  // Check booking status every 10 seconds
  useEffect(() => {
    checkBookingStatus();
    const interval = setInterval(checkBookingStatus, 10000);
    return () => clearInterval(interval);
  }, [checkBookingStatus]);

  // Get user data from localStorage
  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return {
      name: user.name || "Ni Putu Saraswati",
      email: user.email || "ni.saraswati@binus.ac.id",
      binusianId: user.binusianId || "BN138092583",
      nim: user.nim || "2902654051",
    };
  };

  // Generate booking code
  const generateBookingCode = () => {
    const prefix = "GAS";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`.substring(0, 12);
  };

  // Generate random bus and seat
  const generateBusSeat = () => {
    const bus = Math.floor(Math.random() * 3) + 1;
    const seat = Math.floor(Math.random() * 20) + 1;
    return { bus, seat };
  };

  // Calculate arrival time based on departure
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

  // Helper function to parse departure date and time to Date object
  const parseDepartureDateTime = (dateStr, timeStr) => {
    // Parse date like "19 December 2025"
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const dateParts = dateStr.split(' ');
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1]];
    const year = parseInt(dateParts[2]);
    
    // Parse time like "16:00" or "6:00"
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    return new Date(year, month, day, hours, minutes || 0, 0, 0);
  };

  // Calculate completion deadline based on departure time + 10 minutes
  const calculateCompletionDeadline = (departureDate, departureTime) => {
    const departureDateTime = parseDepartureDateTime(departureDate, departureTime);
    // Completion deadline = departure time + 10 minutes
    return new Date(departureDateTime.getTime() + 10 * 60 * 1000).toISOString();
  };

  // Create new booking
  const createBooking = (bookingData) => {
    const userData = getUserData();
    const { bus, seat } = generateBusSeat();
    const bookingCode = generateBookingCode();
    const payNow = bookingData.payNow !== false; // default to pay now
    
    // Calculate payment deadline (10 minutes from now) if paying later
    const paymentDeadline = !payNow 
      ? new Date(Date.now() + 10 * 60 * 1000).toISOString() 
      : null;
    
    // Calculate completion deadline based on DEPARTURE TIME + 10 minutes (not booking time)
    // This means the 10-minute countdown starts when the bus departs
    const completionDeadline = payNow 
      ? calculateCompletionDeadline(bookingData.departureDate, bookingData.departureTime)
      : null;
    
    const newBooking = {
      id: Date.now().toString(),
      bookingCode,
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
        name: userData.name,
        email: userData.email,
        binusianId: userData.binusianId,
        nim: userData.nim,
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

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Cancel booking (without refund - for unpaid tickets)
  const cancelBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', hasBarcode: false }
          : booking
      )
    );
  };

  // Cancel booking with refund (for paid tickets)
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

  // Complete booking
  const completeBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'completed', hasBarcode: false }
          : booking
      )
    );
  };

  // Confirm payment (change from pending to ongoing)
  const confirmPayment = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => {
        if (booking.id === bookingId) {
          // Calculate completion deadline based on DEPARTURE TIME + 10 minutes
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

  // Get remaining time for payment (in seconds)
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

  // Get remaining time for completion (in seconds)
  // Returns: 
  //   - positive number: seconds remaining in 10-min countdown (journey started)
  //   - 0: journey completed
  //   - negative number: seconds until departure (journey not started yet, absolute value = seconds to wait)
  const getRemainingCompletionTime = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.completionDeadline || booking.status !== 'ongoing') {
      return 0;
    }
    
    const now = new Date().getTime();
    const deadline = new Date(booking.completionDeadline).getTime();
    
    // Parse departure time to check if journey has started
    const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
    const departureTime = departureDateTime.getTime();
    
    // If current time is before departure time, return negative value (waiting for departure)
    if (now < departureTime) {
      // Return negative value representing seconds until departure
      return -Math.floor((departureTime - now) / 1000);
    }
    
    // Journey has started, return remaining time in 10-min countdown
    const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
    return remaining;
  };

  // Check if journey has started (current time >= departure time)
  const hasJourneyStarted = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || booking.status !== 'ongoing') {
      return false;
    }
    
    const now = new Date().getTime();
    const departureDateTime = parseDepartureDateTime(booking.departure.date, booking.departure.time);
    return now >= departureDateTime.getTime();
  };

  // Get today's date string
  const getTodayDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get today's tickets (ongoing or pending for today)
  const getTodayTickets = () => {
    const todayString = getTodayDateString();
    return bookings.filter(booking => 
      booking.departure.date === todayString && 
      (booking.status === 'ongoing' || booking.status === 'pending')
    );
  };

  // Get next upcoming ticket (closest to current time, today only, 1 ticket)
  const getNextUpcomingTicket = () => {
    const todayString = getTodayDateString();
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Filter today's active tickets (ongoing or pending)
    const todayTickets = bookings.filter(booking => 
      booking.departure.date === todayString && 
      (booking.status === 'ongoing' || booking.status === 'pending')
    );

    if (todayTickets.length === 0) return null;

    // Convert departure time to minutes for comparison
    const getTimeInMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + (minutes || 0);
    };

    // Sort tickets by departure time
    const sortedTickets = todayTickets.sort((a, b) => {
      const timeA = getTimeInMinutes(a.departure.time);
      const timeB = getTimeInMinutes(b.departure.time);
      return timeA - timeB;
    });

    // Find the next upcoming ticket (departure time >= current time)
    // Or if all tickets are past, return the most recent one (ongoing trip)
    let nextTicket = sortedTickets.find(ticket => {
      const departureMinutes = getTimeInMinutes(ticket.departure.time);
      return departureMinutes >= currentMinutes;
    });

    // If no upcoming ticket found, check for ongoing tickets (already departed but still active)
    if (!nextTicket) {
      // Return the last ongoing ticket (most recently departed)
      const ongoingTickets = sortedTickets.filter(t => t.status === 'ongoing');
      if (ongoingTickets.length > 0) {
        nextTicket = ongoingTickets[ongoingTickets.length - 1];
      } else {
        // Return the closest pending ticket even if time has passed
        nextTicket = sortedTickets[0];
      }
    }

    return nextTicket;
  };

  // Get all tickets
  const getAllTickets = () => {
    return bookings;
  };

  // Get tickets by status
  const getTicketsByStatus = (status) => {
    if (status === 'all') return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  // Get ticket by ID
  const getTicketById = (ticketId) => {
    return bookings.find(booking => booking.id === ticketId);
  };

  // Get booking statistics
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

  // Clear all bookings (for testing)
  const clearAllBookings = () => {
    setBookings([]);
    localStorage.removeItem('gaskeunn_bookings');
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