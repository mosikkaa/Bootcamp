'use client'
import Button from '@/components/atoms/Button/Button';
import useAuthStore from "@/store/useAuthStore";
import Image from 'next/image';

const AuthButtons = () => {
    const { openLogin, openSignUp, openProfile, isLoggedIn, user} = useAuthStore();

    if (isLoggedIn) {
        return (
            <div className='flex gap-[15px] items-center'>
                <button onClick={openProfile} className='flex items-center gap-2'>
                    <Image
                        src={user?.avatar || '/tryInstructor.svg'}
                        alt={user?.username}
                        width={36}
                        height={36}
                        className='rounded-full object-cover'
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