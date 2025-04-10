import React from "react";

export const metadata = {
  title: "MSCSC - Privacy Policy",
  openGraph: {
    title: "MSCSC - Privacy Policy",
    url: "https://mscsc.netlify.app/privacy-policy/",
  },
  twitter: {
    title: "MSCSC - Privacy Policy",
    site: "https://mscsc.netlify.app/privacy-policy/",
  },
};

export default async function PrivacyLayout({
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
