"use client";

import React, { useRef } from "react";
// 👇 FIX: Using '@' usually works best. If this fails, try "../context/LanguageContext"
import { useLanguage } from "@/context/LanguageContext"; 

export default function TermsPage() {
  const sectionRefs = useRef([]);
  const { t } = useLanguage();
  
  // Access the termsPage data safely
  const content = t.termsPage;

  const scrollToSection = (index) => {
    const el = sectionRefs.current[index];
    if (!el) return;

    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Safety check
  if (!content) return null;

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-800 font-sans">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/ed-pharma/img3.jpg"
          className="h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c4078]/10 via-transparent to-[#2d6199]/10" />
      </div>

      <div className="px-4 pb-16 pt-20 md:px-6">

        {/* HEADER SECTION */}
        <section className="mx-auto max-w-4xl mb-12 text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 inline-block"
            style={{
              background: "linear-gradient(90deg, #063B8A 0%, #2A7DB8 50%, #4FB3E8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {content.header.title}
          </h1>

          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
            {content.header.subtitle}
          </p>

          <div className="mt-6 mx-auto max-w-3xl border-l-4 border-[#1c4078] bg-white/30 p-4 rounded-r-xl text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1c4078] mb-1">
              {content.header.complianceTitle}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {content.header.complianceText}
            </p>
          </div>
        </section>

        {/* SCROLLABLE SECTION */}
        <section className="mx-auto max-w-4xl">
          <div className="relative max-h-[65vh] overflow-y-auto p-2 md:p-4 custom-scrollbar">

            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar { width: 6px; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 20px; }
            `}</style>

            <div className="grid gap-4">
              {content.terms.map((item, index) => (
                <article
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className="cursor-pointer group flex flex-col gap-5 rounded-2xl bg-white/30 backdrop-blur-sm p-5 shadow-sm hover:bg-white/80 transition-all md:flex-row"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/50 text-[#1c4078] font-black text-lg">
                    {item.number}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#1c4078]">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-800">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* DETAILED SECTION */}
        <section className="mx-auto max-w-4xl mt-20 space-y-16">
          {content.terms.map((item, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
            >
              <h3 className="text-3xl font-bold text-[#063B8A] mb-3">
                {item.number}. {item.title}
              </h3>

              <p className="text-base leading-relaxed text-slate-800 whitespace-pre-line">
                {item.text}
              </p>

              <div className="mt-4 text-slate-700 text-base whitespace-pre-line leading-relaxed">
                {item.moreDetails}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
