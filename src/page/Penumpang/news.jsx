import React, { useEffect } from "react";
import { ChevronRight, MapPin, Mail, Phone } from "lucide-react";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import Binus from "../../assets/img/binus@malang.jpg"
import Bus from "../../assets/img/bus.jpg"
import Stasiunmalang from "../../assets/img/stasiunmalang.jpg"
import Araya from "../../assets/img/araya.jpg"
import Bencana from "../../assets/img/bencana.jpg"
import Pohon from "../../assets/img/pohonberingin.jpg"
import Wisuda from "../../assets/img/wisuda.jpg"
import Alumni from "../../assets/img/alumni.jpg"

const GaskeunnNews = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const featuredNews = {
    title: "Kapolresta Malang Kota Inisiasi Buka Posko Tanggap Bencana",
    source: "CNN Indonesia",
    description:
      "Kapolresta Malang Kota Kombes Pol Nanang Haryono mengapresiasi pendirian Posko Tanggap Bencana Langkah ini sebagai bentuk kesigapsiagaan menghadapi bencana alam maupun bencana kemanusiaan...",
    image: [Bencana],
  };

  const sideNews = [
    {
      title: "Wisuda Binus Malang, 85,93 Persen Lulus dan Langsung Dapat Kerja",
      source: "CNN Indonesia",
      image: [Wisuda],
    },
    {
      title: "Wisuda Binus Malang, 85,93 Persen Lulus dan Langsung Dapat Kerja",
      source: "CNN Indonesia",
      image: [Wisuda],
    },
    {
      title: "Wisuda Binus Malang, 85,93 Persen Lulus dan Langsung Dapat Kerja",
      source: "CNN Indonesia",
      image: [Wisuda],
    },
  ];

  const latestNews = [
    {
      title:
        "Pohon Beringin Timpa 2 Orang dan 3 Kendaraan di Kecamatan Klojen Kota Malang",
      source: "Radar Malang",
      image: [Pohon],
    },
    {
      title:
        "Alumni Binus Malang Mendunia, Buktikan Siap Hadapi Tantangan Global",
      source: "malangposcomedia.id",
      image: [Alumni],
    },
    {
      title:
        "Binus @Malang Menghadirkan Fasilitas Baru, Shuttle Bus Gaskeunn! Web Karya Mahasiswa",
      source: "Radar Malang",
      image: [Bus],
    },
  ];

  const bannerImages = [
    [Araya],
    [Binus],
    [Stasiunmalang],
    [Bus],
  ];

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
        {/* Header */}
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-orange-100/50 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="text-center space-y-4 animate-fadeIn">
              <h1 className="text-6xl md:text-7xl font-black bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
                NEWS
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                A reliable source of information about the campus environment,
                city, and Gaskeunn services, providing relevant news for
                students and the community.
              </p>
            </div>
          </div>
        </div>

        {/* Banner Images */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bannerImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured News Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Featured */}
            <div className="lg:col-span-2">
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="relative h-104 overflow-hidden">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                      {featuredNews.source}
                    </span>
                    <h2 className="text-3xl font-black text-white mb-3 leading-tight">
                      {featuredNews.title}
                    </h2>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-4">
                      {featuredNews.description}
                    </p>
                    <button className="inline-flex items-center space-x-2 text-orange-300 hover:text-orange-200 font-semibold transition-colors group/btn">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side News */}
            <div className="space-y-4">
              {sideNews.map((news, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
                >
                  <div className="flex gap-4 p-4">
                    <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-orange-600 mb-2 block">
                        {news.source}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:text-orange-600 transition-colors leading-snug">
                        {news.title}
                      </h3>
                      <button className="mt-2 text-xs font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center space-x-1 group/link">
                        <span>Read More</span>
                        <ChevronRight className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-4">
              Explore Our Latest News
            </h2>
            <p className="text-gray-600 text-lg">
              Explore a variety of curated news stories—from campus information
              and Malang city dynamics to important updates from Gaskeunn.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-left">
            {[...latestNews, ...latestNews].map((news, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full mb-3">
                    {news.source}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                    {news.title}
                  </h3>
                  <button className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors group/btn">
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default GaskeunnNews;