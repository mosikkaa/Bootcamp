import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button/Button";

const CardItem = ({ course }) => {
    return (
        <Link href={`/courses/${course.id}`} className="block">
            <div className='w-[506px] border-[#F5F5F5] animate-out duration-300 active:border-[1px] active:border-[#958FEF] active:shadow-[0px_0px_35px_0px_#8A82D440] hover:shadow-[0px_0px_25px_0px_#8A82D41A] hover:border-[0.5px] hover:border-[#B7B3F4] bg-white h-[576px] rounded-xl p-5 gap-[24px] border flex flex-col justify-between'>

                <div className='flex flex-col gap-4'>
                    <Image
                        src={course.image || '/StartBGTry.svg'}
                        alt={course.title}
                        width={466}
                        height={262}
                        className="rounded-lg object-cover w-full h-[262px]"
                    />
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-between'>
                            <span className='font-["Inter"] flex gap-1 items-center font-medium text-[14px] leading-none tracking-normal'>
                                <span className="text-[#A3A3A3]">Lecturer </span>
                                <span className="text-[#525252]">{course.instructor?.name}</span>
                            </span>
                            <div className='flex gap-1 items-center'>
                                <Image className='w-[18px] h-[18px] object-cover' src={'/star.svg'} alt={'star'} width={18} height={18}/>
                                <p>{course.avgRating ?? "N/A"}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-["Inter"] font-semibold text-[24px] leading-none tracking-normal text-[#141414]'>{course.title}</h1>
                        </div>
                    </div>
                    <span className='font-["Inter"] font-medium text-[16px] leading-[24px] tracking-normal text-[#666666]'>{course.description}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <span className='font-["Inter"] font-medium text-[12px] leading-none tracking-normal text-[#8A8A8A]'>Starting from</span>
                        <h2 className='font-["Inter"] font-semibold text-[32px] leading-none tracking-normal text-right text-[#141414]'>${parseFloat(course.basePrice).toFixed(0)}</h2>
                    </div>
                    <Button variant="featured">Details</Button>
                </div>

            </div>
        </Link>
    );
};

export default CardItem;