import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow w-full">
            <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 items-center">
                    <Link to="/dashboard" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <img
                            src="https://nicolafoundation.com/img/h2.png"
                            alt="Nicola Foundation"
                            className="h-8 w-auto"
                        />
                        <span className="font-bold text-lg text-blue-700">Nicola Foundation</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open main menu"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8 items-center">
                    <Link to="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-blue-700">Dashboard</Link>
                    {(role === "Project Manager" || role === "Super Admin") && (
                        <Link to="/sponsors" className="text-sm font-semibold text-gray-900 hover:text-blue-700">Sponsors</Link>
                    )}
                    {(role === "Project Manager" || role === "Admin" || role === "Super Admin") && (
                        <Link to="/projects" className="text-sm font-semibold text-gray-900 hover:text-blue-700">Projects</Link>
                    )}
                    {(role === "Project Manager" || role === "Admin" || role === "Super Admin") && (
                        <Link to="/mappings" className="text-sm font-semibold text-gray-900 hover:text-blue-700">Mappings</Link>
                    )}
                    <button
                        onClick={logout}
                        className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-semibold text-white"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-30">
                    <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Nicola Foundation"
                                    className="h-8 w-auto"
                                />
                                <span className="font-bold text-lg text-blue-700">Nicola Foundation</span>
                            </Link>
                            <button
                                type="button"
                                className="rounded-md p-2.5 text-gray-700"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Link to="/dashboard" className="text-base font-semibold text-gray-900 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            {(role === "Project Manager" || role === "Super Admin") && (
                                <Link to="/sponsors" className="text-base font-semibold text-gray-900 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Sponsors</Link>
                            )}
                            {(role === "Project Manager" || role === "Admin" || role === "Super Admin") && (
                                <Link to="/projects" className="text-base font-semibold text-gray-900 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Projects</Link>
                            )}
                            {(role === "Project Manager" || role === "Admin" || role === "Super Admin") && (
                                <Link to="/mappings" className="text-base font-semibold text-gray-900 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Mappings</Link>
                            )}
                            <button
                                onClick={() => { setMenuOpen(false); logout(); }}
                                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-base font-semibold text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}