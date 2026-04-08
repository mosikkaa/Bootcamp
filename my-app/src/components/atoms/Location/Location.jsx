import Image from "next/image";

export function LocationV1() {
     return(
         <div className='flex gap-0.5 items-center'>
             <div className='flex gap-1 px-1 py-0.5'>
                 <p className=''>Home</p>
                 <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
             </div>
             <div className='px-1 py-0.5 flex items-center'>
                 <p className='text-[#736BEA]'>Browse</p>
             </div>
         </div>
     );
}

export function LocationV2() {
    return(
        <div className='flex gap-0.5 items-center'>
            <div className='flex gap-1 px-1 py-0.5'>
                <p className='text-[#666666]'>Home</p>
                <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
            </div>
            <div className='px-1 py-0.5 flex items-center'>
                <p className='text-[#666666]'>Browse</p>
                <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
            </div>
            <div className='px-1 py-0.5 flex items-center'>
                <p className='text-[#736BEA]'>Development</p>
            </div>
        </div>
    )
}