'use client'
import Image from "next/image";
import {useState} from "react";
import {LocationV2} from "@/components/atoms/Location/Location";
import CourseDate from "@/components/atoms/CourseDate/CourseDate";

export default function CoursePage({ params }) {
    const { id } = params;

    const [isSchedule, setScheduleOpen] = useState(true);

    return (
        <main className='w-full bg-[#F5F5F5] flex items-center px-[177px] justify-between pt-16 pb-20'>
            <div className='w-full h-[1055.15px] flex flex-col gap-[24px]'>

                <div className='flex flex-col gap-[32px]'>

                    <LocationV2/>
                    <h1 className='text-[#141414] font-inter font-semibold text-[40px] leading-none tracking-[0%]'>Advanced React & TypeScript Development</h1>

                </div>

                <div className='w-full flex justify-between'>
                    <div className='w-[903px] flex flex-col gap-[18px]'>

                        <div className='flex flex-col gap-[16px]'>
                            <Image src='/StartBGTry.svg' alt='StartBGTry' height={474.15} width={903} />

                            <div className='flex w-full justify-between'>

                                <div className='flex gap-[12px]'>

                                    <CourseDate img={'/boxicons_calendar.svg'} alt={'calendar'}>12 Weeks</CourseDate>

                                    <CourseDate img={'/tabler_clock.svg'} alt={'clock'}>128 Hours</CourseDate>

                                </div>

                                <div className='flex gap-[12px] items-center'>
                                    <div className='flex gap-1 items-center'>
                                        <Image src={'/star.svg'} width={26} height={26} alt={'star'} />
                                        <span className='text-[#525252] font-inter font-medium text-[14px] leading-[100%] tracking-[0%]'>4.9</span>
                                    </div>
                                    <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                                        <span>Development</span>
                                    </button>
                                </div>


                            </div>
                        </div>

                        <div className='flex flex-col gap-[18px]'>

                            <button className='flex items-center text-center w-[179px] h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                                <Image src={'/tryInstructor.svg'} alt={'instructor'} width={30} height={30}/>
                                <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>Marilyn Mango</span>
                            </button>

                            <div className='flex flex-col gap-[24px]'>
                                <h1 className='text-[#8A8A8A] font-inter font-semibold text-[20px] leading-[24px] tracking-normal'>Course Description</h1>
                                <p className='text-[#525252] font-inter font-medium text-[16px] leading-[24px] tracking-normal'>
                                    This course focuses on building scalable, production-level front-end applications using React and TypeScript. It covers advanced component architecture, strong typing strategies, state management patterns, and performance optimization techniques used in modern web products.
                                    <br/>
                                    <br/>
                                    Participants learn how to design reusable components, structure large codebases, and improve maintainability through strict typing and clear interfaces. The course also explores advanced hooks, custom hooks, API integration, error handling, and testing approaches commonly used in professional development environments.
                                    This course focuses on building scalable, production-level front-end applications using React and TypeScript. It covers advanced component architecture, strong typing strategies, state management patterns, and performance optimization techniques used in modern web products.

                                </p>
                            </div>

                        </div>


                    </div>

                    <div className='w-[530px] flex flex-col gap-[11px]'>

                        <div className='flex flex-col rounded-[12px] gap-[32px]'>

                            <div className='flex flex-col gap-[18px] w-full'>

                                <button onClick={() => {setScheduleOpen(!isSchedule)}} className='flex justify-between'>

                                    <div className='flex gap-2 items-center'>
                                        <Image src={'/Icon_Set_One.svg'} alt='One' width={28} height={28}/>
                                        <h2 className='text-[#130E67] font-inter font-semibold text-[24px] leading-[100%] tracking-normal'>Weekly Schedule</h2>
                                    </div>

                                    <Image src={'/Icon_Title_Down.svg'} alt='ArrowDown' width={28} height={28}/>

                                </button>

                                <div className={`gap-[12px] ${isSchedule ? 'flex' : 'hidden'}`}>

                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Mon - Wed</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Tue - Thu</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Wed - Fri</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Weekend</button>

                                </div>

                            </div>

                            <div className='flex flex-col gap-[18px] w-full '>

                                <button onClick={() => {setScheduleOpen(!isSchedule)}} className='flex justify-between'>

                                    <div className='flex gap-2 items-center'>
                                        <Image src={'/Icon_Set_One.svg'} alt='One' width={28} height={28}/>
                                        <h2 className='text-[#130E67] font-inter font-semibold text-[24px] leading-[100%] tracking-normal'>Weekly Schedule</h2>
                                    </div>

                                    <Image src={'/Icon_Title_Down.svg'} alt='ArrowDown' width={28} height={28}/>

                                </button>

                                <div className={`gap-[12px] ${isSchedule ? 'flex' : 'hidden'}`}>

                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Mon - Wed</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Tue - Thu</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Wed - Fri</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Weekend</button>

                                </div>

                            </div>

                            <div className='flex flex-col gap-[18px] w-full '>

                                <button onClick={() => {setScheduleOpen(!isSchedule)}} className='flex justify-between'>

                                    <div className='flex gap-2 items-center'>
                                        <Image src={'/Icon_Set_One.svg'} alt='One' width={28} height={28}/>
                                        <h2 className='text-[#130E67] font-inter font-semibold text-[24px] leading-[100%] tracking-normal'>Weekly Schedule</h2>
                                    </div>

                                    <Image src={'/Icon_Title_Down.svg'} alt='ArrowDown' width={28} height={28}/>

                                </button>

                                <div className={`gap-[12px] ${isSchedule ? 'flex' : 'hidden'}`}>

                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Mon - Wed</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Tue - Thu</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-white p-[10px] h-[91px] border border-[#D1D1D1] text-[#292929] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Wed - Fri</button>
                                    <button className='rounded-[12px] w-[123.5px] bg-[#F5F5F5] p-[10px] h-[91px] border border-[#D1D1D1] text-[#D1D1D1] font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center'>Weekend</button>

                                </div>

                            </div>

                            <div className='w-[530px] rounded-[12px] p-[40px] gap-[32px] border border-[#F5F5F5] bg-white'>
                                <div className='flex flex-col gap-[32px]'>
                                    <div className='flex justify-between items-center'>
                                        <h1>Total Price</h1>
                                        <h1>$349</h1>
                                    </div>
                                    <div className='flex flex-col pr-1 gap-[12px]'>
                                        <div className='flex justify-between items-center'>
                                            <span>Base Price</span>
                                            <span>+0$</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Base Price</span>
                                            <span>+0$</span>
                                        </div>
                                    </div>
                                </div>
                                <button className='w-[450px] h-[63px] rounded-[12px] p-[10px] bg-[#EEEDFC] text-[#B7B3F4] font-inter font-semibold text-[20px] leading-[24px] tracking-normal text-center'>
                                    Enroll Now
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}