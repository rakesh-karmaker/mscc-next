import React from "react";

export const metadata = {
  title: "MSCSC - Activities",
  openGraph: {
    title: "MSCSC - Activities",
    url: "https://mscsc.netlify.app/activities/",
  },
  twitter: {
    title: "MSCSC - Activities",
    site: "https://mscsc.netlify.app/activities/",
  },
};

export default async function ActivitiesLayout({
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
