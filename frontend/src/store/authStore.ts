import { create } from 'zustand';

interface AuthState {
    is_authenticated: boolean;
    access_token?: string | null;
    set_access_token: (token: string) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
    access_token: null,
    is_authenticated: false,
    set_access_token: (token) => set((state) => ({...state, is_authenticated: !!token, access_token: token })),
}))