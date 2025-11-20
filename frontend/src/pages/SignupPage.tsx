import { useState } from "react";
import { signup } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const setToken = useAuthStore((s) => s.setAccessToken);
    const navigate = useNavigate();

    const handleSignup = async () => {
        const data = await signup({ email, pwd: password, username });
        setToken(data.access); // auto-login
        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm">
                <h1 className="text-lg font-semibold mb-4">Créer un compte</h1>

                <input
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    placeholder="Nom (optionnel)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                    Créer mon compte
                </button>
            </div>
        </div>
    );
}
