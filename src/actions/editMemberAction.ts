"use server";

import { deleteImage, uploadImage } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import { RequestedUser } from "@/types/getServiceTypes";
import getDate from "@/utils/getDate";
import bcrypt from "bcryptjs";

export async function editMember(formData: FormData, id: string): Promise<{
  success: boolean;
  error?: string;
  data?: RequestedUser;
}> {
  try {
    // Convert FormData to a regular object for logging
    const formDataObj: { [key: string]: unknown } = {};
    let hasImage: boolean = false;
    let hasPassword: boolean = false;

    formData.forEach((value, key) => {
      // If the value is a File, log its name and size
      if ((value instanceof File) || key === "image") {
        hasImage = true;
        formDataObj[key] = {
          fileName: value instanceof File ? value.name : String(value),
          fileType: value instanceof File ? value.type : typeof value,
          fileSize: value instanceof File ? `${(value.size / 1024).toFixed(2)} KB` : 'N/A',
        };
        console.log("Image details:", formDataObj[key]);
      } else if (key === "password" && value !== "") {
        hasPassword = true;
        formDataObj[key] = value;
      } else if (key !== "consent") {
        formDataObj[key] = value;
      }
    });

    // get the previous data
    const previousData = await prisma.members.findUnique({
      where: {
        id,
      },
    });

    if (!previousData) {
      return {
        success: false,
        error: "Member not found",
      };
    }

    // check if the email is already registered
    if (
      previousData.email !==
      (formData.get("email") as string).trim().toLowerCase()
    ) {
      const email = (formData.get("email") as string).trim().toLowerCase();
      const existingMember = await prisma.members.findUnique({
        where: {
          email,
        },
        select: {
          password: true,
        },
      });

      if (existingMember) {
        return {
          success: false,
          error: "Email already registered",
        };
      }
    }

    const hashedPassword = hasPassword
      ? await bcrypt.hash((formData.get("password") as string).trim(), 10)
      : previousData.password;

    let editedUrl = previousData.image;
    let editedImgId = previousData.imgId;

    if (hasImage) {
        // delete the previous image from imagekit
        await deleteImage(previousData.imgId);

        // upload image to imagekit
        const image = formData.get("image") as File;
        const { url, imgId } = await uploadImage(image, false);
        editedUrl = url;
        editedImgId = imgId;
    }

    // add member to the database
    const newMember = await prisma.members.update({
      where: {
        id, 
      }, 
      data: {
        name: (formData.get("name") as string).trim(),
        email: (formData.get("email") as string).trim().toLowerCase(),
        password: hashedPassword,
        contactNumber: formData.get("contactNumber") as string,
        batch: formData.get("batch") as string,
        branch: formData.get("branch") as string,
        socialLink: formData.get("facebookLink") as string,
        image: editedUrl,
        imgId: editedImgId,
        reason: formData.get("description") as string, // TODO: change the key reason to description for the database  
      },
    })

    if (!newMember) {
      return {
        success: false,
        error: "Member not found",
      }; 
    }

    const responseData: RequestedUser = {
      id: newMember.id,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      batch: newMember.batch,
      branch: newMember.branch,
      position: newMember.position,
      image: newMember.image,
      timeline: newMember.timeline,
      createdAt: newMember.createdAt,
      socialLink: newMember.socialLink,
      reason: newMember.reason,
      contactNumber: newMember.contactNumber,
      slug: newMember.slug,
    } 

    // log the registration
    console.log("Member updated successfully -", responseData.name, "-", getDate(), "\n---\n");
    return { success: true, data: responseData  };
  } catch (error) {
    console.error("Error editing member -", getDate(), "\n---\n", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
