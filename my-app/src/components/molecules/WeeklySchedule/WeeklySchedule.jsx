'use client'
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeeklySchedules } from "@/lib/api";

const SCHEDULE_LABELS = {
    1: "Mon - Wed",
    2: "Tue - Thu",
    3: "Fri - Sat",
    4: "Weekend",
};

const WeeklySchedule = ({ courseId, isOpen, onToggle,onSelect}) => {
    const [selectedId, setSelectedId] = useState(null);

    const { data: schedules = [] } = useQuery({
        queryKey: ["weekly-schedules", courseId],
        queryFn: () => getWeeklySchedules(courseId),
    });

    return (
        <div className='flex flex-col gap-[18px] w-full'>
            <button onClick={onToggle} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <Image
                        className={`${isOpen ? '' : '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                        src={'/Icon_Set_One.svg'}
                        alt='One'
                        width={28}
                        height={28}
                    />
                    <h2 className={`${isOpen ? 'text-[#130E67]' : 'text-[#8A8A8A]'} font-inter font-semibold text-[24px] leading-[100%] tracking-normal`}>
                        Weekly Schedule
                    </h2>
                </div>
                <Image
                    className={`${isOpen ? 'rotate-0' : 'rotate-180 [filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                    src={'/Icon_Title_Down.svg'}
                    alt='ArrowDown'
                    width={28}
                    height={28}
                />
            </button>

            <div className={`gap-[12px] ${isOpen ? 'flex' : 'hidden'}`}>
                {schedules.map((schedule) => {
                    const isAvailable = schedule.days?.length > 0;
                    const isSelected = selectedId === schedule.id;

                    return (
                        <button
                            key={schedule.id}
                            onClick={() => {
                                if (!isAvailable) return;
                                const newId = selectedId === schedule.id ? null : schedule.id;
                                setSelectedId(newId);
                                onSelect(newId);
                            }}
                            disabled={!isAvailable}
                            className={`rounded-[12px] w-[123.5px] p-[10px] h-[91px] hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5] border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors ${
                                isSelected
                                    ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                    : isAvailable
                                        ? 'bg-white border-[#D1D1D1] text-[#292929]  cursor-pointer'
                                        : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed'
                            }`}
                        >
                            {SCHEDULE_LABELS[schedule.id]}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklySchedule;