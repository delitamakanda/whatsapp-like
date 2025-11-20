interface Props {
    open: boolean;
    onClose:() => void;
}

export function AddParticipantsSheet({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <span className="font-semibold">Ajouter des membres</span>
                    <button onClick={onClose} className="text-gray-500 text-xl">
                        ×
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Rechercher parmi tes amis
                        </label>
                        <input
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none"
                            placeholder="Nom, pseudo…"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs uppercase tracking-wide text-gray-400">
                            Amis
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gray-200" />
                                <div>
                                    <div className="text-sm font-medium">Alex</div>
                                    <div className="text-xs text-gray-500">En ligne</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gray-200" />
                                <div>
                                    <div className="text-sm font-medium">Samir</div>
                                    <div className="text-xs text-gray-500">Vu il y a 2h</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="pt-2 border-t border-gray-200">
                        <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                            Inviter par email
                        </div>
                        <input
                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none"
                            placeholder="email@exemple.com"
                        />
                    </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        className="flex-1 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                    >
                        Valider
                    </button>
                </div>
            </div>
        </div>
    )
}