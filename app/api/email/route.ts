import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
	try {
		const { email, name, message, captchaToken } = await request.json();

		const recaptchaResponse = await fetch(
			'https://www.google.com/recaptcha/api/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
			}
		);

		const recaptchaResult = await recaptchaResponse.json();

		if (!recaptchaResult.success) {
			return NextResponse.json(
				{ error: 'reCAPTCHA verification failed' },
				{ status: 400 }
			);
		}

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MY_EMAIL,
				pass: process.env.MY_PASSWORD,
			},
		});

		const mailOptions: Mail.Options = {
			from: process.env.MY_EMAIL,
			to: process.env.MY_EMAIL,
			subject: `Message from ${name} (${email})`,
			text: message,
		};

		const sendMailPromise = () =>
			new Promise<string>((resolve, reject) => {
				transport.sendMail(mailOptions, function (err) {
					if (!err) {
						resolve('Email sent');
					} else {
						reject(err.message);
					}
				});
			});

		await sendMailPromise();
		return NextResponse.json({ message: 'Email sent successfully' });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Failed to send email' },
			{ status: 500 }
		);
	}
}