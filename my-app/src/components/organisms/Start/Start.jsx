"use client";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedCourses } from "@/lib/api";
import CardItem from "@/components/molecules/CardItem/CardItem";

const Start = () => {
    const { data: courses = [] } = useQuery({
        queryKey: ["courses", "featured"],
        queryFn: getFeaturedCourses,
    });

    return (
        <section className='h-[736px] flex flex-col gap-8'>
            <div className='flex flex-col gap-1.5'>
                <h1 className='font-["Inter"] font-semibold text-[40px] leading-[44px] tracking-[-0.005em] text-[#0A0A0A]'>Start Learning Today</h1>
                <span className='font-["Inter"] font-normal text-[18px] leading-[26px] tracking-normal text-[#3D3D3D]'>Choose from our most popular courses and begin your journey</span>
            </div>

            <div className='flex justify-between'>
                {courses.map((course) => (
                    <CardItem key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
};

export default Start;