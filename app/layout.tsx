import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import GlobalBrandBackground from "./components/GlobalBrandBackground";
import { CartProvider } from "./components/CartContext";
// 👇 IMPORT LANGUAGE PROVIDER
import { LanguageProvider } from "../context/LanguageContext"; 
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ---------------- FONTS ---------------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ---------------- METADATA ---------------- */
export const metadata: Metadata = {
  title: "ED Pharma",
  description: "Premium European pharmaceutical products",
};

/* ---------------- ROOT LAYOUT ---------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${poppins.className}
          antialiased
        `}
      >
        {/* SVG Background */}
        <div
          className="fixed inset-0 -z-10 opacity-100 "
          style={{
            backgroundImage: "url('/bg/ee.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        {/* GLOBAL BRAND BACKGROUND */}
        {/* <GlobalBrandBackground /> */}

        {/* 👇 WRAP APPLICATION IN LANGUAGE PROVIDER */}
        <LanguageProvider>
          <CartProvider>
            {/* GLOBAL NAVBAR */}
            <Navbar />

            {/* CART DRAWER */}
            <CartDrawer />

            {/* TOAST NOTIFICATIONS */}
            <Toast />

            {/* PAGE CONTENT */}
            <main className="pt-20">{children}</main>

            {/* GLOBAL FOOTER */}
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}






// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Poppins } from "next/font/google";
// import "./globals.css";

// import GlobalBrandBackground from "./components/GlobalBrandBackground";
// import { CartProvider } from "./components/CartContext";
// import CartDrawer from "./components/CartDrawer";
// import Toast from "./components/Toast";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";



// /* ---------------- FONTS ---------------- */
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// /* ---------------- METADATA ---------------- */
// export const metadata: Metadata = {
//   title: "ED Pharma",
//   description: "Premium European pharmaceutical products",
// };

// /* ---------------- ROOT LAYOUT ---------------- */
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`
//           ${geistSans.variable}
//           ${geistMono.variable}
//           ${poppins.className}
//           antialiased
//         `}
//       >
//         {/* SVG Background */}
//   <div
//     className="fixed inset-0 -z-10 opacity-100 "
//     style={{
//       backgroundImage: "url('/bg/ee.svg')",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundSize: "cover",
//     }}
//   />
//         {/* GLOBAL BRAND BACKGROUND */}
//         {/* <GlobalBrandBackground /> */}

//         <CartProvider>
//           {/* GLOBAL NAVBAR */}
//           <Navbar />

//           {/* CART DRAWER */}
//           <CartDrawer />

//           {/* TOAST NOTIFICATIONS */}
//           <Toast />

//           {/* PAGE CONTENT */}
//           <main className="pt-20">{children}</main>

//           {/* GLOBAL FOOTER */}
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }
