import Image from "next/image";
import Button from "@/components/atoms/Button/Button";

const CardItem = () => {
     return(
         <div className='w-[506px] border-[#F5F5F5] bg-white h-[576px] rounded-xl p-5 gap-[24px] border'>

             <div className='flex flex-col gap-4'>
                 <Image src={'/StartBGTry.svg'} alt={'start'} width={466} height={262}/>
                 <div className='flex flex-col gap-3'>
                     <div className='flex justify-between'>
                         <span>Lecturer Marilyn Mango</span>
                         <div className='flex gap-1 items-center'>
                             <Image className='w-[18px] h-[18px]' src={'/star.svg'} alt={'star'} width={18} height={12}/>
                             <p>4.9</p>
                         </div>
                     </div>
                     <div>
                         <h1>Advanced React & TypeScript Development</h1>
                     </div>
                 </div>
                 <span>Master modern React patterns, hooks, and TypeScript integration for building scalable web applications.</span>
             </div>

             <div className='flex justify-between items-center'>

                 <div className='flex gap-2'>
                     <span>Starting from</span>
                     <h2>$499</h2>
                 </div>
                 <div>
                     <Button>
                         Details
                     </Button>
                 </div>

             </div>

         </div>
     );
};

export default CardItem