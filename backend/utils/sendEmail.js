import nodemailer from "nodemailer";

const createTransporter = () => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email environment variables are not fully configured");
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
};

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    html
  });
};

export default sendEmail;



// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, html }) => {
//   // Create test account (dummy)
//   const testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `"Dev Test" <${testAccount.user}>`,
//     to,
//     subject,
//     html,
//   });

//   console.log("📧 Dummy email sent!");
//   console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
// };

// export default sendEmail;
