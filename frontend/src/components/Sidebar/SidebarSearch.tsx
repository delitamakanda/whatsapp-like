
export function SidebarSearch() {
    return (
        <div className="p-3 bg-white border-b border-gray-200">
            <input
                type="text"
                placeholder="Rechercher"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
        </div>
    );
}