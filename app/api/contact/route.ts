import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ⚠️  Do NOT instantiate Resend at module level — it runs at build time
//     before environment variables are injected. Always create it inside
//     the request handler so it reads the env var at runtime.

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  message: z.string().min(10, 'Message is too short'),
});

export async function POST(request: Request) {
  // Instantiated HERE — inside the handler, at runtime
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const servicesHtml = data.services
      .map((s) => `<li style="padding:4px 0;color:#3D5A47;">✦ ${s}</li>`)
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #E0CDBA;">
    <div style="padding:40px 48px 32px;border-bottom:1px solid #E0CDBA;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#3D5A47;">Anaj Beauty</p>
      <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#1A1A18;line-height:1.2;">
        Nouvelle demande<br>de rendez-vous
      </h1>
    </div>
    <div style="padding:40px 48px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;width:40%;">
            <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B6B69;">Nom</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;">
            <span style="font-size:15px;color:#1A1A18;">${data.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;">
            <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B6B69;">Email</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;">
            <a href="mailto:${data.email}" style="font-size:15px;color:#3D5A47;text-decoration:none;">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;">
            <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B6B69;">Téléphone</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F4EDE3;">
            <a href="tel:${data.phone}" style="font-size:15px;color:#3D5A47;text-decoration:none;">${data.phone}</a>
          </td>
        </tr>` : ''}
      </table>
      <div style="margin-bottom:32px;">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B6B69;">Soins sélectionnés</p>
        <ul style="margin:0;padding:0 0 0 4px;list-style:none;">${servicesHtml}</ul>
      </div>
      <div style="background:#FAF7F2;padding:24px;border-left:2px solid #E0CDBA;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6B6B69;">Message</p>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#1A1A18;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    <div style="padding:24px 48px;border-top:1px solid #E0CDBA;background:#FAF7F2;">
      <p style="margin:0;font-size:12px;color:#6B6B69;">
        7 rue Jacques Dulud, 92200 Neuilly-sur-Seine &nbsp;·&nbsp;
        <a href="mailto:info@anajbeauty.com" style="color:#3D5A47;text-decoration:none;">info@anajbeauty.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@anajbeauty.com',
      to: process.env.RESEND_TO_EMAIL || 'info@anajbeauty.com',
      replyTo: data.email,
      subject: `Nouvelle demande – ${data.name} · Anaj Beauty`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    // Auto-reply to client
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@anajbeauty.com',
      to: data.email,
      subject: 'Votre demande a bien été reçue – Anaj Beauty',
      html: `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#FAF7F2;font-family:Arial,sans-serif;">
<div style="max-width:560px;margin:40px auto;background:#fff;border:1px solid #E0CDBA;padding:48px;">
  <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#3D5A47;">Anaj Beauty</p>
  <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#1A1A18;margin:8px 0 24px;">Merci, ${data.name} !</h1>
  <p style="color:#3D3D3B;line-height:1.7;margin:0 0 16px;">Nous avons bien reçu votre demande et vous répondrons dans les <strong>24 heures</strong>.</p>
  <p style="color:#3D3D3B;line-height:1.7;margin:0 0 32px;">En attendant, n'hésitez pas à nous contacter directement au <a href="tel:+33626818693" style="color:#3D5A47;">+33 6 26 81 86 93</a>.</p>
  <div style="border-top:1px solid #E0CDBA;padding-top:24px;">
    <p style="margin:0;font-size:12px;color:#6B6B69;">Anaj Beauty · 7 rue Jacques Dulud, 92200 Neuilly-sur-Seine</p>
  </div>
</div>
</body></html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: err.issues },
        { status: 400 }
      );
    }
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
