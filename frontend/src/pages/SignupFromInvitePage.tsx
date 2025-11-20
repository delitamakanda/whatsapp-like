// src/pages/SignupFromInvitePage.tsx
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {inviteUser, acceptInvit, signup} from "../api/auth";
import { useAuthStore } from "../store/authStore";

type InvitationDetail = {
    email: string | null;
    inviter: { id: number; username: string; email: string | null } | null;
    status: string;
};

export function SignupFromInvitePage() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const setToken = useAuthStore((s) => s.setAccessToken);

    const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
    const [loadingInvite, setLoadingInvite] = useState(true);
    const [errorInvite, setErrorInvite] = useState<string | null>(null);

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        const fetchInvite = async () => {
            try {
                const res = await inviteUser(token);
                setInvitation(res);
            } catch (err) {
                console.error(err);
                setErrorInvite("Invitation invalide ou expirée.");
            } finally {
                setLoadingInvite(false);
            }
        };
        fetchInvite();
    }, [token]);

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (!invitation || !invitation.email || !token) return;

        setErrorSubmit(null);
        setSubmitting(true);

        try {
            const signupRes = await signup(
                {
                    email: invitation.email,
                    pwd: password,
                    username: username,
                }
            )

            const access = signupRes.data.access;
            setToken(access);

            const acceptRes = await acceptInvit(token);

            // Si tu renvoies un conversation_id dans acceptRes.data, tu peux rediriger direct
            const conversationId = (acceptRes as any).conversation_id;

            if (conversationId) {
                navigate(`/conversation/${conversationId}`, { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.error(err);
            setErrorSubmit(
                "Impossible de créer le compte ou d'accepter l'invitation."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingInvite) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
                Chargement de l'invitation…
            </div>
        );
    }

    if (errorInvite || !invitation || !invitation.email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm text-center">
                    <p className="text-sm text-red-600 mb-2">
                        {errorInvite || "Invitation invalide."}
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                    >
                        Aller à la page de connexion
                    </button>
                </div>
            </div>
        );
    }

    const inviterName = invitation.inviter?.username || "Un ami";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
                <h1 className="text-lg font-semibold mb-1">
                    {inviterName} t'invite à discuter
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                    Crée ton compte pour rejoindre la conversation.
                </p>

                <form onSubmit={handleSignup} className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                            value={invitation.email}
                            disabled
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Cet email vient de l'invitation, il ne peut pas être modifié.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Nom (optionnel)
                        </label>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
                            placeholder="Ton prénom ou pseudo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
                            placeholder="Choisis un mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorSubmit && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                            {errorSubmit}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !password}
                        className={`w-full py-2 rounded-full text-white font-semibold ${
                            submitting ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {submitting
                            ? "Création du compte…"
                            : "Créer mon compte et rejoindre"}
                    </button>
                </form>
            </div>
        </div>
    );
}
