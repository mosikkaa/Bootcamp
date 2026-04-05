import Image from "next/image";
import Slider from "@/components/molecules/Slider/Slider";
import Start from "@/components/organisms/Start/Start";
import Continue from "@/components/organisms/Continue/Continue";

export default function Home() {
  return (
      <main className='w-full bg-[#F5F5F5]! flex flex-col px-[177px] gap-16 pt-16'>
            <Slider/>
            <Start/>
            <Continue/>
      </main>
  );
}
