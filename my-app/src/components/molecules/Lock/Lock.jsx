'use client'
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import useAuthStore from "@/store/useAuthStore";

const Lock = () => {
    const {isLoggedIn, openLogin } = useAuthStore();

     return(
         <div className={`${isLoggedIn ? 'hidden' : 'flex absolute'} top-[29%] left-3/8 bg-white w-[418px] h-[233px] rounded-xl gap-[10px] py-8 px-[56px] border-t border-[#ADADAD] opacity-100`}>

             <div className='flex flex-col gap-6'>
                 <div className='flex flex-col gap-3 items-center'>
                     <Image src={'/Lock.svg'} alt={'lock'} width={74} height={77}/>
                     <p>Sign in to track your learning progress</p>
                 </div>

                 <div className='flex items-center justify-center'>
                     <Button variant={'progLogin'} onClick={openLogin}>Log In</Button>
                 </div>
             </div>
         </div>



     );
};

export default Lock