import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button/Button";

const CardItem = ({ course }) => {
    return (
        <Link href={`/courses/${course.id}`} className="block">
            <div className='w-[506px] border-[#F5F5F5] bg-white h-[576px] rounded-xl p-5 gap-[24px] border flex flex-col justify-between'>

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
                            <span>Lecturer {course.instructor?.name}</span>
                            <div className='flex gap-1 items-center'>
                                <Image className='w-[18px] h-[18px]' src={'/star.svg'} alt={'star'} width={18} height={18}/>
                                <p>{course.avgRating ?? "N/A"}</p>
                            </div>
                        </div>
                        <div>
                            <h1>{course.title}</h1>
                        </div>
                    </div>
                    <span>{course.description}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <span>Starting from</span>
                        <h2>${parseFloat(course.basePrice).toFixed(0)}</h2>
                    </div>
                    <Button>Details</Button>
                </div>

            </div>
        </Link>
    );
};

export default CardItem;