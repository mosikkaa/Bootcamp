import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoginOpen: false,
    isSignUpOpen: false,
    openLogin: () => set({ isLoginOpen: true, isSignUpOpen: false }),
    openSignUp: () => set({ isSignUpOpen: true, isLoginOpen: false }),
    closeAll: () => set({ isLoginOpen: false, isSignUpOpen: false }),
}));

export default useAuthStore;