import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymer Rheology — Interactive Educational Platform",
  description:
    "A comprehensive, interactive web application covering the fundamentals and advanced topics in polymer rheology, including viscoelasticity, dynamic moduli, rheometry, and industrial applications.",
  keywords: [
    "polymer rheology",
    "viscoelasticity",
    "storage modulus",
    "loss modulus",
    "rheometry",
    "non-Newtonian fluids",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
