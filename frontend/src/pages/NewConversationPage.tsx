import { NewConversationCard } from "../components/NewConversationCard/NewConversationCard";
import {useState} from "react";
import {TopBar} from "../components/AppShell/TopBar.tsx";
import {EmailInviteField} from "../components/EmailInviteField/EmailInviteField.tsx";
import {TextArea} from "../components/TextArea/TextArea.tsx";
import {PrimaryButton} from "../components/PrimaryButton/PrimaryButton.tsx";


export function NewConversationPage() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [link, setLink] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <TopBar title="Nouvelle conversation" />
            <div className="flex-1 flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md">
                    <NewConversationCard>
                        <h2 className="text-lg font-semibold">Inviter quelqu'un</h2>
                        <p className="text-sm text-gray-500">
                            Invite une personne qui n'est pas encore sur l'app et commence la
                            conversation immédiatement.
                        </p>
                        <div className="space-y-3">
                            <EmailInviteField value={email} onChange={setEmail} />
                            <TextArea
                                value={message}
                                onChange={setMessage}
                                placeholder="Premier message (optionnel)"
                            />
                            <PrimaryButton
                                disabled={!email}
                                onClick={() => {
                                    setLink("https://app.example.com/invite/1234-token");
                                }}
                            >
                                Créer la conversation
                            </PrimaryButton>
                        </div>


                        {link && (
                            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm">
                                <div className="font-medium mb-1">Conversation créée</div>
                                <p className="text-gray-600 mb-1">Partage ce lien à ton ami·e :</p>
                                <code className="block break-all text-xs bg-white px-2 py-1 rounded border border-gray-200">
                                    {link}
                                </code>
                            </div>
                        )}
                    </NewConversationCard>
                </div>
            </div>
        </div>
    )
}