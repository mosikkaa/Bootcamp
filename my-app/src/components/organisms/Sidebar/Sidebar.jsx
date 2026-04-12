'use client'
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEnrollments } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import Button from "@/components/atoms/Button/Button";

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
        <div className=' fixed inset-0 z-50 flex justify-end'>

            <div className='absolute inset-0 bg-black/30' onClick={closeSidebar} />

            <div className='relative z-999 gap-[37px] w-[794px] h-full items-center bg-[#F5F5F5] flex flex-col overflow-y-auto'>

                <div className='flex gap-[202px] w-full h-[86px] items-end justify-center'>
                    <h2 className='font-["Inter"] font-semibold text-[40px] leading-[44px] tracking-[-0.005em] text-[#0A0A0A]'>Enrolled Courses</h2>
                    <span className='font-["Inter"] text-[16px] tracking-normal text-[#0A0A0A]'>
                        <span className='font-medium leading-[24px]'>Total Enrollments:</span>
                        <span className='font-semibold leading-[24px]'>{enrollments.length}</span>
                    </span>
                </div>

                <div className='flex flex-col items-center gap-3'>
                    {enrollments.map((enrollment) => (
                        <div key={enrollment.id} className='flex flex-col bg-white gap-3 rounded-[12px] p-5 w-[623px]'>

                            <div className='flex flex-col gap-4'>

                                <div className='flex gap-[18px]'>
                                    <Image src={enrollment.course?.image || '/StartBGTry.svg'} alt={enrollment.course?.title} width={269} height={191} className='rounded-[10px] object-cover w-[269px] h-[191px]'/>

                                    <div className='flex flex-col items-start justify-between w-[296px]'>

                                        <div className='flex justify-between items-center h-[18px] w-full'>
                                            <span className='flex gap-1 font-["Inter"] font-medium text-[14px] leading-none tracking-normal'>
                                                <span className='text-[#A3A3A3]'>Instructor</span>
                                                <span className='text-[#525252]'>{enrollment.course?.instructor?.name}</span>
                                            </span>
                                            <div className='flex items-center gap-1'>
                                                <Image src='/star.svg' alt='star' width={14} height={14} />
                                                <span className='text-sm font-medium'>{enrollment.course?.avgRating}</span>
                                            </div>
                                        </div>

                                        <h3 className='font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal text-[#141414]'>{enrollment.course?.title}</h3>

                                        <ul className='flex flex-col '>
                                            <li className='flex gap-2'>
                                                <Image src={'/calendar_vector.svg'} alt={'calendar'} width={16} height={16}/>
                                                <span className='font-["Inter"] font-normal text-[14px] leading-[26px] tracking-normal text-[#666666]'>{enrollment.schedule?.weeklySchedule?.label}</span>
                                            </li>
                                            <li className='flex gap-2'>
                                                    <Image src={'/time_vector.svg'} alt={'time'} width={16} height={16}/>
                                                <span className='font-["Inter"] font-normal text-[14px] leading-[26px] tracking-normal text-[#666666]'>
                                                    {enrollment.schedule?.timeSlot?.label?.replace(/[()]/g, '')}
                                                </span>
                                            </li>
                                            <li className='flex gap-2 capitalize'>
                                                    <Image src={'/person_vector.svg'} alt={'person'} width={16} height={16}/>
                                                <span className='font-["Inter"] font-normal text-[14px] leading-[26px] tracking-normal text-[#666666]'>
                                                    {enrollment.schedule?.sessionType?.name.replace(/[_]/g, ' ')}
                                                </span>
                                            </li>
                                            {enrollment.schedule?.location && (
                                                <li className='flex gap-2'>
                                                        <Image src={'/location_vector.svg'} alt={'location'} width={16} height={16}/>
                                                    <span className='font-["Inter"] font-normal text-[14px] leading-[26px] tracking-normal text-[#666666]'>
                                                        {enrollment.schedule?.location?.replace('Tbilisi', 'Tbilisi,')}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>

                                    </div>

                                </div>

                                <div className='flex items-center justify-between gap-4'>
                                    <div className='flex flex-col gap-1 flex-1'>
                                        <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal align-middle text-[#141414]'>{enrollment.progress}% Complete</span>
                                        <div className='w-full h-[15px] bg-[#DDDBFA] rounded-[30px]'>
                                            <div
                                                className='h-[15px] bg-[#4F46E5] rounded-[30px]'
                                                style={{ width: `${enrollment.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Link
                                        href={`/courses/${enrollment.course?.id}`}
                                        onClick={closeSidebar}
                                        className='w-fit'
                                    >
                                        <Button variant={"viewV2"}>View</Button>
                                    </Link>
                                </div>

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