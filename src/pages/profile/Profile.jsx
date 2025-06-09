import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiShield, FiCalendar } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import toast from "react-hot-toast";

const Profile = () => {
	const { user, logout } = useAuthContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			if (refreshToken) {
				await logout.mutateAsync({ refreshToken });
			}
			toast.success("Logged out successfully");
			navigate("/login");
		} catch (error) {
			console.error(error);
			toast.error("Logout failed");
		}
	};

	const roleColors = {
		admin: "bg-purple-100 text-purple-800",
		doctor: "bg-blue-100 text-blue-800",
		nurse: "bg-green-100 text-green-800",
		receptionist: "bg-orange-100 text-orange-800",
	};

	const roleIcons = {
		admin: <FiShield className="w-5 h-5" />,
		doctor: <FiUser className="w-5 h-5" />,
		nurse: <FiUser className="w-5 h-5" />,
		receptionist: <FiCalendar className="w-5 h-5" />,
	};

	return (
		<>
			<PageHeader
				title="My Profile"
				className="pt-5"
				textSize="text-lg"
			/>
			<div className=" bg-gray-50 p-4 relative">
				<div className="max-w-md mx-auto">
					<div className="overflow-hidden mb-6">
						<div className="p-6">
							<div className="flex flex-col items-center text-center gap-y-5 mb-6">
								<div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
									{user?.username?.charAt(0).toUpperCase() ||
										"U"}
								</div>
								<div>
									<h2 className="text-lg font-bold text-gray-800 mb-4">
										{user?.username || "User"}
									</h2>
									<div
										className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											roleColors[user?.role] ||
											"bg-gray-100 text-gray-800"
										}`}>
										{roleIcons[user?.role]}
										<span className="ml-1 capitalize">
											{user?.role || "user"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-center w-auto max-w-56 mx-auto">
					<button
						onClick={handleLogout}
						disabled={logout?.isPending}
						className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-500 text-white font-medium rounded-full shadow hover:bg-red-600 transition disabled:opacity-50 text-xs ">
						<FiLogOut className="w-5 h-5" />
						<span>{logout?.isPending ? "Logging out..." : "Logout"}</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default Profile;
