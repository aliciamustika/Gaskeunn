import React from 'react';

const BusSchedule = () => {
  // Data jadwal untuk setiap hari
  const scheduleData = [
    {
      day: 'SENIN',
      color: 'bg-sky-400',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
    {
      day: 'SELASA',
      color: 'bg-sky-500',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
    {
      day: 'RABU',
      color: 'bg-sky-600',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
    {
      day: 'KAMIS',
      color: 'bg-cyan-500',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
    {
      day: 'JUMAT',
      color: 'bg-sky-500',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
    {
      day: 'SABTU',
      color: 'bg-sky-400',
      schedules: [
        { departure: '6:00', arrival: '7:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '8:00', arrival: '9:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '10:00', arrival: '11:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '12:00', arrival: '13:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '14:00', arrival: '15:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
        { departure: '16:00', arrival: '17:10', route: 'BINUS > Plaza Araya > PBI > Kvadra > MHouse > BINUS' },
      ]
    },
  ];

  const ScheduleTable = ({ day, color, schedules }) => (
    <div className="border-2 border-gray-800 overflow-hidden">
      {/* Header */}
      <div className={`${color} text-white text-center py-2 font-bold text-lg border-b-2 border-gray-800`}>
        {day}
      </div>
      
      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-white border-b-2 border-gray-800">
            <th className="border-r-2 border-gray-800 py-2 px-3 text-sm font-bold text-gray-800 w-24">
              JAM<br />BERANGKAT
            </th>
            <th className="border-r-2 border-gray-800 py-2 px-3 text-sm font-bold text-gray-800 w-20">
              JAM TIBA
            </th>
            <th className="py-2 px-3 text-sm font-bold text-gray-800">
              RUTE
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index} className="bg-white border-b border-gray-800">
              <td className="border-r-2 border-gray-800 py-2 px-3 text-center text-sm font-semibold">
                {schedule.departure}
              </td>
              <td className="border-r-2 border-gray-800 py-2 px-3 text-center text-sm font-semibold">
                {schedule.arrival}
              </td>
              <td className="py-2 px-3 text-sm">
                {schedule.route}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Jadwal Bus
        </h1>
        
        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scheduleData.map((data, index) => (
            <ScheduleTable
              key={index}
              day={data.day}
              color={data.color}
              schedules={data.schedules}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusSchedule;