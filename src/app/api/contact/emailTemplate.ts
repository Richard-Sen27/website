import { tokens } from "@/design/tokens.generated";

/**
 * Notification email for a contact form submission.
 *
 * Mail clients support neither CSS custom properties nor oklch, so colours come
 * from the generated token mirror, already flattened to opaque sRGB hex. That
 * keeps the email in step with the site instead of drifting, which is what the
 * hand-maintained palette that used to live in this file did.
 *
 * Table-based layout and inline styles are deliberate, since Outlook ignores
 * most of what a <style> block says.
 */
export function contactEmailHtml({
  name,
  email,
  message,
  receivedAt,
}: {
  name: string;
  email: string;
  message: string;
  receivedAt: Date;
}): string {
  const timestamp = receivedAt.toLocaleString("en-GB", {
    timeZone: "UTC",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>New message from ${name}</title>
  </head>
  <body style="margin:0;padding:0;background:${tokens.surface};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${name} &lt;${email}&gt;: ${message.slice(0, 120)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${tokens.surface};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="max-width:560px;background:${tokens["surface-raised"]};border:1px solid ${tokens.line};border-radius:14px;">
            <tr>
              <td style="padding:36px 36px 0 36px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:10px;">
                      <div style="width:8px;height:8px;border-radius:9999px;background:${tokens.accent};font-size:0;line-height:0;">&nbsp;</div>
                    </td>
                    <td style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${tokens["ink-muted"]};">
                      New message
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 0 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                <div style="font-size:26px;font-weight:600;letter-spacing:-0.6px;color:${tokens.ink};">
                  ${name}
                </div>
                <div style="margin-top:6px;font-size:15px;">
                  <a href="mailto:${email}" style="color:${tokens.accent};text-decoration:none;">${email}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px 0 36px;">
                <div style="background:${tokens["surface-inset"]};border:1px solid ${tokens.line};border-radius:10px;padding:22px 24px;
                            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
                            font-size:15px;line-height:1.7;color:${tokens.ink};white-space:pre-wrap;">
${message}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px 32px 36px;">
                <div style="border-top:1px solid ${tokens.line};padding-top:20px;
                            font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:${tokens["ink-faint"]};">
                  ${timestamp} UTC · dev.richard-senger.com
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
