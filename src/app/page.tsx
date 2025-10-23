"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function HomePage() {
  const cards = [
    {
      letter: 'A',
      title: 'Affordable Financing',
      description: 'Access to tailored financial solutions for your living needs.',
      video: '/videos/financing.mp4'
    },
    {
      letter: 'L',
      title: 'Living Design',
      description: 'Customized living spaces designed to your specifications.',
      video: '/videos/design.mp4'
    },
    {
      letter: 'S',
      title: 'Streamlined Approvals',
      description: 'Fast and efficient approval processes for your peace of mind.',
      video: '/videos/approval.mp4'
    },
    {
      letter: 'C',
      title: 'Complete Handover',
      description: 'Full project completion with quality assurance and support.',
      video: '/videos/handover.mp4'
    }
  ];

  const [hoveredCard, setHoveredCard] = useState<{title: string, description: string} | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 20,
        y: (e.clientY - window.innerHeight / 2) / 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Transparent Header */}
      <header className="bg-transparent py-3 absolute top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="flex items-center space-x-4 mb-3 md:mb-0">
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="60" width="60" height="20" fill="#F47C20" />
                <polygon points="20,60 50,30 80,60" fill="#F47C20" />
                <rect x="30" y="40" width="40" height="20" fill="#000000" />
              </svg>
            </div>
            <div className="text-white text-xl font-bold whitespace-nowrap">
              Affordable Living Solutions Company
            </div>
          </div>

          <nav className="flex space-x-8 text-white">
            <Link href="/" className="hover:text-[#da1] transition">Home</Link>
            <Link href="/about" className="hover:text-[#da1] transition">About Us</Link>
            <Link href="/products" className="hover:text-[#da1] transition">Our Products</Link>
            <Link href="/how-it-works" className="hover:text-[#da1] transition">How it Works</Link>
            <Link href="/more" className="hover:text-[#da1] transition">More</Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH VIDEO BACKGROUND & MOUSE TRACKING */}
      <div 
        className="w-full min-h-screen relative overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Video Background - NO BLUR, FULL CLARITY */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Overlay - DARK GRADIENT (BEST PRACTICE) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

        <div className="max-w-7xl mx-auto relative z-10 pt-24 pb-16 px-4">
          {/* Floating Title & Description */}
          {hoveredCard && (
            <div className="mb-8 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
                {hoveredCard.title}
              </h2>
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto animate-fadeIn">
                {hoveredCard.description}
              </p>
            </div>
          )}

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {cards.map((card, index) => {
              const videoRef = useRef<HTMLVideoElement>(null);
              const [isHovered, setIsHovered] = useState(false);

              return (
                <div
                  key={card.letter}
                  className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/5 shadow-sm bg-black/5 backdrop-blur-md transition-all duration-500"
                  style={{
                    flex: isHovered ? 2 : 1,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isHovered ? 10 : 1,
                    transition: 'flex 0.4s ease-out, transform 0.4s ease-out, z-index 0.4s ease-out',
                  }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setHoveredCard({title: card.title, description: card.description});
                    if (videoRef.current) {
                      videoRef.current.style.opacity = '1';
                      videoRef.current.play().catch(() => { });
                    }
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    if (!document.querySelector('.group:hover')) {
                      setHoveredCard(null);
                    }
                    if (videoRef.current) {
                      videoRef.current.style.opacity = '0';
                      videoRef.current.pause();
                    }
                  }}
                >
                  {/* Video */}
                  <video
                    ref={videoRef}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                  >
                    <source src={card.video} type="video/mp4" />
                  </video>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end p-6 h-full">
                    {/* LETTER IS PERFECTLY CENTERED VISUALLY + FADES ON HOVER */}
                    <div
                      className="relative h-[70%] flex items-center justify-center"
                      style={{
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <span
                        className="text-[6rem] md:text-[8rem] font-bold text-[#d6a412] drop-shadow-lg"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          lineHeight: '1',
                        }}
                      >
                        {card.letter}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ABOUT US SECTION - OVERLAY ON TOP OF HERO */}
      <div className="w-full bg-white py-16 px-4 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* IMAGE CONTAINER - LEFT SIDE */}
          <div className="w-full md:w-1/2">
            <img
              src="/image/about-us.png" // ← Correct path based on your file structure
              alt="About Us"
              className="rounded-2xl w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* TEXT CONTENT - RIGHT SIDE */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">About Us</h2>
            <p className="text-lg md:text-xl text-black leading-relaxed mb-8">
              What we offer is a full Lock-Key solution. Starting from Financing, we guide you through every step — from design and approvals to the final handover. Our mission is to simplify the journey for our clients by offering personalised advice, tailored recommendations, and access to the most suitable solutions available.
            </p>

            {/* TEXT ABOVE BUTTON */}
            <p className="text-lg text-black mb-4">
              To find out more information,
            </p>

            {/* INTERACTIVE OVAL BUTTON */}
            <div className="relative inline-block">
              {/* Multiple Oval Outlines (visible at idle) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="absolute border-2 border-black rounded-full"
                    style={{
                      width: `${220 - i * 15}px`,
                      height: `${90 - i * 7}px`,
                      opacity: `${0.15 - i * 0.03}`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                ))}
              </div>

              {/* Single Oval Button (visible on hover) - Changes to Hero Background Color */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="w-48 h-18 rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor: '#d6a412', // Hero section background color
                    width: '192px',
                    height: '72px',
                  }}
                ></div>
              </div>

              {/* Button with Updated Text */}
              <button className="relative z-10 px-12 py-6 bg-transparent border-none text-black font-bold text-lg cursor-pointer group">
                Contact us now
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-500 text-sm relative z-40">
        © {new Date().getFullYear()} Affordable Living Solutions Company (ALSC)
      </footer>
    </div>
  );
}