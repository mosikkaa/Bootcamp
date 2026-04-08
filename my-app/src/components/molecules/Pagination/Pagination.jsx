"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages = 1 }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activePage = Number(searchParams.get("page")) || 1;

    function getPaginationPages(current, total) {
        const pages = [];
        const maxButtons = 5;

        if (total <= maxButtons) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            const left = Math.max(2, current - 1);
            const right = Math.min(total - 1, current + 2);

            pages.push(1);

            if (left > 2) pages.push("...");

            for (let i = left; i <= right; i++) {
                pages.push(i);
            }

            if (right < total - 1) pages.push("...");

            pages.push(total);
        }

        return pages;
    }

    const pages = getPaginationPages(activePage, totalPages);

    const handlePageChange = (page) => {
        if (typeof page !== "number") return;

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage <= 1}
                className={`w-[40px] h-[40px] flex items-center justify-center rounded-[4px] border border-[#D1D1D1] ${
                    activePage <= 1
                        ? "text-[#D1D1D1] cursor-not-allowed"
                        : "text-[#4F46E5] bg-white hover:bg-gray-100"
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
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage >= totalPages}
                className={`w-[40px] h-[40px] flex items-center justify-center rounded-[4px] border border-[#D1D1D1] ${
                    activePage >= totalPages
                        ? "text-[#D1D1D1] cursor-not-allowed"
                        : "text-[#4F46E5] bg-white hover:bg-gray-100"
                }`}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;