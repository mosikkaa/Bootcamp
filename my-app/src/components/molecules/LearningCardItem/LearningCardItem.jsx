import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

const LearningCardItem = ({enrollment}) => {
    const { isLoggedIn } = useAuthStore();

    const progress = enrollment?.progress;
    const fillWidth = (progress / 100) * 336;

     return(
         <Link href={`/courses/${enrollment?.course?.id}`} className={`${isLoggedIn ? '' : 'filter blur-[20px]'} flex flex-col gap-2 w-[506px] bg-white hover:border-[0.5px] hover:border-[#B7B3F4] hover:shadow-[0px_0px_25px_0px_#8A82D41A] active:border-[1px] active:border-[#958FEF] active:shadow-[0px_0px_35px_0px_#8A82D440] border-[0.5px] border-[#F5F5F5] shadow-[0px_0px_11.7px_0px_#0000000A] rounded-xl p-5`}>

             <div className={`flex ${isLoggedIn ? '' : 'opacity-[76%]'}`}>
                 <Image src={enrollment?.course?.image || '/StartBGTry.svg'} alt={enrollment?.course?.title || 'Learning'} width={140} height={123} className='object-cover w-[140px] h-[123px] rounded-[12px]'/>
                 <div className='flex flex-col gap-[9px] pr-1 pl-4'>
                     <div className='flex justify-between'>
                         <span className='flex gap-1 items-center font-["Inter"] font-medium text-[14px] leading-none tracking-normal'>
                             <span className='text-[#A3A3A3]'>Lecturer</span>
                             <span className='text-[#525252]'>{enrollment?.course?.instructor?.name}</span>
                         </span>
                         <div className='flex gap-1 items-center'>
                             <Image className='w-[18px] h-[18px]' src={'/star.svg'} alt={'Star'} width={18} height={18}/>
                             <p className='font-["Inter"] font-medium text-[14px] leading-none tracking-normal text-[#525252]'>{enrollment?.course?.avgRating}</p>
                         </div>
                     </div>
                     <p className='font-["Inter"] w-[306px] font-semibold text-[20px] leading-[24px] tracking-normal text-[#141414]'>{enrollment?.course?.title}</p>
                 </div>
             </div>


             <div className={`flex items-end justify-between ${isLoggedIn ? '' : 'opacity-[76%]'}`}>

                 <div className='flex flex-col pb-1 gap-1'>
                     <p className='font-["Inter"] font-medium text-[12px] leading-none tracking-normal align-middle text-[#141414]'>{enrollment?.progress}% Complete</p>

                     <div className='w-[336px] h-[15.13px] rounded-[30px] bg-[#DDDBFA]'>
                         <div
                             className="bg-[#4F46E5] h-[15.13px] rounded-[30px]"
                             style={{ width: `${fillWidth}px` }}
                         />
                     </div>
                 </div>

                     <Button variant="view">View</Button>
             </div>

         </Link>
     );
};

export default LearningCardItem