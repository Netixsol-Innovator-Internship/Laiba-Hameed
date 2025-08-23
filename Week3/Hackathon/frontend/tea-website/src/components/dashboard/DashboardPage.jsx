import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/auth/authSlice";

const DashboardPage = () => {
    const user = useSelector(getUser);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-300">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <p>
                        Welcome back! You're logged in as <strong>{user?.role}</strong>
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-3 py-1 border border-black hover:bg-black hover:text-white transition"
                    >
                        Go to Store
                    </button>
                </div>
            </header>

            {/* Sidebar / Tabs */}
            <div className="flex border-b border-gray-300">
                <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) =>
                        `px-4 py-2 border-b-2 ${isActive ? "border-black font-semibold" : "border-transparent hover:border-black"
                        }`
                    }
                >
                    Product Management
                </NavLink>
                <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                        `px-4 py-2 border-b-2 ${isActive ? "border-black font-semibold" : "border-transparent hover:border-black"
                        }`
                    }
                >
                    User Management
                </NavLink>
            </div>

            {/* Outlet will render child routes */}
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
