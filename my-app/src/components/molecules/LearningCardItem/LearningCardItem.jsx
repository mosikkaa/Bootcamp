import Image from "next/image";
import Button from "@/components/atoms/Button/Button";

const LearningCardItem = () => {
     return(
         <div className='filter blur-[20px] flex flex-col gap-2 w-[506px] bg-white border-[0.5px] border-[#F5F5F5] shadow-[0px_0px_11.7px_0px_#0000000A] rounded-xl p-5'>

             <div className='flex justify-between opacity-[76%]'>
                 <Image src={'/LearningTRY.svg'} alt={'Learning'} width={140} height={123}/>
                 <div className='flex flex-col gap-[9px] pr-1 pl-4'>
                     <div className='flex justify-between'>
                         <p>Lecturer Marilyn Mango</p>
                         <div className='flex gap-1'>
                             <Image className='w-[18px] h-[18px]' src={'/star.svg'} alt={'Star'} width={18} height={18}/>
                             <p>4.9</p>
                         </div>
                     </div>
                     <p>Advanced React & TypeScript Development</p>
                 </div>
             </div>


             <div className='flex justify-between opacity-[76%]'>

                 <div className='flex flex-col pb-1 gap-1'>
                     <p>65% Complete</p>

                     <div className='w-[336px] h-[15.13px] rounded-[30px] bg-[#DDDBFA]'>
                         <div className='bg-[#4F46E5] w-[202.56px] h-[15.13px] rounded-[30px]'></div>
                     </div>
                 </div>

                 <div>
                     <Button variant={"view"}>
                         View
                     </Button>
                 </div>


             </div>

         </div>
     );
};

export default LearningCardItem