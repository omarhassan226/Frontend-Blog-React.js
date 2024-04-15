import React, { useState, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function NavBar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { isLoggedIn, setIsLoggedIn, isDarkMode, setIsDarkMode } = useAuth(); // Destructure isDarkMode and setIsDarkMode
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const isLoggedIn = !!accessToken; // Convert to boolean
        setIsLoggedIn(isLoggedIn); // Set isLoggedIn state
    }, []); // Run only once on component mount

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("_id");
        setIsLoggedIn(false);
        navigate("/login");
    };

    // Toggle dark mode
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`navbar ${isDarkMode ? "bg-slate-800" : "bg-gray-500"} py-4`}>
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Primary Menu */}
                <div className="flex items-center">
                    {/* Logo */}
                    <Link to="/" className={`flex items-center text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"} font-bold`}>
                        <PaperAirplaneIcon className="h-6 w-6 text-primary" />
                        <span className="ml-2">Omar.H</span>
                    </Link>
                    {/* Primary Menu */}
                    <div className="hidden lg:flex gap-8 ml-8">
                        <Link to="/" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Home
                        </Link>
                        <Link to="/addPost" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Add Post
                        </Link>
                    </div>
                </div>
                {/* Toggle Dark Mode */}
                <button onClick={toggleMode} className="focus:outline-none">
                    {isDarkMode ? <SunIcon className="h-6 w-6 text-slate-200" />  : <MoonIcon className={`h-6 w-6 {text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`} />}
                </button>
                {/* Sign up and Login */}
                {!isLoggedIn && (
                    <div className="flex gap-6 items-center">
                        <Link to="/login" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Login
                        </Link>
                        <Link to="/register" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Sign up
                        </Link>
                    </div>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                        Logout
                    </button>
                )}
                {/* Mobile navigation toggle */}
                <div className="lg:hidden flex items-center">
                    <button onClick={() => setToggleMenu(!toggleMenu)}>
                        <Bars3Icon className={`h-6 {text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`} />
                    </button>
                </div>
            </nav>
            {/* Secondary Menu */}
            <div className="flex justify-center items-center">
                <div className="flex gap-6 items-center">
                    <div className="hidden xs:flex items-center gap-10">
                        {/* Additional menu items */}
                    </div>
                </div>
            </div>
            {/* Mobile navigation */}
            <div className={`${toggleMenu ? "block" : "hidden"} lg:hidden mt-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-300"} rounded-md`}>
                <div className="px-4 py-2">
                    <div className="flex flex-col gap-4">
                        <Link to="#" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Features
                        </Link>
                        <Link to="#" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Pricing
                        </Link>
                        <Link to="#" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Download
                        </Link>
                        <Link to="#" className={`{text ${isDarkMode
                        ? "text-white bg-slate-800"
                        : "text-gray-800 bg-gray-500"}`}>
                            Classic
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
