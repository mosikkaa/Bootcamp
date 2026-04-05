import Link from "next/link";

const FooterLogo = () => {
     return(
         <div className='flex flex-col gap-4'>
             <div className='flex items-center gap-3!'>
                 <Link href="/" className="">
                     <img className="" src="/LogoFooter.svg" alt="Logo" />
                 </Link>
                 <p>Bootcamp</p>
             </div>

             <span className=''>Your learning journey starts here! <br/>Browse courses to get started.</span>
         </div>
     );
};

export default FooterLogo