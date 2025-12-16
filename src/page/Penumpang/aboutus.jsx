// page/Penumpang/about.jsx
import React from "react";
import {
  Shield,
  Clock,
  Users,
  DollarSign,
  Award,
  Heart,
  Play,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "../../components/footer";
import Alicia from "../../assets/img/alicia.jpg";
import Cheryl from "../../assets/img/cheryl.jpeg";
import Kyoko from "../../assets/img/kyoko.jpg";
import Saras from "../../assets/img/saras.jpeg";

function AboutUs() {
  const features = [
    {
      icon: Shield,
      title: "Safe & Reliable",
      description:
        "Keamanan dan kenyamanan perjalanan Anda adalah prioritas utama kami.",
      color: "bg-[oklch(0.805_0.1545_76.47)]",
    },
    {
      icon: Clock,
      title: "Always On Time",
      description:
        "Jadwal tepat waktu dan konsisten untuk mendukung aktivitas kampus Anda.",
      color: "bg-[oklch(0.805_0.1545_76.47)]",
    },
    {
      icon: Users,
      title: "Student Friendly",
      description:
        "Layanan khusus mahasiswa BINUS dengan harga terjangkau dan mudah diakses.",
      color: "bg-[oklch(0.805_0.1545_76.47)]",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Students" },
    { number: "1000+", label: "Trips Completed" },
    { number: "99%", label: "On-Time Rate" },
    { number: "8/6", label: "Support Available" },
  ];

  const teamMembers = [
    {
      name: "Ni Putu Saraswati",
      position: "2902624635",
      image: [Saras],
      imagePosition: "object-top",
      social: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram:
          "https://www.instagram.com/putusaraswati07?igsh=MW4xdWJmdDVwczc5cg==",
      },
    },
    {
      name: "Verena Cheryl M",
      position: "2902583824",
      image: [Cheryl],
      imagePosition: 'object-center',
      social: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram:
          "https://www.instagram.com/cheryl_elby?igsh=MTJwOXdkY3ExM3JqeQ==",
      },
    },
    {
      name: "Kyoko Angela S",
      position: "2902606651",
      image: [Kyoko],
      imagePosition: 'object-center',
      social: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram:
          " https://www.instagram.com/kyoangela?igsh=MTl0ajEwdWU5c2hqNw==",
      },
    },
    {
      name: "Alicia Mustika S",
      position: "2902654051",
      image: [Alicia],
      social: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram:
          "https://www.instagram.com/lciiaa_?igsh=MWNxN3N2c2M4N3R4cA==",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-96 bg-linear-to-r from-gray-900 to-gray-800 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 to-gray-800/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-black text-white text-center">
            About us
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Label */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-2 h-2 bg-[oklch(0.805_0.1545_76.47)] rounded-full"></div>
          <span className="text-sm font-bold text-[oklch(0.805_0.1545_76.47)] uppercase tracking-wider">
            About Us
          </span>
          <div className="w-2 h-2 bg-[oklch(0.805_0.1545_76.47)] rounded-full"></div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-10">
          <span className="text-[oklch(0.805_0.1545_76.47)]">Introduction</span>{" "}
          <span className="text-black">To Best</span>
          <br />
          <span className="text-black">Campus Shuttle Service!</span>
        </h2>

        {/* Description Grid */}
        <div className="grid md:grid-cols-2 gap-9 max-w-5xl mx-auto mb-16">
          <p className="text-gray-600 text-justify leading-relaxed">
            Gaskeunn adalah layanan shuttle bus khusus untuk mahasiswa BINUS
            @Malang yang berkomitmen memberikan transportasi kampus yang aman,
            nyaman, dan terpercaya. Kami hadir untuk memudahkan mobilitas
            mahasiswa dengan jadwal yang teratur dan harga yang terjangkau.
          </p>
          <p className="text-gray-600 text-justify leading-relaxed">
            Dengan armada modern dan driver berpengalaman, kami memastikan
            setiap perjalanan Anda menyenangkan. Sistem booking online yang
            mudah dan layanan customer service 24/7 membuat Gaskeunn menjadi
            pilihan utama mahasiswa untuk transportasi harian.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center shrink-0`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-left font-black text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-left text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[oklch(0.805_0.1545_76.47)] mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Left Image - Team Working */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
              alt="Team working together"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Right Image - Video Preview */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
              alt="Video presentation"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="w-20 h-20 bg-[oklch(0.805_0.1545_76.47)] hover:bg-[oklch(0.72_0.17_76.47)] rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Label */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[oklch(0.805_0.1545_76.47)] rounded-full"></div>
            <span className="text-sm font-bold text-[oklch(0.805_0.1545_76.47)] uppercase tracking-wider">
              Our Team
            </span>
            <div className="w-2 h-2 bg-[oklch(0.805_0.1545_76.47)] rounded-full"></div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            <span className="text-[oklch(0.805_0.1545_76.47)]">Team</span>{" "}
            <span className="text-black">Members</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
            Tim profesional kami yang berdedikasi untuk memberikan layanan
            shuttle terbaik bagi mahasiswa BINUS @Malang.
          </p>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Member Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.imagePosition} transform group-hover:scale-110 transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <div className="bg-[oklch(0.805_0.1545_76.47)] rounded-2xl -mt-12 mx-auto py-4 px-6 relative z-10 shadow-xl">
                    <h3 className="text-xl font-black text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/90 font-semibold">
                      {member.position}
                    </p>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex items-center justify-center space-x-3 mt-6">
                    <a
                      href={member.social.facebook}
                      className="w-10 h-10 bg-gray-100 hover:bg-[oklch(0.805_0.1545_76.47)] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-gray-100 hover:bg-[oklch(0.805_0.1545_76.47)] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.youtube}
                      className="w-10 h-10 bg-gray-100 hover:bg-[oklch(0.805_0.1545_76.47)] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.instagram}
                      className="w-10 h-10 bg-gray-100 hover:bg-[oklch(0.805_0.1545_76.47)] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
