"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";
import { LocationV1 } from "@/components/atoms/Location/Location";
import Filters from "@/components/molecules/Filters/Filters";
import Sort from "@/components/molecules/Sort/Sort";
import BrowseCard from "@/components/molecules/BrowseCard/BrowseCard";
import Pagination from "@/components/molecules/Pagination/Pagination";

const BrowsePage = () => {
    const searchParams = useSearchParams();

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
        <main className="w-full bg-[#F5F5F5]! flex flex-col px-[177px] gap-[62px] pt-16 pb-20">
            <LocationV1 />

            <div className="flex gap-[90px]">
                <Filters />

                <div className="w-[1167px] flex flex-col gap-[32px] items-center">

                    <Sort showing={courses.length} total={total} />

                    <div className="grid grid-cols-3 gap-6">
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