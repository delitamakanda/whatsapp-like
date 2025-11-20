import {type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {login} from "../api/auth";
import { useAuthStore } from "../store/authStore";

type LocationState = {
    from?: string;
};

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setToken = useAuthStore((s) => s.setAccessToken);
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state || {}) as LocationState;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await login({ email: username, pwd: password });

            setToken(res.access);

            const redirectTo = state.from || "/";
            navigate(redirectTo, { replace: true });
        } catch (err) {
            console.error(err);
            setError("Identifiants incorrects ou compte inexistant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-sm border border-gray-200 p-6">
                <h1 className="text-lg font-semibold mb-1">Se connecter</h1>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Nom d'utilisateur
                        </label>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-full text-white font-semibold ${
                            loading ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Connexion…" : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}
