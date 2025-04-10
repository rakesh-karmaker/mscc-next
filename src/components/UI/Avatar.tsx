"use client"

import { useUser } from "@/context/userProvider";
import Image from "next/image";
import Link from "next/link";

const Avatar = () => {
  const { user } = useUser();
  if (!user) {
    return null
  }
  return (
    <Link href={`/member/${user?.slug}`} title="Profile" id="avatar">
      <Image src={user.image} alt={`Profile picture of ${user?.name}`} width={100} height={100} />
    </Link>
  );
};

export default Avatar;
