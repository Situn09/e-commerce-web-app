import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      //   service: "elasticemail",
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: true,
      auth: {
        user: "chiranjivrao37@gmail.com",
        pass: "0A9F4C155DBC469512A70269F8E0C181C0C1",
      },
    });

    const mailOption = {
      from: "chiranjivrao37@gmail.com",
      to: "augustinerepos@gmail.com",
      subject: "Send OTP for login",
      html: `
        <h3>Hello Augustine</h3>
        <li> title: ${subject}</li>
        <li> message: ${message}</li> 
        `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
