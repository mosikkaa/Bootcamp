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
            className='w-full h-[420px] rounded-[30px] relative'
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className='w-full h-full p-12 flex '>

                        <Image
                            src={slide.bg}
                            alt={slide.title}
                            fill
                            className='object-cover'
                            priority
                        />

                        <div className='absolute inset-0 bg-black/30' />

                        <div className='relative z-10 flex flex-col gap-10 w-full'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-white font-["Inter"] font-bold text-[48px] leading-none tracking-normal'>
                                    {slide.title}
                                </h1>
                                <p className='text-white/90 w-[1256px] font-["Inter"] font-light text-[24px] leading-none tracking-normal'>
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
            <div className='absolute bottom-10 right-10 z-10 flex items-center gap-6'>
                <button className='cursor-pointer' onClick={() => isFirst ? null : swiperRef.current?.slidePrev()}>
                    <Image
                        src='/arrow-previous.svg'
                        alt='prev'
                        width={54}
                        height={54}
                        className={isFirst ? 'opacity-40 grayscale' : 'opacity-100'}
                    />
                </button>
                <button className='cursor-pointer' onClick={() => isLast ? null : swiperRef.current?.slideNext()}>
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