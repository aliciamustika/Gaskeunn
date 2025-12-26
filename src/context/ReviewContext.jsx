import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial reviews data - sama seperti di AdminDashboard
const initialReviews = [
  { id: 1, name: 'Andre Nugroho', rating: 5, comment: 'Pelayanan sangat baik, bus selalu tepat waktu!', date: '16 Dec 2025', displayOnHome: true, role: 'Digital Communication', avatar: 'https://ui-avatars.com/api/?name=Andre+Nugroho&background=3b82f6&color=fff&size=128' },
  { id: 2, name: 'Putu Ayu Verena', rating: 4, comment: 'Driver ramah, tapi AC kadang kurang dingin.', date: '15 Dec 2025', displayOnHome: true, role: 'Computer Science', avatar: 'https://ui-avatars.com/api/?name=Verena+Ayu&background=ec4899&color=fff&size=128' },
  { id: 3, name: 'Kadek Samuel', rating: 5, comment: 'Gaskeunn bener-bener ngebantu banget! Aplikasinya mudah digunakan dan fiturnya lengkap. Mulai dari booking sampai tracking bus real-time semuanya smooth. Apalagi harganya terjangkau untuk kantong mahasiswa. Driver-drivernya juga profesional dan tepat waktu. Pokoknya recommended banget deh buat temen-temen Binusian yang butuh transportasi ke kampus!', date: '15 Dec 2025', displayOnHome: true, role: 'Interior Design', avatar: 'https://ui-avatars.com/api/?name=Kadek+Samuel&background=10b981&color=fff&size=128' },
  { id: 4, name: 'Pradipta Laksmana', rating: 4.5, comment: 'Sangat membantu untuk mahasiswa yang tinggal jauh dari kampus.', date: '14 Dec 2025', displayOnHome: true, role: 'Business Management', avatar: 'https://ui-avatars.com/api/?name=P+L&background=f59e0b&color=fff&size=128' },
  { id: 5, name: 'Michael Vincent', rating: 4.7, comment: 'Pelayanan memuaskan, driver profesional. Recommended!', date: '14 Dec 2025', displayOnHome: true, role: 'Information Systems', avatar: 'https://ui-avatars.com/api/?name=M+V&background=8b5cf6&color=fff&size=128' },
  { id: 6, name: 'Joceline Sudigdo', rating: 4.9, comment: 'Solusi terbaik untuk transportasi ke kampus!', date: '13 Dec 2025', displayOnHome: true, role: 'Accounting', avatar: 'https://ui-avatars.com/api/?name=J+S&background=ef4444&color=fff&size=128' },
  { id: 7, name: 'Rizky Firmansyah', rating: 4.6, comment: 'Busnya bersih dan nyaman. AC-nya adem banget!', date: '13 Dec 2025', displayOnHome: true, role: 'Marketing Communication', avatar: 'https://ui-avatars.com/api/?name=R+F&background=06b6d4&color=fff&size=128' },
  { id: 8, name: 'Anissa Putri', rating: 4.8, comment: 'Booking gampang, tinggal klik-klik aja udah dapat kursi.', date: '12 Dec 2025', displayOnHome: true, role: 'International Relations', avatar: 'https://ui-avatars.com/api/?name=A+P&background=14b8a6&color=fff&size=128' },
  { id: 9, name: 'Kevin Wijaya', rating: 5, comment: 'Worth it banget! Ga perlu ribet naik angkot lagi.', date: '12 Dec 2025', displayOnHome: true, role: 'Civil Engineering', avatar: 'https://ui-avatars.com/api/?name=K+W&background=6366f1&color=fff&size=128' },
  { id: 10, name: 'Made Dewi', rating: 3, comment: 'Tolong tambah rute ke daerah Sulfat.', date: '11 Dec 2025', displayOnHome: false, role: 'Architecture', avatar: 'https://ui-avatars.com/api/?name=M+D&background=ec4899&color=fff&size=128' },
  { id: 11, name: 'Nyoman Satria', rating: 5, comment: 'Mantap! Sekarang ke kampus jadi lebih mudah dan nyaman.', date: '11 Dec 2025', displayOnHome: false, role: 'Psychology', avatar: 'https://ui-avatars.com/api/?name=N+S&background=f59e0b&color=fff&size=128' },
  { id: 12, name: 'Gede Pranata', rating: 4.3, comment: 'Harga terjangkau, kualitas oke. Good job Gaskeunn!', date: '10 Dec 2025', displayOnHome: false, role: 'Economics', avatar: 'https://ui-avatars.com/api/?name=G+P&background=3b82f6&color=fff&size=128' },
  { id: 13, name: 'Luh Putu Sari', rating: 4.8, comment: 'Suka banget sama fitur tracking-nya, jadi tau kapan bus datang.', date: '10 Dec 2025', displayOnHome: false, role: 'Law', avatar: 'https://ui-avatars.com/api/?name=L+P+S&background=10b981&color=fff&size=128' },
  { id: 14, name: 'Wayan Kusuma', rating: 4.5, comment: 'Driver-nya ramah dan sopan. Busnya juga wangi!', date: '9 Dec 2025', displayOnHome: false, role: 'Medicine', avatar: 'https://ui-avatars.com/api/?name=W+K&background=8b5cf6&color=fff&size=128' },
  { id: 15, name: 'Ketut Ariana', rating: 5, comment: 'Aplikasinya user-friendly banget, orang tua saya juga bisa pakai.', date: '9 Dec 2025', displayOnHome: false, role: 'Education', avatar: 'https://ui-avatars.com/api/?name=K+A&background=ef4444&color=fff&size=128' },
  { id: 16, name: 'Dewa Putra', rating: 4.2, comment: 'Lumayan bagus, tapi kadang busnya penuh pas jam sibuk.', date: '8 Dec 2025', displayOnHome: false, role: 'Graphic Design', avatar: 'https://ui-avatars.com/api/?name=D+P&background=06b6d4&color=fff&size=128' },
  { id: 17, name: 'Ayu Lestari', rating: 4.9, comment: 'Selalu on time! Jadi ga pernah telat kuliah lagi.', date: '8 Dec 2025', displayOnHome: false, role: 'Film', avatar: 'https://ui-avatars.com/api/?name=A+L&background=14b8a6&color=fff&size=128' },
  { id: 18, name: 'Bagus Wijaya', rating: 4.7, comment: 'Top markotop! Pelayanannya memuaskan sekali.', date: '7 Dec 2025', displayOnHome: false, role: 'Music', avatar: 'https://ui-avatars.com/api/?name=B+W&background=6366f1&color=fff&size=128' },
  { id: 19, name: 'Citra Dewi', rating: 3.5, comment: 'Bagus sih, tapi tolong ditambah jadwal sore dong.', date: '7 Dec 2025', displayOnHome: false, role: 'Dance', avatar: 'https://ui-avatars.com/api/?name=C+D&background=ec4899&color=fff&size=128' },
  { id: 20, name: 'Dharma Putra', rating: 5, comment: 'Best shuttle service! Ga nyesel pake Gaskeunn.', date: '6 Dec 2025', displayOnHome: false, role: 'Theater', avatar: 'https://ui-avatars.com/api/?name=D+P&background=f59e0b&color=fff&size=128' },
  { id: 21, name: 'Eka Pratama', rating: 4.4, comment: 'Pembayarannya gampang, bisa pake berbagai metode.', date: '6 Dec 2025', displayOnHome: false, role: 'Public Relations', avatar: 'https://ui-avatars.com/api/?name=E+P&background=3b82f6&color=fff&size=128' },
  { id: 22, name: 'Fitria Sani', rating: 4.8, comment: 'Kursi busnya empuk, perjalanan jadi nyaman banget.', date: '5 Dec 2025', displayOnHome: false, role: 'Journalism', avatar: 'https://ui-avatars.com/api/?name=F+S&background=10b981&color=fff&size=128' },
  { id: 23, name: 'Gunawan Saputra', rating: 4.6, comment: 'Harga worth it dengan kualitas yang didapat.', date: '5 Dec 2025', displayOnHome: false, role: 'Advertising', avatar: 'https://ui-avatars.com/api/?name=G+S&background=8b5cf6&color=fff&size=128' },
  { id: 24, name: 'Hendra Kusuma', rating: 5, comment: 'Gaskeunn the best! Recommended buat semua Binusian.', date: '4 Dec 2025', displayOnHome: false, role: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=H+K&background=ef4444&color=fff&size=128' },
  { id: 25, name: 'Indah Permata', rating: 4.3, comment: 'Senang ada Gaskeunn, jadi hemat waktu dan tenaga.', date: '4 Dec 2025', displayOnHome: false, role: 'Photography', avatar: 'https://ui-avatars.com/api/?name=I+P&background=06b6d4&color=fff&size=128' },
  { id: 26, name: 'Joko Santoso', rating: 4.9, comment: 'Fitur live tracking sangat membantu!', date: '3 Dec 2025', displayOnHome: false, role: 'Videography', avatar: 'https://ui-avatars.com/api/?name=J+S&background=14b8a6&color=fff&size=128' },
  { id: 27, name: 'Kartika Sari', rating: 4.5, comment: 'Pengalaman naik Gaskeunn selalu menyenangkan.', date: '3 Dec 2025', displayOnHome: false, role: 'Animation', avatar: 'https://ui-avatars.com/api/?name=K+S&background=6366f1&color=fff&size=128' },
  { id: 28, name: 'Lukman Hakim', rating: 3.8, comment: 'Bagus, tapi perlu tambah armada di jam pagi.', date: '2 Dec 2025', displayOnHome: false, role: 'Game Design', avatar: 'https://ui-avatars.com/api/?name=L+H&background=ec4899&color=fff&size=128' },
  { id: 29, name: 'Maya Anggraeni', rating: 5, comment: 'Perfect! Ga ada keluhan sama sekali.', date: '2 Dec 2025', displayOnHome: false, role: 'UI/UX Design', avatar: 'https://ui-avatars.com/api/?name=M+A&background=f59e0b&color=fff&size=128' },
  { id: 30, name: 'Nadia Putri', rating: 4.7, comment: 'Customer service-nya responsif dan helpful.', date: '1 Dec 2025', displayOnHome: false, role: 'Product Design', avatar: 'https://ui-avatars.com/api/?name=N+P&background=3b82f6&color=fff&size=128' },
];

const STORAGE_KEY = 'gaskeunn_reviews';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  // ✅ PERBAIKAN: Load dari localStorage atau gunakan initialReviews
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(STORAGE_KEY);
      if (savedReviews) {
        return JSON.parse(savedReviews);
      }
    } catch (error) {
      console.error('Error loading reviews from localStorage:', error);
    }
    return initialReviews;
  });

  // ✅ PERBAIKAN: Save ke localStorage setiap kali reviews berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error);
    }
  }, [reviews]);

  // Toggle display on home
  const toggleDisplayOnHome = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, displayOnHome: !review.displayOnHome }
        : review
    ));
  };

  // Get reviews to display on home page (displayOnHome === true)
  const getHomeReviews = () => {
    return reviews.filter(review => review.displayOnHome);
  };

  // Get all reviews
  const getAllReviews = () => {
    return reviews;
  };

  // ✅ TAMBAHAN: Reset reviews to initial state (untuk testing/debugging)
  const resetReviews = () => {
    setReviews(initialReviews);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    reviews,
    setReviews,
    toggleDisplayOnHome,
    getHomeReviews,
    getAllReviews,
    resetReviews
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};