'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

function AuthSync() {
    const { logout, isLoggedIn } = useAuthStore();

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'auth-storage' && !e.newValue) {
                logout();
            }
        };

        const stored = localStorage.getItem('auth-storage');
        if (!stored && isLoggedIn) {
            logout();
        }

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return null;
}

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <AuthSync />
            {children}
        </QueryClientProvider>
    );
}