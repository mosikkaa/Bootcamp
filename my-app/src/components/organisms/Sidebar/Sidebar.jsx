'use client'

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import Image from 'next/image';

const enrolledCourses = [
    {
        id: 1,
        instructor: 'Instructor Sarah Johnson',
        title: 'Advanced React & TypeScript Development',
        schedule: 'Monday-Wednesday',
        time: 'Evening 6:00 PM - 8:00 PM',
        mode: 'In Person',
        location: 'Tbilisi, Chavchavadze St.30',
        progress: 65,
        rating: 4.9,
        img: '/course-thumb.jpg',
    },
];

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isSidebarOpen]);

    if (!mounted || !isSidebarOpen) return null;

    return createPortal(
        <div className='fixed inset-0 z-50 flex justify-end'>

            <div className='absolute inset-0 bg-black/30' onClick={closeSidebar} />

            <div className='relative z-999 w-[460px] h-full bg-white flex flex-col overflow-y-auto'>

                <div className='flex justify-between items-center px-8 py-6 border-b'>
                    <h2 className='text-2xl font-bold'>Enrolled Courses</h2>
                    <span className='text-sm text-gray-500'>Total Enrollments: {enrolledCourses.length}</span>
                </div>

                <div className='flex flex-col divide-y'>
                    {enrolledCourses.map((course) => (
                        <div key={course.id} className='flex flex-col gap-3 px-8 py-6'>

                            <div className='flex gap-4'>
                                <Image src={course.img} alt={course.title} width={100} height={80} className='rounded-lg object-cover' />
                                <div className='flex flex-col gap-1'>
                                    <span className='text-xs text-gray-400'>{course.instructor}</span>
                                    <div className='flex items-center gap-1'>
                                        <Image src='/star.svg' alt='star' width={14} height={14} />
                                        <span className='text-sm font-medium'>{course.rating}</span>
                                    </div>
                                    <h3 className='font-bold text-sm leading-tight'>{course.title}</h3>
                                    <div className='flex flex-col gap-0.5 mt-1'>
                                        <span className='text-xs text-gray-500'>📅 {course.schedule}</span>
                                        <span className='text-xs text-gray-500'>🕐 {course.time}</span>
                                        <span className='text-xs text-gray-500'>👤 {course.mode}</span>
                                        <span className='text-xs text-gray-500'>📍 {course.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <span className='text-xs text-gray-500'>{course.progress}% Complete</span>
                                    <div className='w-full h-1.5 bg-gray-200 rounded-full'>
                                        <div
                                            className='h-1.5 bg-indigo-500 rounded-full'
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <button className='border border-gray-300 rounded-lg px-4 py-1.5 text-sm hover:bg-gray-50'>
                                    View
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>,
        document.body
    );
}

export default Sidebar;