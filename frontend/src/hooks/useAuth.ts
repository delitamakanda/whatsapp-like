import { useAuthStore } from '../store/authStore';

export function useAuth() {
    const { is_authenticated, access_token } = useAuthStore.getState();
    return { is_authenticated, access_token };
}