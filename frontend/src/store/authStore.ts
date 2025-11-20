import { create } from 'zustand';

type AuthState  = {
    isAuthenticated: boolean;
    accessToken?: string | null;
    setAccessToken: (token: string) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    setAccessToken: (token) => set((state) => ({...state, isAuthenticated: !!token, accessToken: token })),
}))