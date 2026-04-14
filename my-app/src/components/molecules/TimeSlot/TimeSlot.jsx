'use client'
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTimeSlots } from "@/lib/api";

const TIME_SLOT_LABELS = {
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
};

const TimeSlot = ({ courseId, weeklyScheduleId, isOpen, onToggle,onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const { data: slots = [] } = useQuery({
        queryKey: ["time-slots", courseId, weeklyScheduleId],
        queryFn: () => getTimeSlots(courseId, weeklyScheduleId),
        enabled: !!weeklyScheduleId,
    });

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    return (
        <div className='flex flex-col gap-[18px] w-full'>
            <button onClick={onToggle} className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div
                        className={`w-[28px] h-[28px] transition-colors duration-300 ${
                            selectedId || isOpen ? 'bg-[#130E67]' : 'bg-[#8A8A8A]'
                        }`}
                        style={{
                            maskImage: `url(${selectedId ? '/Icon_Set_Two_Done.svg' : '/Icon_Set_Two.svg'})`,
                            WebkitMaskImage: `url(${selectedId ? '/Icon_Set_Two_Done.svg' : '/Icon_Set_Two.svg'})`,
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
                {!weeklyScheduleId ? (
                    <p className='text-[#8A8A8A] font-inter text-[14px]'>Please select a weekly schedule first</p>
                ) : (
                    slots.map((slot) => {
                        const isSelected = selectedId === slot.id;

                        return (
                            <button
                                key={slot.id}
                                onClick={() => {const newId = selectedId === slot.id ? null : slot.id;setSelectedId(newId);onSelect?.(newId);}}
                                className={`rounded-[12px] group flex gap-3 items-center p-[15px] hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5] border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors ${
                                    isSelected ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]' : 'bg-white border-[#D1D1D1] text-[#292929] cursor-pointer'
                                }`}
                            >
                                <div
                                    className={`w-[26px] h-[26px] transition-colors  group-hover:bg-[#4F46E5] duration-300 ${
                                        isSelected ? ('bg-[#4F46E5]') : 'bg-[#525252]'
                                    }`}
                                    style={{
                                        maskImage: `url(/${TIME_SLOT_LABELS[slot.id]}_vector.svg)`,
                                        WebkitMaskImage: `url(/${TIME_SLOT_LABELS[slot.id]}_vector.svg)`,
                                        maskRepeat: 'no-repeat',
                                        maskSize: 'contain'
                                    }}
                                />
                                <div className='flex flex-col gap-0.5 items-start'>
                                    <p className={`${isSelected ? 'text-[#4F46E5]' : 'text-[#292929]'}  group-hover:text-[#4F46E5] font-medium text-[14px] leading-none tracking-normal  font-inter`}>{TIME_SLOT_LABELS[slot.id]}</p>
                                    <p className={`${isSelected ? 'text-[#4F46E5]' : 'text-[#292929]'}  group-hover:text-[#4F46E5] font-normal text-[10px] leading-none tracking-normal font-inter `}>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</p>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TimeSlot;