import Link from "next/link";

const FooterLogo = () => {
     return(
         <div className='flex flex-col gap-4'>
             <div className='flex items-center gap-3!'>
                 <Link href="/" className="">
                     <img className="" src="/LogoFooter.svg" alt="Logo" />
                 </Link>
                 <p className='font-["Inter"] font-medium text-[24px] leading-none tracking-normal text-[#130E67]'>Bootcamp</p>
             </div>

             <span className='font-["Inter"] font-medium text-[14px] leading-none align-middle tracking-normal text-[#130E67]'>Your learning journey starts here! <br/>Browse courses to get started.</span>
         </div>
     );
};

export default FooterLogo