import { Geist, Geist_Mono } from "next/font/google";

import styles from '@/app/globals.module.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Peanut Drop",
  description: "Peanut Drop developed by Peanut Labs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body> 
    </html>
  );
}
