"use server";

import prisma from "@/lib/prisma";
import {
  EditMemberPositionAndRoleActionData,
  EditMemberPositionAndRoleActionDataResponse,
} from "@/types/editMemberPositionAndRoleActionTypes";
import getDate from "@/utils/getDate";
import { z } from "zod";

// validationSchema
const schema = z.object({
  slug: z.string({ required_error: "Slug is required" }),
  position: z.string({ required_error: "Position is required" }),
  role: z.string({ required_error: "Role is required" }),
});

export default async function editMemberPositionAndRoleAction(
  prevState: EditMemberPositionAndRoleActionData | null,
  formData: FormData
): Promise<EditMemberPositionAndRoleActionDataResponse> {
  try {
    // parse the form data
    const rawData: EditMemberPositionAndRoleActionData = {
      slug: formData.get("slug") as string,
      position: formData.get("position") as string,
      role: formData.get("role") as string,
    };

    // validate the form data
    const validatedData = schema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // edit the member position and role
    await prisma.members.updateMany({
      where: {
        slug: validatedData.data.slug,
      },
      data: {
        position: validatedData.data.position,
        role: validatedData.data.role,
      },
    });

    return {
      success: true,
      message: "Member updated successfully",
    };
  } catch (err) {
    console.log("Error fetching all messages - ", getDate(), "\n---\n", err);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
