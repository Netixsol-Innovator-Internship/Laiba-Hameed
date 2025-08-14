import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";
import LoadingSpinner from "./shared/spiner";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const getProfileDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data.data);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getProfileDetails(); }, []);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        setDeletingAccount(true);
        try {
            await api.delete("/auth/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            logout();
            navigate("/signup");
        } catch (err) {
            console.error(err);
            alert("Failed to delete account. Please try again.");
        } finally {
            setDeletingAccount(false);
        }
    };

    if (loading) return (
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex items-center justify-center min-h-64">
            <p className="text-lg sm:text-xl lg:text-2xl font-medium animate-pulse" style={{ color: '#457b9d' }}>
                <Loader />
            </p>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
            <h1 className="text-2xl font-bold mb-6 sm:mb-8 lg:mb-10 text-[#1d3557]">
                Your Profile
            </h1>

            {profile ? (
                <div className="mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4 lg:space-y-5">
                    <p className="text-base sm:text-lg lg:text-xl text-[#1d3557]">
                        <strong className="font-semibold">Name:</strong>
                        <span className="ml-2 text-[#457b9d]">{profile.name}</span>
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-[#1d3557]">
                        <strong className="font-semibold">Email:</strong>
                        <span className="ml-2 text-[#457b9d]">{profile.email}</span>
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-[#1d3557]">
                        <strong className="font-semibold">Joined:</strong>
                        <span className="ml-2 text-[#457b9d]">{new Date(profile.createdAt).toLocaleDateString()}</span>
                    </p>
                </div>
            ) : (
                <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 lg:mb-12 text-[#1d3557]">
                    Unable to load profile details.
                </p>
            )}

            {/* Danger Zone */}
            <div className="mt-10 sm:mt-12 lg:mt-16 p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-[#e63946] bg-[#f1faee] transition-all ease-in-out duration-300">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 lg:mb-6 text-[#e63946]">
                    Danger Zone
                </h2>
                <p className="mb-6 sm:mb-8 lg:mb-10 text-base sm:text-lg lg:text-xl leading-relaxed text-[#e63946]">
                    Deleting your account is permanent and cannot be undone. All your tasks will be lost.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount}
                    className={`px-6 py-2 rounded-lg flex items-center justify-center font-medium text-base text-[#f1faee] transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    style={{ backgroundColor: '#e63946' }}
                    onMouseEnter={(e) => !deletingAccount && (e.target.style.backgroundColor = '#1d3557')}
                    onMouseLeave={(e) => !deletingAccount && (e.target.style.backgroundColor = '#e63946')}
                >
                    {deletingAccount ? <LoadingSpinner/> : "Delete Account"}
                </button>
            </div>
        </div>

    );
};

export default Profile;
