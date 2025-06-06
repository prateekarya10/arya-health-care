import {
	FaHeartbeat,
	FaProcedures,
	FaUserNurse,
	FaClipboardList,
} from "react-icons/fa";
import { MdOutlineVaccines } from "react-icons/md";
import { useGetNurseStats } from "../../../services/apis/patients/hook";
import { useNavigate } from "react-router-dom";

const NurseHome = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetNurseStats();

	// Use API data or fallback to 0 if not loaded yet
	const stats = {
		patientsToCheck: data?.patientsToCheck ?? 0,
		vitalsUpdatedToday: data?.vitalsUpdatedToday ?? 0,
		totalPatientsAssigned: data?.totalPatientsAssigned ?? 0,
	};

	const currentDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	if (isLoading) {
		return <div className="p-4">Loading nurse stats...</div>;
	}

	if (isError) {
		return (
			<div className="p-4 text-red-600">
				Error loading stats: {error?.message || "Unknown error"}
			</div>
		);
	}

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			{/* Header with greeting and date */}
			<div className="mb-6">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-lg font-bold text-gray-800">
							Welcome, Nurse
						</h1>
						<p className="text-gray-500 mt-1 text-xs">
							{currentDate}
						</p>
					</div>
					<div className="bg-blue-100 p-2 rounded-full">
						<FaUserNurse className="text-blue-600 text-lg" />
					</div>
				</div>
				<p className="text-gray-600 mt-2 text-xs">
					Your patient vitals updates and tasks
				</p>
			</div>

			{/* Stats Cards - 2 columns */}
			<div className="grid grid-cols-2 gap-3 mb-6">
				{/* Patients to Check */}
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 flex items-start">
					<div className="bg-red-100 p-2 rounded-lg mr-3">
						<FaHeartbeat className="text-red-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">
							Patients to Check
						</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.patientsToCheck}
						</h3>
					</div>
				</div>

				{/* Vitals Updated Today */}
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 flex items-start">
					<div className="bg-green-100 p-2 rounded-lg mr-3">
						<FaProcedures className="text-green-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Vitals Updated</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.vitalsUpdatedToday}
						</h3>
					</div>
				</div>

				{/* Total Patients Assigned */}
				<div className="bg-white p-4 py-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-start col-span-2">
					<div className="bg-blue-100 p-2 rounded-lg mr-3">
						<FaClipboardList className="text-blue-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Total Patients</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.totalPatientsAssigned}
						</h3>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-white rounded-xl shadow-sm p-5">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 gap-3">
					<button
						onClick={() => navigate("/patients/vitals")}
						className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition text-xs">
						<FaHeartbeat className="mr-2" />
						Update Vitals
					</button>
				</div>
			</div>
		</div>
	);
};

export default NurseHome;
