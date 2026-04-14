'use client'
import Link from "next/link";
import FooterColumn from "@/components/atoms/FooterColumn/FooterColumn";
import FooterItem from "@/components/molecules/FooterItem/FooterItem";
import FooterLogo from "@/components/atoms/FooterLogo/FooterLogo";
import Social from "@/components/atoms/Social/Social";
import useAuthStore from "@/store/useAuthStore";


const Footer = () => {
    const { isLoggedIn ,openLogin,openSignUp,openSidebar,openProfile} = useAuthStore();


     return(
       <footer className='w-full flex border-t pt-[80px] px-[177px] pb-[20px] h-[334px] items-center justify-center border-[#D1D1D1]'>
           <div className='w-full flex flex-col gap-[74px]'>

               <div className='flex justify-between'>

                   <div className='flex flex-col gap-6'>

                       <FooterLogo/>

                       <Social/>

                   </div>

                   <div className='flex gap-[120px]'>
                       <FooterColumn head={'Explore'}>
                           {isLoggedIn && <a onClick={openSidebar} className={'font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-start tracking-normal cursor-default'}>Enrolled Courses</a>}
                           <Link href={'/browse'} className={'font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-start tracking-normal cursor-default'}>Browse Courses</Link>
                       </FooterColumn>

                       <FooterColumn head={'Account'}>
                           {isLoggedIn ?
                               <a onClick={openProfile} className='font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-start tracking-normal cursor-default'>My Profile</a>
                               :
                               <>
                                   <a onClick={openSignUp} className='font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-start tracking-normal cursor-default'>Sign Up</a>
                                   <a onClick={openLogin} className='font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-start tracking-normal cursor-default'>Log In</a>
                               </>
                           }
                       </FooterColumn>

                       <FooterItem/>
                   </div>

               </div>

               <div className='flex justify-between'>
                   <p className='font-["Inter"] font-normal text-[18px] leading-none tracking-normal text-[#666666]'>Copyright © 2026 Redberry International</p>
                   <div className='flex gap-2 text-[#666666] font-["Inter"] font-normal text-[18px] leading-none tracking-normal'>All Rights Reserved
                       <div className='w-[0.8px] h-full bg-[#666666] text-[#666666]'/>
                       <Link href={'/'} className='text-[#4F46E5]'>Terms And Conditions</Link>
                       <div className='w-[0.8px] h-full bg-[#666666] text-[#666666]'/>
                       <Link href={'/'} className='text-[#4F46E5]'>Privacy Policy</Link>
                   </div>
               </div>

           </div>
       </footer>
     );
};

export default Footer