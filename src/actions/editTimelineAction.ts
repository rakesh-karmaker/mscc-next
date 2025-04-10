"use server";

import prisma from "@/lib/prisma";
import { RequestedUser } from "@/types/getServiceTypes";
import generateObjectId from "@/utils/generateObjectId";
import getDate from "@/utils/getDate";
import dayjs from "dayjs";

export async function editTimeline(data: {
    timeline: {
      title: string;
      date: string | dayjs.Dayjs;
      tag: string;
      description: string;
      link: string;
    }[];
  }, id: string): Promise<{
  success: boolean;
  error?: string;
  data?: RequestedUser;
}> {
  try {
    const timelines = data.timeline;
    const timelinesWithIds = timelines.map((timeline) => {
      return {
        ...timeline,
        id: generateObjectId(),
      };
    });


    const updatedMember = await prisma.members.update({
      where: {
        id,
      },
      data: {
        timeline: timelinesWithIds.map(timeline => ({
          ...timeline,
          date: timeline.date.toString()
        }))
      } 
    })

    if (!updatedMember) {
      return {
        success: false,
        error: "Member not found",
      }; 
    }

    const responseData = {
      id: updatedMember.id,
      slug: updatedMember.slug,
      name: updatedMember.name,
      email: updatedMember.email,
      role: updatedMember.role,
      batch: updatedMember.batch,
      branch: updatedMember.branch,
      position: updatedMember.position,
      image: updatedMember.image,
      timeline: updatedMember.timeline,
      createdAt: updatedMember.createdAt,
      socialLink: updatedMember.socialLink,
      reason: updatedMember.reason,
      contactNumber: updatedMember.contactNumber, 
    }


    console.log("Member updated successfully -", responseData.name, "-", getDate(), "\n---\n");
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error editing member -", getDate(), "\n---\n", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
