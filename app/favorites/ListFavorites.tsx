import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface MediaItem {
    title: string;
    description: string;
    imgSrc: string;
    link: string;
}

interface MediaData {
    heading: string;
    description: string;
    items: MediaItem[];
}

type MediaType = 'podcasts' | 'youtube';

interface MediaSectionProps {
    type: MediaType;
    data: MediaData;
}


function FavoritesSection({ type, data }: MediaSectionProps) {
    const linkText = type === 'podcasts' ? 'Visit Website' : 'View Channel';

    return (
        <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">{data.heading}</h2>
            <p className="text-gray-500 mb-6">{data.description}</p>

            {data.items.map(item => (
                <div className="flex flex-col md:flex-row items-start py-6" key={item.title}>
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src={item.imgSrc} alt={`${type} Logo`} />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <Link href={item.link}>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">{linkText}</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default FavoritesSection;
