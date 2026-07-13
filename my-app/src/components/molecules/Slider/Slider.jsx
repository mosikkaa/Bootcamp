'use client'

import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination,Autoplay} from 'swiper/modules';
import {useRef, useState} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import Link from "next/link";

const slides = [
    {
        id: 1,
        title: 'Start learning something new today',
        description: `Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.`,
        bg: '/SliderBG1.png',
        button:'Browse Courses'

    },
    {
        id: 2,
        title: 'Pick up where you left off',
        description: 'Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.',
        bg: '/SliderBG2.png',
        button:'Start Learning'
    },
    {
        id: 3,
        title: 'Learn together, grow faster',
        description: '',
        bg: '/SliderBG3.png',
        button:'Learn More'
    }
];



const Slider = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const isFirst = activeIndex === 0;
    const isLast = activeIndex === slides.length - 1;

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            touchStartPreventDefault={false}
            simulateTouch={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            }}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className='w-full h-[200px] sm:h-[280px] md:h-[340px] lg:h-[420px] rounded-[20px] lg:rounded-[30px] relative'
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className='w-full h-full p-5 sm:p-8 lg:p-12 flex '>

                        <Image
                            src={slide.bg}
                            alt={slide.title}
                            fill
                            className='object-cover relative'
                            priority
                        />

                        <div className='absolute inset-0 bg-black/30' />

                        <div className='relative z-10 flex flex-col gap-10 w-full'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-white font-["Inter"] font-bold text-[20px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-tight tracking-normal'>
                                    {slide.title}
                                </h1>
                                <p className='text-white/90 w-full max-w-[950px] font-["Inter"] font-light text-[13px] sm:text-[16px] lg:text-[24px] leading-snug tracking-normal'>
                                    {slide.description}
                                </p>
                            </div>
                                <Link href={'/browse'} className='w-fit'>
                                    <Button variant="browse">{slide.button}</Button>
                                </Link>
                        </div>

                    </div>

                </SwiperSlide>
            ))}
            <div className='absolute bottom-4 lg:bottom-10 right-4 lg:right-10 z-10 flex items-center gap-3 lg:gap-6'>
                <button className='cursor-pointer' onClick={() => isFirst ? null : swiperRef.current?.slidePrev()}>
                    <Image
                        src='/arrow-previous.svg'
                        alt='prev'
                        width={54}
                        height={54}
                        className={`w-[34px] h-[34px] lg:w-[54px] lg:h-[54px] ${isFirst ? 'opacity-40 grayscale' : 'opacity-100'}`}
                    />
                </button>
                <button className='cursor-pointer' onClick={() => isLast ? null : swiperRef.current?.slideNext()}>
                    <Image
                        src='/arrow-next.svg'
                        alt='next'
                        width={54}
                        height={54}
                        className={`w-[34px] h-[34px] lg:w-[54px] lg:h-[54px] ${isLast ? 'opacity-40 grayscale' : 'opacity-100'}`}
                    />
                </button>
            </div>
        </Swiper>
    );
};

export default Slider