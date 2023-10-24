import WelcomeTemplate from "@/app/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async () => {
  await resend.emails.send({
    from: "",
    to: "abdidevar@gmail.com",
    subject: "",
    react: <WelcomeTemplate name="Ryan" />,
  });
  return NextResponse.json({});
};
