import {useState} from "react";
import {InviteLanding} from "../components/InviteLanding/InviteLanding.tsx";

export function InvitePage() {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState<boolean>(false);
    
    return (
        <InviteLanding inviterName="Délita" onLogin={() => setAlreadyLoggedIn(true)} onSignup={() => setAlreadyLoggedIn(false)} already={alreadyLoggedIn} onJoin={()=> console.log('join')} />
    )
}