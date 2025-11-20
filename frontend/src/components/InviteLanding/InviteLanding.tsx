import {PrimaryButton} from "../PrimaryButton/PrimaryButton.tsx";

interface Props {
    inviterName: string;
    onLogin: () => void;
    onSignup: () => void;
    already: boolean;
    onJoin: () => void;
}

export function InviteLanding({ inviterName, onLogin, onSignup, already, onJoin }: Props) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
            <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-sm border border-gray-200">
                <h1 className="text-xl font-semibold mb-2">{inviterName} t'invite 👋</h1>
                <p className="text-gray-600 mb-4">
                    Rejoins la conversation pour voir les messages.
                </p>


                {!already ? (
                    <>
                        <PrimaryButton onClick={onLogin}>Se connecter</PrimaryButton>
                        <div className="h-3"></div>
                        <PrimaryButton onClick={onSignup}>Créer un compte</PrimaryButton>
                    </>
                ) : (
                    <PrimaryButton onClick={onJoin}>Rejoindre la conversation</PrimaryButton>
                )}
            </div>
        </div>
    );
}