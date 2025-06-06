import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiSearch, FiPlus, FiChevronRight } from "react-icons/fi";
import {
	useDeletePatient,
	useSearchPatients,
} from "../../../services/apis/patients/hook";
import PageHeader from "../../../components/PageHeader";
import { useAuthContext } from "../../../context/AuthProvider";
import { MdDelete } from "react-icons/md";

const PatientsList = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const { data, isLoading } = useSearchPatients({
		search,
		page,
		limit: 10,
		sort: "age",
	});
	const { mutateAsync } = useDeletePatient();

	const patients = data?.patients || [];

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

	return (
		<div className="bg-gray-50">
			<PageHeader
				title={"Patients"}
				className={"pt-5"}
			/>
			<div className="p-4 ">
				<div className="mb-6">
					<div className="relative">
						<FiSearch className="absolute left-3 top-4 bottom-3 text-gray-400" />
						<input
							type="text"
							placeholder="Search patients..."
							className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-2xl  0 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

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
							No patients found
						</p>
						<p className="text-xs">
							Try adjusting your search or add a new patient.
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{patients?.map((patient) => (
							<div
								key={patient._id}
								onClick={() =>
									navigate(`/patients/${patient.patientId}`)
								}
								className="bg-white rounded-xl p-4 shadow-sm flex items-center cursor-pointer hover:bg-gray-50 transition">
								<div className="bg-blue-100 p-2 rounded-full mr-3">
									<FiUser className="text-blue-600" />
								</div>
								<div className="flex-1 text-xs">
									<div className="flex justify-between items-center">
										<h2 className="font-bold text-sm text-gray-800">
											{patient.name}
										</h2>
										<span className="text-xs text-gray-500">
											{formatRelativeTime(
												patient.updatedAt
											)}
										</span>
									</div>
									<div className="flex justify-between items-center mt-1">
										<p className="text-sm text-gray-600">
											ID: {patient.patientId} •{" "}
											{patient.age}y • {patient.gender}
										</p>
										{user.role === "admin" ? (
											<button
												onClick={async (e) => {
													e.stopPropagation();

													const confirmDelete =
														window.confirm(
															`Are you sure you want to delete patient ${patient.name}?`
														);
													if (!confirmDelete) return;

													try {
														await mutateAsync(
															patient.patientId
														);
														toast.success(
															"Patient deleted successfully!"
														);
													} catch (error) {
														console.error(error);
														toast.error(
															"Failed to delete patient."
														);
													}
												}}>
												<MdDelete
													size={24}
													className="text-red-400 hover:text-red-600"
												/>
											</button>
										) : (
											<FiChevronRight className="text-gray-400" />
										)}
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

export default PatientsList;
