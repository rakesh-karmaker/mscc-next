"use server";

import prisma from "@/lib/prisma";
import getDate from "@/utils/getDate";

export default async function removeNewTagFromMember(slug: string) {
  try {
    await prisma.members.updateMany({
      where: {
        slug: slug,
      },
      data: {
        new: false,
      },
    });

    return { success: true };
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
    throw err;
  }
}
