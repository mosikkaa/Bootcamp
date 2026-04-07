"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Pagination = ({ totalPages = 10 }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [activePage, setActivePage] = useState(1);

    const pages = [1, 2, 3, "...", totalPages];

    const handlePageChange = (page) => {
        if (page === "...") return;
        setActivePage(page);
        
        const params = new URLSearchParams();
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
                disabled={activePage === 1}
                className={`w-[40px] h-[40px] bg-white flex items-center justify-center rounded-[4px] border border-[#D1D1D1] ${
                    activePage === 1 ? "text-[#D1D1D1] cursor-not-allowed" : "text-[#4F46E5] hover:bg-gray-100"
                }`}
            >
                ←
            </button>

            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-[4px] border border-[#D1D1D1] ${
                        page === activePage
                            ? "bg-[#281ED2] border-[#4F46E5] text-white"
                            : page === "..."
                                ? "cursor-default bg-white text-[#4F46E5]"
                                : "bg-white text-[#4F46E5] hover:bg-gray-100"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => activePage < totalPages && handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
                className={`w-[40px] h-[40px] bg-white flex items-center justify-center rounded-[4px] border border-[#D1D1D1] ${
                    activePage === totalPages ? "text-[#D1D1D1] cursor-not-allowed" : "text-[#4F46E5] hover:bg-gray-100"
                }`}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;