'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/app/utils/send-email';
import data from '@/app/constants/data';
import { FormData } from '@/app/types/types'

const Contact: FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                {data.contact.heading}
            </h1>
            <p className="text-gray-500 w-full md:w-[400px] text-center">{data.contact.description}</p>
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
                    ></textarea>
                </div>
                <div className='flex justify-end'>
                    <button className='hover:shadow-form bg-gradient-to-r from-blue-500 to-red-500 rounded-md py-2 px-5 text-base text-white outline-none'>
                        {data.contact.form_button}
                    </button>
                </div>
            </form>
        </div>
    </div>;
};

export default Contact;