interface Props {
    children: any;
}

export function SidebarHeader({ children }: Props) {
    return (
        <div className="px-4 py-3 border-b border-gray-200 bg-white font-semibold text-lg">
            {children}
        </div>
    );
}