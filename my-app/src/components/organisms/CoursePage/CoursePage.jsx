"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourse, enroll, completeCourse, retakeCourse, reviewCourse } from "@/lib/api";
import { LocationV2 } from "@/components/atoms/Location/Location";
import Image from "next/image";
import CourseDate from "@/components/atoms/CourseDate/CourseDate";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import WeeklySchedule from "@/components/molecules/WeeklySchedule/WeeklySchedule";
import TimeSlot from "@/components/molecules/TimeSlot/TimeSlot";
import SessionType from "@/components/molecules/SessionType/SessionType";
import useAuthStore from "@/store/useAuthStore";

const CATEGORY_ICONS = {
    "Development": "development",
    "Design": "design",
    "Business": "business",
    "Marketing": "marketing",
    "Data Science": "data-science",
};

const CoursePage = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();
    const queryClient = useQueryClient();
    const { isLoggedIn, user, openLogin, openProfile } = useAuthStore();

    const [isSchedule, setScheduleOpen] = useState(true);
    const [isTimeSlot, setTimeSlotOpen] = useState(false);
    const [isSessionType, setSessionTypeOpen] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
    const [selectedSessionTypeId, setSelectedSessionTypeId] = useState(null);
    const [conflictData, setConflictData] = useState(null);
    const [enrollError, setEnrollError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);

    const { data: course } = useQuery({
        queryKey: ["course", id],
        queryFn: () => getCourse(id),
    });

    const { mutate: doEnroll, isPending } = useMutation({
        mutationFn: enroll,
        onSuccess: () => {
            setConflictData(null);
            setEnrollError(null);
            queryClient.invalidateQueries({ queryKey: ["course", id] });
            queryClient.invalidateQueries({ queryKey: ["enrollments"] });
        },
        onError: (err) => {
            const data = err.response?.data;
            if (err.response?.status === 409 && data?.conflicts) {
                setConflictData(data.conflicts);
            } else {
                setEnrollError(data?.message || "Enrollment failed. Please try again.");
            }
        }
    });

    const { mutate: doComplete } = useMutation({
        mutationFn: () => completeCourse(enrollment?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", id] });
            queryClient.invalidateQueries({ queryKey: ["enrollments"] });
            setShowSuccess(true);
            if (!course.isRated) setShowRating(true);
        },
    });

    const { mutate: doRetake } = useMutation({
        mutationFn: () => retakeCourse(enrollment?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", id] });
            queryClient.invalidateQueries({ queryKey: ["enrollments"] });
        },
    });

    const { mutate: doReview } = useMutation({
        mutationFn: (rating) => reviewCourse(id, rating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", id] });
            setShowRating(false);
        },
    });



    if (!course) return null;

    const avgRating = course.reviews?.length
        ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length).toFixed(1)
        : null;

    const categoryIcon = CATEGORY_ICONS[course.category?.name] || "development";
    const isEnrolled = !!course.enrollment;
    const enrollment = course.enrollment;
    const allSelected = selectedScheduleId && selectedTimeSlotId && selectedSessionTypeId;

    const handleEnroll = () => {
        if (!isLoggedIn) {
            openLogin();
            return;
        }
        if (!user?.profileComplete) {
            openProfile();
            return;
        }
        if (!allSelected) {
            setEnrollError("Please select a weekly schedule, time slot, and session type.");
            return;
        }
        setEnrollError(null);
        doEnroll({
            courseId: Number(id),
            courseScheduleId: selectedSessionTypeId,
            force: false,
        });
    };

    const handleForceEnroll = () => {
        doEnroll({
            courseId: Number(id),
            courseScheduleId: selectedSessionTypeId,
            force: true,
        });
        setConflictData(null);
    };

    return (
        <div className='w-full flex flex-col gap-[24px]'>

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
                                    <Image src={`/${categoryIcon}_vector.svg`} alt={course.category?.name} width={24} height={24} />
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

                        {isEnrolled ? (
                            <div className='flex flex-col gap-[24px] w-full bg-white rounded-[12px] p-[24px] border border-[#F5F5F5]'>
                                <div className='flex flex-col gap-[12px]'>
                                    <div className='flex justify-between'>
                                        <span className='font-inter font-semibold text-[16px] text-[#130E67]'>Course Progress</span>
                                        <span className='font-inter font-semibold text-[16px] text-[#130E67]'>{enrollment.progress}%</span>
                                    </div>
                                    <div className='w-full h-[8px] bg-[#EEEDFC] rounded-full'>
                                        <div
                                            className='h-[8px] bg-[#4F46E5] rounded-full transition-all'
                                            style={{ width: `${enrollment.progress}%` }}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-[8px]'>
                                    <div className='flex justify-between'>
                                        <span className='text-[#8A8A8A] font-inter text-[14px]'>Weekly Schedule</span>
                                        <span className='font-inter font-medium text-[14px]'>{enrollment.schedule?.weeklySchedule?.label}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-[#8A8A8A] font-inter text-[14px]'>Time Slot</span>
                                        <span className='font-inter font-medium text-[14px]'>{enrollment.schedule?.timeSlot?.label}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-[#8A8A8A] font-inter text-[14px]'>Session Type</span>
                                        <span className='font-inter font-medium text-[14px] capitalize'>{enrollment.schedule?.sessionType?.name}</span>
                                    </div>
                                    {enrollment.schedule?.location && (
                                        <div className='flex justify-between'>
                                            <span className='text-[#8A8A8A] font-inter text-[14px]'>Location</span>
                                            <span className='font-inter font-medium text-[14px]'>{enrollment.schedule.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
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
                                    onSelect={(sessionId) => setSelectedSessionTypeId(sessionId)}
                                />
                            </>
                        )}

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

                            {enrollError && (
                                <p className='text-red-500 text-sm text-center'>{enrollError}</p>
                            )}

                            {conflictData && (
                                <div className='flex flex-col gap-[12px] bg-yellow-50 border border-yellow-300 rounded-[12px] p-[16px]'>
                                    <p className='text-yellow-700 font-medium text-sm'>Schedule conflict detected. Enroll anyway?</p>
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={handleForceEnroll}
                                            className='flex-1 h-[40px] rounded-[8px] bg-[#4F46E5] text-white font-inter font-medium text-[14px]'
                                        >
                                            Enroll Anyway
                                        </button>
                                        <button
                                            onClick={() => setConflictData(null)}
                                            className='flex-1 h-[40px] rounded-[8px] border border-[#D1D1D1] font-inter font-medium text-[14px]'
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isEnrolled ? (
                                enrollment.progress === 100 ? (
                                    <div className='flex flex-col gap-[16px]'>

                                        {showSuccess && (
                                            <div className='bg-green-50 border border-green-300 rounded-[12px] p-[16px] text-center'>
                                                <p className='text-green-700 font-inter font-semibold text-[16px]'>
                                                    Congratulations! You've completed {course.title}! 🎉
                                                </p>
                                            </div>
                                        )}

                                        {/* Rating */}
                                        {showRating && !course.isRated && (
                                            <div className='flex flex-col gap-[12px] bg-white border border-[#F5F5F5] rounded-[12px] p-[16px]'>
                                                <p className='font-inter font-semibold text-[16px] text-[#130E67]'>Rate this course</p>
                                                <div className='flex gap-2'>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => setSelectedRating(star)}
                                                            className={`text-[28px] ${selectedRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => doReview(selectedRating)}
                                                    disabled={!selectedRating}
                                                    className='w-full h-[45px] rounded-[12px] bg-[#4F46E5] text-white font-inter font-semibold text-[16px] disabled:opacity-50'
                                                >
                                                    Submit Rating
                                                </button>
                                            </div>
                                        )}

                                        <div className='flex flex-col gap-[12px] items-center bg-white border border-[#F5F5F5] rounded-[12px] p-[24px]'>
                                            <div className='text-green-600 font-inter font-semibold text-[20px]'>Completed ✓</div>
                                            <p className='text-[#8A8A8A] text-sm'>Course Completed! 🎉</p>
                                            <button
                                                onClick={() => doRetake()}
                                                className='w-full h-[50px] rounded-[12px] border border-[#4F46E5] text-[#4F46E5] font-inter font-semibold text-[16px]'
                                            >
                                                Retake Course
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => doComplete()}
                                        className='w-full h-[63px] rounded-[12px] p-[10px] bg-[#4F46E5] text-white font-inter font-semibold text-[20px] leading-[24px] tracking-normal text-center'
                                    >
                                        Complete Course
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    disabled={isPending}
                                    className='w-full h-[63px] rounded-[12px] p-[10px] bg-[#EEEDFC] text-[#B7B3F4] font-inter font-semibold text-[20px] leading-[24px] tracking-normal text-center disabled:opacity-50'
                                >
                                    {isPending ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CoursePage;