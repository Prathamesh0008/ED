"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Offer from "../components/Offer";

export default function AboutPage() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (t && t.about) {
      setReady(true);
    }
  }, [t]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  const A = t.about;

  return (
    // 👇 REMOVED "fade-up" CLASS HERE to stop it from disappearing
    <div
      className="bg-blue-50 flex flex-col min-h-screen w-full" 
      style={{
        backgroundImage: "url('/ed-pharma/img00.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Offer />
      
      {/* Hero section */}
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.35em] text-sky-500">
            {A.hero.tag}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl bg-gradient-to-r from-sky-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            {A.hero.title}
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-slate-700">
            {A.hero.description1}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {A.hero.description2}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {A.hero.description3}
          </p>

          <button
            className="
              mt-7
              block mx-auto
              lg:inline-block lg:mx-0
              rounded-full 
              px-7 py-3 
              text-xs font-semibold uppercase tracking-[0.2em] 
              text-white 
              bg-[#063B8A]
              hover:bg-[#052F6B]
            "
          >
            {A.hero.downloadCatalogue}
          </button>
        </div>

        {/* Visual card */}
        <div className="relative w-full max-w-md self-center rounded-3xl bg-gradient-to-br from-sky-700 via-sky-500 to-cyan-400 p-1 shadow-[0_20px_60px_rgba(15,23,42,0.5)]">
          <div className="rounded-3xl bg-white p-6">
            <p className="text-xs font-semibold tracking-[0.35em] text-sky-500">
              {A.card.tag}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              <span className="text-sky-800">{A.card.titleLeft}</span>{" "}
              <span className="text-sky-500">{A.card.titleRight}</span>
            </h2>

            <p className="mt-4 text-sm text-slate-700">
              {A.card.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-800">
              {A.card.features.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${
                    i < 2
                      ? "border-sky-100 bg-sky-50"
                      : "border-cyan-100 bg-cyan-50"
                  }`}
                >
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-[11px] text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TWO IMAGE + TEXT BOXES */}
      <section className="mx-auto mb-16 max-w-6xl px-6">
        {/* First row */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.18)] lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-500">
              {A.journey.tag}
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              {A.journey.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {A.journey.description1}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {A.journey.description2}
            </p>

            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                href="/about/journey"
                className="
                  inline-block 
                  w-[90%] max-w-xs sm:w-auto
                  text-center
                  rounded-full 
                  px-5 py-2 
                  text-xs font-semibold uppercase tracking-[0.18em] 
                  text-white 
                  bg-[#063B8A]
                  hover:bg-[#052F6B]
                "
              >
                {A.journey.readMore}
              </Link>
            </div>
          </div>

          <div className="order-1 rounded-3xl bg-gradient-to-br from-sky-800 via-sky-600 to-cyan-400 p-[3px] shadow-[0_18px_45px_rgba(15,23,42,0.45)] lg:order-2">
            <div className="flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-slate-900/80">
              <img
                src="/ed-pharma/team.jpg"
                alt="ED Pharma Team"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl bg-gradient-to-br from-sky-800 via-sky-600 to-cyan-400 p-[3px] shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
            <div className="flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-slate-900/80">
              <img
                src="/ed-pharma/warehouse.jpg"
                alt="ED Pharma Warehouse"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-500">
              {A.howWeWork.tag}
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              {A.howWeWork.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {A.howWeWork.description1}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {A.howWeWork.description2}
            </p>

            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                href="/about/how-we-work"
                className="
                  inline-block 
                  w-[90%] max-w-xs sm:w-auto
                  text-center
                  rounded-full 
                  px-5 py-2 
                  text-xs font-semibold uppercase tracking-[0.18em] 
                  text-white 
                  bg-[#063B8A]
                  hover:bg-[#052F6B]
                "
              >
                {A.howWeWork.readMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Focus */}
      <section className="mx-auto mb-20 max-w-6xl px-6">
        <h3 className="text-center text-sm font-semibold tracking-[0.25em] text-sky-500">
          {A.focus.tag}
        </h3>

        <p className="mt-3 text-center text-xl font-semibold text-slate-900">
          {A.focus.title}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {A.focus.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.25)]"
            >
              <h4 className="text-base font-semibold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-2 text-slate-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
