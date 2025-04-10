import Footer from "@/layouts/Footer/Footer";
import Header from "@/layouts/Header/Header";
import React from "react";

export const metadata = {
  title: "MSCSC - Monipur School and College Science Club",
  openGraph: {
    title: "MSCSC - Monipur School and College Science Club",
    url: "https://mscsc.netlify.app/",
  },
  twitter: {
    title: "MSCSC - Monipur School and College Science Club",
    site: "https://mscsc.netlify.app/",
  },
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
