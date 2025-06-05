import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaUserInjured, FaUser } from "react-icons/fa";
import logoImage from "../assets/WelcomeLogo.png";

const BottomNav = () => {
	return (
		<nav className="fixed bottom-3 left-4 right-4 bg-[#2260FF] rounded-full border border-gray-300 shadow-md flex justify-between items-center h-16 md:hidden px-6 text-white z-50">
			{/* Left Group */}
			<div className="flex gap-6 items-center flex-1 justify-start pr-6">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex flex-col items-center text-xs ${
							isActive
								? "text-white"
								: "text-white/70 hover:text-white"
						}`
					}>
					<IoMdHome size={22} />
					<span>Home</span>
				</NavLink>

				<NavLink
					to="/patients"
					className={({ isActive }) =>
						`flex flex-col items-center text-xs ${
							isActive
								? "text-white"
								: "text-white/70 hover:text-white"
						}`
					}>
					<FaUserInjured size={22} />
					<span>Patients</span>
				</NavLink>
			</div>

			{/* Center Logo */}
			<div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
				<div className="w-[72px] h-[72px] bg-white rounded-full p-1 shadow-md">
					<div className="w-full h-full rounded-full border-2 border-[#2260FF] p-1">
						<img
							src={logoImage}
							alt="Logo"
							className="w-full h-full object-contain rounded-full border-2 border-white"
						/>
					</div>
				</div>
			</div>

			{/* Right Group */}
			<div className="flex gap-6 items-center flex-1 justify-end pl-6">
				<NavLink
					to="/team"
					className={({ isActive }) =>
						`flex flex-col items-center text-xs ${
							isActive
								? "text-white"
								: "text-white/70 hover:text-white"
						}`
					}>
					<HiOutlineUserGroup size={22} />
					<span>Team</span>
				</NavLink>

				<NavLink
					to="/profile"
					className={({ isActive }) =>
						`flex flex-col items-center text-xs ${
							isActive
								? "text-white"
								: "text-white/70 hover:text-white"
						}`
					}>
					<FaUser size={22} />
					<span>Profile</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default BottomNav;
