"use client";
import { useQuery} from "@tanstack/react-query";
import {getCourse, getMe} from "@/lib/api";
import { LocationV2 } from "@/components/atoms/Location/Location";
import { use} from "react";
import Image from 'next/image'
import CourseInformation from "@/components/atoms/CourseInformation/CourseInformation";
import EnrollSection from "@/components/molecules/EnrollSection/EnrollSection";
import useAuthStore from "@/store/useAuthStore";


const CoursePage = ({ params }) => {
    const { isLoggedIn,openLogin,openProfile} = useAuthStore();
    const { id } = use(params);


    const { data: course } = useQuery({
        queryKey: ["course", id, isLoggedIn],
        queryFn: () => getCourse(id),
    });

    const { data: userData } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: isLoggedIn,
    });


    if (!course) return null;

    return (
        <div className='w-full flex flex-col gap-[24px]'>

            <div className='flex flex-col gap-[32px]'>
                <LocationV2 />
                <h1 className='text-[#141414] font-inter font-semibold text-[40px] leading-none tracking-[0%]'>
                    {course.title}
                </h1>
            </div>

            <div className='w-full flex justify-between'>

                <CourseInformation course={course} courseId={course.id} />

                <div className='w-[530px] flex flex-col gap-[11px]'>
                    <EnrollSection course={course} courseId={course.id} />

                    {(!isLoggedIn || userData?.profileComplete === false) && (<div className='rounded-[12px] mt-0.5 p-5 flex justify-between items-center border border-[#E5E7EB] bg-[#F8FAFC]'>

                        <div className='flex flex-col gap-2 '>
                            <div className='flex gap-1.5'>
                                <Image src={'/Icon_Set_Warning_Orange.svg'} alt={'Warning'} width={22} height={22}/>
                                <h1 className='font-["Inter"] font-medium text-[16px] leading-[24px] text-[#292929]'>{!isLoggedIn ? 'Authentication Required' : 'Complete Your Profile'}</h1>
                            </div>
                            <span className='w-[286px] text-[12px] leading-[15px] font-["Inter"] font-normal text-[#8A8A8A]'>
                                {!isLoggedIn ? 'You need sign in to your profile before enrolling in this course.' : 'You need to fill in your profile details before enrolling in this course.'}
                            </span>

                        </div>

                        <button onClick={!isLoggedIn ? openLogin : openProfile} className='text-[14px] flex font-["Inter"] cursor-pointer leading-[26px] font-normal rounded-[8px] border border-[#B7B3F4] bg-[#EEEDFC] gap-1.5 py-[10px] px-3'>
                            <span className='text-[#281ED2] text-[14px] flex font-["Inter"] leading-[26px] font-normal'>{!isLoggedIn ? 'Sign In' : 'Complete'}</span>
                            <Image src={'/Icon_Set_Right.svg'} alt={'Right'} width={16} height={16}/>
                        </button>


                    </div>)}

                </div>
            </div>

        </div>
    );
};

export default CoursePage;