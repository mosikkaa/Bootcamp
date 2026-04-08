import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/atoms/Rating/Rating";
import Button from "@/components/atoms/Button/Button";

const BrowseCard = ({ courseId = "1" }) => {
    return (
        <Link href={`/courses/${courseId}`} className="block">
            <div className='flex flex-col gap-[18px] w-[373px] bg-white rounded-[12px] p-[20px] border border-gray-200 cursor-pointer hover:shadow-md transition-shadow'>
                <Image src={'/StartBGTry.svg'} alt='start' width={333} height={181}/>
                <div className='flex flex-col gap-[16px]'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <span className='text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>Marilyn Mango</span>
                            <span className='w-2 text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>|</span>
                            <span className='text-[#8A8A8A] font-inter font-medium text-[14px] leading-none tracking-normal'>12 Weeks</span>
                        </div>
                        <Rating/>
                    </div>

                    <h1 className='font-inter font-semibold text-[24px] leading-[100%] tracking-normal text-[#0A0A0A]'>Advanced React & TypeScript Development</h1>

                    <div className='flex flex-wrap'>
                        <Button variant={'browseCard'}>
                            <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                            <span>Development</span>
                        </Button>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='w-[144px] flex flex-col gap-1'>
                            <span className='font-inter font-medium text-[12px] leading-[100%] tracking-normal text-[#8A8A8A]'>Starting from</span>
                            <h1 className='text-[#292929] font-inter font-semibold text-2xl leading-none tracking-normal'>$299</h1>
                        </div>
                        <div className='font-inter font-medium text-[16px] leading-[24px] tracking-normal text-center text-white bg-[#4F46E5] rounded-[8px] px-[27px] py-[12px]'>
                            Details
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BrowseCard;