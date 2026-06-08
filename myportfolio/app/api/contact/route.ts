import { NextResponse } from "next/server";
import { sendEmail } from "@/app/lib/email";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await sendEmail(
    process.env.EMAIL_USER!,
    `Portfolio Contact - ${name}`,
    `From: ${email}\n\n${message}`
  );

  return NextResponse.json({
    success: true,
  });
}