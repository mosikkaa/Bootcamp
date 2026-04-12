"use client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {enroll, completeCourse, retakeCourse, reviewCourse, getSessionTypes} from "@/lib/api";
import { useState } from "react";
import WeeklySchedule from "@/components/molecules/WeeklySchedule/WeeklySchedule";
import TimeSlot from "@/components/molecules/TimeSlot/TimeSlot";
import SessionType from "@/components/molecules/SessionType/SessionType";
import useAuthStore from "@/store/useAuthStore";
import Button from "@/components/atoms/Button/Button";
import Image from "next/image";

const Enrollment = ({ courseId, course }) => {
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
    const [isCompleted, setIsCompleted] = useState(false);
    const [isRetaken, setIsRetaken] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const [localEnrollment, setLocalEnrollment] = useState(null);

    const isEnrolled = (!!course.enrollment || !!localEnrollment) && !isRetaken;
    const enrollment = localEnrollment || course.enrollment;
    const activeEnrollmentId = enrollmentId || enrollment?.id;
    const allSelected = selectedScheduleId && selectedTimeSlotId && selectedSessionTypeId;

    const { data: sessionsData = [] } = useQuery({
        queryKey: ["session-types", courseId, selectedScheduleId, selectedTimeSlotId],
        queryFn: () => getSessionTypes(courseId, selectedScheduleId, selectedTimeSlotId),
        enabled: !!selectedScheduleId && !!selectedTimeSlotId,
    });

    const session = sessionsData.find(s => s.id === selectedSessionTypeId);
    const basePrice = parseFloat(course.basePrice);
    const sessionUpgradePrice = session ? parseFloat(session.priceModifier) : 0;
    const totalPrice = (basePrice + sessionUpgradePrice).toFixed(2);

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["course", courseId] });
        queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    };

    const { mutate: doEnroll, isPending } = useMutation({
        mutationFn: enroll,
        onSuccess: (data) => {
            setConflictData(null);
            setEnrollError(null);
            setIsRetaken(false);
            const enrollmentData = data?.data || data;
            setEnrollmentId(enrollmentData?.id);
            setLocalEnrollment(enrollmentData);
            invalidate();
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
        mutationFn: () => completeCourse(activeEnrollmentId),
        onSuccess: () => {
            invalidate();
            setIsCompleted(true);
            if (!course.isRated) setShowRating(true);
        },
    });

    const { mutate: doRetake } = useMutation({
        mutationFn: () => retakeCourse(activeEnrollmentId),
        onSuccess: () => {
            invalidate();
            setIsRetaken(true);
            setIsCompleted(false);
            setShowRating(false);
            setEnrollmentId(null);
            setLocalEnrollment(null);
            setSelectedScheduleId(null);
            setSelectedTimeSlotId(null);
            setSelectedSessionTypeId(null);
            setScheduleOpen(true);
            setTimeSlotOpen(false);
            setSessionTypeOpen(false);
        },
    });

    const { mutate: doReview } = useMutation({
        mutationFn: (rating) => reviewCourse(courseId, rating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", courseId] });
            setShowRating(false);
        },
    });

    const handleEnroll = () => {
        if (!isLoggedIn) { openLogin(); return; }
        if (!user?.profileComplete) { openProfile(); return; }
        if (!allSelected) {
            setEnrollError("Please select a weekly schedule, time slot, and session type.");
            return;
        }
        setEnrollError(null);
        doEnroll({
            courseId: Number(courseId),
            courseScheduleId: selectedSessionTypeId,
            force: false,
        });
    };

    const handleForceEnroll = () => {
        doEnroll({
            courseId: Number(courseId),
            courseScheduleId: selectedSessionTypeId,
            force: true,
        });
        setConflictData(null);
    };

    return (
        <div className='flex flex-col rounded-[12px] gap-[39px]'>

            {isEnrolled ? (
                <div className='flex flex-col gap-[48px] w-[473px] rounded-[12px] border border-[#F5F5F5]'>

                    <div className='flex flex-col gap-[22px]'>
                        <div>
                            <Button variant="enrolled">Enrolled</Button>
                        </div>

                        <ul className='flex flex-col gap-[22px]'>
                            <li className='flex gap-3'>
                                <Image src={'/calendar_vector.svg'} alt={'calendar'} width={24} height={24}/>
                                <span className='font-["Inter"] font-medium text-[20px] leading-[26px] tracking-normal text-[#525252]'>
                                    {enrollment?.schedule?.weeklySchedule?.label}
                                </span>
                            </li>
                            <li className='flex gap-3'>
                                <Image src={'/time_vector.svg'} alt={'time'} width={24} height={24}/>
                                <span className='font-["Inter"] font-medium text-[20px] leading-[26px] tracking-normal text-[#525252]'>
                                    {enrollment?.schedule?.timeSlot?.label?.replace(/[()]/g, '')}
                                </span>
                            </li>
                            <li className='flex gap-3 capitalize'>
                                <Image src={'/person_vector.svg'} alt={'person'} width={24} height={24}/>
                                <span className='font-["Inter"] font-medium text-[20px] leading-[26px] tracking-normal text-[#525252]'>
                                    {enrollment?.schedule?.sessionType?.name?.replace(/[_]/g, ' ')}
                                </span>
                            </li>
                            {enrollment?.schedule?.location && (
                                <li className='flex gap-3'>
                                    <Image src={'/location_vector.svg'} alt={'location'} width={24} height={24}/>
                                    <span className='font-["Inter"] font-medium text-[20px] leading-[26px] tracking-normal text-[#525252]'>
                                        {enrollment?.schedule?.location?.replace('Tbilisi', 'Tbilisi,')}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className='flex flex-col gap-[40px]'>
                        <div className='flex flex-col gap-3'>
                            <span className='font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal align-middle text-[#666666]'>
                                {isCompleted ? 100 : enrollment?.progress}% Complete
                            </span>
                            <div className='w-full h-[23.45px] bg-[#EEEDFC] rounded-full'>
                                <div
                                    className='h-[23.45px] bg-[#4F46E5] rounded-full transition-all'
                                    style={{ width: `${isCompleted ? 100 : enrollment?.progress}%` }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => !isCompleted ? doComplete() : doRetake()}
                            className='font-["Inter"] font-medium text-[20px] items-center justify-center leading-none tracking-normal text-white flex gap-[10px] rounded-[8px] py-[17px] px-[25px] bg-[#4F46E5]'
                        >
                            {!isCompleted ? 'Complete Course' : 'Retake Course'}
                            <Image
                                src={`${!isCompleted ? '/completeCourse' : '/retake'}_vector.svg`}
                                alt={!isCompleted ? 'Complete Course' : 'Retake Course'}
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    {isCompleted && !isRetaken && showRating && !course.isRated && (
                        <div className='relative w-[473px] items-center h-[172px] flex flex-col gap-[18px] rounded-[8px] px-[50px] py-[40px] bg-white'>
                            <Image
                                className={'absolute right-3 top-3 cursor-pointer'}
                                src={'/close.svg'}
                                alt={'close'}
                                width={22}
                                height={22}
                                onClick={() => setShowRating(false)}
                            />
                            <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-center text-[#525252]'>
                                Rate your experience
                            </span>
                            <div className="flex gap-[18px]">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <button
                                        key={index}
                                        onClick={() => doReview(index)}
                                        className="relative w-[32px] h-[32px]"
                                    >
                                        <img
                                            src="/emptyStar_vector.svg"
                                            className="absolute inset-0 w-full h-full object-contain"
                                            alt="Empty Star"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <WeeklySchedule
                        courseId={courseId}
                        isOpen={isSchedule}
                        onToggle={() => setScheduleOpen(!isSchedule)}
                        onSelect={(scheduleId) => {
                            setSelectedScheduleId(scheduleId);
                            if (scheduleId) setTimeSlotOpen(true);
                        }}
                    />
                    <TimeSlot
                        courseId={courseId}
                        weeklyScheduleId={selectedScheduleId}
                        isOpen={isTimeSlot}
                        onToggle={() => setTimeSlotOpen(!isTimeSlot)}
                        onSelect={(slotId) => {
                            setSelectedTimeSlotId(slotId);
                            if (slotId) setSessionTypeOpen(true);
                        }}
                    />
                    <SessionType
                        courseId={courseId}
                        weeklyScheduleId={selectedScheduleId}
                        timeSlotId={selectedTimeSlotId}
                        isOpen={isSessionType}
                        onToggle={() => setSessionTypeOpen(!isSessionType)}
                        onSelect={(sessionId) => setSelectedSessionTypeId(sessionId)}
                    />

                    <div className='w-[530px] h-[306px] flex flex-col gap-[32px] rounded-[12px] p-[40px] border border-[#F5F5F5] bg-white'>
                        <div className='flex flex-col gap-[32px]'>
                            <div className='flex justify-between items-center'>
                                <span className='font-["Inter"] font-semibold text-[20px] leading-[24px] tracking-normal text-[#8A8A8A]'>Total Price</span>
                                <span className='font-["Inter"] font-semibold text-[32px] leading-none tracking-normal text-right text-[#292929]'>${totalPrice}</span>
                            </div>
                            <div className='flex flex-col pr-1 gap-3'>
                                <div className='flex justify-between'>
                                    <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#8A8A8A]'>Base Price</span>
                                    <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#292929]'>+ ${basePrice}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#8A8A8A]'>Session Type</span>
                                    <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#292929]'>+ ${sessionUpgradePrice}</span>
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

                        <button
                            onClick={handleEnroll}
                            disabled={isPending}
                            className='w-full h-[63px] rounded-[12px] p-[10px] bg-[#EEEDFC] text-[#B7B3F4] font-inter font-semibold text-[#B7B3F4] text-[20px] leading-[24px] tracking-normal text-center disabled:opacity-50'
                        >
                            {isPending ? 'Enrolling...' : 'Enroll Now'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Enrollment;