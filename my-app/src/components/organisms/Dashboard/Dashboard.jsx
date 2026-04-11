'use client'
import Slider from "@/components/molecules/Slider/Slider";
import Start from "@/components/organisms/Start/Start";
import Continue from "@/components/organisms/Continue/Continue";
import useAuthStore from "@/store/useAuthStore";

const Dashboard = () => {
    const {isLoggedIn} = useAuthStore()

     return(
       <>
           <Slider/>
           {isLoggedIn ? <Continue /> : null}
           <Start/>
           {isLoggedIn ?  null : <Continue />}
       </>
     );
};

export default Dashboard