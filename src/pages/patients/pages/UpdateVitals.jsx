import { useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import PageHeader from "../../../components/PageHeader";
import { useUpdatePatientVitals } from "../../../services/apis/patients/hook"; // Assume you have this hook
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVitals = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { mutateAsync: updateVitals, isLoading } = useUpdatePatientVitals();

	const [formData, setFormData] = useState({
		bloodPressure: "",
		temperature: "",
		pulse: "",
		weight: "",
		height: "",
		lastUpdated: new Date().toISOString().slice(0, 16), // datetime-local format
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			bloodPressure: formData.bloodPressure,
			temperature: parseFloat(formData.temperature),
			pulse: parseInt(formData.pulse),
			weight: parseFloat(formData.weight),
			height: parseFloat(formData.height),
			lastUpdated: formData.lastUpdated,
		};

		const toastId = toast.loading("Updating vitals...");

		try {
			await updateVitals({ patientId: id, vitalsData: payload });
			toast.success("Vitals updated successfully!", { id: toastId });
			navigate(`/patients/${id}`);
		} catch (error) {
			toast.error("Failed to update vitals.", { id: toastId });
			console.error(error);
		}
	};

	const inputClass =
		"w-full px-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs";

	return (
		<div className="p-4 max-w-md mx-auto">
			<PageHeader title={"Update Vitals"} className={"py-3"} />

			<form onSubmit={handleSubmit} className="space-y-4 mt-4">
				{/* Vitals Section */}
				<div className="bg-white rounded-xl shadow-sm p-4">
					<h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
						<FaHeartbeat className="text-blue-500 mr-2" />
						Patient Vitals
					</h3>

					<div className="space-y-3">
						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Blood Pressure (e.g. 120/80)
							</label>
							<input
								type="text"
								name="bloodPressure"
								placeholder="Enter Blood Pressure"
								className={inputClass}
								value={formData.bloodPressure}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Temperature (°C)
							</label>
							<input
								type="number"
								step="0.1"
								name="temperature"
								placeholder="Enter Temperature"
								className={inputClass}
								value={formData.temperature}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Pulse (bpm)
							</label>
							<input
								type="number"
								name="pulse"
								placeholder="Enter Pulse"
								className={inputClass}
								value={formData.pulse}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Weight (kg)
							</label>
							<input
								type="number"
								step="0.1"
								name="weight"
								placeholder="Enter Weight"
								className={inputClass}
								value={formData.weight}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Height (cm)
							</label>
							<input
								type="number"
								step="0.1"
								name="height"
								placeholder="Enter Height"
								className={inputClass}
								value={formData.height}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4 relative">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Last Updated
							</label>
							<input
								type="datetime-local"
								name="lastUpdated"
								className={inputClass}
								value={formData.lastUpdated}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isLoading}
					className="w-full py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs">
					{isLoading ? "Updating..." : "Update Vitals"}
				</button>
			</form>
		</div>
	);
};

export default UpdateVitals;
