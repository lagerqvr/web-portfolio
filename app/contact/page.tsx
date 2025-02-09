'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import data from '@/app/constants/data';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: FC = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { register, handleSubmit, reset } = useForm<FormData>();

    async function onSubmit(formData: FormData) {
        try {
            setIsSubmitting(true);
            setSubmitStatus({ type: null, message: '' });

            const captchaToken = await recaptchaRef.current?.executeAsync();

            if (!captchaToken) {
                throw new Error('reCAPTCHA verification failed');
            }

            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    captchaToken,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            setSubmitStatus({
                type: 'success',
                message: 'Message sent successfully!'
            });

            reset();
            recaptchaRef.current?.reset();

        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to send message'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh-64px)]">
            <div className="flex flex-col justify-center items-center z-10">
                <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                    {data.contact.heading}
                </h1>
                <p className="text-gray-500 w-full md:w-[400px] text-center">
                    {data.contact.description}
                </p>
            </div>

            <div className='flex flex-col justify-center items-center pt-8 px-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[400px]'>
                    <div className='mb-5'>
                        <label
                            htmlFor='name'
                            className='mb-2 block text-base text-black dark:text-gray-500'
                        >
                            {data.contact.form_name}
                        </label>
                        <input
                            type='text'
                            placeholder='Full Name'
                            className='w-full rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-black py-2 px-3 text-base text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                            {...register('name', { required: true })}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            htmlFor='email'
                            className='mb-2 block text-base text-black dark:text-gray-500'
                        >
                            {data.contact.form_email}
                        </label>
                        <input
                            type='email'
                            placeholder='example@domain.com'
                            className='w-full rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-black py-2 px-3 text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                            {...register('email', { required: true })}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            htmlFor='message'
                            className='mb-2 block text-base text-black dark:text-gray-500'
                        >
                            {data.contact.form_message}
                        </label>
                        <textarea
                            rows={4}
                            placeholder='Type your message'
                            className='w-full resize-none rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-black py-2 px-3 text-base text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                            {...register('message', { required: true })}
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    {/* Display submission status messages */}
                    {submitStatus.type && (
                        <div className={`mb-4 p-3 rounded-md ${submitStatus.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Only render ReCAPTCHA on the client side */}
                    {isClient && (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        />
                    )}

                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className='hover:shadow-form bg-gradient-to-r from-blue-500 to-red-500 rounded-md py-2 px-5 text-base text-white outline-none disabled:opacity-50'
                        >
                            {isSubmitting ? 'Sending...' : data.contact.form_button}
                        </button>
                    </div>

                    {/* reCAPTCHA Privacy Notice */}
                    <div className="text-xs text-gray-500 mt-4 text-center">
                        This site is protected by reCAPTCHA and the Google
                        {' '}<a href="https://policies.google.com/privacy" className="text-blue-500">Privacy Policy</a> and
                        {' '}<a href="https://policies.google.com/terms" className="text-blue-500">Terms of Service</a> apply.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;