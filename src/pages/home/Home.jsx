import React from "react";
import NurseHome from "./components/NurseHome";
import DoctorHome from "./components/DoctorHome";
import ReceptionistHome from "./components/ReceptionistHome";
import { useAuthContext } from "../../context/AuthProvider";
import AdminHome from "./components/AdminHome";
        // appointments: [
        //     {
        //         date: "",
        //         department: "",
        //         doctor: "",
        //         reason: "",
        //         status: "Scheduled",
        //     },
        // ],
const Home = () => {
	const { user } = useAuthContext();

	if (!user) return null;

	return (
		<div>
			{user.role === "admin" && <AdminHome />}
			{user.role === "nurse" && <NurseHome />}
			{user.role === "doctor" && <DoctorHome />}
			{user.role === "receptionist" && <ReceptionistHome />}
			{!["nurse", "doctor", "receptionist","admin"].includes(user.role) && (
				<p>Unauthorized role or no specific UI available</p>
			)}
		</div>
	);
};

export default Home;
