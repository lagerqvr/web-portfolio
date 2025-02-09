import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'reCAPTCHA token is required' },
                { status: 400 }
            );
        }

        const verificationResponse = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
            }
        );

        const verificationResult = await verificationResponse.json();

        if (verificationResult.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    errors: verificationResult['error-codes']
                },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to verify reCAPTCHA' },
            { status: 500 }
        );
    }
}