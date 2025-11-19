interface Props {
    children: any;
}

export function Sidebar({ children }: Props) {
    return (
        <aside className="hidden md:flex flex-col w-80 bg-white border-r border-gray-200">
            {children}
        </aside>
    );
}