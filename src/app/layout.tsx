import type { Metadata } from "next";
import "./globals.css";
import { MemberProvider } from "@/context/membersProvider";
import QueryProvider from "@/context/queryProvider";
import { Toaster } from "react-hot-toast";
import { ActivitiesProvider } from "@/context/avtivitiesProvider";

export const metadata: Metadata = {
  title: "MSCSC - Monipur School and College Science Club",
  authors: [{ name: "Rakesh Karmaker" }],
  description:
    "MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy enthusiasts, offering top-notch learning, hands-on experiences, and expert guidance",
  verification: {
    google: "WuHsQ-mp86N5c3Bkmbce7fzBsgW3wN1JiuwT9o9FPTA",
  },
  keywords: [
    "math",
    "science",
    "biology",
    "astronomy",
    "IT",
    "science club",
    "club",
    "mubc",
    "mubcsc",
    "mscsc",
    "monipur high school and college science club",
    "monipur high school and college club",
    "monipur school and college science club",
    "monipur school and college club",
  ],
  openGraph: {
    siteName: "MSCSC",
    type: "website",
    title: "MSCSC - Monipur High School and College Science Club",
    description:
      "MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy enthusiasts, offering top-notch learning, hands-on experiences, and expert guidance",
    url: "https://mscsc.netlify.app/",
    images: [
      {
        url: "https://mscsc.netlify.app/link-img.jpg",
        width: 200,
        height: 200,
        alt: "Image of MSCSC site",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MSCSC - Monipur High School and College Science Club",
    description:
      "MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy enthusiasts, offering top-notch learning, hands-on experiences, and expert guidance",
    creator: "Rakesh Karmaker",
    images: ["https://mscsc.netlify.app/link-img.jpg"],
    site: "https://mscsc.netlify.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <ActivitiesProvider>
            <MemberProvider>{children}</MemberProvider>
          </ActivitiesProvider>
        </QueryProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
