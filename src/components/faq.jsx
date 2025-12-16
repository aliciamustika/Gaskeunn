// src/components/FAQ.js
import React from 'react';

const FAQItem = ({ question, answer }) => (
  // Menggunakan tag <details> untuk fungsionalitas accordion sederhana tanpa state React
  <div className="border-b border-gray-200">
    <details className="group py-4">
      <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300">
        {question}
        <span className="text-blue-600 group-open:rotate-180 transform transition duration-300 shrink-0 ml-4">
          {/* Icon Plus/Minus atau Chevron */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </summary>
      <p className="text-gray-600 mt-3 pr-4">{answer}</p>
    </details>
  </div>
);

const FAQ = () => {
  const faqData = [
    { question: "Bagaimana cara memesan tiket shuttle?", answer: "Anda bisa memesan tiket melalui aplikasi Daskeunn dengan memilih rute, tanggal, dan waktu keberangkatan yang diinginkan. Prosesnya sangat mudah dan cepat!" },
    { question: "Apa bedanya Shuttle dengan Bus Charter?", answer: "Shuttle melayani rute tetap dengan jadwal reguler (seperti bus kampus), sedangkan Bus Charter adalah pemesanan bus untuk keperluan khusus/rombongan dengan rute yang dapat disesuaikan." },
    { question: "Apakah bisa membatalkan pesanan?", answer: "Kebijakan pembatalan bergantung pada jenis tiket dan waktu pembatalan. Untuk Shuttle, pembatalan dapat dilakukan 2 jam sebelum keberangkatan dengan potongan biaya administrasi." },
    { question: "Bagaimana jika bus terlambat?", answer: "Kami selalu berusaha tepat waktu. Jika terjadi keterlambatan, Anda akan menerima notifikasi di aplikasi dan dapat memantau posisi bus melalui fitur Real-Time Tracking." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
        Frequently Asked
      </h2>
      <div className="max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;