"use client";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@/lib/api";
import { LocationV2 } from "@/components/atoms/Location/Location";
import Image from "next/image";
import CourseDate from "@/components/atoms/CourseDate/CourseDate";
import {use, useState} from "react";
import WeeklySchedule from "@/components/molecules/WeeklySchedule/WeeklySchedule";
import TimeSlot from "@/components/molecules/TimeSlot/TimeSlot";
import SessionType from "@/components/molecules/SessionType/SessionType";

const CATEGORY_ICONS = {
    "Development": "development",
    "Design": "design",
    "Business": "business",
    "Marketing": "marketing",
    "Data Science": "data-science",
};

const CoursePage = ({ params }) => {
    const { id } = use(params);

    const [isSchedule, setScheduleOpen] = useState(true);
    const [isTimeSlot, setTimeSlotOpen] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
    const [isSessionType, setSessionTypeOpen] = useState(false);

    const { data: course } = useQuery({
        queryKey: ["course", id],
        queryFn: () => getCourse(id),
    });

    if (!course) return null;

    const avgRating = course.reviews?.length
        ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length).toFixed(1)
        : null;

    const categoryIcon = CATEGORY_ICONS[course.category?.name] || "development";

    return (
        <div className='w-full h-[1055.15px] flex flex-col gap-[24px]'>

            <div className='flex flex-col gap-[32px]'>
                <LocationV2 />
                <h1 className='text-[#141414] font-inter font-semibold text-[40px] leading-none tracking-[0%]'>
                    {course.title}
                </h1>
            </div>

            <div className='w-full flex justify-between'>
                <div className='w-[903px] flex flex-col gap-[18px]'>

                    <div className='flex flex-col gap-[16px]'>
                        <Image
                            src={course.image || '/StartBGTry.svg'}
                            alt={course.title}
                            height={474.15}
                            width={903}
                            className="rounded-lg h-[474.15px] w-[903px] object-cover"
                        />

                        <div className='flex w-full justify-between'>
                            <div className='flex gap-[12px]'>
                                <CourseDate img={'/boxicons_calendar.svg'} alt={'calendar'}>
                                    {course.durationWeeks} Weeks
                                </CourseDate>
                                <CourseDate img={'/tabler_clock.svg'} alt={'clock'}>
                                    {course.hours} Hours
                                </CourseDate>
                            </div>

                            <div className='flex gap-[12px] items-center'>
                                {avgRating && (
                                    <div className='flex gap-1 items-center'>
                                        <Image src={'/star.svg'} width={26} height={26} alt={'star'} />
                                        <span className='text-[#525252] font-inter font-medium text-[14px] leading-[100%] tracking-[0%]'>{avgRating}</span>
                                    </div>
                                )}
                                <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                    <Image src={`/${categoryIcon}_vector.svg`} alt={course.category?.name} width={24} height={24}/>
                                    <span>{course.category?.name}</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col gap-[18px]'>
                        <button className='flex items-center text-center w-fit h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                            <Image
                                src={course.instructor?.avatar || '/tryInstructor.svg'}
                                alt={course.instructor?.name}
                                width={30}
                                height={30}
                                className="rounded-full object-cover"
                            />
                            <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>
                                {course.instructor?.name}
                            </span>
                        </button>

                        <div className='flex flex-col gap-[24px]'>
                            <h1 className='text-[#8A8A8A] font-inter font-semibold text-[20px] leading-[24px] tracking-normal'>
                                Course Description
                            </h1>
                            <p className='text-[#525252] font-inter font-medium text-[16px] leading-[24px] tracking-normal'>
                                {course.description}
                            </p>
                        </div>
                    </div>

                </div>

                <div className='w-[530px] flex flex-col gap-[11px]'>
                    <div className='flex flex-col rounded-[12px] gap-[32px]'>


                        <WeeklySchedule
                            courseId={id}
                            isOpen={isSchedule}
                            onToggle={() => setScheduleOpen(!isSchedule)}
                            onSelect={(scheduleId) => {
                                setSelectedScheduleId(scheduleId);
                                if (scheduleId) setTimeSlotOpen(true);
                            }}
                        />

                        <TimeSlot
                            courseId={id}
                            weeklyScheduleId={selectedScheduleId}
                            isOpen={isTimeSlot}
                            onToggle={() => setTimeSlotOpen(!isTimeSlot)}
                            onSelect={(slotId) => {
                                setSelectedTimeSlotId(slotId);
                                if (slotId) setSessionTypeOpen(true);
                            }}
                        />

                        <SessionType
                            courseId={id}
                            weeklyScheduleId={selectedScheduleId}
                            timeSlotId={selectedTimeSlotId}
                            isOpen={isSessionType}
                            onToggle={() => setSessionTypeOpen(!isSessionType)}
                        />



                        <div className='w-[530px] rounded-[12px] p-[40px] gap-[32px] border border-[#F5F5F5] bg-white flex flex-col'>
                            <div className='flex flex-col gap-[32px]'>
                                <div className='flex justify-between items-center'>
                                    <h1>Total Price</h1>
                                    <h1>${parseFloat(course.basePrice).toFixed(0)}</h1>
                                </div>
                                <div className='flex flex-col pr-1 gap-[12px]'>
                                    <div className='flex justify-between items-center'>
                                        <span>Base Price</span>
                                        <span>${parseFloat(course.basePrice).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                            <button className='w-full h-[63px] rounded-[12px] p-[10px] bg-[#EEEDFC] text-[#B7B3F4] font-inter font-semibold text-[20px] leading-[24px] tracking-normal text-center'>
                                Enroll Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CoursePage;