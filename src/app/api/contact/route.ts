import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ValidationError } from "yup";

import contactSchema from "@/schemas/contactSchema";

export async function POST(req: Request) {
  const EMAIL_HOST = process.env.EMAIL_HOST;
  const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "465", 10);
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_FROM = process.env.EMAIL_FROM;
  const EMAIL_TO = process.env.EMAIL_TO;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM || !EMAIL_TO) {
    console.error("Server configuration error.");

    return NextResponse.json({ message: "submit_error.server_configuration" }, { status: 500 });
  }

  try {
    const { firstName, lastName, email, phone, subject, message } = await req.json();

    await contactSchema().validate({ firstName, lastName, email, phone, subject, message }, { abortEarly: false });

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `${subject}`,
      html: `
        <h1>Vous avez reçu un nouveau message</h1>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation failed:", error.errors);

      const errors = error.inner.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return NextResponse.json(
        {
          type: "validation",
          errors,
        },
        { status: 400 }
      );
    }

    console.error("An internal server error occurred:", error);

    return NextResponse.json({ message: "submit_error.internal_error" }, { status: 500 });
  }
}
