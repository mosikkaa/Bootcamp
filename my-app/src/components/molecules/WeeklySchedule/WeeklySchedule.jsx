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

const WeeklySchedule = ({ courseId, isOpen, onToggle, onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const { data: schedules = [] } = useQuery({
        queryKey: ["weekly-schedules", courseId],
        queryFn: () => getWeeklySchedules(courseId),
    });

    return (
        <div className='flex flex-col gap-[18px] w-full'>
            <button onClick={onToggle} className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div
                        className={`w-[28px] h-[28px] transition-colors duration-300 ${
                            selectedId || isOpen ? 'bg-[#130E67]' : 'bg-[#8A8A8A]'
                        }`}
                        style={{
                            maskImage: `url(${selectedId ? '/Icon_Set_One_Done.svg' : '/Icon_Set_One.svg'})`,
                            WebkitMaskImage: `url(${selectedId ? '/Icon_Set_One_Done.svg' : '/Icon_Set_One.svg'})`,
                            maskRepeat: 'no-repeat',
                            maskSize: 'contain'
                        }}
                    />
                    <h2 className={`font-inter font-semibold text-[24px] leading-none tracking-normal transition-colors ${
                        (!isOpen && !selectedId) ? 'text-[#8A8A8A]' : 'text-[#130E67]'
                    }`}>
                        Weekly Schedule
                    </h2>
                </div>
                <div
                    className={`w-[28px] h-[28px] transition-all duration-300 ${
                        isOpen ? 'rotate-0 bg-[#130E67]' : 'rotate-180 bg-[#8A8A8A]'
                    }`}
                    style={{
                        maskImage: 'url(/Icon_Title_Down.svg)',
                        WebkitMaskImage: 'url(/Icon_Title_Down.svg)',
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain'
                    }}
                />
            </button>

            <div className={`gap-[12px] ${isOpen ? 'flex' : 'hidden'}`}>

                {Object.keys(SCHEDULE_LABELS).map((idString) => {
                    const id = parseInt(idString);
                    const scheduleData = schedules.find(s => s.id === id);
                    const isAvailable = !!scheduleData;
                    const isSelected = selectedId === id;

                    return (
                        <button
                            key={id}
                            disabled={!isAvailable}
                            onClick={() => {
                                const newId = selectedId === id ? null : id;
                                setSelectedId(newId);
                                onSelect(newId);
                            }}
                            className={`
                                rounded-[12px] w-[123.5px] h-[91px] p-[10px] border 
                                font-inter font-semibold text-[16px] leading-tight text-center transition-all
                                
                                ${isSelected
                                ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                : isAvailable
                                    ? 'bg-white border-[#D1D1D1] text-[#292929] hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5] cursor-pointer'
                                    : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-default!'}
                            `}
                        >
                            {SCHEDULE_LABELS[id]}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklySchedule;