import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BarcodeImage from "../../assets/img/QRIS.png";

function DetailTicket() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Ticket data
  const ticketData = {
    bookingCode: "BUS01150224",
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
              <h1 className="text-lg font-semibold text-gray-900">Detail Barcode</h1>
            </div>
          </div>

          {/* E-Ticket Section */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Your E-ticket</h2>
            
            <div className="flex flex-col items-center">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
                <img
                  src={BarcodeImage}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              {/* Booking Code */}
              <p className="text-gray-500 text-sm mb-1">Ticket Code</p>
              <p className="text-2xl font-bold text-gray-900 mb-6">{ticketData.bookingCode}</p>
              
              {/* Instruction */}
              <div className="bg-gray-50 rounded-xl p-4 max-w-xs">
                <p className="text-gray-600 text-sm text-center">
                  Scan the barcode or enter the booking code when getting on the bus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTicket;