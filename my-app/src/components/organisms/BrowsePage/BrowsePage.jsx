"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";
import { LocationV1 } from "@/components/atoms/Location/Location";
import Filters from "@/components/molecules/Filters/Filters";
import Sort from "@/components/molecules/Sort/Sort";
import BrowseCard from "@/components/molecules/BrowseCard/BrowseCard";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useState } from "react";

const BrowsePage = () => {
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);

    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "newest";
    const categories = searchParams.getAll("category");
    const topics = searchParams.getAll("topic");
    const instructors = searchParams.getAll("instructor");

    const { data } = useQuery({
        queryKey: ["courses", page, sort, categories, topics, instructors],
        queryFn: () => getCourses({ page, sort, categories, topics, instructors }),
    });

    const courses = data?.data ?? [];
    const totalPages = data?.meta?.lastPage ?? 1;
    const total = data?.meta?.total ?? 0;
    const currentPage = data?.meta?.currentPage ?? 1;

    return (
        <main className="w-full bg-[#F5F5F5]! flex flex-col px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[100px] 2xl:px-[177px] gap-[40px] lg:gap-[62px] pt-16 pb-20">
            <LocationV1 />

            <button
                onClick={() => setShowFilters(prev => !prev)}
                className="lg:hidden flex items-center gap-2 self-start h-[42px] rounded-[10px] px-4 py-2 bg-white border border-[#F5F5F5] font-['Inter'] font-medium text-[15px] text-[#0A0A0A]"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6"/>
                    <line x1="8" y1="12" x2="20" y2="12"/>
                    <line x1="12" y1="18" x2="20" y2="18"/>
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[90px]">

                <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:shrink-0`}>
                    <Filters />
                </div>

                <div className="w-full flex flex-col gap-[32px] items-center">

                    <Sort showing={courses.length} total={total} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                        {courses.map((course) => (
                            <BrowseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} />

                </div>
            </div>
        </main>
    );
};

export default BrowsePage;