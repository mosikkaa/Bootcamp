'use client'
import useAuthStore from '@/store/useAuthStore';
import LoginModal from '@/components/organisms/LoginModal/LoginModal';
import SignupModal from "@/components/organisms/SignupModal/SignupModal";
import ProfileModal from "@/components/organisms/ProfileModal/ProfileModal";
import FeedbackModal from "@/components/organisms/FeedbackModal/FeedbackModal";

const AuthModals = () => {
    const { isLoginOpen, isSignUpOpen, isProfileOpen, closeAll, closeProfile, openLogin, openSignUp,isFeedbackOpen,closeFeedback} = useAuthStore();

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
            <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
            <FeedbackModal isOpen={isFeedbackOpen} onClose={closeFeedback} />
        </>
    );
}

export default AuthModals;