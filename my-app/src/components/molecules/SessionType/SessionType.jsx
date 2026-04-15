'use client'
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSessionTypes } from "@/lib/api";

const SessionsT = {
    "online": "Online",
    "in_person": "In-Person",
    "hybrid": "Hybrid"
}

const DEFAULT_MODIFIERS = {
    "online": 0,
    "in_person": 50,
    "hybrid": 30
}

const SessionType = ({ courseId, weeklyScheduleId, timeSlotId, isOpen, onToggle, onSelect, selectedId }) => {

    const { data: sessions = [] } = useQuery({
        queryKey: ["session-types", courseId, weeklyScheduleId, timeSlotId],
        queryFn: () => getSessionTypes(courseId, weeklyScheduleId, timeSlotId),
        enabled: !!courseId && !!weeklyScheduleId && !!timeSlotId,
    });

    return (
        <div className='flex flex-col gap-[18px] w-full'>
            <button onClick={onToggle} className={`flex justify-between items-center ${isOpen && 'cursor-pointer'}`}>
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
                        Session Type
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
                {Object.keys(SessionsT).map((key) => {
                    const session = sessions.find(s => s.name === key);

                    const isAvailable = !!timeSlotId && !!session && session.availableSeats > 0;
                    const isFullyBooked = !!session && session.availableSeats === 0;
                    const isLow = isAvailable && session.availableSeats < 5;
                    const isSelected = selectedId === session?.courseScheduleId;

                    const modifier = session ? parseFloat(session.priceModifier) : DEFAULT_MODIFIERS[key];
                    const isFree = modifier === 0;

                    return (
                        <div key={key} className='flex flex-col items-center justify-between gap-2'>
                            <button
                                onClick={() => {
                                    if (isAvailable) {
                                        onSelect?.(isSelected ? null : session.courseScheduleId, modifier);
                                    }
                                }}
                                disabled={!isAvailable}
                                className={`group rounded-[12px] h-[131px] w-[171px] px-5 py-[15px] duration-500 items-center border font-inter font-semibold text-[16px] leading-[100%] tracking-normal text-center transition-colors flex flex-col gap-1.5 ${
                                    isSelected
                                        ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                        : isAvailable
                                            ? 'bg-white border-[#D1D1D1] text-[#292929] cursor-pointer hover:bg-[#DDDBFA] hover:border-[#958FEF] hover:text-[#4F46E5]'
                                            : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-default'
                                }`}
                            >
                                <div
                                    className={`w-[26px] h-[26px] transition-colors duration-300 ${
                                        isSelected ? 'bg-[#4F46E5]' : isAvailable ? 'bg-[#525252] group-hover:bg-[#4F46E5]' : 'bg-[#D1D1D1]'
                                    }`}
                                    style={{
                                        maskImage: `url(/${key}_vector.svg)`,
                                        WebkitMaskImage: `url(/${key}_vector.svg)`,
                                        maskRepeat: 'no-repeat',
                                        maskSize: 'contain'
                                    }}
                                />
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-1.5'>
                                        <p className={`font-["Inter"] font-semibold transition-colors duration-300 text-[16px] leading-none tracking-normal text-center ${
                                            isSelected ? 'text-[#4F46E5]' : isAvailable ? 'text-[#525252] group-hover:text-[#4F46E5]' : 'text-[#D1D1D1]'
                                        }`}>{SessionsT[key]}</p>

                                        {session?.location ? (
                                            <p className={`flex gap-0.5 font-["Inter"] transition-colors duration-300 font-normal text-[12px] leading-none tracking-normal items-center text-center ${
                                                isSelected ? 'text-[#736BEA]' : isAvailable ? 'text-[#525252] group-hover:text-[#4F46E5]' : 'text-[#D1D1D1]'
                                            }`}>
                                                <span
                                                    className={`w-[14px] h-[14px] flex items-center justify-center transition-colors duration-300 ${
                                                        isSelected ? 'bg-[#736BEA]' : isAvailable ? 'bg-[#525252] group-hover:bg-[#4F46E5]' : 'bg-[#D1D1D1]'
                                                    }`}
                                                    style={{
                                                        maskImage: 'url(/Location.svg)',
                                                        WebkitMaskImage: 'url(/Location.svg)',
                                                        maskRepeat: 'no-repeat',
                                                        maskSize: 'contain'
                                                    }}
                                                />
                                                <span className="truncate max-w-[100px]">{session.location}</span>
                                            </p>) :
                                            <p className={`flex gap-0.5 font-["Inter"] transition-colors duration-300 font-normal text-[12px] leading-none tracking-normal text-center ${
                                                isSelected ? 'text-[#736BEA]' : isAvailable ? 'text-[#525252] group-hover:text-[#4F46E5]' : 'text-[#D1D1D1]'
                                            }`}></p>
                                        }
                                    </div>
                                    <p className={`font-["Inter"] font-medium text-[14px] transition-colors duration-300 leading-none tracking-normal text-center ${
                                        isSelected ? 'text-[#4F46E5]' : isAvailable ? 'text-[#736BEA]' : 'text-[#D1D1D1]'
                                    }`}>
                                        {isFree ? 'Included' : `+$${modifier.toFixed(0)}`}
                                    </p>
                                </div>
                            </button>

                            <div className='flex items-center gap-1'>
                                {isLow ?
                                <Image
                                    src={isLow ? '/Icon_Set_Warning_Orange.svg' : '/Icon_Set_Warning.svg'}
                                    alt={'Warning'} width={26} height={26}
                                    className={!isAvailable && !isFullyBooked ? 'opacity-30' : ''}
                                /> : null}
                                <p className={`text-[12px] font-["inter"] font-medium ${!isAvailable && 'text-[#525252]'} ${isFullyBooked ? 'text-[#F4A316]' : isLow ? 'text-[#F4A316] ' : 'text-[#3D3D3D]'}`}>
                                    {isFullyBooked ? 'Fully Booked' : isLow ? `Only ${session.availableSeats} Seats Remaining` : isAvailable ? `${session.availableSeats} Seats Available` : 'No Seats Available'}
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