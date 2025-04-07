export const metadata = {
  title: "MSCSC - Members",
  openGraph: {
    title: "MSCSC - Members",
    url: "https://mscsc.netlify.app/members",
  },
  twitter: {
    title: "MSCSC - Members",
    site: "https://mscsc.netlify.app/members",
  },
};

export default function MemberPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
