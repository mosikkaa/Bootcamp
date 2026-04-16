import Image from "next/image";
import Link from "next/link";

export function LocationV1() {
     return(
         <div className='flex gap-0.5 items-center'>
             <div className='flex gap-1 px-1 py-0.5'>
                 <Link href={'/'} className='text-[#666666] font-["Inter"] font-medium text-[18px] leading-[100%] tracking-normal'>Home</Link>
                 <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
             </div>
             <div className='px-1 py-0.5 flex items-center'>
                 <p className='text-[#736BEA] font-["Inter"] font-medium text-[18px] leading-[100%] tracking-normal'>Browse</p>
             </div>
         </div>
     );
}

export function LocationV2() {
    return(
        <div className='flex gap-0.5 items-center'>
            <div className='flex gap-1 px-1 py-0.5'>
                <Link href={'/'} className='text-[#666666] font-["Inter"] font-medium text-[18px] leading-[100%] tracking-normal'>Home</Link>
                <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
            </div>
            <div className='px-1 py-0.5 flex items-center'>
                <Link href={'/browse'} className='text-[#666666] font-["Inter"] font-medium text-[18px] leading-[100%] tracking-normal'>Browse</Link>
                <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
            </div>
            <div className='px-1 py-0.5 flex items-center'>
                <p className='text-[#736BEA] font-["Inter"] font-medium text-[18px] leading-[100%] tracking-normal'>Development</p>
            </div>
        </div>
    )
}