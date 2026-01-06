import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Mail, IdCard, GraduationCap, Monitor, Clock } from "lucide-react";
import BarcodeImage from "../../assets/img/QRIS.png";

function DetailTicket() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Ticket data - GANTI dengan data dari props atau state management
  const ticketData = {
    bookingCode: "BUS01150224",
    passenger: {
      name: "Ni Putu Saraswati",
      email: "ni.saraswati@binus.ac.id",
      binusianId: "BN138092583",
      nim: "2902654051",
    },
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex items-center gap-3 px-4 py-4">
              <button
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Detail Ticket</h1>
            </div>
          </div>

          {/* E-Ticket Section */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Your E-ticket</h2>
            
            <div className="flex flex-col items-center mb-8">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
                <img
                  src={BarcodeImage}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              {/* Booking Code */}
              <p className="text-gray-500 text-sm mb-1">Booking Code</p>
              <p className="text-2xl font-bold text-gray-900 font-mono mb-6">{ticketData.bookingCode}</p>

              <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Scan the barcode or enter the booking code when getting on the bus.
              </p>
            </div>
            </div>

            {/* Passenger Information Section */}
            <div className="mb-8">
              <h3 className="text-base text-left font-bold text-gray-900 mb-4">Passenger Information</h3>
              
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                {/* Name */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-1">Full Name</p>
                    <p className="text-gray-900 font-semibold">{ticketData.passenger.name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-1">Email Address</p>
                    <p className="text-gray-900 font-semibold break-all">{ticketData.passenger.email}</p>
                  </div>
                </div>

                {/* BINUSIAN ID */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <IdCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-1">BINUSIAN ID</p>
                    <p className="text-gray-900 font-semibold">{ticketData.passenger.binusianId}</p>
                  </div>
                </div>

                {/* NIM */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-1">NIM</p>
                    <p className="text-gray-900 font-semibold">{ticketData.passenger.nim}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information Section */}
            <div className="mb-6">
              <h3 className="text-base text-left font-bold text-gray-900 mb-4">Important Information</h3>
              
              <div className="space-y-3">
                {/* Check-in Info */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-900 text-sm font-medium leading-relaxed">
                        Show e-tickets and passenger identities during check-in.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Boarding Time Info */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-orange-900 text-sm font-medium leading-relaxed">
                        Please be at the boarding gate at least 30 minutes before departure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTicket;