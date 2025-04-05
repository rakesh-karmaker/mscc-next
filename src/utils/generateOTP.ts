import getDate from "./getDate";

export default async function generateOTP(): Promise<string> {
  try {
    return `${Math.floor(10000 + Math.random() * 90000)}`;
  } catch (err) {
    console.log("Error generating OTP - ", getDate(), "\n---\n", err);
    throw err;
  }
}
