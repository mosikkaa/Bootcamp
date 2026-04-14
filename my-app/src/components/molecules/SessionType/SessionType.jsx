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
            <button onClick={onToggle} className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div
                        className={`w-[28px] h-[28px] transition-colors duration-300 ${
                            selectedId || isOpen ? 'bg-[#130E67]' : 'bg-[#8A8A8A]'
                        }`}
                        style={{
                            maskImage: `url(${selectedId ? '/Icon_Set_Third_Done.svg' : '/Icon_Set_Third.svg'})`,
                            WebkitMaskImage: `url(${selectedId ? '/Icon_Set_Third_Done.svg' : '/Icon_Set_Third.svg'})`,
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
                                className={`group rounded-[12px] w-[171px] px-5 py-[15px] duration-300 ease-out items-center border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors flex flex-col gap-1.5 ${
                                    isSelected
                                        ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                        : isAvailable
                                            ? 'bg-white border-[#D1D1D1] text-[#292929]  cursor-pointer hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5]'
                                            : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed'
                                }`}
                            >
                                <div
                                    className={`w-[26px] h-[26px] transition-colors duration-300 ${
                                        isSelected ? 'bg-[#4F46E5]' : isAvailable ? 'bg-[#525252] group-hover:bg-[#4F46E5]' : 'bg-[#D1D1D1]'
                                    }`}
                                    style={{
                                        maskImage: `url(/${session.name}_vector.svg)`,
                                        WebkitMaskImage: `url(/${session.name}_vector.svg)`,
                                        maskRepeat: 'no-repeat',
                                        maskSize: 'contain'
                                    }}
                                />
                                <div className='flex flex-col gap-3'>

                                    <div className='flex flex-col gap-1.5'>
                                        <p className={`font-["Inter"] font-semibold transition-colors duration-300 text-[16px] leading-none tracking-normal text-center  ${
                                            isSelected
                                                ? 'text-[#4F46E5]'
                                                : isAvailable
                                                    ? 'text-[#525252] group-hover:text-[#4F46E5]'
                                                    : 'text-[#D1D1D1] '
                                        }`}>{SessionsT[session.name]}</p>
                                        {session.location && (
                                            <p className={`flex gap-0.5 font-["Inter"] transition-colors duration-300 font-normal text-[12px] leading-none tracking-normal  text-center  ${
                                                isSelected
                                                    ? ' text-[#736BEA]'
                                                    : isAvailable
                                                        ? 'text-[#525252] group-hover:text-[#736BEA]'
                                                        : 'text-[#D1D1D1]'
                                            }`}>
                                                <Image src={'/Location.svg'} alt='Location' width={12} height={12} />
                                                <span>{session.location}</span>
                                            </p>
                                        )}
                                    </div>
                                    <p className={`font-["Inter"] font-medium text-[14px] transition-colors duration-300 leading-none tracking-normal text-center text-[#736BEA] ${isSelected
                                                ? 'text-[#4F46E5]'
                                                : isAvailable
                                                    ? 'text-[#736BEA]  '
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