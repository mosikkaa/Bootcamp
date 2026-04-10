"use client";
import { useQuery} from "@tanstack/react-query";
import { getCourse} from "@/lib/api";
import { LocationV2 } from "@/components/atoms/Location/Location";
import { use} from "react";
import CourseInformation from "@/components/atoms/CourseInformation/CourseInformation";
import EnrollSection from "@/components/molecules/EnrollSection/EnrollSection";


const CoursePage = ({ params }) => {
    const { id } = use(params);

    const { data: course } = useQuery({
        queryKey: ["course", id],
        queryFn: () => getCourse(id),
    });

    if (!course) return null;

    return (
        <div className='w-full flex flex-col gap-[24px]'>

            <div className='flex flex-col gap-[32px]'>
                <LocationV2 />
                <h1 className='text-[#141414] font-inter font-semibold text-[40px] leading-none tracking-[0%]'>
                    {course.title}
                </h1>
            </div>

            <div className='w-full flex justify-between'>

                <CourseInformation course={course} courseId={course.id} />

                <div className='w-[530px] flex flex-col gap-[11px]'>
                    <EnrollSection course={course} courseId={course.id} />
                </div>
            </div>

        </div>
    );
};

export default CoursePage;