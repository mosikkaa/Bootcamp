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
                <button
                    onClick={openProfile}
                    className='relative w-[56px] h-[56px] cursor-pointer'
                >

                    <div className='w-full h-full rounded-full overflow-hidden border-[1.5px] border-transparent hover:border-[#B7B3F4] transition-all duration-300 bg-[#EEEDFC] flex items-center justify-center'>

                        {userData?.avatar ? (
                            <Image
                                src={userData?.avatar}
                                alt={user?.username}
                                fill
                                className='object-cover rounded-full'
                            />
                        ) : (
                            <Image
                                src='/user_vector.svg'
                                alt={user?.username}
                                width={40}
                                height={40}
                                className='object-cover'
                            />
                        )}
                    </div>

                    <Image
                        src={userData?.profileComplete ? '/complete_ball_vector.svg' : '/incomplete_ball_vector.svg'}
                        alt='status'
                        width={15}
                        height={15}
                        className='absolute -right-[0px] -bottom-[0px]'
                    />
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