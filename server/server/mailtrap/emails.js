const {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} = require("./emailTemplates.js");
const { transporter, sender } = require("./mailtrap.config.js");

exports.sendVerificationEmail = async (email, verificationToken) => {
	const mailOptions = {
		from: `"${sender.name}" <${sender.email}>`,
		to: email,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully", response);
	} catch (error) {
		console.error("Error sending verification email", error);
		throw new Error(`Error sending verification email: ${error}`);
	}
};

exports.sendWelcomeEmail = async (email, name) => {
	const mailOptions = {
		from: `"${sender.name}" <${sender.email}>`,
		to: email,
		subject: "Welcome to Meeguide!",
		html: `<p>Welcome, ${name}!</p><p>Thank you for joining Meeguide.</p>`, // Use template HTML if available
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error("Error sending welcome email", error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

exports.sendPasswordResetEmail = async (email, resetURL) => {
	const mailOptions = {
		from: `"${sender.name}" <${sender.email}>`,
		to: email,
		subject: "Reset your password",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error("Error sending password reset email", error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

exports.sendResetSuccessEmail = async (email) => {
	const mailOptions = {
		from: `"${sender.name}" <${sender.email}>`,
		to: email,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Password reset success email sent successfully", response);
	} catch (error) {
		console.error("Error sending password reset success email", error);
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
