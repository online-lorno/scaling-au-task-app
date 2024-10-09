import type { Metadata } from "next";
import localFont from "next/font/local";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import StoreProvider from "@/providers/store-provider";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scaling AU - Task Management",
  description: "A technical test for Scaling AU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CssBaseline />
        <StoreProvider>
          <Header />
          <Toolbar />
          <Container>{children}</Container>
        </StoreProvider>
      </body>
    </html>
  );
}
