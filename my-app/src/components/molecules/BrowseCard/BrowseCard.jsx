import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/atoms/Rating/Rating";
import Button from "@/components/atoms/Button/Button";

const BrowseCard = ({ course }) => {
    return (
        <Link href={`/courses/${course.id}`} className="block">
            <div className='flex flex-col gap-[18px] justify-between w-[373px] h-[451px] transition-all duration-300 ease-out hover:border-[#B7B3F4] hover:shadow-[0px_0px_25px_0px_#8A82D41A] active:border-[#958FEF] active:shadow-[0px_0px_45px_0px_#8A82D426] bg-white rounded-[12px] p-[20px] border border-[#F5F5F5] cursor-pointer '>
                <div className='flex flex-col gap-[18px]'>
                <Image
                    src={course.image || '/StartBGTry.svg'}
                    alt={course.title}
                    width={333}
                    height={181}
                    className="rounded-[8px] object-cover w-full h-[181px]"
                />
                <div className='flex flex-col  w-full gap-[16px]'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <span className='text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>
                                {course.instructor?.name}
                            </span>
                            <span className='text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>|</span>
                            <span className='text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>
                                {course.durationWeeks} Weeks
                            </span>
                        </div>
                        <Rating value={course.avgRating} count={course.reviewCount} />
                    </div>

                    <h2 className='font-inter font-semibold text-[24px] leading-[100%] tracking-normal text-[#0A0A0A]'>
                        {course.title}
                    </h2>

                    <div className='flex flex-wrap'>
                        <Button variant='browseCard'>
                            <Image
                                src={`/${course.category?.icon}_vector.svg`}
                                alt={course.category?.icon}
                                width={24}
                                height={24}
                            />
                            <span>{course.category?.name}</span>
                        </Button>
                    </div>

                </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                            <span className='font-inter font-medium text-[12px] leading-[100%] tracking-normal text-[#8A8A8A]'>
                                Starting from
                            </span>
                        <span className='text-[#292929] font-inter font-semibold text-2xl leading-none tracking-normal'>
                                ${parseFloat(course.basePrice).toFixed(0)}
                            </span>
                    </div>
                    <div className='font-inter font-medium text-[16px] leading-[24px] tracking-normal text-center text-white bg-[#4F46E5] rounded-[8px] px-[27px] py-[12px]'>
                        Details
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BrowseCard;