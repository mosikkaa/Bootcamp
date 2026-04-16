import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isLoginOpen: false,
            isSignUpOpen: false,
            isSidebarOpen: false,
            isProfileOpen: false,
            isFeedbackOpen: false,
            openLogin: () => set({ isLoginOpen: true, isSignUpOpen: false }),
            openSignUp: () => set({ isSignUpOpen: true, isLoginOpen: false }),
            openProfile: () => set({ isProfileOpen: true }),
            closeAll: () => set({ isLoginOpen: false, isSignUpOpen: false, isProfileOpen: false }),
            openSidebar: () => set({ isSidebarOpen: true }),
            closeSidebar: () => set({ isSidebarOpen: false }),
            closeProfile: () => set({ isProfileOpen: false }),
            openFeedback: (type,data=null) => set({
                isFeedbackOpen: true,
                feedbackType: type,
                feedbackData: data
            }),
            closeFeedback: () => set({
                isFeedbackOpen: false,
                feedbackType: null,
                feedbackData: null
            }),
            feedbackType: null,

            token: null,
            user: null,
            isLoggedIn: false,
            login: (data) => set({
                token: data.token,
                user: data.user,
                isLoggedIn: true,
            }),
            logout: () => set({
                token: null,
                user: null,
                isLoggedIn: false,
            }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);

export default useAuthStore;