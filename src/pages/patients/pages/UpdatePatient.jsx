import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {FaUser,FaPhone,FaEnvelope,FaMapMarkerAlt,FaArrowLeft,FaSave} from "react-icons/fa";
import PageHeader from "../../../components/PageHeader";
import {useGetPatientById,useUpdatePatient} from "../../../services/apis/patients/hook";
import toast from "react-hot-toast";

const UpdatePatient = () => {
	const { patientId } = useParams();
	const navigate = useNavigate();
	const { data: patient, isLoading: isPatientLoading } =
		useGetPatientById(patientId);
	const { mutateAsync: updatePatient, isLoading: isUpdating } =
		useUpdatePatient();

	const [formData, setFormData] = useState({
		patientId: "",
		name: "",
		age: "",
		gender: "",
		contactInfo: {
			phone: "",
			email: "",
			address: "",
		},
	});

	const [initialData, setInitialData] = useState(null);

	useEffect(() => {
		if (patient) {
			const fullData = {
				patientId: patient.patientId,
				name: patient.name,
				age: patient.age,
				gender: patient.gender,
				contactInfo: {
					phone: patient.contactInfo.phone,
					email: patient.contactInfo.email,
					address: patient.contactInfo.address,
				},
			};
			setFormData(fullData);
			setInitialData(fullData);
		}
	}, [patient]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name in formData.contactInfo) {
			setFormData((prev) => ({
				...prev,
				contactInfo: {
					...prev.contactInfo,
					[name]: value,
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const getChangedFields = (original, updated) => {
		const result = {};

		for (const key in updated) {
			if (typeof updated[key] === "object" && updated[key] !== null) {
				const nested = getChangedFields(original[key], updated[key]);
				if (Object.keys(nested).length > 0) {
					result[key] = nested;
				}
			} else if (updated[key] !== original[key]) {
				result[key] = updated[key];
			}
		}

		return result;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const toastId = toast.loading("Updating patient...");

		try {
			const updatedFields = getChangedFields(initialData, formData);

			if (Object.keys(updatedFields).length === 0) {
				toast.dismiss(toastId);
				toast("No changes made.", { icon: "⚠️" });
				return;
			}

			await updatePatient({
				patientId: formData.patientId,
				updatedData: updatedFields,
			});

			toast.success("Patient updated successfully!", { id: toastId });
			navigate(`/patients/${patientId}`);
		} catch (error) {
			toast.error("Failed to update patient.", { id: toastId });
			console.error(error);
		}
	};

	const inputClass =
		"w-full px-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs";

	if (isPatientLoading) {
		return <div className="p-4">Loading patient data...</div>;
	}

	return (
		<div className="p-4 mx-auto">
			<PageHeader
				title={"Update Patient"}
				className={"py-3"}
			/>

			<form onSubmit={handleSubmit} className="space-y-4 mt-4">
				{/* Basic Info Section */}
				<div className="bg-white rounded-xl shadow-sm p-4">
					<h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
						<FaUser className="text-blue-500 mr-2" />
						Basic Information
					</h3>

					<div className="space-y-3">
						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Patient ID
							</label>
							<input
								type="text"
								className={inputClass}
								value={formData.patientId}
								readOnly
							/>
						</div>

						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								placeholder="Enter Name"
								className={inputClass}
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Age
							</label>
							<input
								type="number"
								name="age"
								placeholder="Enter Age"
								className={inputClass}
								value={formData.age}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Gender
							</label>
							<div className="flex space-x-4 mt-1">
								<label className="flex items-center px-3 py-2 bg-[#ECF1FF] rounded-full">
									<input
										type="radio"
										name="gender"
										value="Male"
										checked={formData.gender === "Male"}
										onChange={handleChange}
										className="mr-2"
										required
									/>
									<span className="text-xs">Male</span>
								</label>
								<label className="flex items-center px-3 py-2 bg-[#ECF1FF] rounded-full">
									<input
										type="radio"
										name="gender"
										value="Female"
										checked={formData.gender === "Female"}
										onChange={handleChange}
										className="mr-2"
									/>
									<span className="text-xs">Female</span>
								</label>
								<label className="flex items-center px-3 py-2 bg-[#ECF1FF] rounded-full">
									<input
										type="radio"
										name="gender"
										value="Other"
										checked={formData.gender === "Other"}
										onChange={handleChange}
										className="mr-2"
									/>
									<span className="text-xs">Other</span>
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Info Section */}
				<div className="bg-white rounded-xl shadow-sm p-4">
					<h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
						<FaPhone className="text-blue-500 mr-2" />
						Contact Information
					</h3>

					<div className="space-y-3">
						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<div className="relative">
								<FaPhone className="absolute left-3 top-3 text-gray-400" />
								<input
									type="tel"
									name="phone"
									placeholder="Enter Mobile"
									className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
									value={formData.contactInfo.phone}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											contactInfo: {
												...prev.contactInfo,
												phone: e.target.value,
											},
										}))
									}
									required
								/>
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Email
							</label>
							<div className="relative">
								<FaEnvelope className="absolute left-3 top-3 text-gray-400" />
								<input
									type="email"
									name="email"
									placeholder="Enter Email"
									className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
									value={formData.contactInfo.email}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											contactInfo: {
												...prev.contactInfo,
												email: e.target.value,
											},
										}))
									}
									required
								/>
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Address
							</label>
							<div className="relative">
								<FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
								<textarea
									name="address"
									placeholder="Enter Address"
									className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs min-h-[80px]"
									value={formData.contactInfo.address}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											contactInfo: {
												...prev.contactInfo,
												address: e.target.value,
											},
										}))
									}
									required
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Submit Button */}
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-full font-medium  hover:bg-gray-300 active:bg-gray-400 transition-colors flex items-center justify-center text-xs">
						<FaArrowLeft className="mr-2" />
						Cancel
					</button>
					<button
						type="submit"
						disabled={isUpdating}
						className="flex-1 py-3 bg-blue-600 text-white rounded-full font-medium  hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs">
						{isUpdating ? (
							"Saving..."
						) : (
							<>
								<FaSave className="mr-2" />
								Save Changes
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdatePatient;
