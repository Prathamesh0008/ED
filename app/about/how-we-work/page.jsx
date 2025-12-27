"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";

export default function Page() {
  const router = useRouter();
  const { t } = useLanguage();

const H = {
  header: {
    back: "Back",
    tag: t?.howWeWork?.tag,
    title: t?.howWeWork?.title,
    subtitle: t?.howWeWork?.description1,
  },
  introCard: {
    title: t?.howWeWork?.tag,
    description: t?.howWeWork?.description2,
  },
  sections: [],
};


  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Background Image */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 min-h-screen"
        aria-hidden="true"
      >
        <img
          src="/ed-pharma/bg4.jpg"
          alt="Background"
          className="w-full h-full min-h-screen object-cover brightness-75"
        />
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
              ← {H.header.back}
            </button>

            {/* Tag */}
            <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-[#1c4078] text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              {H.header.tag}
            </span>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              {H.header.title}
            </h1>

            <p className="text-white font-medium max-w-2xl text-sm md:text-base drop-shadow-md">
              {H.header.subtitle}
            </p>
          </div>

          {/* Glass Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_24px_80px_rgba(15,23,42,0.5)] overflow-hidden text-slate-900">
            {/* Top Row */}
            <div className="px-6 md:px-10 pt-8 pb-6 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 items-center border-b border-slate-300/50">
              <div>
                <h2 className="text-3xl font-extrabold text-[#1c4078]">
                  {H.introCard.title}
                </h2>

                <p className="mt-4 text-slate-800 font-medium leading-relaxed text-sm md:text-base">
                  {H.introCard.description}
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-3 bg-[#3268a0]/20 blur-xl rounded-3xl" />
                  <img
                    src="/ed-pharma/warehouse.jpg"
                    alt="ED Pharma Warehouse"
                    className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl object-cover border-4 border-white/60 shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="px-6 md:px-10 pb-10 pt-6 space-y-10">
              {H.sections.map((sec, i) => (
                <section key={i}>
                  <h3 className="text-xl font-bold text-[#3268a0]">
                    {sec.title}
                  </h3>

                  <p className="mt-3 text-slate-800 leading-relaxed text-sm md:text-base">
                    {sec.description}
                  </p>

                  {sec.bullets && (
                    <ul className="mt-4 space-y-2 list-disc ml-5 text-slate-800 font-medium leading-relaxed text-sm md:text-base">
                      {sec.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {sec.highlight && (
                    <p className="mt-4 text-slate-800 font-semibold italic leading-relaxed text-sm md:text-base border-l-4 border-[#1c4078] pl-4">
                      {sec.highlight}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
