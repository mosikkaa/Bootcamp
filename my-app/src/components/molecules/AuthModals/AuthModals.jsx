'use client'
import useAuthStore from '@/store/useAuthStore';
import LoginModal from '@/components/organisms/LoginModal/LoginModal';
import CreateModal from '@/components/organisms/CreateModal/CreateModal';

export default function AuthModals() {
    const { isLoginOpen, isSignUpOpen, closeAll, openSignUp, openLogin } = useAuthStore();

    return (
        <>
            <LoginModal
                isOpen={isLoginOpen}
                onClose={closeAll}
                onSignUpOpen={openSignUp}
            />
            <CreateModal
                isOpen={isSignUpOpen}
                onClose={closeAll}
                onLoginOpen={openLogin}
            />
        </>
    );
}