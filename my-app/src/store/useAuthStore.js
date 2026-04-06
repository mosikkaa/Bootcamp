import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoginOpen: false,
    isSignUpOpen: false,
    isSidebarOpen: false,
    openLogin: () => set({ isLoginOpen: true, isSignUpOpen: false }),
    openSignUp: () => set({ isSignUpOpen: true, isLoginOpen: false }),
    closeAll: () => set({ isLoginOpen: false, isSignUpOpen: false }),
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
}));

export default useAuthStore;