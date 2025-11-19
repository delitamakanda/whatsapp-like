interface Props {
    sidebar: any;
    content: any;
}

export function AppShell({ sidebar, content }: Props) {
    return (
        <div className="h-screen w-screen bg-gray-100 flex text-gray-900">
            {sidebar}
            {content}
        </div>
    )
}