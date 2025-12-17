import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Bus,
  MapPin,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

// ============================================
// HELPER FUNCTIONS (tanpa context untuk flexibility)
// ============================================

// Get all transactions from localStorage
const getTransactions = () => {
  const saved = localStorage.getItem('gaskeunn_transactions');
  return saved ? JSON.parse(saved) : [];
};

// Get all bookings from localStorage
const getBookings = () => {
  const saved = localStorage.getItem('gaskeunn_bookings');
  return saved ? JSON.parse(saved) : [];
};

// Update booking status
const updateBookingStatus = (bookingId, newStatus) => {
  const bookings = getBookings();
  const updated = bookings.map(booking => 
    booking.id === bookingId 
      ? { 
          ...booking, 
          status: newStatus, 
          hasBarcode: newStatus === 'ongoing', 
          updatedAt: new Date().toISOString() 
        }
      : booking
  );
  localStorage.setItem('gaskeunn_bookings', JSON.stringify(updated));
  
  // Also update transactions
  const transactions = updated.map(booking => ({
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
  localStorage.setItem('gaskeunn_transactions', JSON.stringify(transactions));
  
  return updated;
};

// Calculate statistics
const calculateStats = (bookings) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const parseDate = (dateStr) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
    }
    return new Date(dateStr);
  };

  const todayBookings = bookings.filter(b => {
    const bookingDate = parseDate(b.departure?.date || '');
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate.getTime() === today.getTime();
  });

  const totalRevenue = bookings
    .filter(b => b.status === 'completed' || b.status === 'ongoing')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const todayRevenue = todayBookings
    .filter(b => b.status === 'completed' || b.status === 'ongoing')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return {
    totalBookings: bookings.length,
    todayBookings: todayBookings.length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    ongoingBookings: bookings.filter(b => b.status === 'ongoing').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalRevenue,
    todayRevenue
  };
};

// ============================================
// ADMIN TRANSACTIONS COMPONENT
// ============================================

function AdminTransactions() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data
  const loadData = () => {
    setIsLoading(true);
    const data = getBookings();
    setBookings(data);
    setStats(calculateStats(data));
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    // Auto refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(b => 
        b.bookingCode?.toLowerCase().includes(term) ||
        b.passenger?.name?.toLowerCase().includes(term) ||
        b.passenger?.email?.toLowerCase().includes(term) ||
        b.passenger?.nim?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(b => {
        const bookingDate = new Date(b.createdAt);
        bookingDate.setHours(0, 0, 0, 0);
        
        if (dateFilter === 'today') {
          return bookingDate.getTime() === today.getTime();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return bookingDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return bookingDate >= monthAgo;
        }
        return true;
      });
    }

    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  // Handle status change
  const handleStatusChange = (bookingId, newStatus) => {
    const updated = updateBookingStatus(bookingId, newStatus);
    setBookings(updated);
    setStats(calculateStats(updated));
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      ongoing: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
      pending: { bg: 'bg-purple-100', text: 'text-purple-700', icon: CreditCard }
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock };
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Booking</p>
              <p className="text-3xl font-bold">{stats.totalBookings || 0}</p>
            </div>
            <Users className="w-10 h-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Hari Ini</p>
              <p className="text-3xl font-bold">{stats.todayBookings || 0}</p>
            </div>
            <Calendar className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue || 0)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Revenue Hari Ini</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.todayRevenue || 0)}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <p className="text-orange-500 text-2xl font-bold">{stats.ongoingBookings || 0}</p>
          <p className="text-gray-500 text-xs">Ongoing</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <p className="text-green-500 text-2xl font-bold">{stats.completedBookings || 0}</p>
          <p className="text-gray-500 text-xs">Completed</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <p className="text-red-500 text-2xl font-bold">{stats.cancelledBookings || 0}</p>
          <p className="text-gray-500 text-xs">Cancelled</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <p className="text-purple-500 text-2xl font-bold">{stats.pendingBookings || 0}</p>
          <p className="text-gray-500 text-xs">Pending</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari booking code, nama, email, NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={loadData}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2 text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Booking</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Penumpang</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rute</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jadwal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bus/Seat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Harga</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-gray-500">
                    <Bus className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-semibold">Belum ada data booking</p>
                    <p className="text-sm">Data booking dari penumpang akan muncul di sini</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const statusBadge = getStatusBadge(booking.status);
                  const StatusIcon = statusBadge.icon;
                  const isExpanded = expandedRow === booking.id;

                  return (
                    <React.Fragment key={booking.id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-bold text-blue-600 text-sm">{booking.bookingCode}</p>
                            <p className="text-xs text-gray-400">{formatDateTime(booking.createdAt)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{booking.passenger?.name}</p>
                            <p className="text-xs text-gray-500">{booking.passenger?.nim}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3 text-green-500" />
                            <span className="text-gray-600 truncate max-w-[100px]">{booking.departure?.location}</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-gray-600 truncate max-w-[100px]">{booking.arrival?.location}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.departure?.date}</p>
                            <p className="text-xs text-gray-500">{booking.departure?.time}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                              Bus {booking.bus}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                              Seat {booking.seat}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{formatCurrency(booking.totalPrice || 0)}</p>
                            {booking.promoCode && (
                              <p className="text-xs text-green-600">🏷️ {booking.promoCode}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.bg} ${statusBadge.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExpandedRow(isExpanded ? null : booking.id)}
                              className="p-1 hover:bg-gray-100 rounded transition"
                              title="Detail"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            
                            {/* Status Actions */}
                            {booking.status === 'ongoing' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                                className="p-1 hover:bg-green-100 rounded transition text-green-600"
                                title="Tandai Selesai"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'ongoing')}
                                  className="p-1 hover:bg-green-100 rounded transition text-green-600"
                                  title="Konfirmasi Pembayaran"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                  className="p-1 hover:bg-red-100 rounded transition text-red-600"
                                  title="Batalkan"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {booking.status === 'ongoing' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="p-1 hover:bg-red-100 rounded transition text-red-600"
                                title="Batalkan"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan="8" className="px-4 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs mb-1">Email</p>
                                <p className="font-medium">{booking.passenger?.email}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs mb-1">Binusian ID</p>
                                <p className="font-medium">{booking.passenger?.binusianId}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs mb-1">Metode Pembayaran</p>
                                <p className="font-medium capitalize">{booking.paymentMethod || '-'}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs mb-1">Waktu Tiba</p>
                                <p className="font-medium">{booking.arrival?.time}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 text-center">
        Menampilkan {filteredBookings.length} dari {bookings.length} booking
      </div>
    </div>
  );
}

export default AdminTransactions;