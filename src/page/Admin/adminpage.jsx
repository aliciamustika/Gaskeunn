import React, { useState, useRef, useEffect } from "react";
import { useReviews } from "../../context/ReviewContext";
import { useNavigate } from "react-router-dom";
import gaskeunnLogo from "../../assets/img/gaskeunnLogo.png";

import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ChevronDown,
  Send,
  Bot,
  Star,
  FileSpreadsheet,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  Bus,
  Edit2,
  UserCog,
  UserCheck,
  Trash2,
  Save,
  XCircle,
  Plus,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const passengerData = [
  {
    id: 1,
    name: "Ni Putu Saraswati",
    nim: "2902654051",
    pickupPoint: "Araya",
    destination: "BINUS University",
    time: "06:45",
    status: "Completed",
    bus: 1,
    seat: 12,
  },
  {
    id: 2,
    name: "Kadek Samuel",
    nim: "2902654052",
    pickupPoint: "Telaga Golf",
    destination: "BINUS University",
    time: "06:45",
    status: "Ongoing",
    bus: 1,
    seat: 8,
  },
  {
    id: 3,
    name: "Made Wijaya",
    nim: "2902654053",
    pickupPoint: "Bundaran PBI",
    destination: "BINUS University",
    time: "07:00",
    status: "Completed",
    bus: 2,
    seat: 5,
  },
  {
    id: 4,
    name: "Putu Ayu Angela",
    nim: "2902654054",
    pickupPoint: "Masjid Ramadhan",
    destination: "BINUS University",
    time: "07:00",
    status: "Cancelled",
    bus: 2,
    seat: 3,
  },
  {
    id: 5,
    name: "Komang Dewa",
    nim: "2902654055",
    pickupPoint: "Hotel Grand Cakra",
    destination: "BINUS University",
    time: "07:15",
    status: "Pending",
    bus: 3,
    seat: 1,
  },
  {
    id: 6,
    name: "Wayan Surya",
    nim: "2902654056",
    pickupPoint: "Taman Blok J",
    destination: "BINUS University",
    time: "07:15",
    status: "Completed",
    bus: 3,
    seat: 7,
  },
];

// Passenger List Data (User Database)
const passengerListData = [
  {
    id: 1,
    name: "Ni Putu Saraswati",
    nim: "2902654051",
    birthInfo: "Denpasar, 15 Mar 2004",
    email: "ni.saraswati@binus.ac.id",
    linkedin: "linkedin.com/in/nisaraswati",
    gender: "Female",
    phone: "+6281234567001",
    binusianId: "BN001234567",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Software Engineering",
    enrichmentProgram: "Internship",
    class: "LA01",
  },
  {
    id: 2,
    name: "Kadek Samuel",
    nim: "2902654052",
    birthInfo: "Malang, 22 Jun 2003",
    email: "kadek.samuel@binus.ac.id",
    linkedin: "linkedin.com/in/kadeksamuel",
    gender: "Male",
    phone: "+6281234567002",
    binusianId: "BN001234568",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Software Engineering",
    enrichmentProgram: "Research",
    class: "LA01",
  },
  {
    id: 3,
    name: "Made Wijaya",
    nim: "2902654053",
    birthInfo: "Surabaya, 10 Jan 2004",
    email: "made.wijaya@binus.ac.id",
    linkedin: "linkedin.com/in/madewijaya",
    gender: "Male",
    phone: "+6281234567003",
    binusianId: "BN001234569",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Data Science",
    enrichmentProgram: "Internship",
    class: "LA02",
  },
  {
    id: 4,
    name: "Putu Ayu Angela",
    nim: "2902654054",
    birthInfo: "Jakarta, 05 Sep 2003",
    email: "putu.angela@binus.ac.id",
    linkedin: "linkedin.com/in/putuangela",
    gender: "Female",
    phone: "+6281234567004",
    binusianId: "BN001234570",
    program: "Information Systems",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Business Intelligence",
    enrichmentProgram: "Community Development",
    class: "LB01",
  },
  {
    id: 5,
    name: "Komang Dewa",
    nim: "2902654055",
    birthInfo: "Bandung, 18 Dec 2003",
    email: "komang.dewa@binus.ac.id",
    linkedin: "linkedin.com/in/komangdewa",
    gender: "Male",
    phone: "+6281234567005",
    binusianId: "BN001234571",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Game Development",
    enrichmentProgram: "Entrepreneurship",
    class: "LA01",
  },
  {
    id: 6,
    name: "Wayan Surya",
    nim: "2902654056",
    birthInfo: "Denpasar, 27 Feb 2004",
    email: "wayan.surya@binus.ac.id",
    linkedin: "linkedin.com/in/wayansurya",
    gender: "Male",
    phone: "+6281234567006",
    binusianId: "BN001234572",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Software Engineering",
    enrichmentProgram: "Study Abroad",
    class: "LA02",
  },
  {
    id: 7,
    name: "Nyoman Satria",
    nim: "2902654057",
    birthInfo: "Malang, 03 Jul 2003",
    email: "nyoman.satria@binus.ac.id",
    linkedin: "linkedin.com/in/nyomansatria",
    gender: "Male",
    phone: "+6281234567007",
    binusianId: "BN001234573",
    program: "Information Systems",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "ERP",
    enrichmentProgram: "Internship",
    class: "LB02",
  },
  {
    id: 8,
    name: "Gede Pranata",
    nim: "2902654058",
    birthInfo: "Yogyakarta, 14 Aug 2004",
    email: "gede.pranata@binus.ac.id",
    linkedin: "linkedin.com/in/gedepranata",
    gender: "Male",
    phone: "+6281234567008",
    binusianId: "BN001234574",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Cyber Security",
    enrichmentProgram: "Research",
    class: "LA01",
  },
  {
    id: 9,
    name: "Luh Putu Sari",
    nim: "2902654059",
    birthInfo: "Denpasar, 29 Apr 2003",
    email: "luh.sari@binus.ac.id",
    linkedin: "linkedin.com/in/luhsari",
    gender: "Female",
    phone: "+6281234567009",
    binusianId: "BN001234575",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Data Science",
    enrichmentProgram: "Internship",
    class: "LA02",
  },
  {
    id: 10,
    name: "Ketut Ariana",
    nim: "2902654060",
    birthInfo: "Semarang, 08 Nov 2003",
    email: "ketut.ariana@binus.ac.id",
    linkedin: "linkedin.com/in/ketutariana",
    gender: "Female",
    phone: "+6281234567010",
    binusianId: "BN001234576",
    program: "Information Systems",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Business Intelligence",
    enrichmentProgram: "Community Development",
    class: "LB01",
  },
  {
    id: 11,
    name: "Dewa Putra",
    nim: "2902654061",
    birthInfo: "Malang, 21 May 2004",
    email: "dewa.putra@binus.ac.id",
    linkedin: "linkedin.com/in/dewaputra",
    gender: "Male",
    phone: "+6281234567011",
    binusianId: "BN001234577",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Software Engineering",
    enrichmentProgram: "Internship",
    class: "LA01",
  },
  {
    id: 12,
    name: "Ayu Lestari",
    nim: "2902654062",
    birthInfo: "Jakarta, 16 Oct 2003",
    email: "ayu.lestari@binus.ac.id",
    linkedin: "linkedin.com/in/ayulestari",
    gender: "Female",
    phone: "+6281234567012",
    binusianId: "BN001234578",
    program: "Computer Science",
    degreeTitle: "S.Kom",
    homeCampus: "BINUS @Malang",
    stream: "Game Development",
    enrichmentProgram: "Entrepreneurship",
    class: "LA02",
  },
];

// Driver List Data
const driverListData = [
  {
    id: 1,
    name: "Budi Santoso",
    driverId: "DRV-2025-001",
    birthInfo: "Malang, 12 May 1985",
    email: "budi.santoso@gaskeunn.com",
    phone: "+6281234560001",
    linkedin: "linkedin.com/in/budisantoso",
    gender: "Male",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    driverId: "DRV-2025-002",
    birthInfo: "Surabaya, 08 Jan 1988",
    email: "agus.setiawan@gaskeunn.com",
    phone: "+6281234560002",
    linkedin: "linkedin.com/in/agussetiawan",
    gender: "Male",
  },
  {
    id: 3,
    name: "Dedi Kurniawan",
    driverId: "DRV-2025-003",
    birthInfo: "Bandung, 25 Sep 1990",
    email: "dedi.kurniawan@gaskeunn.com",
    phone: "+6281234560003",
    linkedin: "linkedin.com/in/dedikurniawan",
    gender: "Male",
  },
  {
    id: 4,
    name: "Eko Prasetyo",
    driverId: "DRV-2025-004",
    birthInfo: "Malang, 03 Mar 1987",
    email: "eko.prasetyo@gaskeunn.com",
    phone: "+6281234560004",
    linkedin: "linkedin.com/in/ekoprasetyo",
    gender: "Male",
  },
  {
    id: 5,
    name: "Fajar Hidayat",
    driverId: "DRV-2025-005",
    birthInfo: "Jakarta, 17 Jul 1992",
    email: "fajar.hidayat@gaskeunn.com",
    phone: "+6281234560005",
    linkedin: "linkedin.com/in/fajarhidayat",
    gender: "Male",
  },
];

const revenueTableData = [
  {
    id: 1,
    date: "16 Dec 2025",
    totalPassengers: 156,
    revenue: 1560000,
    expenses: 450000,
    netProfit: 1110000,
  },
  {
    id: 2,
    date: "15 Dec 2025",
    totalPassengers: 142,
    revenue: 1420000,
    expenses: 420000,
    netProfit: 1000000,
  },
  {
    id: 3,
    date: "14 Dec 2025",
    totalPassengers: 138,
    revenue: 1380000,
    expenses: 400000,
    netProfit: 980000,
  },
  {
    id: 4,
    date: "13 Dec 2025",
    totalPassengers: 165,
    revenue: 1650000,
    expenses: 480000,
    netProfit: 1170000,
  },
  {
    id: 5,
    date: "12 Dec 2025",
    totalPassengers: 151,
    revenue: 1510000,
    expenses: 440000,
    netProfit: 1070000,
  },
];

const weeklyChartData = [
  { name: "Mon", passengers: 145, revenue: 1450000 },
  { name: "Tue", passengers: 152, revenue: 1520000 },
  { name: "Wed", passengers: 138, revenue: 1380000 },
  { name: "Thu", passengers: 165, revenue: 1650000 },
  { name: "Fri", passengers: 178, revenue: 1780000 },
  { name: "Sat", passengers: 89, revenue: 890000 },
  { name: "Sun", passengers: 45, revenue: 450000 },
];

const monthlyChartData = [
  { name: "Week 1", passengers: 890, revenue: 8900000 },
  { name: "Week 2", passengers: 920, revenue: 9200000 },
  { name: "Week 3", passengers: 875, revenue: 8750000 },
  { name: "Week 4", passengers: 945, revenue: 9450000 },
];

const yearlyChartData = [
  { name: "Jan", passengers: 3200, revenue: 32000000 },
  { name: "Feb", passengers: 2800, revenue: 28000000 },
  { name: "Mar", passengers: 3500, revenue: 35000000 },
  { name: "Apr", passengers: 3100, revenue: 31000000 },
  { name: "May", passengers: 3400, revenue: 34000000 },
  { name: "Jun", passengers: 2900, revenue: 29000000 },
  { name: "Jul", passengers: 2100, revenue: 21000000 },
  { name: "Aug", passengers: 2400, revenue: 24000000 },
  { name: "Sep", passengers: 3600, revenue: 36000000 },
  { name: "Oct", passengers: 3800, revenue: 38000000 },
  { name: "Nov", passengers: 3500, revenue: 35000000 },
  { name: "Dec", passengers: 3200, revenue: 32000000 },
];

const pickupPointData = [
  { name: "Araya", value: 35, color: "oklch(0.6155 0.1314 243.17)" },
  { name: "Telaga Golf", value: 25, color: "#10B981" },
  { name: "Bundaran PBI", value: 20, color: "#F59E0B" },
  { name: "Masjid Ramadhan", value: 12, color: "#EF4444" },
  { name: "Taman Blok J", value: 8, color: "#8B5CF6" },
];

const contactUsQuestions = [
  {
    id: 1,
    name: "Wayan Surya",
    email: "wayan@binus.ac.id",
    question: "Apakah ada rencana penambahan rute baru?",
    date: "16 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 2,
    name: "Komang Ayu",
    email: "komang@binus.ac.id",
    question: "Bagaimana cara refund tiket yang sudah dibeli?",
    date: "15 Dec 2025",
    status: "Answered",
    reply:
      "Untuk refund tiket, silakan hubungi customer service kami melalui WhatsApp di +62 321 159 753 atau email ke support@gaskeunn.com dengan menyertakan bukti pembelian tiket. Proses refund memakan waktu 3-5 hari kerja.",
  },
  {
    id: 3,
    name: "Putu Dharma",
    email: "putu@binus.ac.id",
    question: "Bus sering terlambat di titik Bundaran PBI, mohon diperbaiki.",
    date: "14 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 4,
    name: "Made Ari",
    email: "made.ari@binus.ac.id",
    question: "Apakah bisa booking untuk beberapa hari sekaligus?",
    date: "14 Dec 2025",
    status: "Answered",
    reply:
      "Saat ini fitur booking multi-hari sedang dalam pengembangan. Untuk sementara, Anda bisa melakukan booking harian. Terima kasih atas masukannya!",
  },
  {
    id: 5,
    name: "Kadek Yuni",
    email: "kadek.yuni@binus.ac.id",
    question: "Jam operasional shuttle mulai jam berapa sampai jam berapa?",
    date: "13 Dec 2025",
    status: "Answered",
    reply:
      "Jam operasional shuttle Gaskeunn adalah pukul 06:00 - 18:00 WIB setiap hari Senin-Sabtu. Untuk hari Minggu dan tanggal merah, shuttle tidak beroperasi.",
  },
  {
    id: 6,
    name: "Nyoman Bayu",
    email: "nyoman.bayu@binus.ac.id",
    question: "Bagaimana jika saya ketinggalan bus?",
    date: "13 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 7,
    name: "Gede Satya",
    email: "gede.satya@binus.ac.id",
    question: "Apakah ada diskon untuk mahasiswa semester akhir?",
    date: "12 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 8,
    name: "Luh Ayu",
    email: "luh.ayu@binus.ac.id",
    question: "Bisa request halte baru di daerah Sawojajar?",
    date: "12 Dec 2025",
    status: "Answered",
    reply:
      "Terima kasih atas sarannya! Kami akan melakukan survei untuk kemungkinan penambahan halte di daerah Sawojajar. Mohon ditunggu informasi selanjutnya.",
  },
  {
    id: 9,
    name: "Ketut Rina",
    email: "ketut.rina@binus.ac.id",
    question: "Apakah bus dilengkapi dengan WiFi?",
    date: "11 Dec 2025",
    status: "Answered",
    reply:
      "Ya, semua armada bus Gaskeunn sudah dilengkapi dengan WiFi gratis untuk kenyamanan penumpang.",
  },
  {
    id: 10,
    name: "Wayan Dika",
    email: "wayan.dika@binus.ac.id",
    question: "Bagaimana cara menghubungi driver jika ada barang tertinggal?",
    date: "11 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 11,
    name: "Putu Mega",
    email: "putu.mega@binus.ac.id",
    question: "Apakah ada layanan antar jemput khusus untuk acara kampus?",
    date: "10 Dec 2025",
    status: "Pending",
    reply: "",
  },
  {
    id: 12,
    name: "Made Surya",
    email: "made.surya@binus.ac.id",
    question: "Kenapa aplikasi sering error saat booking?",
    date: "10 Dec 2025",
    status: "Answered",
    reply:
      "Mohon maaf atas ketidaknyamanannya. Tim IT kami sudah memperbaiki bug tersebut. Silakan update aplikasi ke versi terbaru untuk pengalaman yang lebih baik.",
  },
  {
    id: 13,
    name: "Komang Dewi",
    email: "komang.dewi@binus.ac.id",
    question: "Apakah kursi bisa dipilih sendiri?",
    date: "9 Dec 2025",
    status: "Answered",
    reply:
      "Ya, Anda bisa memilih kursi yang tersedia saat melakukan booking melalui aplikasi Gaskeunn.",
  },
  {
    id: 14,
    name: "Nyoman Adi",
    email: "nyoman.adi@binus.ac.id",
    question: "Bus berangkat dari mana kalau dari kampus?",
    date: "9 Dec 2025",
    status: "Answered",
    reply:
      "Bus dari kampus BINUS berangkat dari Halte BINUS University yang terletak di depan gedung utama.",
  },
  {
    id: 15,
    name: "Gede Putra",
    email: "gede.putra@binus.ac.id",
    question: "Apakah pembayaran bisa menggunakan OVO atau GoPay?",
    date: "8 Dec 2025",
    status: "Pending",
    reply: "",
  },
];

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [chartPeriod, setChartPeriod] = useState("weekly");
  const { reviews, toggleDisplayOnHome } = useReviews();
  const [questions, setQuestions] = useState(contactUsQuestions);
  const [replyInputs, setReplyInputs] = useState({});
  const [passengerList, setPassengerList] = useState(passengerListData);
  const [driverList, setDriverList] = useState(driverListData);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editPassengerData, setEditPassengerData] = useState({});
  const [editDriverData, setEditDriverData] = useState({});
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [newDriverData, setNewDriverData] = useState({
    name: "",
    driverId: "",
    birthInfo: "",
    email: "",
    phone: "",
    linkedin: "",
    gender: "Male",
  });
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo Admin! Saya adalah AI Assistant Gaskeunn. Saya dapat membantu Anda menganalisis data penumpang, pendapatan, grafik, dan feedback dari penumpang. Silakan tanyakan apa saja!",
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileDropdownRef = useRef(null);
  const mainContentRef = useRef(null);
  const navigate = useNavigate();

  // Refs for scroll navigation
  const dashboardRef = useRef(null);
  const passengersRef = useRef(null);
  const passengerListRef = useRef(null);
  const driverListRef = useRef(null);
  const revenueRef = useRef(null);
  const feedbackRef = useRef(null);
  const questionsRef = useRef(null);
  const aiAssistantRef = useRef(null);

  // Prevent body scrolling - only main element should scroll
  useEffect(() => {
    // Save original overflow
    const originalOverflow = document.body.style.overflow;
    const originalMargin = document.body.style.margin;
    const originalPadding = document.body.style.padding;
    
    // Set body to not scroll and remove default spacing
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Also set html element
    const htmlElement = document.documentElement;
    const originalHtmlMargin = htmlElement.style.margin;
    const originalHtmlPadding = htmlElement.style.padding;
    htmlElement.style.margin = '0';
    htmlElement.style.padding = '0';
    
    // Cleanup: restore original overflow when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.margin = originalMargin;
      document.body.style.padding = originalPadding;
      htmlElement.style.margin = originalHtmlMargin;
      htmlElement.style.padding = originalHtmlPadding;
    };
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      ref: dashboardRef,
    },
    {
      id: "passengers",
      label: "Daily Passengers",
      icon: Users,
      ref: passengersRef,
    },
    {
      id: "passenger-list",
      label: "Passenger List",
      icon: UserCheck,
      ref: passengerListRef,
    },
    {
      id: "driver-list",
      label: "Driver List",
      icon: UserCog,
      ref: driverListRef,
    },
    { id: "revenue", label: "Revenue", icon: CreditCard, ref: revenueRef },
    { id: "feedback", label: "Reviews", icon: Star, ref: feedbackRef },
    {
      id: "questions",
      label: "Questions",
      icon: HelpCircle,
      ref: questionsRef,
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: Bot,
      ref: aiAssistantRef,
    },
  ];

  const stats = [
    {
      label: "Daily Passengers",
      value: "156",
      change: "+12%",
      isPositive: true,
      icon: Users,
    },
    {
      label: "Total Revenue",
      value: "Rp 1.56M",
      change: "+8%",
      isPositive: true,
      icon: CreditCard,
    },
    {
      label: "Active Buses",
      value: "5",
      change: "0%",
      isPositive: true,
      icon: Bus,
    },
    {
      label: "Avg Rating",
      value: "4.7",
      change: "+0.2",
      isPositive: true,
      icon: Star,
    },
  ];

  // Scroll Spy Effect - Auto highlight menu based on visible section
  useEffect(() => {
    const mainElement = mainContentRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      const scrollPosition = mainElement.scrollTop;
      
      const sections = [
        { id: "dashboard", ref: dashboardRef },
        { id: "passengers", ref: passengersRef },
        { id: "passenger-list", ref: passengerListRef },
        { id: "driver-list", ref: driverListRef },
        { id: "revenue", ref: revenueRef },
        { id: "feedback", ref: feedbackRef },
        { id: "questions", ref: questionsRef },
        { id: "ai-assistant", ref: aiAssistantRef },
      ];

      // Find which section is currently most visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.ref && item.ref.current) {
          const section = item.ref.current;
          const sectionTop = section.offsetTop - 200;
          
          // If scrolled past this section's start point, it's the active one
          if (scrollPosition >= sectionTop) {
            setActiveMenu(item.id);
            break; // Stop after finding the first match
          }
        }
      }
    };

    handleScroll();
    mainElement.addEventListener("scroll", handleScroll);
    
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency - no activeMenu!

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getChartData = () => {
    switch (chartPeriod) {
      case "weekly":
        return weeklyChartData;
      case "monthly":
        return monthlyChartData;
      case "yearly":
        return yearlyChartData;
      default:
        return weeklyChartData;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-100 text-green-700",
      Ongoing: "bg-blue-100 text-blue-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // Filter data based on search query
  const filteredPassengerData = passengerData.filter((passenger) => {
    const query = searchQuery.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(query) ||
      passenger.nim.toLowerCase().includes(query) ||
      passenger.pickupPoint.toLowerCase().includes(query) ||
      passenger.destination.toLowerCase().includes(query)
    );
  });

  const filteredPassengerList = passengerList.filter((passenger) => {
    const query = searchQuery.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(query) ||
      passenger.nim.toLowerCase().includes(query) ||
      passenger.email.toLowerCase().includes(query) ||
      passenger.phone.toLowerCase().includes(query) ||
      passenger.program.toLowerCase().includes(query)
    );
  });

  const filteredDriverList = driverList.filter((driver) => {
    const query = searchQuery.toLowerCase();
    return (
      driver.name.toLowerCase().includes(query) ||
      driver.driverId.toLowerCase().includes(query) ||
      driver.email.toLowerCase().includes(query) ||
      driver.phone.toLowerCase().includes(query)
    );
  });

  const filteredQuestions = questions.filter((question) => {
    const query = searchQuery.toLowerCase();
    return (
      question.name.toLowerCase().includes(query) ||
      question.email.toLowerCase().includes(query) ||
      question.question.toLowerCase().includes(query) ||
      question.reply.toLowerCase().includes(query)
    );
  });

  const filteredReviews = reviews.filter((review) => {
    const query = searchQuery.toLowerCase();
    return (
      review.name.toLowerCase().includes(query) ||
      review.comment.toLowerCase().includes(query)
    );
  });

  // Scroll to section function
  const scrollToSection = (menuItem) => {
    setActiveMenu(menuItem.id);
    if (menuItem.ref && menuItem.ref.current && mainContentRef.current) {
      const mainElement = mainContentRef.current;
      const section = menuItem.ref.current;
      const sectionTop = section.offsetTop - 100; // offset 100px from top
      
      mainElement.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  // Handle reply input change
  const handleReplyChange = (questionId, value) => {
    setReplyInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  // Submit reply to question
  const submitReply = (questionId) => {
    const replyText = replyInputs[questionId];
    if (!replyText || !replyText.trim()) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, reply: replyText.trim(), status: "Answered" }
          : q
      )
    );
    setReplyInputs((prev) => ({ ...prev, [questionId]: "" }));
  };

  // Passenger edit functions
  const startEditPassenger = (passenger) => {
    setEditingPassenger(passenger.id);
    setEditPassengerData({ ...passenger });
  };

  const cancelEditPassenger = () => {
    setEditingPassenger(null);
    setEditPassengerData({});
  };

  const saveEditPassenger = () => {
    setPassengerList((prev) =>
      prev.map((p) =>
        p.id === editingPassenger ? { ...editPassengerData } : p
      )
    );
    setEditingPassenger(null);
    setEditPassengerData({});
  };

  const handlePassengerChange = (field, value) => {
    setEditPassengerData((prev) => ({ ...prev, [field]: value }));
  };

  // Driver edit functions
  const startEditDriver = (driver) => {
    setEditingDriver(driver.id);
    setEditDriverData({ ...driver });
  };

  const cancelEditDriver = () => {
    setEditingDriver(null);
    setEditDriverData({});
  };

  const saveEditDriver = () => {
    setDriverList((prev) =>
      prev.map((d) => (d.id === editingDriver ? { ...editDriverData } : d))
    );
    setEditingDriver(null);
    setEditDriverData({});
  };

  const handleDriverChange = (field, value) => {
    setEditDriverData((prev) => ({ ...prev, [field]: value }));
  };

  // Add new driver
  const handleNewDriverChange = (field, value) => {
    setNewDriverData((prev) => ({ ...prev, [field]: value }));
  };

  const addNewDriver = () => {
    if (
      !newDriverData.name ||
      !newDriverData.driverId ||
      !newDriverData.email
    ) {
      alert("Please fill in required fields: Name, Driver ID, and Email");
      return;
    }

    const newDriver = {
      id: driverList.length + 1,
      ...newDriverData,
    };

    setDriverList((prev) => [...prev, newDriver]);
    setNewDriverData({
      name: "",
      driverId: "",
      birthInfo: "",
      email: "",
      phone: "",
      linkedin: "",
      gender: "Male",
    });
    setShowAddDriver(false);
  };

  const cancelAddDriver = () => {
    setNewDriverData({
      name: "",
      driverId: "",
      birthInfo: "",
      email: "",
      phone: "",
      linkedin: "",
      gender: "Male",
    });
    setShowAddDriver(false);
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = { role: "user", content: aiInput };
    setAiMessages((prev) => [...prev, userMessage]);
    setAiInput("");
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerInput = aiInput.toLowerCase();

      if (lowerInput.includes("pendapatan") || lowerInput.includes("revenue")) {
        response = `📊 **Analisis Pendapatan:**\n\nBerdasarkan data terkini:\n- Total pendapatan hari ini: Rp 1.560.000\n- Rata-rata pendapatan mingguan: Rp 9.120.000\n- Pertumbuhan: +8% dari minggu lalu\n\n💡 **Saran:** Pendapatan tertinggi terjadi pada hari Jumat. Pertimbangkan untuk menambah armada di hari tersebut.`;
      } else if (
        lowerInput.includes("penumpang") ||
        lowerInput.includes("passenger")
      ) {
        response = `👥 **Analisis Penumpang:**\n\nData hari ini:\n- Total penumpang: 156 orang\n- Titik jemput terpopuler: Araya (35%)\n- Jam sibuk: 06:45 - 07:15\n\n💡 **Saran:** Tingkatkan kapasitas bus pada jam sibuk untuk mengurangi waktu tunggu penumpang.`;
      } else if (
        lowerInput.includes("rating") ||
        lowerInput.includes("review") ||
        lowerInput.includes("komentar")
      ) {
        response = `⭐ **Analisis Rating & Feedback:**\n\nRata-rata rating: 4.7/5\n- Rating 5: 65%\n- Rating 4: 25%\n- Rating 3: 10%\n\n📝 **Keluhan Utama:**\n1. AC kurang dingin (3 laporan)\n2. Permintaan rute baru ke Sulfat\n\n💡 **Saran:** Lakukan pengecekan AC secara berkala dan pertimbangkan survei untuk rute baru.`;
      } else if (
        lowerInput.includes("grafik") ||
        lowerInput.includes("trend")
      ) {
        response = `📈 **Analisis Trend:**\n\nTrend Mingguan:\n- Penumpang tertinggi: Jumat (178 orang)\n- Penumpang terendah: Minggu (45 orang)\n\nTrend Bulanan:\n- Peningkatan 6% dari bulan lalu\n- Proyeksi bulan depan: +8%\n\n💡 **Saran:** Optimalkan jadwal weekend dengan promosi khusus untuk meningkatkan penggunaan.`;
      } else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("pertanyaan")
      ) {
        response = `📬 **Analisis Contact Us:**\n\nTotal pertanyaan pending: 2\nTotal pertanyaan terjawab: 1\n\n**Topik Utama:**\n1. Permintaan rute baru\n2. Prosedur refund\n3. Keluhan keterlambatan\n\n💡 **Saran:** Buat FAQ untuk pertanyaan umum dan tingkatkan response time menjadi < 24 jam.`;
      } else {
        response = `Terima kasih atas pertanyaan Anda! Saya dapat membantu menganalisis:\n\n📊 Pendapatan & Revenue\n👥 Data Penumpang\n⭐ Rating & Feedback\n📈 Trend & Grafik\n📬 Pertanyaan Contact Us\n\nSilakan tanyakan topik spesifik yang ingin Anda analisis!`;
      }

      setAiMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsAiTyping(false);
    }, 1500);
  };

  const handleLogout = () => {
    console.log('🚪 Logging out admin');
    
    // Clear user data
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    
    console.log('✅ Admin logged out successfully');
    
    // Redirect to admin login
    navigate("/admin/login");
};

  return (
    <div className="h-screen w-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full z-20 overflow-y-auto`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
        }}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-gray-200 h-[73px] flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={gaskeunnLogo} 
                alt="Gaskeunn Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-gray-900">Gaskeunn</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav
          className="flex-1 p-4 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db transparent",
          }}
        >
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeMenu === item.id
                      ? "text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  style={
                    activeMenu === item.id
                      ? {
                          backgroundColor: "oklch(0.6155 0.1314 243.17)",
                          boxShadow: "0 10px 15px -3px oklch(0.6155 0.1314 243.17 / 0.3)",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => {
                    if (activeMenu === item.id) {
                      e.currentTarget.style.backgroundColor = "oklch(0.55 0.14 243.17)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeMenu === item.id) {
                      e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17)";
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium text-left flex-1">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle Sidebar - Sticky at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        ref={mainContentRef}
        className="flex-1 overflow-auto bg-gray-50"
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 h-[73px] sticky top-0 z-30 flex items-center shadow-sm">
          <div className="flex items-center justify-between w-full">
            {/* Search */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search passengers, drivers, questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  "--tw-ring-color": "oklch(0.6155 0.1314 243.17)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Side - Profile with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">Admin</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>

                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    background: "linear-gradient(to right, #2B8CCD 0%, #83B1D1 100%)"
                  }}
                >
                  A
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* User Info */}
                  <div 
                    className="px-4 py-3 text-white"
                    style={{
                      background: "linear-gradient(to right, #2B8CCD 0%, #83B1D1 100%)"
                    }}
                  >
                    <p className="font-semibold">Admin</p>
                    <p className="text-sm text-blue-100">
                      admin@gaskeunn.com
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="py-6 px-6">
          {/* Dashboard Overview Section */}
          <section
            ref={dashboardRef}
            id="dashboard"
            className="mb-8 scroll-mt-20"
          >
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard Overview
                </h1>
                <p className="text-gray-500">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition"
                  style={{ backgroundColor: "oklch(0.6155 0.1314 243.17)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.55 0.14 243.17)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "oklch(0.6155 0.1314 243.17 / 0.1)" }}
                    >
                      <stat.icon 
                        className="w-6 h-6" 
                        style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                      />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-1 text-left">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 text-left">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg text-left font-bold text-gray-900">
                      Revenue & Passengers
                    </h2>
                    <p className="text-sm text-gray-500">
                      Overview of shuttle performance
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {["weekly", "monthly", "yearly"].map((period) => (
                      <button
                        key={period}
                        onClick={() => setChartPeriod(period)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          chartPeriod === period
                            ? "text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        style={
                          chartPeriod === period
                            ? { backgroundColor: "oklch(0.6155 0.1314 243.17)" }
                            : {}
                        }
                        onMouseEnter={(e) => {
                          if (chartPeriod === period) {
                            e.currentTarget.style.backgroundColor = "oklch(0.55 0.14 243.17)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (chartPeriod === period) {
                            e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17)";
                          }
                        }}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getChartData()}>
                    <defs>
                      <linearGradient
                        id="colorPassengers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.6155 0.1314 243.17)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.6155 0.1314 243.17)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value, name) => [
                        name === "revenue" ? formatCurrency(value) : value,
                        name === "revenue" ? "Revenue" : "Passengers",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="passengers"
                      stroke="oklch(0.6155 0.1314 243.17)"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorPassengers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pickup Points Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Pickup Points
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Distribution by location
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPie>
                    <Pie
                      data={pickupPointData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pickupPointData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {pickupPointData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Passengers Section */}
          <section
            ref={passengersRef}
            id="passengers"
            className="mb-8 scroll-mt-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet 
                    className="w-5 h-5" 
                    style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                  />
                  <h2 className="text-lg font-bold text-gray-900">
                    Daily Passengers
                  </h2>
                </div>
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition"
                  style={{ 
                    color: "oklch(0.6155 0.1314 243.17)",
                    backgroundColor: "oklch(0.6155 0.1314 243.17 / 0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17 / 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17 / 0.1)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export Excel
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        NIM
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Pickup Point
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Destination
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Time
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Bus
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Seat
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPassengerData.length > 0 ? (
                      filteredPassengerData.map((passenger) => (
                        <tr
                          key={passenger.id}
                          className="border-b border-gray-50 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 font-medium text-gray-900 text-sm text-left">
                            {passenger.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.nim}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.pickupPoint}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.destination}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.time}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.bus}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-left">
                            {passenger.seat}
                          </td>
                          <td className="py-3 px-4 text-left">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                passenger.status
                              )}`}
                            >
                              {passenger.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          No passengers found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Passenger List Section */}
          <section
            ref={passengerListRef}
            id="passenger-list"
            className="mb-8 scroll-mt-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Passenger List
                  </h2>
                  <span className="text-sm text-gray-500">
                    ({filteredPassengerList.length} {searchQuery ? 'found' : 'users'})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Active:{" "}
                    {passengerList.filter((p) => p.status === "Active").length}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Inactive:{" "}
                    {
                      passengerList.filter((p) => p.status === "Inactive")
                        .length
                    }
                  </span>
                </div>
              </div>
              <div
                className="overflow-x-auto max-h-[500px] overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                <table className="w-full min-w-[1800px]">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Name
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        NIM
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Birth Info
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Email
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        LinkedIn
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Gender
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Phone
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Binusian ID
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Program
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Degree
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Home Campus
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Stream
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Enrichment Track
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Class
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPassengerList.length > 0 ? (
                      filteredPassengerList.map((passenger) => (
                      <tr
                        key={passenger.id}
                        className="border-b border-gray-50 hover:bg-gray-50 text-left"
                      >
                        {editingPassenger === passenger.id ? (
                          <>
                            <td className="py-2">
                              <input
                                type="text"
                                value={editPassengerData.name}
                                onChange={(e) =>
                                  handlePassengerChange("name", e.target.value)
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3 text-left">
                              <input
                                type="text"
                                value={editPassengerData.nim}
                                onChange={(e) =>
                                  handlePassengerChange("nim", e.target.value)
                                }
                                className="w-24 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editPassengerData.birthInfo}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "birthInfo",
                                    e.target.value
                                  )
                                }
                                className="w-40 px-2 py-1 border border-gray-200 rounded text-sm text-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="City, DD Mon YYYY"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="email"
                                value={editPassengerData.email}
                                onChange={(e) =>
                                  handlePassengerChange("email", e.target.value)
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editPassengerData.linkedin}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "linkedin",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={editPassengerData.gender}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "gender",
                                    e.target.value
                                  )
                                }
                                className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editPassengerData.phone}
                                onChange={(e) =>
                                  handlePassengerChange("phone", e.target.value)
                                }
                                className="w-32 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editPassengerData.binusianId}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "binusianId",
                                    e.target.value
                                  )
                                }
                                className="w-28 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={editPassengerData.program}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "program",
                                    e.target.value
                                  )
                                }
                                className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Computer Science">
                                  Computer Science
                                </option>
                                <option value="Information Systems">
                                  Information Systems
                                </option>
                              </select>
                            </td>
                            <td className="py-2 px-3 text-sm text-gray-600">
                              {passenger.degreeTitle}
                            </td>
                            <td className="py-2 px-3 text-sm text-gray-600">
                              {passenger.homeCampus}
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={editPassengerData.stream}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "stream",
                                    e.target.value
                                  )
                                }
                                className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Software Engineering">
                                  Software Engineering
                                </option>
                                <option value="Data Science">
                                  Data Science
                                </option>
                                <option value="Game Development">
                                  Game Development
                                </option>
                                <option value="Cyber Security">
                                  Cyber Security
                                </option>
                                <option value="Business Intelligence">
                                  Business Intelligence
                                </option>
                                <option value="ERP">ERP</option>
                              </select>
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={editPassengerData.enrichmentProgram}
                                onChange={(e) =>
                                  handlePassengerChange(
                                    "enrichmentProgram",
                                    e.target.value
                                  )
                                }
                                className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Internship">Internship</option>
                                <option value="Research">Research</option>
                                <option value="Community Development">
                                  Community Development
                                </option>
                                <option value="Entrepreneurship">
                                  Entrepreneurship
                                </option>
                                <option value="Study Abroad">
                                  Study Abroad
                                </option>
                              </select>
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editPassengerData.class}
                                onChange={(e) =>
                                  handlePassengerChange("class", e.target.value)
                                }
                                className="w-16 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={saveEditPassenger}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelEditPassenger}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Cancel"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                                  style={{
                                    background: "linear-gradient(to bottom right, oklch(0.65 0.18 145), oklch(0.6155 0.1314 243.17))"
                                  }}
                                >
                                  {passenger.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900 text-sm whitespace-nowrap">
                                  {passenger.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {passenger.nim}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600 whitespace-nowrap">
                              {passenger.birthInfo}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {passenger.email}
                            </td>
                            <td
                              className="py-3 px-3 text-sm hover:underline cursor-pointer truncate max-w-[150px]"
                              title={passenger.linkedin}
                              style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                            >
                              {passenger.linkedin}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  passenger.gender === "Male"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-pink-100 text-pink-700"
                                }`}
                              >
                                {passenger.gender}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {passenger.phone}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {passenger.binusianId}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600 whitespace-nowrap">
                              {passenger.program}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600">
                              {passenger.degreeTitle}
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600 whitespace-nowrap">
                              {passenger.homeCampus}
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 whitespace-nowrap">
                                {passenger.stream}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-sm text-gray-600 whitespace-nowrap">
                              {passenger.enrichmentProgram}
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                {passenger.class}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <button
                                onClick={() => startEditPassenger(passenger)}
                                className="p-1.5 rounded-lg transition"
                                style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17 / 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={15} className="py-8 text-center text-gray-500">
                          No passengers found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Driver List Section */}
          <section
            ref={driverListRef}
            id="driver-list"
            className="mb-8 scroll-mt-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-purple-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Driver List
                  </h2>
                  <span className="text-sm text-gray-500">
                    ({filteredDriverList.length} {searchQuery ? 'found' : 'drivers'})
                  </span>
                </div>
                <button
                  onClick={() => setShowAddDriver(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Driver
                </button>
              </div>

              {/* Add Driver Form */}
              {showAddDriver && (
                <div className="mb-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Add New Driver
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={newDriverData.name}
                        onChange={(e) =>
                          handleNewDriverChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Driver ID *
                      </label>
                      <input
                        type="text"
                        value={newDriverData.driverId}
                        onChange={(e) =>
                          handleNewDriverChange("driverId", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="DRV-2025-XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Birth Information
                      </label>
                      <input
                        type="text"
                        value={newDriverData.birthInfo}
                        onChange={(e) =>
                          handleNewDriverChange("birthInfo", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="City, DD Mon YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newDriverData.email}
                        onChange={(e) =>
                          handleNewDriverChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="email@gaskeunn.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={newDriverData.phone}
                        onChange={(e) =>
                          handleNewDriverChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+62..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        value={newDriverData.linkedin}
                        onChange={(e) =>
                          handleNewDriverChange("linkedin", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Gender
                      </label>
                      <select
                        value={newDriverData.gender}
                        onChange={(e) =>
                          handleNewDriverChange("gender", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        onClick={addNewDriver}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelAddDriver}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="overflow-x-auto max-h-[500px] overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                <table className="w-full min-w-[1200px]">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Driver ID
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Birth Info
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        LinkedIn
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Gender
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase bg-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-left">
                    {filteredDriverList.length > 0 ? (
                      filteredDriverList.map((driver) => (
                      <tr
                        key={driver.id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        {editingDriver === driver.id ? (
                          <>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={editDriverData.name}
                                onChange={(e) =>
                                  handleDriverChange("name", e.target.value)
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={editDriverData.driverId}
                                onChange={(e) =>
                                  handleDriverChange("driverId", e.target.value)
                                }
                                className="w-32 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={editDriverData.birthInfo}
                                onChange={(e) =>
                                  handleDriverChange(
                                    "birthInfo",
                                    e.target.value
                                  )
                                }
                                className="w-40 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="email"
                                value={editDriverData.email}
                                onChange={(e) =>
                                  handleDriverChange("email", e.target.value)
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={editDriverData.phone}
                                onChange={(e) =>
                                  handleDriverChange("phone", e.target.value)
                                }
                                className="w-32 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={editDriverData.linkedin}
                                onChange={(e) =>
                                  handleDriverChange("linkedin", e.target.value)
                                }
                                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <select
                                value={editDriverData.gender}
                                onChange={(e) =>
                                  handleDriverChange("gender", e.target.value)
                                }
                                className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={saveEditDriver}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelEditDriver}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Cancel"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                  style={{
                                    background: "linear-gradient(to bottom right, oklch(0.55 0.15 300), oklch(0.5 0.12 280))"
                                  }}
                                >
                                  {driver.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900 text-sm">
                                  {driver.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium whitespace-nowrap">
                                {driver.driverId}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                              {driver.birthInfo}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {driver.email}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {driver.phone}
                            </td>
                            <td
                              className="py-3 px-4 text-sm hover:underline cursor-pointer truncate max-w-[150px]"
                              title={driver.linkedin}
                              style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                            >
                              {driver.linkedin}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  driver.gender === "Male"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-pink-100 text-pink-700"
                                }`}
                              >
                                {driver.gender}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => startEditDriver(driver)}
                                className="p-1.5 rounded-lg transition"
                                style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17 / 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          No drivers found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Revenue Section */}
          <section ref={revenueRef} id="revenue" className="mb-8 scroll-mt-20">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Revenue Analysis
                  </h2>
                  <p className="text-sm text-gray-500">Daily revenue trend</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="oklch(0.6155 0.1314 243.17)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Daily Revenue
                  </h2>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
                  <Download className="w-4 h-4" />
                  Export Excel
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Passengers
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Expenses
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                        Net Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-left">
                    {revenueTableData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {item.date}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.totalPassengers}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatCurrency(item.revenue)}
                        </td>
                        <td className="py-3 px-4 text-sm text-red-600">
                          {formatCurrency(item.expenses)}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">
                          {formatCurrency(item.netProfit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Feedback Section - Reviews Only */}
          <section
            ref={feedbackRef}
            id="feedback"
            className="mb-8 scroll-mt-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Reviews
                  </h2>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Total: {filteredReviews.length} {searchQuery ? 'found' : 'reviews'}</span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    Displayed on Home:{" "}
                    {filteredReviews.filter((r) => r.displayOnHome).length}
                  </span>
                </div>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      review.displayOnHome
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {review.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < review.rating
                                  ? "text-yellow-500 fill-yellow-200"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm font-medium text-gray-600 ml-1">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={review.displayOnHome}
                          onChange={() => toggleDisplayOnHome(review.id)}
                          className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-xs text-gray-500">Home</span>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    No reviews found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <section
            ref={questionsRef}
            id="questions"
            className="mb-8 scroll-mt-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Contact Us Questions
                  </h2>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-yellow-600">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    Pending:{" "}
                    {filteredQuestions.filter((q) => q.status === "Pending").length}
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    Answered:{" "}
                    {filteredQuestions.filter((q) => q.status === "Answered").length}
                  </span>
                </div>
              </div>
              <div
                className="space-y-4 max-h-[500px] overflow-y-auto pr-2 text-left"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      question.status === "Answered"
                        ? "bg-green-50 border-green-200"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{
                            background: "linear-gradient(to bottom right, oklch(0.55 0.15 300), oklch(0.6155 0.1314 243.17))"
                          }}
                        >
                          {question.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {question.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {question.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.status === "Answered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {question.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {question.date}
                        </span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="bg-white rounded-lg p-3 mb-3 border border-gray-100">
                      <p className="text-sm text-gray-700">
                        {question.question}
                      </p>
                    </div>

                    {/* Reply Section */}
                    {question.status === "Answered" ? (
                      <div className="ml-6 border-l-2 border-green-300 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            style={{
                              background: "linear-gradient(to bottom right, oklch(0.6155 0.1314 243.17), oklch(0.55 0.14 243.17))"
                            }}
                          >
                            A
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              Admin Gaskeunn
                            </p>
                            <p className="text-xs text-gray-500">
                              Official Response
                            </p>
                          </div>
                        </div>
                        <div className="bg-green-100 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            {question.reply}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="ml-6 border-l-2 border-yellow-300 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            style={{
                              background: "linear-gradient(to bottom right, oklch(0.6155 0.1314 243.17), oklch(0.55 0.14 243.17))"
                            }}
                          >
                            A
                          </div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Reply as Admin
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <textarea
                            value={replyInputs[question.id] || ""}
                            onChange={(e) =>
                              handleReplyChange(question.id, e.target.value)
                            }
                            placeholder="Type your reply here..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={2}
                          />
                          <button
                            onClick={() => submitReply(question.id)}
                            disabled={!replyInputs[question.id]?.trim()}
                            className="px-4 py-2 text-white rounded-lg font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 self-end"
                            style={{ backgroundColor: "oklch(0.6155 0.1314 243.17)" }}
                            onMouseEnter={(e) => {
                              if (!e.currentTarget.disabled) {
                                e.currentTarget.style.backgroundColor = "oklch(0.55 0.14 243.17)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!e.currentTarget.disabled) {
                                e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17)";
                              }
                            }}
                          >
                            <Send className="w-4 h-4" />
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    No questions found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* AI Assistant Section */}
          <section
            ref={aiAssistantRef}
            id="ai-assistant"
            className="scroll-mt-20"
          >
            <div 
              className="rounded-2xl p-6 shadow-lg"
              style={{
                background: "linear-gradient(to bottom right, oklch(0.6155 0.1314 243.17), oklch(0.55 0.15 300))"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl text-left font-bold text-white">
                    AI Analytics Assistant
                  </h2>
                  <p className="text-sm" style={{ color: "oklch(0.85 0.08 243.17)" }}>
                    Analyze data, get insights, and receive recommendations
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 h-64 overflow-y-auto">
                <div className="space-y-4">
                  {aiMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl ${
                          message.role === "user"
                            ? "bg-white text-gray-900"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 text-white p-3 rounded-xl">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                          <span
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></span>
                          <span
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input */}
              <form onSubmit={handleAiSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask about revenue, passengers, reviews, trends..."
                  className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white rounded-xl font-semibold transition flex items-center gap-2"
                  style={{ color: "oklch(0.6155 0.1314 243.17)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.6155 0.1314 243.17 / 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </form>

              {/* Quick Questions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Analisis pendapatan",
                  "Trend penumpang",
                  "Review & rating",
                  "Pertanyaan contact us",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setAiInput(question)}
                    className="px-3 py-1.5 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;