'use client'
import useAuthStore from '@/store/useAuthStore';
import LoginModal from '@/components/organisms/LoginModal/LoginModal';
import SignupModal from "@/components/organisms/SignupModal/SignupModal";

const AuthModals = () => {
    const { isLoginOpen, isSignUpOpen, closeAll, openSignUp, openLogin } = useAuthStore();

    return (
        <>
            <LoginModal
                isOpen={isLoginOpen}
                onClose={closeAll}
                onSignUpOpen={openSignUp}
            />
            <SignupModal
                isOpen={isSignUpOpen}
                onClose={closeAll}
                onLoginOpen={openLogin}
            />
        </>
    );
}

export default AuthModals;