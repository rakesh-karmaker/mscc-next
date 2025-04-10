"use server";

import prisma from "@/lib/prisma";
import sendEmail from "@/lib/sendEmail";
import generateOTP from "@/utils/generateOTP";
import generateRandomToken from "@/utils/generateRandomToken";
import getDate from "@/utils/getDate";
import bcrypt from "bcryptjs";

export async function verifyEmail(email: string) {
  try {
    const member = await prisma.members.findFirst({
      where: {
        email: email,
      },
    });

    if (!member) {
      return {
        success: false,
        message: "Email not found",
      };
    }

    //delete previous otp
    await prisma.resetotps.deleteMany({
      where: {
        email: email,
      },
    });

    //generate OTP
    const generatedOTP = await generateOTP();

    //send email
    await sendEmail(email, generatedOTP);

    //save otp
    const hashedOTP = await bcrypt.hash(generatedOTP, 10);
    await prisma.resetotps.create({
      data: {
        email: email,
        otp: hashedOTP,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        v: 0,
      },
    });

    return {
      success: true,
      email: email,
    };
  } catch (error) {
    console.error("Error verifying email -", getDate(), "\n---\n", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function verifyOtp(otp: string, email: string) {
  try {
    const otpRecord = await prisma.resetotps.findFirst({
      where: {
        email: email,
      },
    });

    if (!otpRecord) {
      return {
        success: false,
        message: "OTP not found",
      };
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid OTP",
      };
    }

    // generate a token
    const token = generateRandomToken();

    // save the token
    await prisma.resetotps.update({
      where: {
        id: otpRecord.id,
      },
      data: {
        token: token,
        v: otpRecord.v + 1,
      },
    });

    return {
      success: true,
      message: "OTP verified",
      token: token,
    };
  } catch (error) {
    console.error("Error verifying OTP -", getDate(), "\n---\n", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function resetPassword(
  email: string,
  newPassword: string,
  token: string
) {
  try {
    // verify the token
    const otp = await prisma.resetotps.findFirst({
      where: {
        email: email,
      },
    });

    if (!otp || otp?.token !== token) {
      return {
        success: false,
        message: "Invalid Token",
      };
    }

    // save the password
    const hashedPass = await bcrypt.hash(newPassword, 10);

    const newMember = await prisma.members.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPass,
      },
    });

    if (!newMember) {
      return {
        success: false,
        message: "Member not found",
      };
    }

    return {
      success: true,
      message: "Updated successfully",
    };
  } catch (error) {
    console.error("Error resetting OTP -", getDate(), "\n---\n", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
