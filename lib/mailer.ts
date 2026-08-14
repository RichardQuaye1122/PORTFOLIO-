import "server-only";
import { Resend } from "resend";

const required = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

export function missingMailEnv() {
  return required.filter((k) => !process.env[k]);
}

let client: Resend | null = null;

function getClient() {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  message,
}: ContactMessage) {
  // The visitor's address goes in replyTo, never From — Resend only accepts a
  // From on a domain you've verified, and spoofing theirs would fail DMARC.
  const { data, error } = await getClient().emails.send({
    from: `${name} via portfolio <${process.env.CONTACT_FROM_EMAIL}>`,
    to: [process.env.CONTACT_TO_EMAIL!],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(
      email,
    )}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  // Resend reports failures in the response rather than throwing, so this has
  // to be checked explicitly or every send looks like a success.
  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }

  return data;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
