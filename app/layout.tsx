import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Generator Studio",
  description: "Generate social media shots, shot lists, and scripts tailored to your brand style"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
