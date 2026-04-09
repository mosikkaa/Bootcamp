import Image from "next/image";

const Rating = ({value,count}) => {
     return(
         <div className='flex gap-1 items-center'>
             <Image src={'/star.svg'} width={18} height={18} alt={'star'} />
             <span className='text-[#525252] font-inter font-medium text-[14px] leading-[100%] tracking-[0%]'>{value}</span>
         </div>
     );
};

export default Rating