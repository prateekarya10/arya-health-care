import { useParams, useNavigate } from "react-router-dom";
import {
	FiUser,
	FiCalendar,
	FiHeart,
	FiMail,
	FiPhone,
	FiHome,
	FiClock,
	FiThermometer,
	FiDroplet,
	FiActivity,
	FiEdit,
} from "react-icons/fi";
import { useGetPatientById } from "../../../services/apis/patients/hook";
import PageHeader from "../../../components/PageHeader";
import { useAuthContext } from "../../../context/AuthProvider";

const formatDate = (dateString) => {
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	return new Date(dateString).toLocaleDateString("en-US", options);
};

const SkeletonBox = ({ className = "" }) => (
	<div className={`bg-gray-200 animate-pulse rounded-lg ${className}`} />
);

const PatientDetail = () => {
	const { user } = useAuthContext();
	const { patientId } = useParams();
	const navigate = useNavigate();
	const { data, isLoading } = useGetPatientById(patientId || "");

	const handleEdit = () => {
		navigate(`/patients/update/${patientId}`);
	};

	if (isLoading) {
		return (
			<div className="p-4 bg-gray-50 min-h-screen space-y-4">
				<SkeletonBox className="h-20" />
				<SkeletonBox className="h-36" />
				<SkeletonBox className="h-36" />
				<SkeletonBox className="h-48" />
				<SkeletonBox className="h-48" />
			</div>
		);
	}

	if (!data) {
		return (
			<div className="p-4 text-center text-gray-500">
				Patient not found.
			</div>
		);
	}

	const {
		name,
		age,
		gender,
		patientId: id,
		contactInfo,
		vitals,
		appointments,
	} = data;

	return (
		<>
			<div>
				{/* Header */}
				<PageHeader title={"Patient Details"} className={"pt-5"} />
				<div className="p-4 bg-gray-50 ">
					<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-3 rounded-full">
									<FiUser className="text-blue-600 text-xl" />
								</div>
								<div>
									<h1 className="text-xs font-bold text-gray-800">
										{name}
									</h1>
									<p className="text-xs text-gray-500">
										ID: {id}
									</p>
								</div>
							</div>
							{user.role === "doctor" && (
								<button
									onClick={handleEdit}
									className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors">
									<FiEdit className="text-xs" />
									<span className="text-xs font-medium">
										Edit
									</span>
								</button>
							)}
						</div>
					</div>
					{/* Personal Info */}
					<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
						<h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
							<FiUser className="mr-2 text-blue-500" /> Personal
							Information
						</h2>
						<div className="space-y-3 text-xs">
							<div className="flex justify-between">
								<span className="text-gray-500">Age</span>
								<span className="font-medium">{age} years</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500">Gender</span>
								<span className="font-medium">{gender}</span>
							</div>
						</div>
					</div>

					{/* Contact Info */}
					<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
						<h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
							<FiMail className="mr-2 text-blue-500" /> Contact
							Information
						</h2>
						<div className="space-y-3 text-xs">
							{contactInfo?.phone && (
								<div className="flex items-center">
									<FiPhone className="text-gray-400 mr-2" />
									<span>{contactInfo.phone}</span>
								</div>
							)}
							{contactInfo?.email && (
								<div className="flex items-center">
									<FiMail className="text-gray-400 mr-2" />
									<span>{contactInfo.email}</span>
								</div>
							)}
							{contactInfo?.address && (
								<div className="flex items-start">
									<FiHome className="text-gray-400 mr-2 mt-1" />
									<span className="flex-1">
										{contactInfo.address}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Vitals */}
					{vitals && (
						<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
							<div className="flex justify-between items-center mb-3">
								<h2 className="text-sm font-semibold text-gray-800 flex items-center">
									<FiActivity className="mr-2 text-blue-500" />{" "}
									Vital Signs
								</h2>
								<span className="text-xs text-gray-400">
									Last updated:{" "}
									{formatDate(vitals.lastUpdated)}
								</span>
							</div>

							<div className="grid grid-cols-2 gap-3">
								{vitals.bloodPressure && (
									<div className="bg-blue-50 p-3 rounded-lg">
										<div className="flex items-center text-blue-600 mb-1">
											<FiDroplet className="mr-1" />
											<span className="text-xs font-medium">
												Blood Pressure
											</span>
										</div>
										<p className="font-bold text-gray-800">
											{vitals.bloodPressure}
										</p>
									</div>
								)}

								{vitals.temperature && (
									<div className="bg-green-50 p-3 rounded-lg">
										<div className="flex items-center text-green-600 mb-1">
											<FiThermometer className="mr-1" />
											<span className="text-xs font-medium">
												Temperature
											</span>
										</div>
										<p className="font-bold text-gray-800">
											{vitals.temperature}°C
										</p>
									</div>
								)}

								{vitals.pulse && (
									<div className="bg-purple-50 p-3 rounded-lg">
										<div className="flex items-center text-purple-600 mb-1">
											<FiHeart className="mr-1" />
											<span className="text-xs font-medium">
												Pulse
											</span>
										</div>
										<p className="font-bold text-gray-800">
											{vitals.pulse} bpm
										</p>
									</div>
								)}

								{vitals.weight && vitals.height && (
									<div className="bg-yellow-50 p-3 rounded-lg">
										<div className="flex items-center text-yellow-600 mb-1">
											<FiUser className="mr-1" />
											<span className="text-xs font-medium">
												Weight/Height
											</span>
										</div>
										<p className="font-bold text-gray-800">
											{vitals.weight}kg / {vitals.height}
											cm
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Appointments */}
					<div className="bg-white rounded-xl shadow-sm p-4">
						<h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
							<FiCalendar className="mr-2 text-blue-500" />{" "}
							 Appointment
						</h2>

						{appointments?.length === 0  ? (
							<p className="text-gray-500 text-center py-4 text-sm">
								No  appointments
							</p>
						) : (
							<div className="space-y-3">
								{appointments?.map((appointment, index) => (
									<div
										key={index}
										className="border rounded-lg p-3">
										<div className="flex justify-between items-start mb-2 text-xs">
											<div>
												<p className="font-bold text-gray-800 ">
													{appointment.doctor}
												</p>
												<p className="text-xs text-gray-500">
													{appointment.department}
												</p>
											</div>
											<span
												className={`px-2 py-1 text-xs rounded-full ${
													appointment.status ===
													"Scheduled"
														? "bg-blue-100 text-blue-800"
														: appointment.status ===
														  "Confirmed"
														? "bg-green-100 text-green-800"
														: "bg-gray-100 text-gray-800"
												}`}>
												{appointment.status}
											</span>
										</div>
										<div className="flex items-center text-xs text-gray-600 mb-1">
											<FiClock className="mr-1" />
											<span>
												{formatDate(appointment.date)}
											</span>
										</div>
										<p className="text-xs mt-2">
											<span className="text-gray-500">
												Reason:
											</span>{" "}
											{appointment.reason}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default PatientDetail;
