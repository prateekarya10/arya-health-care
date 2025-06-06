import { useNavigate } from "react-router-dom";
import {FiUser,FiPlus,FiChevronRight,FiEdit,FiCalendar,FiClock} from "react-icons/fi";
import { useTodaysAppointments } from "../../../services/apis/patients/hook";
import PageHeader from "../../../components/PageHeader";
import { format, parseISO } from "date-fns";

const AppointmentsList = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useTodaysAppointments();

	const appointments = data || [];

	const formatAppointmentTime = (dateString) => {
		const date = parseISO(dateString);
		return format(date, "h:mm a");
	};

	const formatAppointmentDate = (dateString) => {
		const date = parseISO(dateString);
		return format(date, "MMM dd, yyyy");
	};

	const handleEditClick = (e, patientId) => {
		e.stopPropagation();
		navigate(`/appointments/update/${patientId}`);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Scheduled":
				return "bg-blue-100 text-blue-800";
			case "Completed":
				return "bg-green-100 text-green-800";
			case "Cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-gray-50">
			<PageHeader
				title={"Today's Appointments"}
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
				) : appointments.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						<img
							src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
							alt="No data"
							className="mx-auto w-24 h-24 opacity-70 mb-4"
						/>
						<p className="text-sm font-semibold">
							No appointments scheduled for today
						</p>
						<p className="text-xs">
							All appointments are completed or none are
							scheduled.
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{appointments?.map((appointment) => (
							<div
								key={appointment._id}
								onClick={() =>
									navigate(
										`/patients/${appointment.patientId}`
									)
								}
								className="bg-white rounded-xl p-4 shadow-sm flex items-center cursor-pointer hover:bg-gray-50 transition">
								<div className="bg-purple-100 p-2 rounded-full mr-3">
									<FiCalendar className="text-purple-600" />
								</div>
								<div className="flex-1 text-xs">
									<div className="flex justify-between items-center">
										<h2 className="font-bold text-sm text-gray-800">
											{appointment.name}
										</h2>
										<span
											className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
												appointment.appointment.status
											)}`}>
											{appointment.appointment.status}
										</span>
									</div>
									<div className="flex items-center mt-1 text-gray-600">
										<FiClock className="mr-1" />
										<span className="text-sm">
											{formatAppointmentTime(
												appointment.appointment.date
											)}
										</span>
									</div>
									<div className="flex justify-between items-center mt-2">
										<div className="text-sm text-gray-600">
											<p>ID: {appointment.patientId}</p>
											<p>
												Dr.{" "}
												{appointment.appointment.doctor}{" "}
												•{" "}
												{
													appointment.appointment
														.department
												}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={(e) =>
													handleEditClick(
														e,
														appointment.patientId
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
					onClick={() => navigate("/appointments/new")}
					className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
					<FiPlus className="text-xl" />
				</button>
			</div>
		</div>
	);
};

export default AppointmentsList;
