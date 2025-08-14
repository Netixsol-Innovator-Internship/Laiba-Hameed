import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

// Main Navbar Component
const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleHome = () => navigate("/");

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <nav className="bg-[#1d3557] text-[#f1faee] shadow-lg transition-all ease-in-out duration-300 py-2">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo / Title */}
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-[#a8dadc] transition-all ease-in-out duration-300 transform hover:scale-105">
                        <button onClick={handleHome} className="cursor-pointer">
                            Task Manager
                        </button>
                    </h1>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-[#e63946] hover:bg-[#d62d20] cursor-pointer font-medium transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 rounded-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="px-6 py-2 bg-[#457b9d] hover:bg-[#a8dadc] hover:text-[#1d3557] cursor-pointer font-medium transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 rounded-lg"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
