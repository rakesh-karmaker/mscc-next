import prisma from "@/lib/prisma";
// import Profile from "./profile";
import { notFound } from "next/navigation";
import Activity from "./activity";

type props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({ params }: props) => {
  const { slug } = await params;

  const activity = await prisma.activities.findFirst({
    where: {
      slug: slug,
    },
    select: {
      title: true,
    },
  });

  if (!activity) {
    return {
      title: `MSCSC - Activity not found`,
    };
  }

  return {
    title: `MSCSC - ${activity.title}`,
    openGraph: {
      title: `MSCSC - ${activity.title}`,
      url: `https://mscsc.netlify.app/${slug}/`,
    },
    twitter: {
      title: `MSCSC - ${activity.title}`,
      site: `https://mscsc.netlify.app/${slug}/`,
    },
  };
};

const activityProjection = {
  id: true,
  slug: true,
  title: true,
  summary: true,
  coverImageUrl: true,
  date: true,
  tag: true,
  content: true,
  gallery: true,
};

export default async function ProfilePage({ params }: props) {
  const { slug } = await params;
  console.log(slug)

  const activity = await prisma.activities.findFirst({
    where: {
      slug: slug,
    },
    select: activityProjection,
  });

  if (!activity) {
    notFound();
  }

  const others = await prisma.activities.findMany({
    where: {
      tag: activity.tag,
    },
    take: 10,
    select: {
      id: true,
      title: true,
      date: true,
      slug: true,
    },
  });

  return <Activity activity={activity} others={others} />;
}
