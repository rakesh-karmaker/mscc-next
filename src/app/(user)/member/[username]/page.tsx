import prisma from "@/lib/prisma";
import Profile from "./profile";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{
    username: string;
  }>;
};

export const generateMetadata = async ({ params }: props) => {
  const { username } = await params;

  const member = await prisma.members.findFirst({
    where: {
      slug: username,
    },
    select: {
      name: true,
    },
  });

  if (!member) {
    return {
      title: `MSCSC - Member not found`,
    };
  }

  return {
    title: `MSCSC - ${member.name}`,
    openGraph: {
      title: `MSCSC - ${member.name}`,
      url: `https://mscsc.netlify.app/${username}/`,
    },
    twitter: {
      title: `MSCSC - ${member.name}`,
      site: `https://mscsc.netlify.app/${username}/`,
    },
  };
};

const memberProjection = {
    id: true,
    slug: true,
    name: true,
    email: true,
    role: true,
    batch: true,
    branch: true,
    position: true,
    image: true,
    timeline: true,
    createdAt: true,
    socialLink: true,
    reason: true,
    contactNumber: true,
  };

export default async function ProfilePage({ params }: props) {
  const { username } = await params;

  const member = await prisma.members.findFirst({
    where: {
      slug: username,
    },
    select: memberProjection,
  }); 

  if (!member) {
    notFound()
  }

  return (

      <Profile member={member} />
  )

}