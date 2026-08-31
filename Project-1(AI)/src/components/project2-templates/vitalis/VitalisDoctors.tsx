"use client";

import { Star, Video, Calendar } from "lucide-react";

export default function VitalisDoctors() {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins, MD",
      specialty: "Chief Cardiologist & Internal Medicine",
      hospital: "Johns Hopkins Medical Center",
      rating: "4.9",
      reviews: "1,420",
      avatarBg: "from-[#0284C7] to-[#0369A1]",
      initials: "SJ",
    },
    {
      name: "Dr. Aris Thorne, PhD",
      specialty: "Lead Neurologist & Cognitive Health",
      hospital: "Stanford Health Platform",
      rating: "5.0",
      reviews: "980",
      avatarBg: "from-[#059669] to-[#047857]",
      initials: "AT",
    },
    {
      name: "Dr. Maya Patel, MD",
      specialty: "Pediatric & Family Telemedicine",
      hospital: "Boston Children's Care",
      rating: "4.9",
      reviews: "2,150",
      avatarBg: "from-[#0D9488] to-[#0F766E]",
      initials: "MP",
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            CERTIFIED SPECIALISTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2942]">
            Consult With World-Class Doctors
          </h2>
          <p className="text-base text-[#475569]">
            Book instant 1-on-1 virtual telehealth visits or schedule in-person clinic appointments.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${doc.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                    {doc.initials}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{doc.rating} ({doc.reviews})</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-bold text-[#059669] mt-0.5">{doc.specialty}</p>
                  <p className="text-xs text-gray-500 mt-1">{doc.hospital}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white py-2.5 rounded-xl font-bold text-xs transition-colors">
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Call</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 py-2.5 rounded-xl font-bold text-xs transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
