"use client";
import Button from "@/components/atoms/Button/Button";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";


const Categories = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategories = searchParams.getAll("category");

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleCategory = (categoryId) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");

        if (activeCategories.includes(String(categoryId))) {
            activeCategories
                .filter(c => c !== String(categoryId))
                .forEach(c => params.append("category", c));
        } else {
            [...activeCategories, String(categoryId)]
                .forEach(c => params.append("category", c));
        }

        params.delete("topic"); // reset topics when category changes
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`,{ scroll: false });
    };

    return (
        <div className='flex flex-col gap-[24px]'>
            <span>Categories</span>
            <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={activeCategories.includes(String(category.id)) ? "categoriesActive" : "categories"}
                        onClick={() => handleCategory(category.id)}
                    >
                        <div
                            className={`
            w-[24px] h-[24px] transition-colors duration-300 group-hover:bg-[#281ED2]
            ${activeCategories.includes(String(category.id))
                                ? 'bg-[#281ED2]'
                                : 'bg-[#8A8A8A]'}
        `}
                            style={{
                                maskImage: `url(${category.icon}_vector.svg)`,
                                WebkitMaskImage: `url(${category.icon}_vector.svg)`,
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain'
                            }}
                        />
                        <span>{category.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Categories;