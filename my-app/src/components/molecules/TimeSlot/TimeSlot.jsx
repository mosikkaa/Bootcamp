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
            <button onClick={onToggle} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <Image
                        className={`${(!isOpen && selectedId) && ''} ${(!isOpen && !selectedId) && '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                        src={`${selectedId ? '/Icon_Set_Two_Done.svg' : '/Icon_Set_Two.svg'}`}
                        alt='Two'
                        width={28}
                        height={28}
                    />
                    <h2 className={`${(!isOpen && !selectedId) ? 'text-[#8A8A8A]' : 'text-[#130E67]'} ${(isOpen && selectedId) && 'text-[#130E67]'} font-inter font-semibold text-[24px] leading-[100%] tracking-normal`}>
                        Select Time Slot
                    </h2>
                </div>
                <Image
                    className={`${isOpen ? 'rotate-0' : 'rotate-180'} ${(!isOpen && !selectedId) && '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                    src={'/Icon_Title_Down.svg'}
                    alt='ArrowDown'
                    width={28}
                    height={28}
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
                                <Image className={`${isSelected ? '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]' : 'group-hover:[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`} src={`/${TIME_SLOT_LABELS[slot.id]}_vector.svg`} alt={TIME_SLOT_LABELS[slot.id]}  width={26} height={26}/>
                                <div className='flex flex-col gap-0.5 items-start'>
                                    <p className={`${isSelected ? 'text-[#4F46E5]' : 'text-[#292929]'}  group-hover:text-[#4F46E5] font-medium text-[14px] leading-none tracking-normal text-[#666666] font-inter`}>{TIME_SLOT_LABELS[slot.id]}</p>
                                    <p className={`${isSelected ? 'text-[#4F46E5]' : 'text-[#292929]'}  group-hover:text-[#4F46E5] font-normal text-[10px] leading-none tracking-normal font-inter text-[#666666]`}>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</p>
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