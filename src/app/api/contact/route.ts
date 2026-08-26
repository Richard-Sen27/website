import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

import { contactEmailHtml } from "./emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY || "rs_empty");

const MAX = { name: 100, email: 100, message: 2000 } as const;
const RATE_WINDOW_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT = 3;

/**
 * In-memory rate limit. Enough for a single-container deployment; it resets on
 * restart and does not span replicas. Swap for Redis if this ever scales out.
 */
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const recent = (recentSubmissions.get(email) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT) {
    recentSubmissions.set(email, recent);
    return true;
  }

  recent.push(now);
  recentSubmissions.set(email, recent);

  // Bound the map so a flood of unique addresses cannot grow it without limit.
  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) {
        recentSubmissions.delete(key);
      }
    }
  }

  return false;
}

/** Escapes the characters that could break out of an HTML text node. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      message.length > MAX.message
    ) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 },
      );
    }

    if (isRateLimited(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio contact <contact@dev.richard-senger.com>",
      to: ["contact@richard-senger.com"],
      replyTo: email,
      subject: `${name} sent you a message`,
      html: contactEmailHtml({
        name: escapeHtml(name),
        email: escapeHtml(email),
        message: escapeHtml(message),
        receivedAt: new Date(),
      }),
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully", id: data?.id },
      { status: 200 },
    );
  } catch (caught) {
    console.error("Contact form error:", caught);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
