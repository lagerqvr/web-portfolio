'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TypingEffect from "./utils/TypingEffect";
import BuzzwordList from './utils/BuzzwordList';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from 'react-icons/fa';
import data from '@/app/constants/data';

export default function Home() {

  return (
    <main className="bg-white dark:bg-black">
      <div className="flex container mx-auto px-4 pt-20 min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        <div className="pt-5 md:pt-10 flex flex-col items-center">
          <div className="relative w-full max-w-2xl">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0 max-w-xs md:max-w-3xl">
              <div className="absolute top-0 -left-4 w-36 h-36 md:w-44 md:h-44 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-36 h-36 md:w-44 md:h-44 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-36 h-36 md:w-44 md:h-44 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <div className="w-full relative flex flex-col items-left md:items-center text-left md:text-center">
              <h1 className="text-5xl font-bold text-black dark:text-white pb-3">
                <TypingEffect />
              </h1>
              <div className='flex flex-row mt-2 mb-3 space-x-7 md:space-x-7'>
                <Link href={data.socialLinks.linkedin}>
                  <FaLinkedin className='w-7 h-7 text-black dark:text-white' />
                </Link>
                <Link href={data.socialLinks.github}>
                  <FaGithub className='w-7 h-7 text-black dark:text-white' />
                </Link>
                <Link href={data.socialLinks.telegram}>
                  <FaTelegram className='w-7 h-7 text-black dark:text-white' />
                </Link>
                <Link href={data.socialLinks.email}>
                  <FaEnvelope className='w-7 h-7 text-black dark:text-white' />
                </Link>
              </div>
              <p className="md:w-[525px] text-lg text-gray-700 dark:text-white pb-4" dangerouslySetInnerHTML={{ __html: data.about.hero.headings.introduction }}></p>
              <button className='hover:shadow-form bg-gradient-to-r from-blue-500 to-red-500 rounded-md py-3 px-5 text-base text-white outline-none'>
                <Link href='/projects'>
                  {data.about.hero.headings.call_to_action_one}
                </Link>
              </button>
              <div className='flex flex-col items-center'>
                <p className='text-3xl font-bold py-10 text-black dark:text-white'>or</p>
                <Link href='#about' className='flex flex-col items-center'>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{data.about.hero.headings.call_to_action_two}</p>
                  <ArrowDownIcon className="w-5 h-5 ml-1 pt-1 text-gray-600 dark:text-gray-400" />
                </Link>
              </div>
            </div>
            <span id='about'></span>
          </div>
          <div className='mt-20'>
            <div className='px-4 leading-8'>
              <div className='flex flex-row justify-between'>
                <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>{data.about.introduction.heading}</h1>
              </div>
              <Image alt="Avatar" width={150} height={150} src='/img/avatar.jpeg' className='w-36 h-36 sm:w-64 sm:h-64 mt-3 float-left aspect-[1/1] lg:aspect-[1/2] 
    rounded-lg shadow-xl object-cover object-center mr-6
    [clip-path:circle(100%)] 
    [shape-outside:circle(100%)]'></Image>
              <p className='text-gray-500 dark:text-gray-400' dangerouslySetInnerHTML={{ __html: data.about.introduction.description }}></p>
              {/* <p className='text-gray-500 dark:text-gray-400 pt-5'>{data.about.introduction.description_alt}</p> */}
              <Link href='/experience'>
                <div className='flex pt-3 text-black dark:text-white'>
                  <p>{data.about.introduction.call_to_action}</p>
                  <ArrowRightIcon className='w-5 h-5 ml-1 pt-1 mt-1' />
                </div>
              </Link>
            </div>
          </div>
          <div className='mt-10'>
            <div className='px-4 leading-8'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>{data.about.interests.heading}</h1>
              <p className='text-gray-500 dark:text-gray-400' dangerouslySetInnerHTML={{ __html: data.about.interests.description }}></p>
              <Link href='/favorites'>
                <div className='flex pt-3 text-black dark:text-white'>
                  <p>{data.about.interests.call_to_action}</p>
                  <ArrowRightIcon className='w-5 h-5 ml-1 pt-1 mt-1' />
                </div>
              </Link>
            </div>
          </div>
          <div className='mt-10 w-full'>
            <div className='px-4'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>{data.about.buzzwords.heading}</h1>
              <p className='text-gray-500 dark:text-gray-400 pb-5 leading-8'>{data.about.buzzwords.description}</p>
              <BuzzwordList buzzwords={data.about.buzzwords.list} />
            </div>
          </div>
          <div className='mt-10 pb-20'>
            <div className='px-4 leading-8'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>{data.about.contact.heading}</h1>
              <div className='flex'>
                <p className="text-gray-600 dark:text-gray-400">{data.about.contact.description}
                  <Link href='/contact'><span className='flex text-black dark:text-white mt-3'>{data.about.contact.description_alt}
                    <FaEnvelope className="ml-2 mt-1 w-5 h-5 text-black dark:text-white" />
                  </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
