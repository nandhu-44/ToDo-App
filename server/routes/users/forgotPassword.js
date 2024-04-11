const router = require("express").Router();
const userSchema = require("../../database/models/userSchema");
const passwordResetSchema = require(
  "../../database/models/passwordResetSchema",
);
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const fs = require("fs");

router.post("/", async (req, res) => {
  const { email } = req.body;
  let redirectUrl = req.headers?.referer ?? process.env.CLIENT_URL;
  redirectUrl = redirectUrl.replace(/\/$/, "");
  const user = await userSchema.findOne({
    email: email,
  });

  if (user) {
    res.json({ message: "Email found", status: 200 });
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getMinutes() + 30);

    await passwordResetSchema.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        resetToken: resetToken,
        expiresAt: expiresAt,
      },
      { upsert: true },
    );
    const htmlContent = fs.readFileSync(
      "./templates/resetPassword.html",
      "utf8",
    );
    const href = `${redirectUrl}/reset-password/${user._id}/${resetToken}`;
    const mailOptions = {
      from: `ToDo App <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "ToDo App Password Reset",
      html: htmlContent.replace("{{href}}", href),
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(`Error sending email: ${err?.message}`);
      }
    });
  } else {
    res.json({ message: "Email not found", status: 404 });
  }
});

module.exports = router;
