'use client'
import Image from "next/image";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SORT_OPTIONS = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Most Popular", value: "popular" },
    { label: "Title A-Z", value: "title_asc" },
];

const Sort = ({ showing, total }) => {
    const [isOpen, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const sortBy = searchParams.get("sort") || "newest";
    const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Newest";

    const handleSort = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setOpen(false);
    };

    return (
        <div className='flex justify-between w-full items-center'>
            <p className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#666666]'>Showing {showing} out of {total}</p>
            <div className='relative'>
                <button
                    onClick={() => setOpen(!isOpen)}
                    className='h-[49px] flex items-center rounded-[10px] px-[20px] py-[7px] gap-[8px] bg-white border border-[#F5F5F5]'
                >
                    <div className='flex gap-[8px]'>
                        <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#666666]'>Sort by:</span>
                        <p className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#4F46E5]'>{sortLabel}</p>
                    </div>
                    <Image src={'/arrowDown.svg'} alt={'arrowDown'} width={20} height={20} />
                </button>

                {isOpen && (
                    <ul className="absolute right-0 top-14 flex flex-col rounded-[10px] w-full bg-white border border-[#F5F5F5]">
                        {SORT_OPTIONS.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSort(option.value)}
                                className={`cursor-pointer font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#666666] hover:bg-[#DDDBFA] hover:text-[#4F46E5] h-[45px] px-[20px] py-[10px]`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sort;