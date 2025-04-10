"use server";

import { deleteSession } from "@/lib/session";
import getDate from "@/utils/getDate";

export default async function logoutAction() {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error("Error deleting session -", getDate, "\n---\n", error);
    return { success: false };
  }
}
