const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  // STARTUP TIP: For Gmail, you might need an App Password if 2FA is on.
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port from env
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log('Nodemailer transporter ready');
  } catch (error) {
    console.error('Nodemailer connection error:', error);
    // Don't throw here, let the send attempt fail if must, or throw to block startup
  }

  const message = {
    from: `${process.env.FROM_NAME || 'CampusFound'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html, // Use HTML for templates
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

const getClaimEmailTemplate = (item, claimer, message) => {
  const isLostItem = item.type === 'lost';
  // If item is LOST, someone FOUND it -> "I found your item"
  // If item is FOUND, someone CLAIMS it -> "I think this is mine"
  
  const actionText = isLostItem ? 'Found Your Lost Item' : 'Claiming Your Found Item';
  const highlightColor = isLostItem ? '#10b981' : '#f59e0b'; // Green for found, Amber for claim

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">CampusFound Alert</h1>
      </div>
      
      <div style="padding: 24px;">
        <p style="font-size: 16px; color: #334155;">Hello <strong>${item.postedBy.name}</strong>,</p>
        
        <p style="font-size: 16px; color: #334155;">
          Good news! A user has reached out regarding your post: <strong>${item.title}</strong>.
        </p>

        <div style="background-color: #f8fafc; border-left: 4px solid ${highlightColor}; padding: 16px; margin: 24px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">${actionText}</h3>
          <p style="color: #475569; margin-bottom: 8px;"><strong>Message from ${claimer.name}:</strong></p>
          <p style="font-style: italic; color: #334155;">"${message}"</p>
        </div>

        <p style="font-size: 16px; color: #334155;">You can contact them directly to arrange a meetup:</p>
        
        <div style="margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${claimer.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${claimer.email}" style="color: #4f46e5;">${claimer.email}</a></p>
          ${claimer.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${claimer.phone}</p>` : ''}
        </div>

        <p style="font-size: 14px; color: #64748b; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Safety Tip: Always meet in a safe, public location like the campus center or security office.
        </p>
      </div>
    </div>
  `;
};

module.exports = { sendEmail, getClaimEmailTemplate };
