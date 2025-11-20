import api from './client';

export async function signup(payload: {
    email: string, pwd: string, username?: string
}) {
    const response = await api.post('/accounts/signup/', payload);
    return response.data;
}

export async function login(payload: {
    email: string, pwd: string
}) {
    const response = await api.post('/accounts/auth/token/', payload);
    return response.data;
}

export async function inviteUser(token: string) {
    const response = await api.get(`/accounts/invitations/${token}/`);
    return response.data;
}

export async function acceptInvit(token: string) {
    const response = await api.post(`/accounts/invitations/${token}/accept/`);
    return response.data;
}
