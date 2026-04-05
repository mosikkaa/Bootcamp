import Link from "next/link";
import Image from "next/image";
import FooterColumn from "@/components/atoms/FooterColumn/FooterColumn";

const FooterItem = () => {
     return(
       <>
           <FooterColumn head={'Contact'}>
               <Link className='flex gap-[6px]' href={'/'}>
                   <Image src={'/Email.svg'} alt={'email'} width={24} height={24}/>
                   <p>contact@company.com</p>
               </Link>
               <Link className='flex gap-[6px]' href={'/'}>
                   <Image src={'/Mobile.svg'} alt={'mobile'} width={22} height={22}/>
                   <p>(+995) 555 111 222</p>
               </Link>
               <Link className='flex gap-[6px]' href={'/'}>
                   <Image src={'/Location.svg'} alt={'location'} width={24} height={24}/>
                   <p>Aghmashenebeli St.115</p>
               </Link>
           </FooterColumn>
       </>
     );
};

export default FooterItem