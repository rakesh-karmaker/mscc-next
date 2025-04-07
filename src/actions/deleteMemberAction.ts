"use server";

import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";

export default async function deleteMemberAction(slug: string) {
  if (!slug) {
    return { success: false, message: "Slug is required" };
  }

  try {
    await prisma.members.deleteMany({
      where: {
        slug: slug,
      },
    });

    return { success: true };
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
    return { success: false, message: err };
  }
}
