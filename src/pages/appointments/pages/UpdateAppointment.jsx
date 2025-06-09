import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	FaCalendarAlt,
	FaStethoscope,
	FaUserMd,
	FaNotesMedical,
} from "react-icons/fa";
import PageHeader from "../../../components/PageHeader";
import {
	usePatientAppointments,
	useUpdatePatientAppointments,
} from "../../../services/apis/patients/hook";
import { toast } from "react-hot-toast";

const UpdateAppointment = () => {
	const { appointmentId } = useParams(); // Make sure this is patientId
	const navigate = useNavigate();
	const { data: appointmentData, isLoading } =
		usePatientAppointments(appointmentId);
	const { mutate: updateAppointment, isPending } =
		useUpdatePatientAppointments();

	const [formData, setFormData] = useState({
		date: "",
		department: "",
		doctor: "",
		reason: "",
		status: "Scheduled",
	});

	useEffect(() => {
		if (appointmentData) {
			try {
				const appointment = Array.isArray(appointmentData)
					? appointmentData[appointmentData.length - 1] // use latest appointment
					: appointmentData;

				setFormData({
					date: formatDateTimeLocal(appointment.date),
					department: appointment.department || "",
					doctor: appointment.doctor || "",
					reason: appointment.reason || "",
					status: appointment.status || "Scheduled",
				});
			} catch (error) {
				console.error("Error initializing form:", error);
				toast.error("Failed to load appointment data");
			}
		}
	}, [appointmentData]);

	const formatDateTimeLocal = (dateString) => {
		if (!dateString) return "";
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return "";

			const pad = (num) => num.toString().padStart(2, "0");
			return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
				date.getDate()
			)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
		} catch (error) {
			console.error("Date formatting error:", error);
			return "";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.date) {
			toast.error("Please select a date and time");
			return;
		}

		updateAppointment(
			{
				patientId: appointmentId,
				appointmentDate: new Date(formData.date).toISOString(),
				updates: {
					doctor: formData.doctor,
					department: formData.department,
					reason: formData.reason,
					status: formData.status,
				},
			},
			{
				onSuccess: () => {
					toast.success("Appointment updated successfully!");
					navigate("/appointments");
				},
				onError: (err) => {
					toast.error("Failed to update appointment");
					console.error(err);
				},
			}
		);
	};

	if (isLoading) {
		return (
			<div className="text-center py-8">
				Loading appointment details...
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<PageHeader
				title="Update Appointment"
				onBack={() => navigate(-1)}
			/>
			<div className="p-4">
				<form onSubmit={handleSubmit}>
					<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
						<h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
							<FaCalendarAlt className="text-blue-500 mr-2" />
							Appointment Details
						</h3>

						<div className="space-y-4">
							{/* Date & Time */}
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Date & Time
								</label>
								<div className="relative">
									<FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
									<input
										type="datetime-local"
										name="date"
										className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-xs"
										value={formData.date}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							{/* Department */}
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Department
								</label>
								<div className="relative">
									<FaStethoscope className="absolute left-3 top-3 text-gray-400" />
									<select
										name="department"
										className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-xs"
										value={formData.department}
										onChange={handleChange}
										required>
										<option value="">
											Select Department
										</option>
										<option value="Cardiology">
											Cardiology
										</option>
										<option value="Neurology">
											Neurology
										</option>
										<option value="Orthopedics">
											Orthopedics
										</option>
										<option value="Pediatrics">
											Pediatrics
										</option>
									</select>
								</div>
							</div>

							{/* Doctor */}
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Doctor
								</label>
								<div className="relative">
									<FaUserMd className="absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										name="doctor"
										className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-xs"
										value={formData.doctor}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							{/* Reason */}
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Reason
								</label>
								<div className="relative">
									<FaNotesMedical className="absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										name="reason"
										className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-xs"
										value={formData.reason}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							{/* Status */}
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Status
								</label>
								<div className="flex gap-3 overflow-x-auto py-1">
									{[
										"Scheduled",
										"Completed",
										"Cancelled",
									].map((status) => (
										<label
											key={status}
											className="flex items-center px-3 py-2 bg-[#ECF1FF] rounded-full text-xs whitespace-nowrap">
											<input
												type="radio"
												name="status"
												value={status}
												checked={
													formData.status === status
												}
												onChange={handleChange}
												className="mr-2"
											/>
											{status}
										</label>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col space-x-3 space-y-3">
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full text-sm font-medium">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isPending}
							className={`flex-1 py-3 rounded-full text-sm font-medium ${
								isPending
									? "bg-blue-300 cursor-not-allowed"
									: "bg-blue-600 text-white"
							}`}>
							{isPending ? "Updating..." : "Update Appointment"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateAppointment;
