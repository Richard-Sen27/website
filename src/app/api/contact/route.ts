import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Store recent submissions in memory (for production, use Redis or similar)
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const submissions = recentSubmissions.get(email) || [];
  
  // Remove submissions older than 1 hour
  const recentOnes = submissions.filter((time) => now - time < 3600000);
  
  // Allow max 3 submissions per hour
  if (recentOnes.length >= 3) {
    return true;
  }
  
  recentOnes.push(now);
  recentSubmissions.set(email, recentOnes);
  return false;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 100 || email.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 }
      );
    }

    // Rate limiting
    if (isRateLimited(email)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Sanitize inputs for display
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "New Profile Contact <contact@dev.richard-senger.com>",
      to: ["contact@richard-senger.com"],
      replyTo: email,
      subject: `${sanitizedName} sent you a message`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6; 
                color: #1a1a1a;
                background: #f5f5f5;
                padding: 40px 20px;
              }
              .container { 
                max-width: 560px; 
                margin: 0 auto; 
                background: white;
                border-radius: 2px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .content { 
                padding: 40px;
              }
              .message-header {
                font-size: 13px;
                color: #666;
                margin-bottom: 24px;
                letter-spacing: 0.3px;
              }
              .from {
                font-size: 24px;
                font-weight: 600;
                color: #1a1a1a;
                margin-bottom: 4px;
              }
              .email {
                font-size: 15px;
                color: #666;
                margin-bottom: 32px;
              }
              .message {
                font-size: 16px;
                line-height: 1.7;
                color: #2a2a2a;
                white-space: pre-wrap;
                padding: 24px;
                background: #fafafa;
                border-radius: 2px;
                border-left: 2px solid #e0e0e0;
              }
              .meta {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #e8e8e8;
                font-size: 12px;
                color: #999;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <div class="message-header">NEW MESSAGE FROM WEBSITE</div>
                <div class="from">${sanitizedName}</div>
                <div class="email">${sanitizedEmail}</div>
                <div class="message">${sanitizedMessage}</div>
                <div class="meta">${new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "long", timeStyle: "short" })} UTC</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully",
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
