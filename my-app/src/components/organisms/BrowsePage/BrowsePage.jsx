"use client";
import { useSearchParams } from "next/navigation";
import { LocationV1 } from "@/components/atoms/Location/Location";
import Filters from "@/components/molecules/Filters/Filters";
import Sort from "@/components/molecules/Sort/Sort";
import BrowseCard from "@/components/molecules/BrowseCard/BrowseCard";
import Pagination from "@/components/molecules/Pagination/Pagination";

const courses = [
    { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" },
    { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }, { id: "10" },
    { id: "11" }, { id: "12" }, { id: "13" }, { id: "14" }, { id: "15" },
    { id: "16" }, { id: "17" }, { id: "18" }, { id: "19" }, { id: "20" },
    { id: "21" }, { id: "22" }, { id: "23" }, { id: "24" }, { id: "25" },
    { id: "26" }, { id: "27" }, { id: "28" }, { id: "29" }, { id: "30" },
    { id: "31" }, { id: "32" }, { id: "33" }, { id: "34" }, { id: "35" },
    { id: "36" }, { id: "37" }, { id: "38" }, { id: "39" }, { id: "40" },
    { id: "41" }, { id: "42" }, { id: "43" }, { id: "44" }, { id: "45" },
    { id: "46" }, { id: "47" }, { id: "48" }, { id: "49" }, { id: "50" },
    { id: "51" }, { id: "52" }, { id: "53" }, { id: "54" }, { id: "55" },
    { id: "56" }, { id: "57" }, { id: "58" }, { id: "59" }, { id: "60" },
    { id: "61" }, { id: "62" }, { id: "63" }, { id: "64" }, { id: "65" },
    { id: "66" }, { id: "67" }, { id: "68" }, { id: "69" }, { id: "70" },
    { id: "71" }, { id: "72" }, { id: "73" }, { id: "74" }, { id: "75" },
    { id: "76" }, { id: "77" }, { id: "78" }, { id: "79" }, { id: "80" },
    { id: "81" }, { id: "82" }, { id: "83" }, { id: "84" }, { id: "85" },
    { id: "86" }, { id: "87" }, { id: "88" }, { id: "89" }, { id: "90" },
];

const BrowsePage = () => {
    const searchParams = useSearchParams();

    const itemsPerPage = 9;
    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const currentPage = Math.min(
        Math.max(Number(searchParams.get("page")) || 1, 1),
        totalPages
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = courses.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <main className="w-full bg-[#F5F5F5] flex flex-col px-[177px] gap-[62px] pt-16 pb-20">
            <LocationV1 />

            <div className="flex gap-[90px]">
                <Filters />

                <div className="w-[1167px] flex flex-col gap-[32px] items-center">

                    <Sort showing={currentCourses.length} />

                    <div className="grid grid-cols-3 gap-6">
                        {currentCourses.map((course) => (
                            <BrowseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </main>
    );
};

export default BrowsePage;