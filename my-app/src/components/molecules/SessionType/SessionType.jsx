'use client'
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSessionTypes } from "@/lib/api";


const SessionsT = {
    "online": "Online",
    "in_person": "In-Person",
    "hybrid": "Hybrid"
}

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
                        className={`${(!isOpen && selectedId) && ''} ${(!isOpen && !selectedId) && '[filter:invert(56%)_sepia(26%)_saturate(0%)_hue-rotate(240deg)_brightness(93%)_contrast(85%)]'}`}
                        src={`${selectedId ? '/Icon_Set_Third_Done.svg' : '/Icon_Set_Third.svg'}`}
                        alt='Third'
                        width={28}
                        height={28}
                    />
                    <h2 className={`${(!isOpen && !selectedId) ? 'text-[#8A8A8A]' : 'text-[#130E67]'} ${(isOpen && selectedId) && 'text-[#130E67]'} font-inter font-semibold text-[24px] leading-[100%] tracking-normal`}>
                        Session Type
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
                {sessions.map((session) => {
                    const isSelected = selectedId === session.id;
                    const isLow = session.availableSeats <= 5;
                    const isFree = parseFloat(session.priceModifier) === 0;
                    const isAvailable = session.availableSeats > 0;

                    return (
                        <div  key={session.id} className='flex flex-col items-center gap-2'>

                            <button
                                onClick={() => {
                                    const newId = selectedId === session.id ? null : session.id;
                                    setSelectedId(newId);
                                    onSelect?.(newId ? session.courseScheduleId : null);
                                }}
                                disabled={!isAvailable}
                                className={`group rounded-[12px] w-[171px] px-5 py-[15px]  items-center border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors flex flex-col gap-1.5 ${
                                    isSelected
                                        ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                        : isAvailable
                                            ? 'bg-white border-[#D1D1D1] text-[#292929]  cursor-pointer hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5]'
                                            : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed'
                                }`}
                            >
                                <Image
                                    src={`/${session.name}${isSelected ? '_active_vector.svg' : '_vector.svg'}`}
                                    alt={session.name}
                                    width={26}
                                    height={26}
                                />
                                <div className='flex flex-col gap-3'>

                                    <div className='flex flex-col gap-1.5'>
                                        <p className={`font-["Inter"] font-semibold text-[16px] leading-none tracking-normal text-center  ${
                                            isSelected
                                                ? 'text-[#4F46E5]'
                                                : isAvailable
                                                    ? 'text-[#292929] group-hover:text-[#4F46E5]'
                                                    : 'text-[#D1D1D1] '
                                        }`}>{SessionsT[session.name]}</p>
                                        {session.location && (
                                            <p className={`flex gap-0.5 font-["Inter"] font-normal text-[12px] leading-none tracking-normal  text-center  ${
                                                isSelected
                                                    ? ' text-[#736BEA]'
                                                    : isAvailable
                                                        ? 'text-[#292929] group-hover:text-[#736BEA]'
                                                        : 'text-[#D1D1D1]'
                                            }`}>
                                                <Image src={'/Location.svg'} alt='Location' width={12} height={12} />
                                                <span>{session.location}</span>
                                            </p>
                                        )}
                                    </div>
                                    <p className={`font-["Inter"] font-medium text-[14px] leading-none tracking-normal text-center text-[#736BEA] ${isSelected
                                                ? 'text-[#4F46E5]'
                                                : isAvailable
                                                    ? 'text-[#292929]  '
                                                    : 'text-[#D1D1D1] '}
                                        `}>
                                        {isFree ? 'Included' : `+$${parseFloat(session.priceModifier).toFixed(0)}`}
                                    </p>

                                </div>

                            </button>

                            <div className='flex items-center gap-1'>
                                <Image src={`${isLow ? '/Icon_Set_Warning_Orange.svg' : '/Icon_Set_Warning.svg'}`} alt={'Warning'} width={26} height={26}/>
                                <p className={`text-[10px] font-inter ${isLow ? 'text-[#F59E0B]' : 'text-[#8A8A8A]'}`}>
                                    {isLow
                                        ? `Only ${session.availableSeats} Remaining`
                                        : `${session.availableSeats} Seats Available`
                                    }
                                </p>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SessionType;