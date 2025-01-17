import type { Metadata } from "next";
import localFont from "next/font/local";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import Header from "@/components/Header";
import StoreProvider from "@/lib/providers/store-provider";
import "./globals.css";
import { COOKIE_TOKEN } from "@/lib/constants";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN)?.value || null;

  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CssBaseline />
        <StoreProvider isAuthenticated={!!token}>
          <Header />
          <Toolbar />
          <Container sx={{ padding: 2 }}>{children}</Container>
        </StoreProvider>
      </body>
    </html>
  );
}
