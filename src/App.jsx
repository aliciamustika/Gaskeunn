import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from './context/BookingContext';
import "leaflet/dist/leaflet.css";
import ScrollToTop from "./components/scrolltotop";

import "./App.css";
import Welcome from "./components/welcome";
import Authentication from "./components/authentication";
import Footer from "./components/footer";
import Register from "./components/register";
import { NotificationProvider } from "./page/Penumpang/notificationContext";

// Penumpang
import Home from "./page/Penumpang/home";
import Navbar from "./page/Penumpang/navbar";
import Booking from "./page/Penumpang/booking";
import News from "./page/Penumpang/news";
import History from "./page/Penumpang/history";
import ContactUs from "./page/Penumpang/contactus";
import Profile from "./page/Penumpang/profil";
import AboutUs from "./page/Penumpang/aboutus";
import RouteSchedule from "./page/Penumpang/rutejadwal";
import Schedule from "./page/Penumpang/schedule";
import RouteP from "./page/Penumpang/route";
import Notification from "./page/Penumpang/notification";
import DetailTicket from "./page/Penumpang/detailBarcode";

// Supir
import HomeS from "./page/Sopir/home";
import NewsS from "./page/Sopir/news";
import NavbarS from "./page/Sopir/navbar";
import ProfileS from "./page/Sopir/profil";
import Order from "./page/Sopir/order";
import WorkHistory from "./page/Sopir/workhistory";
import AboutUsS from "./page/Sopir/abooutus";
import ScheduleS from "./page/Sopir/schedule";
import RouteS from "./page/Sopir/route";
import RouteScheduleS from "./page/Sopir/routeschedule";
import ContactUsS from "./page/Sopir/contactus";

// Admin
import AdminPage from "./page/Admin/adminpage";

function App() {
  return (
    <>
      {/* NotificationProvider membungkus semua Routes */}
      <BookingProvider>
      <NotificationProvider>
        <ScrollToTop />
        <Routes>
          {/* COMPONENTS */}
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/register" element={<Register />} />

          {/* PAGE | PENUMPANG */}
          <Route path="/home" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/news" element={<News />} />
          <Route path="/history" element={<History />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/routeschedule" element={<RouteSchedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/route" element={<RouteP />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/detail-ticket/:id" element={<DetailTicket />} />

          {/* PAGE | SOPIR */}
          <Route path="/homesopir" element={<HomeS />} />
          <Route path="/newssopir" element={<NewsS />} />
          <Route path="/navbarsopir" element={<NavbarS />} />
          <Route path="/profilesopir" element={<ProfileS />} />
          <Route path="/order" element={<Order />} />
          <Route path="/workhistory" element={<WorkHistory />} />
          <Route path="/aboutussopir" element={<AboutUsS />} />
          <Route path="/schedulesopir" element={<ScheduleS />} />
          <Route path="/routesopir" element={<RouteS />} />
          <Route path="/routeschedulesopir" element={<RouteScheduleS />} />
          <Route path="/contactusSopir" element={<ContactUsS />} />

          {/* PAGE | ADMIN */}
          <Route path="/adminpage" element={<AdminPage />} />
          
        </Routes>
      </NotificationProvider>
      </BookingProvider>
    </>
  );
}

export default App;
