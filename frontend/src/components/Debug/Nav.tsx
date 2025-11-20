import {Link, useLocation} from "react-router-dom";

export function Nav() {
    const location = useLocation()

    const linkClasses = (path: string) => 'px-3 py-1 rounded-full text-sm ' + (location.pathname === path? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200');

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex text-center  gap-2 bg-white/90 border border-gray-200 shadow-sm rounded-full px-3 py-2">
            <Link to="/" className={linkClasses('/')}>Chat</Link>
            <Link to="/new" className={linkClasses('/new')}>New Conversation</Link>
            <Link to="/invite/91820fedeefeç" className={linkClasses('/invite')}>Invite</Link>
        </div>
    )
}