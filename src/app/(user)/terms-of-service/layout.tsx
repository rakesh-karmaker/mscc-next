import React from "react";

export const metadata = {
  title: "MSCSC - Terms of Service",
  openGraph: {
    title: "MSCSC - Terms of Service",
    url: "https://mscsc.netlify.app/terms-of-service/",
  },
  twitter: {
    title: "MSCSC - Terms of Service",
    site: "https://mscsc.netlify.app/terms-of-service/",
  },
};

export default async function TermsLayout({
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
