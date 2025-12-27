"use client";

import React from "react";
import { useRouter } from "next/navigation";
// 👇 Make sure this path points to your actual Context file
import { useLanguage } from "../../../context/LanguageContext"; 

export default function JourneyPage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Access the specific section for this page
  // Ensure your JSON files (en.js, fr.js, etc.) have the 'journeyPage' key!
  const content = t.journeyPage;

  // Safety check to prevent crashing if translation is missing
  if (!content) {
    return <div className="p-10 text-white">Loading... (Translation data missing)</div>;
  }

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      
      {/* Background Image — NO BLUR */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <img
          src="/ed-pharma/bg4.jpg"
          alt={content.header.bgImageAlt || "Background"}
          className="w-full h-full object-cover brightness-75"
        />
        {/* LIGHT overlay so image remains visible */}
        <div className="absolute inset-0 bg-slate-900/20" />
      </div>

      {/* Foreground content */}
      <div className="px-4 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex flex-col gap-3 mb-10">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="w-fit flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"
            >
              {/* Note: I removed the manual arrow so RTL languages (Arabic) handle it correctly via the JSON data */}
              {content.header.back}
            </button>

            {/* Tag */}
            <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-[#1c4078] text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              {content.header.tag}
            </span>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              {content.header.title}
            </h1>

            <p className="text-white font-medium max-w-2xl text-sm md:text-base drop-shadow-md">
              {content.header.subtitle}
            </p>
          </div>

          {/* Glass Card */}
          <div className="bg-white/60 backdrop-blur-3xl border border-white/50 shadow-[0_24px_80px_rgba(15,23,42,0.5)] overflow-hidden text-slate-900 rounded-3xl">

            {/* Top Row: Origins + Image */}
            <div className="px-6 md:px-10 pt-8 pb-6 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 items-center border-b border-slate-300/60">
              <div>
                <h2 className="text-3xl font-extrabold text-[#1c4078]">
                  {content.introSection.title}
                </h2>
                <p className="mt-4 text-slate-900 font-medium leading-relaxed text-sm md:text-base">
                  {content.introSection.paragraph}
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-3 bg-[#3268a0]/20 blur-xl rounded-3xl" />
                  <img
                    src="/ed-pharma/team.jpg"
                    alt={content.introSection.imageAlt}
                    // Fixed Tailwind classes (w-70 -> w-72)
                    className="
                      relative rounded-3xl object-cover border-4 border-white/60 shadow-xl
                      w-72 h-48
                      md:w-52 md:h-52
                      lg:w-64 lg:h-64
                      xl:w-72 xl:h-72
                      transition-all duration-500
                    "
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Sections Loop */}
            <div className="px-6 md:px-10 pb-10 pt-6 space-y-10">
              {content.sections && content.sections.map((section, index) => (
                <section key={index}>
                  <h3 className="text-xl font-bold text-[#3268a0]">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-slate-900 leading-relaxed text-sm md:text-base">
                    {section.intro}
                  </p>
                  
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 list-disc ml-5 text-slate-900 font-medium leading-relaxed text-sm md:text-base">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Closing Section */}
              <section>
                <p className="mt-3 text-slate-900 font-bold italic leading-relaxed text-sm md:text-base border-l-4 border-[#1c4078] pl-4">
                  {content.closing}
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}