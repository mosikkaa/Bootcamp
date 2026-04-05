import Link from "next/link";
import FooterColumn from "@/components/atoms/FooterColumn/FooterColumn";
import FooterItem from "@/components/molecules/FooterItem/FooterItem";
import FooterLogo from "@/components/atoms/FooterLogo/FooterLogo";
import Social from "@/components/atoms/Social/Social";


const Footer = () => {
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
                           <Link href={'/'}>Enrolled Courses</Link>
                           <Link href={'/'}>Browse Courses</Link>
                       </FooterColumn>

                       <FooterColumn head={'Account'}>
                           <Link href={'/'}>My Profile</Link>
                       </FooterColumn>

                       <FooterItem/>
                   </div>

               </div>

               <div className='flex justify-between'>
                   <p>Copyright © 2026 Redberry International</p>
                   <p>All Rights Reserved | Terms and Conditions | Privacy Policy</p>
               </div>

           </div>
       </footer>
     );
};

export default Footer