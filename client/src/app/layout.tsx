import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const publicSans = Public_Sans({
  variable: "--ff-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <AuthProvider>
          <main className="w-full">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
