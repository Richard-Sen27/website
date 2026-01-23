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
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
              }
              
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6; 
                color: #0a0a0a;
                background: #ffffff;
                padding: 48px 20px;
              }
              
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
              }
              
              .content { 
                padding: 48px 40px;
              }
              
              .header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 40px;
              }
              
              .dot {
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #93c5fd, #67a3f9);
                border-radius: 50%;
              }
              
              .header-text {
                font-size: 13px;
                font-weight: 600;
                color: #6c757d;
                letter-spacing: 0.5px;
              }
              
              .from {
                font-size: 32px;
                font-weight: 700;
                background: linear-gradient(135deg, #93c5fd, #67a3f9, #22d3ee);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 8px;
                letter-spacing: -0.8px;
              }
              
              .email-address {
                font-size: 16px;
                color: #6c757d;
                margin-bottom: 48px;
              }
              
              .message-box {
                background: #f8f9fa;
                border: 1px solid rgba(0, 0, 0, 0.06);
                border-radius: 16px;
                padding: 32px;
                margin-bottom: 32px;
              }
              
              .message {
                font-size: 16px;
                line-height: 1.7;
                color: #0a0a0a;
                white-space: pre-wrap;
              }
              
              .footer {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                color: #a5adb0;
                padding-top: 32px;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
              }
              
              .footer-icon {
                width: 14px;
                height: 14px;
                opacity: 0.5;
              }
              
              @media (prefers-color-scheme: dark) {
                body {
                  color: #fafafa;
                  background: #0a0a0a;
                }
                
                .container {
                  background: rgba(255, 255, 255, 0.02);
                  border: 1px solid rgba(165, 173, 176, 0.1);
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                }
                
                .header-text {
                  color: #a5adb0;
                }
                
                .email-address {
                  color: #a5adb0;
                }
                
                .message-box {
                  background: rgba(255, 255, 255, 0.02);
                  border: 1px solid rgba(165, 173, 176, 0.08);
                }
                
                .message {
                  color: #fafafa;
                }
                
                .footer {
                  border-top: 1px solid rgba(165, 173, 176, 0.08);
                  color: #6c757d;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <div class="header">
                  <div class="dot"></div>
                  <span class="header-text">NEW MESSAGE</span>
                </div>
                
                <div class="from">${sanitizedName}</div>
                <div class="email-address">${sanitizedEmail}</div>
                
                <div class="message-box">
                  <div class="message">${sanitizedMessage}</div>
                </div>
                
                <div class="footer">
                  <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>${new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "long", timeStyle: "short" })} UTC</span>
                </div>
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
