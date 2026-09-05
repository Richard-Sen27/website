# Contact Form Setup Guide

This contact form is GDPR-compliant and uses [Resend](https://resend.com) for email delivery.

## Setup Instructions

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Verify your account via email

### 2. Get Your API Key
1. Navigate to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the generated API key

### 3. Configure Environment Variables
1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```
2. Add your Resend API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### 4. Configure Your Domain (Optional but Recommended)
For production, you should verify your domain in Resend:
1. Go to [Domains](https://resend.com/domains) in Resend
2. Add your domain and follow the verification steps
3. Update the `from` field in `/src/app/api/contact/route.ts`:
   ```typescript
   from: "Contact Form <noreply@yourdomain.com>"
   ```

### 5. Update Recipient Email
Edit `/src/app/api/contact/route.ts` and change the recipient email:
```typescript
to: ["your-email@example.com"]
```

## GDPR Compliance Features

✅ **Explicit Consent**: Users must check a consent box before submitting
✅ **Data Transparency**: Clear information about what data is collected
✅ **Right to Erasure**: Instructions for data deletion requests
✅ **Minimal Data**: Only collects necessary information (name, email, message)
✅ **Secure Processing**: Data is sanitized and transmitted securely
✅ **Rate Limiting**: Prevents abuse (3 submissions per hour per email)
✅ **No Third-party Tracking**: No analytics or tracking cookies

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the contact section
3. Fill out the form and check the consent box
4. Submit to test email delivery

## Free Tier Limits

Resend's free tier includes:
- 100 emails/day
- 3,000 emails/month
- Perfect for personal portfolios and small projects

## Security Notes

- Never commit `.env.local` to version control
- The `.gitignore` file already excludes `.env*.local`
- API keys should be kept secret
- Rate limiting is implemented to prevent abuse
- Input validation and sanitization protect against XSS attacks

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [GDPR Guidelines](https://gdpr.eu/)
