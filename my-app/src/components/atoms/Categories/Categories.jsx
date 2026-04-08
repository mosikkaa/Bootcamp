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
                        <Image
                            src={'/development_vector.svg'}
                            alt={category.name}
                            width={24}
                            height={24}
                            className='transition duration-300 group-active:[filter:invert(15%)_sepia(60%)_saturate(6950%)_hue-rotate(247deg)_brightness(79%)_contrast(113%)] group-hover:[filter:invert(15%)_sepia(60%)_saturate(6950%)_hue-rotate(247deg)_brightness(79%)_contrast(113%)]'
                        />
                        <span>{category.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Categories;