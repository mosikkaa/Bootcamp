"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/atoms/Button/Button";
import { getInstructors } from "@/lib/api";

const Instructors = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeInstructors = searchParams.getAll("instructor");

    const { data: instructors = [] } = useQuery({
        queryKey: ["instructors"],
        queryFn: getInstructors,
    });

    const handleInstructor = (id) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("instructor");

        if (activeInstructors.includes(String(id))) {
            activeInstructors
                .filter(i => i !== String(id))
                .forEach(i => params.append("instructor", i));
        } else {
            [...activeInstructors, String(id)]
                .forEach(i => params.append("instructor", i));
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`,{ scroll: false });
    };

    return (
        <div className='flex flex-col gap-[24px]'>
            <span>Instructor</span>
            <div className='flex flex-col gap-2 items-start'>
                {instructors.map((instructor) => (
                    <Button
                        key={instructor.id}
                        onClick={() => handleInstructor(instructor.id)}
                        variant={activeInstructors.includes(String(instructor.id)) ? "instructorsActive" : "instructors"}
                    >
                        <Image
                            src={instructor.avatar}
                            className='rounded-[4px] object-cover object-center w-[30px] h-[30px]'
                            alt={instructor.name}
                            width={30}
                            height={30}
                        />
                        <span className='font-medium text-[16px] leading-[24px] tracking-normal font-inter'>
                            {instructor.name}
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Instructors;