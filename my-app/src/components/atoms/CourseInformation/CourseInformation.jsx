import Image from "next/image";
import CourseDate from "@/components/atoms/CourseDate/CourseDate";


const CATEGORY_ICONS = {
    "Development": "development",
    "Design": "design",
    "Business": "business",
    "Marketing": "marketing",
    "Data Science": "data-science",
};

const CourseInformation = ({course,courseId}) => {

    const avgRating = course.reviews?.length
        ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length).toFixed(1)
        : null;

    const categoryIcon = CATEGORY_ICONS[course.category?.name];

     return(
         <div className='w-[903px] flex flex-col gap-[18px]'>

             <div className='flex flex-col gap-[16px]'>
                 <Image src={course.image} alt={course.title} height={474.15} width={903} className="rounded-lg h-[474.15px] w-[903px] object-cover"/>

                 <div className='flex w-full justify-between'>
                     <div className='flex gap-3'>
                         <CourseDate img={'/boxicons_calendar.svg'} alt={'calendar'}>
                             {course.durationWeeks} Weeks
                         </CourseDate>
                         <CourseDate img={'/tabler_clock.svg'} alt={'clock'}>
                             {course.hours} Hours
                         </CourseDate>
                     </div>

                     <div className='flex gap-[12px] items-center'>
                         {avgRating && (
                             <div className='flex gap-1 items-center'>
                                 <Image src={'/star.svg'} width={26} height={26} alt={'star'} className='object-cover' />
                                 <span className='text-[#525252] text-center font-inter font-medium text-[14px] leading-[150%] tracking-[0%]'>{avgRating}</span>
                             </div>
                         )}
                         <button className='flex group ease-out duration-300 hover:text-[#281ED2] hover:bg-[#DDDBFA] font-medium text-[#666666] text-[16px] leading-[24px] tracking-normal font-inter items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                             <div
                                 className="w-[24px] h-[24px] bg-[#525252] group-hover:bg-[#281ED2] transition-colors"
                                 style={{
                                     maskImage: `url(/${categoryIcon}_vector.svg)`,
                                     WebkitMaskImage: `url(/${categoryIcon}_vector.svg)`,
                                     maskRepeat: 'no-repeat',
                                     maskSize: 'contain'
                                 }}
                             />
                             <span>
                                 {course.category?.name}
                             </span>
                         </button>
                     </div>
                 </div>
             </div>

             <div className='flex flex-col gap-[18px]'>
                 <button className='group flex items-center text-center ease-out duration-300 hover:bg-[#DDDBFA] w-fit h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                     <Image
                         src={course.instructor?.avatar}
                         alt={course.instructor?.name}
                         width={30}
                         height={30}
                         className="rounded-[4px] object-cover object-center w-[30px] h-[30px]"
                     />
                     <span className='font-["Inter"] group-hover:text-[#281ED2] font-medium hover:text-[] text-[16px] leading-[24px] tracking-normal text-[#666666]'>
                                {course.instructor?.name}
                     </span>
                 </button>

                 <div className='flex flex-col gap-[24px]'>
                     <h1 className='text-[#8A8A8A] font-inter font-semibold text-[20px] leading-[24px] tracking-normal'>
                         Course Description
                     </h1>
                     <p className='text-[#525252] font-inter font-medium text-[16px] leading-[24px] tracking-normal'>
                         {course.description}
                     </p>
                 </div>
             </div>

         </div>
     );
};

export default CourseInformation