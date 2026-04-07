"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Pagination = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activePage = Number(searchParams.get("page")) || 1;

    const pages = [1, 2, 3,"...", 10];

    const handlePageChange = (page) => {
        if (page === "..." || page === activePage) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className='flex gap-2'>
            <button
                onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
                className={`w-[40px] h-[40px] rounded-[4px] border-t flex items-center rotate-180 justify-center
                            ${activePage === 1
                    ? "bg-white border border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed"
                    : "bg-white border border-[#D1D1D1] text-[#4F46E5] hover:bg-gray-100"
                }`}
            >
                <p className='rotate-360 font-inter font-medium text-[16px] leading-[24px] text-center tracking-[0%]'>→</p>
            </button>

            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`w-[40px] h-[40px] rounded-[4px] border-t flex items-center justify-center
                                ${activePage === page
                        ? "bg-[#281ED2] border border-[#4F46E5] text-white"
                        : "bg-white border border-[#D1D1D1] text-[#4F46E5] hover:bg-gray-100"
                    } ${page === "..." ? "cursor-default" : ""}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => activePage < 5 && handlePageChange(activePage + 1)}
                className={`w-[40px] h-[40px] rounded-[4px] border-t flex items-center justify-center
                            ${activePage === 5
                    ? "bg-white border border-[#D1D1D1] text-[#D1D1D1] cursor-not-allowed"
                    : "bg-white border border-[#D1D1D1] text-[#4F46E5] hover:bg-gray-100"
                }`}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;