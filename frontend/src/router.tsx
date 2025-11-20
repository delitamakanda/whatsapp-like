import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useAuth } from "./hooks/useAuth.ts";
import { LoginPage } from "./pages/LoginPage.tsx";
import { SignupPage } from "./pages/SignupPage.tsx";
import { ChatPage } from "./pages/ChatPage.tsx";
import { NewConversationPage} from "./pages/NewConversationPage.tsx";
import { InvitePage } from "./pages/InvitePage.tsx";
import { SignupFromInvitePage } from "./pages/SignupFromInvitePage.tsx";
import { Nav } from "./components/Debug/Nav.tsx";
import type {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace state={{ from: location.pathname + location.search }} />
}

export function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/invite/:token" element={
                        <InvitePage />
                } />
                <Route path="/new" element={<ProtectedRoute><NewConversationPage /></ProtectedRoute>} />

                <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

                <Route path="/signup/invite/:token" element={
                        <SignupFromInvitePage />
                } />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
            {import.meta.env.VITE_NODE_ENV === 'development' && <Nav />}
        </>
    )
}
