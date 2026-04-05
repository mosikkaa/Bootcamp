'use client'
import Button from '@/components/atoms/Button/Button';
import useAuthStore from "@/store/useAuthStore";

export default function AuthButtons() {
    const { openLogin, openSignUp } = useAuthStore();

    return (
            <div className='flex gap-[15px]'>
                <Button variant="outline" onClick={openLogin}>Login</Button>
                <Button variant="primary" onClick={openSignUp}>Sign Up</Button>
            </div>
    );
}