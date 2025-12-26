// AdminDashboard with Debug Logs
// Paste this and check browser console for debugging info

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Users, FileSpreadsheet } from 'lucide-react';

// Sample Data
const passengerData = [
  { id: 1, name: 'Ni Putu Saraswati', nim: '2902654051', pickupPoint: 'Araya', destination: 'BINUS University', time: '06:45', status: 'Completed', bus: 1, seat: 12 },
  { id: 2, name: 'Kadek Samuel', nim: '2902654052', pickupPoint: 'Telaga Golf', destination: 'BINUS University', time: '06:45', status: 'Ongoing', bus: 1, seat: 8 },
  { id: 3, name: 'Made Wijaya', nim: '2902654053', pickupPoint: 'Bundaran PBI', destination: 'BINUS University', time: '07:00', status: 'Completed', bus: 2, seat: 5 },
];

function AdminDashboardDebug() {
  const [searchQuery, setSearchQuery] = useState('');

  // Debug: Log whenever searchQuery changes
  useEffect(() => {
    console.log('🔍 Search Query Changed:', searchQuery);
  }, [searchQuery]);

  // Search filter function
  const filterBySearch = (items, fields) => {
    console.log('📊 filterBySearch called with query:', searchQuery);
    
    if (!searchQuery.trim()) {
      console.log('✅ No search query, returning all items:', items.length);
      return items;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = items.filter(item => 
      fields.some(field => {
        const value = item[field]?.toString().toLowerCase();
        const matches = value?.includes(query);
        if (matches) {
          console.log(`✓ Match found: ${field} = ${item[field]}`);
        }
        return matches;
      })
    );
    
    console.log('✅ Filtered results:', filtered.length, 'items');
    return filtered;
  };

  const filteredPassengers = filterBySearch(passengerData, ['name', 'nim', 'pickupPoint', 'destination', 'status']);

  console.log('🎯 Render - Total:', passengerData.length, 'Filtered:', filteredPassengers.length);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    console.log('⌨️ Input changed to:', newValue);
    setSearchQuery(newValue);
  };

  const handleClearSearch = () => {
    console.log('🗑️ Clearing search');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Search Debug Mode</h1>
        
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h2 className="text-lg font-semibold mb-4">Search Bar</h2>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search passengers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Current Search:</strong> "{searchQuery}" <br/>
              <strong>Results:</strong> {filteredPassengers.length} of {passengerData.length} items
            </p>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold">Daily Passengers</h2>
              {searchQuery && (
                <span className="text-sm text-gray-500">
                  ({filteredPassengers.length} of {passengerData.length} results)
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">NIM</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Pickup Point</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPassengers.length > 0 ? (
                  filteredPassengers.map((passenger) => (
                    <tr key={passenger.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">{passenger.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{passenger.nim}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{passenger.pickupPoint}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {passenger.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">
                      ❌ No passengers found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
          <h3 className="font-bold text-yellow-800 mb-2">🐛 Debug Instructions:</h3>
          <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
            <li>Open Browser Console (F12)</li>
            <li>Type something in the search box</li>
            <li>Watch the console for logs with icons: 🔍 ⌨️ 📊 ✅</li>
            <li>If you see logs, search IS working!</li>
            <li>If NO logs appear, there's a rendering issue</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardDebug;