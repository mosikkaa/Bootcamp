'use client'
import CoursePage from "@/components/organisms/CoursePage/CoursePage";

export default function Home({ params }) {
    const { id } = params;

    return (
        <main className='w-full bg-[#F5F5F5] flex items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[100px] 2xl:px-[177px] justify-between pt-16 pb-20'>
            <CoursePage params={params} />
        </main>
    );
}