import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { decrypt } from "./session";
import { RequestedUser } from "@/types/getServiceTypes";

export async function getCurrentUser(): Promise<RequestedUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

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

  try {
    const session = await decrypt(token);
    if (!session?.userId) return null;


    const user = await prisma.members.findUnique({
      where: { id: session.userId as string },
      select: memberProjection,
    });
    

    if (!user) return null;
    
    return user; 
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
