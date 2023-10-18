'use client';
import React from 'react';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import TypingEffect from "./components/common/TypingEffect";
import Link from 'next/link';
import { ArrowRightIcon, ArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import data from '@/app/constants/data';

export default function Home() {

  return (
    <main className="bg-white dark:bg-black">
      <div className="flex container mx-auto px-4 pt-20 min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        {/* Hero */}
        <div className="pt-10 flex flex-col items-center">
          {/* Wrapper for blobs and text */}
          <div className="relative w-full max-w-2xl">
            {/* Blobs */}
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0 max-w-xs md:max-w-3xl">
              <div className="absolute top-0 -left-4 w-36 h-36 md:w-44 md:h-44 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-36 h-36 md:w-44 md:h-44 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-36 h-36 md:w-44 md:h-44 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Text container */}
            <div className="w-full relative flex flex-col items-left md:items-center">
              <h1 className="text-5xl font-bold text-black dark:text-white pb-3">
                <TypingEffect />
              </h1>
              <Link href='/projects'>
                <div className='flex'>
                  <p className="text-gray-600 dark:text-gray-400">Discover what I&apos;m building</p>
                  <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-gray-600 dark:text-gray-400" />
                </div>
              </Link>
              <div className='flex flex-col items-center'>
                <p className='text-2xl font-bold py-10 text-black dark:text-white'>or</p>
                <Link href='#about' className='flex flex-col items-center'>
                  <p className="text-gray-600 dark:text-gray-400">Get to know me</p>
                  <ArrowDownIcon className="w-5 h-5 ml-1 pt-1 text-gray-600 dark:text-gray-400" />
                </Link>
              </div>
            </div>
            <span id='about'></span>
          </div>
          <div className='mt-20 reveal'>
            <div className='px-4 leading-8'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>About me</h1>
              <Image alt="Avatar" width={150} height={150} src='/img/avatar.jpeg' className='w-38 h-36 sm:w-48 sm:h-48 mt-3 float-left aspect-[1/1] lg:aspect-[1/2] 
    rounded-lg shadow-lg object-cover object-center mb-3 mr-6
    [clip-path:circle(100%)] 
    [shape-outside:circle(100%)]'></Image>
              <p className='text-gray-500 dark:text-gray-400'>{data.about.introduction}</p>
              <Link href='/experience'>
                <div className='flex pt-3 text-black dark:text-white'>
                  <p>See where I&apos;m at</p>
                  <ArrowRightIcon className='w-5 h-5 ml-1 pt-1 mt-1' />
                </div>
              </Link>
            </div>
          </div>
          <div className='mt-10'>
            <div className='px-4 leading-8'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>Interests</h1>
              <p className='text-gray-500 dark:text-gray-400'>{data.about.interests}</p>
              <Link href='/favorites'>
                <div className='flex pt-3 text-black dark:text-white'>
                  <p>See what keeps me motivated</p>
                  <ArrowRightIcon className='w-5 h-5 ml-1 pt-1 mt-1' />
                </div>
              </Link>
            </div>
          </div>
          <div className='mt-10 w-full'>
            <div className='px-4'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>Buzzwords</h1>
              <ul className='text-gray-500 dark:text-gray-400 grid grid-cols-1 gap-2 text-left text-secondary sm:grid-cols-2'>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>React</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Next.js</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Javascript</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Typescript</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>AWS</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>MySQL and MariaDB</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Tailwind CSS & Bootstrap</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Python</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-10 pb-20'>
            <div className='px-4 leading-8'>
              <h1 className='font-bold text-3xl pb-5 text-black dark:text-white'>Contact me</h1>
              <div className='flex'>
                <p className="text-gray-600 dark:text-gray-400">Want to collaborate on something or just have a question? Down below you can find my social links if you want to reach out. I&apos;ll get back to you as soon as possible.
                  <Link href='/contact'><span className='flex text-black dark:text-white mt-3'>If you&apos;re old school, send me an email
                    <EnvelopeIcon className="ml-2 w-5 h-5text-black dark:text-white" />
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
