import Image from "next/image";

const CourseDate = ({children,img,alt}) => {
     return(
         <div className='flex gap-1 items-center'>
             <Image src={img} alt={alt} width={24} height={24}/>
             <span className='text-[#525252] font-inter font-medium text-[14px] leading-[100%] tracking-[0%]'>{children}</span>
         </div>
     );
};

export default CourseDate