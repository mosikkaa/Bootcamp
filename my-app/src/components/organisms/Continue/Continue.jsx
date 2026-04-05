import Link from "next/link";
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import LearningCardItem from "@/components/molecules/LearningCardItem/LearningCardItem";

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

           <div className="absolute top-1/4 left-3/8 bg-white w-[418px] h-[233px] rounded-xl gap-[10px] py-8 px-[56px] border-t border-[#ADADAD] opacity-100">


               <div className='flex flex-col gap-6'>
                   <div className='flex flex-col gap-3 items-center'>
                       <Image src={'/Lock.svg'} alt={'lock'} width={74} height={77}/>
                       <p>Sign in to track your learning progress</p>
                   </div>

                   <div className='flex items-center justify-center'>
                       <Button variant={'progLogin'}>
                           Login
                       </Button>
                       
                   </div>
               </div>

           </div>


       </section>
     );
};

export default Continue