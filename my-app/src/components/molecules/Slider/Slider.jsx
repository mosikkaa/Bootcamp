'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {useRef, useState} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';

const slides = [
    {
        id: 1,
        title: 'Start learning something new today',
        description: `Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.`,
        bg: '/SliderBG1.png',
    },
    {
        id: 2,
        title: 'Your second slide title',
        description: 'Your second slide description.',
        bg: '/SliderBG1.png',
    },
    {
        id: 3,
        title: 'Your second slide title',
        description: 'Your second slide description.',
        bg: '/SliderBG1.png',
    }
];



const Slider = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const isFirst = activeIndex === 0;
    const isLast = activeIndex === slides.length - 1;

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true}}
            touchStartPreventDefault={false}  // ✅ enables mouse drag swiping
            simulateTouch={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className='w-full h-[420px] rounded-[30px] relative'
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className='w-full h-full p-12 flex '>

                        {/* Background Image */}
                        <Image
                            src={slide.bg}
                            alt={slide.title}
                            fill
                            className='object-cover'
                            priority
                        />

                        {/* Overlay */}
                        <div className='absolute inset-0 bg-black/30' />

                        {/* Content */}
                        <div className='relative z-10 flex flex-col gap-4 w-full'>
                            <h1 className='text-white text-[32px] font-bold leading-tight'>
                                {slide.title}
                            </h1>
                            <p className='text-white/90 text-[14px]'>
                                {slide.description}
                            </p>
                            <div>
                                <Button variant="browse">Browse Courses</Button>
                            </div>
                        </div>

                    </div>

                </SwiperSlide>
            ))}
            <div className='absolute bottom-10 right-10 z-10 flex items-center gap-6'>
                <button className='cursor-pointer' onClick={() => swiperRef.current?.slidePrev()}>
                    <Image
                        src='/arrow-previous.svg'
                        alt='prev'
                        width={54}
                        height={54}
                        className={isFirst ? 'opacity-40 grayscale' : 'opacity-100'}
                    />
                </button>
                <button className='cursor-pointer' onClick={() => swiperRef.current?.slideNext()}>
                    <Image
                        src='/arrow-next.svg'
                        alt='next'
                        width={54}
                        height={54}
                        className={isLast ? 'opacity-40 grayscale' : 'opacity-100'}
                    />
                </button>
            </div>
        </Swiper>
    );
};

export default Slider