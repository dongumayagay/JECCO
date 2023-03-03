import { error, json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from "$env/dynamic/private"

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.SMTP_EMAIL,
		pass: env.SMTP_PASSWORD,
	}
});

async function sendEmail(mailOptions) {
	try {
		return await transporter.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
		throw 'error in sending email: ' + err;
	}
}

export async function POST({ request }) {
	try {
		if (!request.body) throw 'please use send a body with your request';
		const { mailOptions } = await request.json();
		if (!mailOptions) throw 'Please send mailOptions in your body tag';
		const { to, subject, html } = mailOptions;
		if (!to || !subject || !html) throw 'please use proper mailOptions object';
		const result = await sendEmail(mailOptions);
		return json({
			message: 'POST SUCCESS',
			result
		});
	} catch (err) {
		console.log(error);
		throw error(400, err);
	}
}