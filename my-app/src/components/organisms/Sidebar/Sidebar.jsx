'use client'
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEnrollments } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar, isLoggedIn } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    const { data: enrollments = [] } = useQuery({
        queryKey: ["enrollments"],
        queryFn: getEnrollments,
        enabled: isLoggedIn && isSidebarOpen,
    });

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
                    <span className='text-sm text-gray-500'>Total Enrollments: {enrollments.length}</span>
                </div>

                <div className='flex flex-col divide-y'>
                    {enrollments.map((enrollment) => (
                        <div key={enrollment.id} className='flex flex-col gap-3 px-8 py-6'>

                            <div className='flex gap-4'>
                                <Image
                                    src={enrollment.course?.image || '/StartBGTry.svg'}
                                    alt={enrollment.course?.title}
                                    width={100}
                                    height={80}
                                    className='rounded-lg object-cover'
                                />
                                <div className='flex flex-col gap-1'>
                                    <span className='text-xs text-gray-400'>Instructor {enrollment.course?.instructor?.name}</span>
                                    <div className='flex items-center gap-1'>
                                        <Image src='/star.svg' alt='star' width={14} height={14} />
                                        <span className='text-sm font-medium'>{enrollment.course?.avgRating ?? 'N/A'}</span>
                                    </div>
                                    <h3 className='font-bold text-sm leading-tight'>{enrollment.course?.title}</h3>
                                    <div className='flex flex-col gap-0.5 mt-1'>
                                        <span className='text-xs text-gray-500'>📅 {enrollment.schedule?.weeklySchedule?.label}</span>
                                        <span className='text-xs text-gray-500'>🕐 {enrollment.schedule?.timeSlot?.label}</span>
                                        <span className='text-xs text-gray-500 capitalize'>👤 {enrollment.schedule?.sessionType?.name}</span>
                                        {enrollment.schedule?.location && (
                                            <span className='text-xs text-gray-500'>📍 {enrollment.schedule.location}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <span className='text-xs text-gray-500'>{enrollment.progress}% Complete</span>
                                    <div className='w-full h-1.5 bg-gray-200 rounded-full'>
                                        <div
                                            className='h-1.5 bg-indigo-500 rounded-full'
                                            style={{ width: `${enrollment.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <Link
                                    href={`/courses/${enrollment.course?.id}`}
                                    onClick={closeSidebar}
                                    className='border border-gray-300 rounded-lg px-4 py-1.5 text-sm hover:bg-gray-50'
                                >
                                    View
                                </Link>
                            </div>

                        </div>
                    ))}

                    {enrollments.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-16 gap-2'>
                            <p className='text-gray-400 text-sm'>No enrolled courses yet</p>
                        </div>
                    )}
                </div>

            </div>
        </div>,
        document.body
    );
}

export default Sidebar;