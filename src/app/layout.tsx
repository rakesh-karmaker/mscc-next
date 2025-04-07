import type { Metadata } from "next";
import "./globals.css";
import { MemberProvider } from "@/context/membersProvider";
import QueryProvider from "@/context/queryProvider";
import { Toaster } from "react-hot-toast";
import { ActivitiesProvider } from "@/context/activitiesProvider";
import { TaskProvider } from "@/context/taskProvider";
import Footer from "@/layouts/Footer/Footer";

export const metadata: Metadata = {
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
    description:
      "MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy enthusiasts, offering top-notch learning, hands-on experiences, and expert guidance",
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
    description:
      "MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy enthusiasts, offering top-notch learning, hands-on experiences, and expert guidance",
    creator: "Rakesh Karmaker",
    images: ["https://mscsc.netlify.app/link-img.jpg"],
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
            <TaskProvider>
              <MemberProvider>{children}</MemberProvider>
            </TaskProvider>
          </ActivitiesProvider>
        </QueryProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
