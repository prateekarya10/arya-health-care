import { useNavigate } from "react-router-dom";
import { FiUser, FiPlus, FiChevronRight, FiEdit } from "react-icons/fi";
import { usePendingVitalsPatients } from "../../../services/apis/patients/hook";
import PageHeader from "../../../components/PageHeader";

const VitalsList = () => {
	const navigate = useNavigate();
	const { data, isLoading } = usePendingVitalsPatients();

	const patients = data || [];

	const formatRelativeTime = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
		if (diffInDays === 0) return "Today";
		if (diffInDays === 1) return "Yesterday";
		if (diffInDays < 7) return `${diffInDays} days ago`;
		if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
		return `${Math.floor(diffInDays / 30)} months ago`;
	};

	const handleEditClick = (e, patientId) => {
		e.stopPropagation();
		navigate(`/patients/vitals/${patientId}`);
	};

	return (
		<div className="bg-gray-50">
			<PageHeader
				title={"Pending Vitals"}
				className={"pt-5"}
				textSize=""
			/>
			<div className="p-4">
				{isLoading ? (
					<div className="space-y-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="bg-white p-4 rounded-xl shadow-sm flex items-center animate-pulse">
								<div className="bg-blue-100 p-2 rounded-full mr-3">
									<FiUser className="text-blue-300" />
								</div>
								<div className="flex-1 space-y-2">
									<div className="w-2/3 h-4 bg-gray-200 rounded"></div>
									<div className="w-1/2 h-3 bg-gray-100 rounded"></div>
								</div>
							</div>
						))}
					</div>
				) : patients.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						<img
							src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
							alt="No data"
							className="mx-auto w-24 h-24 opacity-70 mb-4"
						/>
						<p className="text-sm font-semibold">
							No patients requiring vitals
						</p>
						<p className="text-xs">
							All patients have updated vitals records.
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{patients?.map((patient) => (
							<div
								key={patient._id}
								onClick={() =>
									navigate(
										`/vitals/${patient.patientId}/record`
									)
								}
								className="bg-white rounded-xl p-4 shadow-sm flex items-center cursor-pointer hover:bg-gray-50 transition">
								<div className="bg-orange-100 p-2 rounded-full mr-3">
									<FiUser className="text-orange-600" />
								</div>
								<div className="flex-1 text-xs">
									<div className="flex justify-between items-center">
										<h2 className="font-bold text-sm text-gray-800">
											{patient.name}
										</h2>
										<span className="text-xs text-gray-500">
											{patient.lastVitalDate
												? `Last vitals: ${formatRelativeTime(
														patient.lastVitalDate
												  )}`
												: "No vitals recorded"}
										</span>
									</div>
									<div className="flex justify-between items-center mt-1">
										<p className="text-sm text-gray-600">
											ID: {patient.patientId} • Phone:{" "}
											{patient.contactInfo?.phone}
										</p>
										<div className="flex items-center gap-2">
											<button
												onClick={(e) =>
													handleEditClick(
														e,
														patient.patientId
													)
												}
												className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition"
												title="Edit patient">
												<FiEdit className="text-lg" />
											</button>
											<FiChevronRight className="text-gray-400" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<button
					onClick={() => navigate("/patients/new")}
					className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
					<FiPlus className="text-xl" />
				</button>
			</div>
		</div>
	);
};

export default VitalsList;
