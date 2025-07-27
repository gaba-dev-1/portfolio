import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmails(data: EmailData): Promise<void> {
  const { name, email, message } = data;
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const adminHtml = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6d28d9;">New Portfolio Contact</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <div style="margin-top: 20px;">
    <h3 style="color: #6d28d9;">Message:</h3>
    <p style="white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
  </div>
</div>`;

  const userHtml = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6d28d9;">Thank You For Your Message</h2>
  <p>Hello ${name},</p>
  <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
  <div style="margin-top: 30px; color: #666;">
    <p>Best regards,<br>Sébastien Gimenez</p>
  </div>
</div>`;

  await Promise.all([
    transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact from ${name}`,
      html: adminHtml,
    }),
    
    transporter.sendMail({
      from: `"Sébastien Gimenez" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for your message',
      html: userHtml,
    })
  ]);
}
