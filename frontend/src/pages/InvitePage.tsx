import {useState, useEffect} from "react";
import {InviteLanding} from "../components/InviteLanding/InviteLanding.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import api from "../api/client.ts";
import {ErrorBoundary} from "react-error-boundary";

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
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <div>
                    <h1 className="text-xl font-bold text-center mb-4">Invitation reçue</h1>
                    <p className="text-sm text-center">Merci de vous connecter avec votre compte pour accéder à votre groupe WhatsApp</p>
                    <button
                        onClick={() => navigate('/login', { state: { from: `/invite/${token}`}})}
                        className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                    >
                        Se connecter
                    </button>
                    <button
                        onClick={() => navigate(`/signup`)}
                        className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                    >
                        Créer un compte
                    </button>
                </div>
            </ErrorBoundary>
            <InviteLanding inviterName={inviterName} onLogin={() => navigate('/login', { state: { from: `/invite/${token}`}})} onSignup={() => navigate(`/signup`)} already={isAuthenticated} onJoin={()=> navigate(`/invite/${token}/signup`)} />
        </>
    )
}

function ErrorFallback({ error, resetErrorBoundary }: {
    error: Error;
    resetErrorBoundary: () => void;
}) {
    return (
        <div role="alert">
            <h2>Something went wrong</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}