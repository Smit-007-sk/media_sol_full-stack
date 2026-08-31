"use client";

import { Crown, ArrowRight, Menu } from "lucide-react";

export default function DeviceShowcase() {
  return (
    <div className="relative w-full max-w-[650px] lg:max-w-none mx-auto flex justify-center items-center py-4 select-none">
      {/* Background Soft Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-[#F5EAD4]/70 via-[#FBF8F1]/40 to-transparent blur-2xl -z-10 rounded-full pointer-events-none" />

      {/* Main Laptop & Phone Composite Container */}
      <div className="relative w-full aspect-[16/11] max-w-[720px] flex items-center justify-center">

        {/* 1. LAPTOP MOCKUP */}
        <div className="relative w-[82%] sm:w-[85%] z-10 laptop-shadow rounded-[1.2rem] bg-[#1E2022] p-2 sm:p-3 border border-gray-700/50 transform lg:hover:scale-[1.01] transition-transform duration-300">
          {/* Laptop Top Camera Bar */}
          <div className="w-full h-3 bg-[#17181A] rounded-t-[0.8rem] flex items-center justify-center relative mb-1">
            <div className="w-2 h-2 rounded-full bg-[#0D0E0F] border border-gray-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
            </div>
          </div>

          {/* Laptop Screen Viewport */}
          <div className="relative aspect-[16/10] w-full bg-[#FAF7F0] rounded-md overflow-hidden text-[#1F2421] flex flex-col justify-between border border-gray-800/40">

            {/* Laptop Website Header */}
            <div className="w-full px-3 py-2 bg-[#F6F1E6] border-b border-[#E5DACB] flex items-center justify-between text-[8px] sm:text-[10px]">
              <div className="flex items-center gap-1.5 font-bold">
                <Crown className="w-3 h-3 text-[#B88E44]" />
                <span className="font-serif tracking-tight text-[10px] sm:text-xs">EMPEROR</span>
                <span className="text-[6px] sm:text-[7px] text-[#B88E44] tracking-widest hidden sm:inline">SMART SOLUTIONS</span>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 text-[#4A524D] font-medium text-[8px]">
                <span className="text-black font-semibold">Home</span>
                <span>About</span>
                <span>Services</span>
                <span>Portfolio</span>
                <span>Blog</span>
                <span>Contact</span>
              </div>
              <div className="bg-[#0F382C] text-white text-[7px] sm:text-[9px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span>Get Started</span>
              </div>
            </div>

            {/* Laptop Screen Body Content */}
            <div className="relative flex-1 grid grid-cols-12 overflow-hidden bg-gradient-to-br from-[#FBF8F1] via-[#FAF4EA] to-[#F3ECE0]">
              
              {/* Left Column Inside Laptop Screen */}
              <div className="col-span-6 p-3 sm:p-5 flex flex-col justify-center z-10 space-y-1.5 sm:space-y-3">
                <h3 className="font-serif text-xs sm:text-lg lg:text-xl font-bold leading-tight text-[#1F2421]">
                  Digital Solutions <br />
                  for a <span className="font-serif italic text-[#B88E44]">Smarter Tomorrow</span>
                </h3>
                <p className="text-[7px] sm:text-[10px] text-gray-600 line-clamp-2 leading-relaxed max-w-[200px]">
                  We design and develop modern websites that grow your business.
                </p>
                <div>
                  <button className="bg-[#0F382C] text-white text-[7px] sm:text-[9px] px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 hover:bg-[#08291F]">
                    <span>Explore Our Work</span>
                    <ArrowRight className="w-2 h-2" />
                  </button>
                </div>
              </div>

              {/* Right Column Inside Laptop Screen - Glass Architecture Image */}
              <div className="col-span-6 relative h-full overflow-hidden">
                {/* Modern Architectural Building Facade Illustration / Render */}
                <svg
                  viewBox="0 0 300 240"
                  className="w-full h-full object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EBF4F6" />
                      <stop offset="50%" stopColor="#D5E6EA" />
                      <stop offset="100%" stopColor="#FAF4EA" />
                    </linearGradient>
                    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3E45" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#2D5A64" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0F282F" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="goldReflect" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D8B775" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#B88E44" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Sky background */}
                  <rect width="300" height="240" fill="url(#skyGrad)" />

                  {/* Diagonal Modern Skyscraper */}
                  <polygon points="60,240 180,0 300,0 300,240" fill="url(#glassGrad)" />
                  <polygon points="120,240 220,0 300,0 240,240" fill="url(#goldReflect)" />

                  {/* Architectural Grid Lines */}
                  {Array.from({ length: 14 }).map((_, i) => (
                    <line
                      key={i}
                      x1={40 + i * 20}
                      y1="240"
                      x2={160 + i * 20}
                      y2="0"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.2"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={i}
                      x1="60"
                      y1={i * 20}
                      x2="300"
                      y2={i * 20 + 40}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Laptop Screen Footer Metric Bar */}
            <div className="w-full px-3 py-1.5 bg-[#F1E8DA] border-t border-[#E5DACB] flex items-center justify-around text-[7px] sm:text-[9px] font-semibold text-[#1F2421]">
              <div className="text-center">
                <span className="font-bold text-[#0F382C]">250+</span>
                <span className="text-[6px] sm:text-[7px] text-gray-600 block">Projects Delivered</span>
              </div>
              <div className="w-px h-3 bg-[#D5C6B1]" />
              <div className="text-center">
                <span className="font-bold text-[#0F382C]">120+</span>
                <span className="text-[6px] sm:text-[7px] text-gray-600 block">Happy Clients</span>
              </div>
              <div className="w-px h-3 bg-[#D5C6B1]" />
              <div className="text-center">
                <span className="font-bold text-[#0F382C]">98%</span>
                <span className="text-[6px] sm:text-[7px] text-gray-600 block">Satisfaction Rate</span>
              </div>
            </div>

          </div>

          {/* Laptop Base Stand */}
          <div className="w-[110%] -ml-[5%] h-3 sm:h-4 bg-gradient-to-r from-[#2A2C2E] via-[#3E4145] to-[#2A2C2E] rounded-b-xl border-t border-gray-600 shadow-md relative flex justify-center">
            {/* Laptop Center Opening Notch */}
            <div className="w-12 sm:w-16 h-1 bg-[#1A1B1C] rounded-b-md" />
          </div>
        </div>


        {/* 2. SMARTPHONE MOCKUP (Overlapping on lower-right) */}
        <div className="absolute right-0 sm:right-[3%] bottom-[-5%] sm:bottom-[-2%] w-[34%] sm:w-[32%] z-20 phone-shadow rounded-[1.8rem] sm:rounded-[2.2rem] bg-[#121314] p-1.5 sm:p-2.5 border border-gray-700 transform rotate-1 lg:hover:rotate-0 transition-transform duration-300">
          
          {/* Phone Speaker & Dynamic Island */}
          <div className="w-full flex justify-center py-1 absolute top-2 left-0 z-30 pointer-events-none">
            <div className="w-12 sm:w-16 h-3 sm:h-4 bg-black rounded-full flex items-center justify-end px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A2634]" />
            </div>
          </div>

          {/* Phone Screen Viewport */}
          <div className="relative aspect-[9/18] w-full bg-[#FAF7F0] rounded-[1.3rem] sm:rounded-[1.7rem] overflow-hidden text-[#1F2421] flex flex-col justify-between pt-5 border border-gray-800">
            
            {/* Phone Web Header */}
            <div className="px-2.5 py-1.5 bg-[#F6F1E6] border-b border-[#E5DACB] flex items-center justify-between">
              <div className="flex items-center gap-1 font-bold">
                <Crown className="w-2.5 h-2.5 text-[#B88E44]" />
                <span className="font-serif text-[7px] sm:text-[9px]">EMPEROR</span>
              </div>
              <Menu className="w-3 h-3 text-[#1F2421]" />
            </div>

            {/* Phone Main Hero Area */}
            <div className="p-2 sm:p-3 flex flex-col justify-center space-y-1 sm:space-y-2 text-left">
              <h4 className="font-serif text-[9px] sm:text-[13px] font-bold leading-tight text-[#1F2421]">
                Modern <br />
                Web Solutions <br />
                <span className="font-serif italic text-[#B88E44]">for Growing</span> <br />
                Businesses
              </h4>
              <p className="text-[6px] sm:text-[8px] text-gray-600 font-medium">
                Build. Launch. Grow.
              </p>
              <div>
                <button className="bg-[#0F382C] text-white text-[6px] sm:text-[8px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <span>Get Started</span>
                  <ArrowRight className="w-1.5 h-1.5" />
                </button>
              </div>
            </div>

            {/* Phone Bottom Architecture Visual Image */}
            <div className="relative h-20 sm:h-28 w-full overflow-hidden mt-auto">
              <svg viewBox="0 0 160 160" className="w-full h-full object-cover">
                <defs>
                  <linearGradient id="phoneSky" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EFE5D3" />
                    <stop offset="100%" stopColor="#D8C4A4" />
                  </linearGradient>
                  <linearGradient id="phoneBldg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D5A64" />
                    <stop offset="100%" stopColor="#0F282F" />
                  </linearGradient>
                </defs>
                <rect width="160" height="160" fill="url(#phoneSky)" />
                <polygon points="20,160 100,20 160,20 160,160" fill="url(#phoneBldg)" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={i}
                    x1={10 + i * 15}
                    y1="160"
                    x2={90 + i * 15}
                    y2="20"
                    stroke="rgba(216,183,117,0.4)"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>

          </div>
        </div>


        {/* 3. POTTED INDOOR PLANT (On the right behind laptop & phone) */}
        <div className="absolute right-[-8%] sm:right-[-6%] top-[5%] w-[26%] sm:w-[28%] z-0 pointer-events-none opacity-95">
          <svg viewBox="0 0 200 320" className="w-full h-auto drop-shadow-md">
            {/* Plant Pot */}
            <path d="M60 220 L72 300 L128 300 L140 220 Z" fill="#EAE2D5" stroke="#D3C7B5" strokeWidth="3" />
            <ellipse cx="100" cy="220" rx="40" ry="10" fill="#DDD4C4" />

            {/* Plant Stems */}
            <path d="M100 220 Q90 150 70 80" stroke="#2D5838" strokeWidth="4" fill="none" />
            <path d="M100 220 Q105 140 130 60" stroke="#254D2F" strokeWidth="4" fill="none" />
            <path d="M100 220 Q80 180 40 140" stroke="#33633F" strokeWidth="3.5" fill="none" />
            <path d="M100 220 Q120 170 160 120" stroke="#2D5838" strokeWidth="3.5" fill="none" />

            {/* Leaf 1 (Top Left) */}
            <path d="M70 80 Q40 50 20 80 Q50 110 70 80 Z" fill="#2E5A39" stroke="#1E3E26" strokeWidth="1.5" />
            
            {/* Leaf 2 (Top Right) */}
            <path d="M130 60 Q160 30 180 65 Q145 95 130 60 Z" fill="#254D2F" stroke="#18361F" strokeWidth="1.5" />

            {/* Leaf 3 (Mid Left) */}
            <path d="M40 140 Q10 120 0 150 Q30 175 40 140 Z" fill="#366842" stroke="#22472C" strokeWidth="1.5" />

            {/* Leaf 4 (Mid Right) */}
            <path d="M160 120 Q190 100 200 135 Q170 155 160 120 Z" fill="#295333" stroke="#1A3821" strokeWidth="1.5" />

            {/* Leaf 5 (Center Top Large) */}
            <path d="M95 110 Q100 40 120 20 Q110 80 95 110 Z" fill="#3D734B" stroke="#244B2E" strokeWidth="1.5" />

            {/* Leaf Details & Veins */}
            <path d="M70 80 L40 75" stroke="#488258" strokeWidth="1" />
            <path d="M130 60 L155 58" stroke="#376E48" strokeWidth="1" />
          </svg>
        </div>

      </div>
    </div>
  );
}
