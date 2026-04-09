"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/atoms/Button/Button";
import { getTopics } from "@/lib/api";

const Topics = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedCategories = searchParams.getAll("category");
    const activeTopics =  searchParams.getAll("topic");

    const { data: topics = [] } = useQuery({
        queryKey: ["topics", selectedCategories],
        queryFn: () => getTopics(selectedCategories),
    });

    const handleTopic = (topicId) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("topic");

        if (activeTopics.includes(String(topicId))) {
            activeTopics
                .filter(t => t !== String(topicId))
                .forEach(t => params.append("topic", t));
        } else {
            [...activeTopics, String(topicId)]
                .forEach(t => params.append("topic", t));
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`,{scroll:false});
    };

    return (
        <div className='flex flex-col gap-[24px]'>
            <span>Topics</span>
            <div className='flex flex-wrap gap-2'>
                {topics.map((topic) => (
                    <Button
                        key={topic.id}
                        onClick={() => handleTopic(topic.id)}
                        variant={activeTopics.includes(String(topic.id)) ? "categoriesActive" : "categories"}
                    >
                        <span>{topic.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Topics;