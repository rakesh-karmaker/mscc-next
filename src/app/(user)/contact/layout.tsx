import React from "react";

export const metadata = {
  title: "MSCSC - Contact Us",
  openGraph: {
    title: "MSCSC - Contact Us",
    url: "https://mscsc.netlify.app/contact/",
  },
  twitter: {
    title: "MSCSC - Contact Us",
    site: "https://mscsc.netlify.app/contact/",
  },
};

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
