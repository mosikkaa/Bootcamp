import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import CardItem from "@/components/molecules/CardItem/CardItem";

const Start = () => {
     return(
       <section className='h-[736px] flex flex-col gap-8'>
           <div className='flex flex-col gap-1.5'>
               <h1>Start Learning Today</h1>
               <span>Choose from our most popular courses and begin your journey</span>
           </div>

           <div className='flex justify-between'>

               <CardItem/>
               <CardItem/>
               <CardItem/>

           </div>

       
       </section>
     );
};

export default Start