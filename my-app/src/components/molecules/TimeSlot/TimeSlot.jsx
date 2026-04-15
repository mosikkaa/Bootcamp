'use client'
import { useQuery } from "@tanstack/react-query";
import { getTimeSlots } from "@/lib/api";

// Updated labels with your specific time requirements
const TIME_SLOT_LABELS = {
    1: { label: "Morning", time: "9:00 AM - 11:00 AM", icon: "Morning" },
    2: { label: "Afternoon", time: "2:00 PM - 4:00 PM", icon: "Afternoon" },
    3: { label: "Evening", time: "6:00 PM - 8:00 PM", icon: "Evening" },
};

const TimeSlot = ({ courseId, weeklyScheduleId, isOpen, onToggle, onSelect, selectedId }) => {

    const { data: slots = [] } = useQuery({
        queryKey: ["time-slots", courseId, weeklyScheduleId],
        queryFn: () => getTimeSlots(courseId, weeklyScheduleId),
        enabled: !!courseId && !!weeklyScheduleId,
    });

    const formatTime = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    return (
        <div className='flex flex-col gap-[18px] w-full'>

            <button onClick={onToggle} className={`flex justify-between items-center ${isOpen && 'cursor-pointer'}`}>
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
                        Time Slot
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

            <div className={`justify-between ${isOpen ? 'flex' : 'hidden'}`}>
                {Object.entries(TIME_SLOT_LABELS).map(([idString, info]) => {
                    const id = parseInt(idString);
                    const isSelected = selectedId === id;

                    const slotExists = slots.find(s => s.id === id);
                    const isAvailable = !!weeklyScheduleId && !!slotExists;

                    return (
                        <button
                            key={id}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => onSelect?.(isSelected ? null : id)}
                            className={`rounded-[12px] w-[172.76px] h-[61px] duration-500 border p-[15px] flex gap-3 items-center transition-colors ${
                                isSelected
                                    ? 'bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]'
                                    : isAvailable
                                        ? 'bg-white border-[#D1D1D1] text-[#292929] cursor-pointer hover:bg-[#DDDBFA]'
                                        : 'bg-[#F5F5F5] border-[#D1D1D1] text-[#D1D1D1] cursor-default'
                            }`}
                        >
                            <div
                                className={`w-[26px] h-[26px] transition-colors duration-500 ${
                                    isSelected ? 'bg-[#4F46E5]' : isAvailable ? 'bg-[#525252]' : 'bg-[#D1D1D1]'
                                }`}
                                style={{
                                    maskImage: `url(/${info.icon}_vector.svg)`,
                                    WebkitMaskImage: `url(/${info.icon}_vector.svg)`,
                                    maskRepeat: 'no-repeat',
                                    maskSize: 'contain'
                                }}
                            />
                            <div className='flex flex-col gap-0.5 items-start'>
                                <p className='font-medium text-[14px] leading-none'>{info.label}</p>
                                <p className='font-normal text-[10px] leading-none'>
                                    {slotExists
                                        ? `${formatTime(slotExists.startTime)} - ${formatTime(slotExists.endTime)}`
                                        : info.time}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TimeSlot;