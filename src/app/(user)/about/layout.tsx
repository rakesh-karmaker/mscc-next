export const metadata = {
  title: "MSCSC - About Us",
  openGraph: {
    title: "MSCSC - About Us",
    url: "https://mscsc.netlify.app/about",
  },
  twitter: {
    title: "MSCSC - About Us",
    site: "https://mscsc.netlify.app/about",
  },
};

export default function AboutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
