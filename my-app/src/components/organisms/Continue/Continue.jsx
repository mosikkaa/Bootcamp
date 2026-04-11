'use client'
import Link from "next/link";
import LearningCardItem from "@/components/molecules/LearningCardItem/LearningCardItem";
import Lock from "@/components/molecules/Lock/Lock";
import useAuthStore from "@/store/useAuthStore";
import {getEnrollments} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

const Continue = () => {
    const { isLoggedIn,openLogin,openSidebar } = useAuthStore();

    const { data: enrollments = [] } = useQuery({
        queryKey: ["enrollments"],
        queryFn: getEnrollments,
        enabled: isLoggedIn,
    });

    const visibleEnrollments = enrollments.slice(0, 4);


     return(
       <section className='relative flex flex-col gap-8 mb-16'>

           <div className='flex justify-between items-end'>
               <div className='flex flex-col gap-1.5'>
                   <h1 className='font-["Inter"] font-semibold text-[40px] leading-none tracking-normal text-[#0A0A0A]'>Continue Learning</h1>
                   <span className='font-["Inter"] font-medium text-[18px] leading-none tracking-normal text-[#3D3D3D]'>Pick up where you left</span>
               </div>
               <a onClick={openSidebar} className='cursor-pointer font-["Inter"] font-medium text-[20px] leading-none tracking-normal underline decoration-solid text-[#4F46E5]'>See all</a>
           </div>

           <div className='relative flex justify-between'>

               {isLoggedIn ? (
                   visibleEnrollments.map((enrollment) => (
                       <LearningCardItem key={enrollment.id} enrollment={enrollment} />
                   ))
               ) : (
                   <>
                       <LearningCardItem />
                       <LearningCardItem />
                       <LearningCardItem />
                   </>
               )}

           </div>

           {!isLoggedIn && <Lock />}

       </section>
     );
};

export default Continue