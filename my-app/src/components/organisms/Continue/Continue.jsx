import Link from "next/link";
import LearningCardItem from "@/components/molecules/LearningCardItem/LearningCardItem";
import Lock from "@/components/molecules/Lock/Lock";

const Continue = () => {
     return(
       <section className='relative flex flex-col gap-8 mb-16'>

           <div className='flex justify-between items-end'>
               <div className='flex flex-col gap-1.5'>
                   <h1>Start Learning Today</h1>
                   <span>Choose from our most popular courses and begin your journey</span>
               </div>
               <Link className='underline text-[#4F46E5]' href={'/'}>See all</Link>
           </div>

           <div className='relative flex justify-between'>

               <LearningCardItem/>
               <LearningCardItem/>
               <LearningCardItem/>

           </div>

           <Lock/>

       </section>
     );
};

export default Continue