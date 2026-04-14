"use client";

import Categories from "@/components/atoms/Categories/Categories";
import Topics from "@/components/atoms/Topics/Topics";
import Instructors from "@/components/molecules/Instructors/Instructors";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

const Filters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeFiltersCount = [
        ...searchParams.getAll("category"),
        ...searchParams.getAll("topic"),
        ...searchParams.getAll("instructor"),
    ].length;

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        params.delete("topic");
        params.delete("instructor");
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`,{ scroll: false });
    };

    return (
        <div className='w-[309px] flex flex-col gap-6'>
            <div className='flex flex-col gap-8'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-["Inter"] font-semibold text-[40px] leading-none tracking-normal text-[#0A0A0A]'>Filter</h1>
                    <button onClick={clearAllFilters} className={`${activeFiltersCount===0 ? 'hidden' : 'flex'} group transition duration-300 hover:text-[#281ED2] items-center gap-[7px]`}>
                        <span className='font-medium text-[#8A8A8A] transition duration-300 group-hover:text-[#281ED2] text-[16px] leading-[24px] tracking-normal font-inter'>Clear All Filters</span>
                        <div
                            className={`
            w-[10px] h-[10px] transition-colors duration-300
            bg-[#8A8A8A] group-hover:bg-[#281ED2]
        `}
                            style={{
                                maskImage: 'url(/clear_button.svg)',
                                maskRepeat: 'no-repeat',
                                maskSize: 'contain',
                                WebkitMaskImage: 'url(/clear_button.svg)',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskSize: 'contain'
                            }}
                            />
                    </button>
                </div>

                <div className='flex flex-col gap-14'>
                    <Categories/>
                    <Topics/>
                    <Instructors/>
                </div>
            </div>

            <div className='w-full h-[36px] pt-4 border-t border-[#ADADAD] flex items-end'>
                <div className='h-[20px]'>
                    <span>{activeFiltersCount} Filter{activeFiltersCount !== 1 ? "s" : ""} Active</span>
                </div>
            </div>
        </div>
    );
};

export default Filters;