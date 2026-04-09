'use client'
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSessionTypes } from "@/lib/api";

const SessionType = ({ courseId, weeklyScheduleId, timeSlotId, isOpen, onToggle, onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const { data: sessions = [] } = useQuery({
        queryKey: ["session-types", courseId, weeklyScheduleId, timeSlotId],
        queryFn: () => getSessionTypes(courseId, weeklyScheduleId, timeSlotId),
        enabled: !!weeklyScheduleId && !!timeSlotId,
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
                        Session Type
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
                {sessions.map((session) => {
                    const isSelected = selectedId === session.id;
                    const isLow = session.availableSeats <= 5;
                    const isFree = parseFloat(session.priceModifier) === 0;

                    return (
                        <button
                            key={session.id}
                            onClick={() => {
                                const newId = selectedId === session.id ? null : session.id;
                                setSelectedId(newId);
                                onSelect?.(newId);
                            }}
                            className={`group rounded-[12px] w-[123.5px] p-[10px] h-[91px] hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5] border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors flex flex-col items-center justify-between ${
                                isSelected
                                    ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                    : 'bg-white border-[#D1D1D1] text-[#292929] cursor-pointer'
                            }`}
                        >
                            <Image
                                src={`/${session.name}_vector.svg`}
                                alt={session.name}
                                width={26}
                                height={26}
                                className={`${isSelected ? '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]' : 'group-hover:[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                            />
                            <p className='font-medium text-[14px] leading-none font-inter capitalize'>{session.name}</p>
                            {session.location && (
                                <p className='text-[10px] font-inter text-[#8A8A8A]'>📍 {session.location}</p>
                            )}
                            <p className={`font-medium text-[12px] leading-none font-inter ${isFree ? 'text-[#4F46E5]' : 'text-[#292929]'}`}>
                                {isFree ? 'Included' : `+$${parseFloat(session.priceModifier).toFixed(0)}`}
                            </p>
                            <p className={`text-[10px] font-inter ${isLow ? 'text-[#F59E0B]' : 'text-[#8A8A8A]'}`}>
                                {isLow
                                    ? `⚠ Only ${session.availableSeats} Remaining`
                                    : `${session.availableSeats} Seats Available`
                                }
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SessionType;