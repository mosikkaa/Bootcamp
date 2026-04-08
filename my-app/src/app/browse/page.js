import { Suspense } from 'react'
import BrowsePage from "@/components/organisms/BrowsePage/BrowsePage";

//useSearchParams erroring -> that was solution

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowsePage />
        </Suspense>
    )
}