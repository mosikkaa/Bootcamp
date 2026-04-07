'use client'
import Image from 'next/image'
import {useState} from "react";
import Button from "@/components/atoms/Button/Button";
import BrowseCard from "@/components/molecules/BrowseCard/BrowseCard";
import Pagination from "@/components/molecules/Pagination/Pagination";


export default function Home() {

    const [isOpen,setOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest First");


    return (
        <main className='w-full bg-[#F5F5F5]! flex flex-col px-[177px] gap-[62px] pt-16 pb-20'>

                 <div className='flex gap-0.5 items-center'>
                     <div className='flex gap-1 px-1 py-0.5'>
                         <p className=''>Home</p>
                         <Image src={'/rightArrow.svg'} alt={'arrowRight'} height={24} width={12} />
                     </div>
                     <div className='px-1 py-0.5 flex items-center'>
                         <p className='text-[#736BEA]'>Browse</p>
                     </div>
                 </div>

            <div className='flex gap-[90px]'>

                <div className='w-[309px] flex flex-col gap-6'>

                    <div className='flex flex-col gap-8'>
                        <div className='flex justify-between'>
                            <h1 className='font-sans font-semibold text-[40px] text-[#0A0A0A] tracking-normal'>Filter</h1>
                            <div className='flex items-center gap-[7px]'>
                                <span className='font-medium text-[#8A8A8A] text-[16px] leading-[24px] tracking-normal font-inter'>Clear All Filters</span>
                                <span className='w-[10px] h-[10px]'>x</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-14'>

                            <div className='flex flex-col gap-[24px]'>

                                <span>Categories</span>
                                <div className='flex flex-wrap gap-2'>
                                    <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                                        <span>Development</span>
                                    </button>

                                    <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                                        <span>Design</span>
                                    </button>

                                    <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                                        <span>Business</span>
                                    </button>

                                    <button className='flex items-center h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <Image src={'/development_vector.svg'} alt={'development'} width={24} height={24}/>
                                        <span>Data Science</span>
                                    </button>

                                </div>

                            </div>
                            <div className='flex flex-col gap-[24px]'>

                                <span>Topics</span>
                                <div className='flex flex-wrap gap-2'>
                                    <button className='flex h-[39px] rounded-[12px] px-[12px] py-[8px] gap-[10px] bg-white'>
                                        <span>React</span>
                                    </button>
                                </div>

                            </div>
                            <div className='flex flex-col gap-[24px]'>
                                <span>Instructor</span>
                                <div className='flex flex-col gap-2'>

                                    <button className='flex items-center text-center w-[179px] h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                                        <Image src={'/tryInstructor.svg'} alt={'instructor'} width={30} height={30}/>
                                        <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>Marilyn Mango</span>
                                    </button>

                                    <button className='flex items-center text-center w-[179px] h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                                        <Image src={'/tryInstructor.svg'} alt={'instructor'} width={30} height={30}/>
                                        <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>Marilyn Mango</span>
                                    </button>

                                    <button className='flex items-center text-center w-[179px] h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                                        <Image src={'/tryInstructor.svg'} alt={'instructor'} width={30} height={30}/>
                                        <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>Marilyn Mango</span>
                                    </button>

                                    <button className='flex items-center text-center w-[179px] h-[46px] rounded-[12px] px-[12px] py-[8px] gap-[12px] bg-white'>
                                        <Image src={'/tryInstructor.svg'} alt={'instructor'} width={30} height={30}/>
                                        <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>Marilyn Mango</span>
                                    </button>

                                </div>
                            </div>


                        </div>

                    </div>

                    <div className='w-full h-[36px] pt-4 border-t border-[#ADADAD] flex items-end'>
                        <div className='h-[20px]'>
                            <span>0 Filters Active</span>
                        </div>
                    </div>

                </div>

                <div className='w-[1167px] flex flex-col gap-[32px] items-center'>

                    <div className='flex justify-between w-full items-center'>
                        <p>Showing 9 o ut of 90</p>
                        <div className='relative'>
                            <button onClick={() => setOpen(!isOpen) } className=' h-[49px] flex items-center rounded-[10px] px-[20px] py-[7px] gap-[8px] bg-white border border-[#F5F5F5]'>

                                <div className='flex gap-[8px]'>
                                    <span className='font-inter font-medium text-[16px] leading-[24px] tracking-normal text-[#666666]'>Sort by:</span>
                                    <p className='font-inter font-medium text-[16px] leading-[24px] tracking-normal text-[#4F46E5]'>{sortBy}</p>
                                </div>
                                <Image src={'/arrowDown.svg'} alt={'arrowDown'} width={20} height={20}/>
                            </button>
                            {isOpen && (
                                <ul className="absolute right-0 top-14 flex flex-col rounded-[10px] w-full bg-white border border-[#F5F5F5]">
                                    <li onClick={() => {setSortBy("Newest First");setOpen(false)}} className="cursor-pointer h-[45px] px-[20px] py-[10px]">
                                        Newest First
                                    </li>
                                    <li onClick={() => {setSortBy("Price:Low to High");setOpen(false)}}  className="cursor-pointer h-[45px] px-[20px] py-[10px]">
                                        Price:Low to High
                                    </li>
                                    <li onClick={() => {setSortBy("Price:High to Low");setOpen(false)}}  className="cursor-pointer h-[45px] px-[20px] py-[10px]">
                                        Price:High to Low
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>


                    <div className='grid grid-cols-3 gap-6'>

                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>
                        <BrowseCard/>

                    </div>

                    <Pagination/>


                </div>

            </div>


        </main>
    );
}