'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const Contact: FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }
    return <div className="container mx-auto pt-10 bg-white dark:bg-black min-h-[calc(100vh - 64px)]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                Get in touch.
            </h1>
            <p className="text-gray-500 w-full md:w-[400px] text-center">Have a job offer or just want to chat? Reach out and we&apos;ll go from there.</p>
        </div>
        <div className='flex flex-col justify-center items-center pt-10 px-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[400px]'>
                <div className='mb-5'>
                    <label
                        htmlFor='name'
                        className='mb-2 block text-base text-black dark:text-gray-500'
                    >
                        Full Name
                    </label>
                    <input
                        type='text'
                        placeholder='Full Name'
                        className='w-full rounded-md border border-gray-300 dark:border-gray-400 bg-white dark:bg-black py-2 px-3 text-base text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                        {...register('name', { required: true })}
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='email'
                        className='mb-2 block text-base text-black dark:text-gray-500'
                    >
                        Email Address
                    </label>
                    <input
                        type='email'
                        placeholder='example@domain.com'
                        className='w-full rounded-md border border-gray-300 dark:border-gray-400 bg-white dark:bg-black py-2 px-3 text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                        {...register('email', { required: true })}
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='message'
                        className='mb-2 block text-base text-black dark:text-gray-500'
                    >
                        Message
                    </label>
                    <textarea
                        rows={4}
                        placeholder='Type your message'
                        className='w-full resize-none rounded-md border border-gray-300 dark:border-gray-400 bg-white dark:bg-black py-2 px-3 text-base text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500 focus:shadow-md'
                        {...register('message', { required: true })}
                    ></textarea>
                </div>
                <div className='flex justify-end'>
                    <button className='hover:shadow-form bg-gradient-to-r from-blue-500 to-red-500 rounded-md py-2 px-5 text-base text-white outline-none'>
                        Send message
                    </button>
                </div>
            </form>
        </div>
    </div>;
};

export default Contact;