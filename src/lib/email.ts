import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import React from 'react';

// Create reusable transporter object using ZeptoMail's SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.com",
  port: 587,
  auth: {
    user: "emailapikey",
    pass: process.env.ZEPTOMAIL_SEND_TOKEN,
  },
});

export async function sendEmail({
  to,
  subject,
  react,
  isInternalAdminAlert = false,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  isInternalAdminAlert?: boolean;
}) {
  try {
    if (!process.env.ZEPTOMAIL_SEND_TOKEN) {
      console.warn("ZEPTOMAIL_SEND_TOKEN is not set. Email not sent.");
      return { success: false, error: "Missing ZeptoMail Token" };
    }

    // Generate HTML from React component
    const html = await render(react);
    
    // ZeptoMail demands that the "From" address exactly matches the verified domain.
    const fromName = isInternalAdminAlert ? "QuilCeuticals System" : "QuilCeuticals";
    const fromAddress = "order@quilceuticals.com";

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent via ZeptoMail: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email via ZeptoMail Nodemailer:", error);
    return { success: false, error };
  }
}
