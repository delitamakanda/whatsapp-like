import { useAuthStore } from '../store/authStore';

export function useAuth() {
    const { isAuthenticated, accessToken, setAccessToken } = useAuthStore.getState();
    return { isAuthenticated, accessToken, setAccessToken };
}