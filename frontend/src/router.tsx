import {Navigate, Route, Routes} from "react-router-dom";
import { useAuth } from "./hooks/useAuth.ts";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ChatPage } from "./pages/ChatPage.tsx";
import { Nav } from "./components/Debug/Nav.tsx";

export function AppRouter() {
    const { is_authenticated } = useAuth();
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={!is_authenticated? <ChatPage /> : <Navigate to='/login' replace /> } />

                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
            {import.meta.env.VITE_NODE_ENV === 'development' && <Nav />}
        </>
    )
}
