import Link from "next/link";
import Image from "next/image";
import FooterColumn from "@/components/atoms/FooterColumn/FooterColumn";

const FooterItem = () => {
     return(
       <ul className='flex flex-col'>
           <FooterColumn head={'Contact'}>
               <li className='flex items-center cursor-default gap-[6px] font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-center align-middle tracking-normal' href={'/'}>
                   <Image src={'/Email.svg'} alt={'email'} width={24} height={24}/>
                   <p>contact@company.com</p>
               </li>
               <li className='flex items-center cursor-default gap-[6px] font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-center align-middle tracking-normal' href={'/'}>
                   <Image src={'/Mobile.svg'} alt={'mobile'} width={22} height={22}/>
                   <p>(+995) 555 111 222</p>
               </li>
               <li className='flex items-center cursor-default gap-[6px] font-["Inter"] text-[#666666] font-normal text-[18px] leading-none text-center align-middle tracking-normal' href={'/'}>
                   <Image src={'/Location.svg'} alt={'location'} width={24} height={24}/>
                   <p>Aghmashenebeli St.115</p>
               </li>
           </FooterColumn>
       </ul>
     );
};

export default FooterItem