'use client'
import Button from '@/components/atoms/Button/Button';
import useAuthStore from "@/store/useAuthStore";
import Image from 'next/image';
import {useQuery} from "@tanstack/react-query";
import {getMe} from "@/lib/api";

const AuthButtons = () => {
    const { openLogin, openSignUp, openProfile, isLoggedIn, user} = useAuthStore();

    const { data: userData, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: isLoggedIn,
    });

    if (isLoggedIn) {
        return (
            <div className='flex gap-[15px] items-center'>
                <button onClick={openProfile} className='flex p-2 w-[56px] h-[56px] rounded-full cursor-pointer transition-all duration-300  border-[1.5px] border-transparent  hover:border-[#B7B3F4] bg-[#EEEDFC] relative items-center gap-2'>
                    <Image
                        src={userData?.avatar || '/user_vector.svg'}
                        alt={user?.username}
                        width={40}
                        height={40}
                        className='object-cover w-[full] h-[full] rounded-[8px]'
                    />
                    <Image src={userData?.profileComplete ? '/complete_ball_vector.svg' : '/incomplete_ball_vector.svg'} alt={user?.username} width={15} height={15} className={'absolute right-0 bottom-0'}/>
                </button>
            </div>
        );
    }

    return (
        <div className='flex gap-[15px]'>
            <Button variant="outline" onClick={openLogin}>Login</Button>
            <Button variant="primary" onClick={openSignUp}>Sign Up</Button>
        </div>
    );
}

export default AuthButtons;