import {useState, useEffect} from "react";
import {InviteLanding} from "../components/InviteLanding/InviteLanding.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import api from "../api/client.ts";

export function InvitePage() {
    const {  token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [inviterName, setInviterName] = useState<string>('Unknown');

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchInviter = async () => {
            try {
                const response = await api.get(`/accounts/invitations/${token}`);
                setInviterName(response.data.inviter.username);
            } catch (error: any) {
                setErrorMessage(`Failed to fetch invitation details ${error.message}`);
                setLoading(false);
            }
        }
        fetchInviter();

    }, [token]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">Loading...</div>;
    }

    if (errorMessage) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm text-center">
                <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                >
                    Aller à la page de connexion
                </button>
            </div>
        </div>;
    }
    
    return (
        <InviteLanding inviterName={inviterName} onLogin={() => navigate('/login', { state: { from: `/invite/${token}`}})} onSignup={() => navigate(`/signup`)} already={isAuthenticated} onJoin={()=> navigate(`/invite/${token}/signup`)} />
    )
}