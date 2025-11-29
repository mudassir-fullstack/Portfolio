import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import ContactModel from "@/models/Contact";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Save in DB
    const contact = await ContactModel.create({ name, email, subject, message, phone });

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", data: contact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in Contact API:", error);
    return NextResponse.json(
      { success: false, message: "Server error while sending message", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const data = await ContactModel.find();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, message: "No contacts found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching contacts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while fetching contacts",
        error: error.message,
      },
      { status: 500 }
    );
  }
};