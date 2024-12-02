const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_URL = process.env.MAILGUN_URL;
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;

const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY,
  url: MAILGUN_URL || 'https://api.eu.mailgun.net',
});

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body);
    const { name, email, subject, message } = payload;

    const emailData = {
      from: `${name} <${email}>`,
      to: TO_EMAIL_ADDRESS,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send email using Mailgun
    await mg.messages.create(MAILGUN_DOMAIN, emailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };
  }
};
