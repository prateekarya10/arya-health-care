import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaStethoscope, FaUserMd, FaNotesMedical } from "react-icons/fa";
import PageHeader from "../../../components/PageHeader";
import { useCreatePatient } from "../../../services/apis/patients/hook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const navigate = useNavigate();
    const { mutateAsync: createPatient, isLoading } = useCreatePatient();
    const randomPatientId = `P${Math.floor(100000 + Math.random() * 900000)}`;

    const [formData, setFormData] = useState({
        patientId: randomPatientId,
        name: "",
        age: "",
        gender: "",
        contactInfo: {
            phone: "",
            email: "",
            address: "",
        },
        appointments: [
            {
                date: "",
                department: "",
                doctor: "",
                reason: "",
                status: "Scheduled",
            },
        ],
    });

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
        } else if (name in formData.appointments[0]) {
            setFormData((prev) => ({
                ...prev,
                appointments: [
                    {
                        ...prev.appointments[0],
                        [name]: value,
                    },
                ],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            patientId: formData.patientId,
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            contactInfo: {
                phone: formData.contactInfo.phone,
                email: formData.contactInfo.email,
                address: formData.contactInfo.address,
            },
            appointments: [
                {
                    date: formData.appointments[0].date,
                    department: formData.appointments[0].department,
                    doctor: formData.appointments[0].doctor,
                    reason: formData.appointments[0].reason,
                    status: formData.appointments[0].status,
                },
            ],
        };

        const toastId = toast.loading("Adding patient...");

        try {
            await createPatient(payload);
            toast.success("Patient created successfully!", { id: toastId });
            navigate("/patients")
            // Optional reset
            setFormData({
                patientId: "",
                name: "",
                age: "",
                gender: "",
                contactInfo: {
                    phone: "",
                    email: "",
                    address: "",
                },
                appointments: [
                    {
                        date: "",
                        department: "",
                        doctor: "",
                        reason: "",
                        status: "Scheduled",
                    },
                ],
            });
        } catch (error) {
            toast.error("Failed to create patient.", { id: toastId });
            console.error(error);
        }

    };

    const inputClass = "w-full px-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"

    return (
        <div className="p-4 max-w-md mx-auto">
            <PageHeader title={"Add Patient"} className={"py-3"} />

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
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter  Name"
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
                                placeholder="Enter  Age"
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Info Section */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-2" />
                        Appointment Details
                    </h3>

                    <div className="space-y-3">
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Date & Time
                            </label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="datetime-local"
                                    name="date"
                                    className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                    value={formData.appointments[0].date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Department
                            </label>
                            <div className="relative">
                                <FaStethoscope className="absolute left-3 top-3 text-gray-400" />
                                <select
                                    name="department"
                                    className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs appearance-none"
                                    value={formData.appointments[0].department}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Doctor
                            </label>
                            <div className="relative">
                                <FaUserMd className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="doctor"
                                    placeholder="Enter Dr. Name"
                                    className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                    value={formData.appointments[0].doctor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Reason
                            </label>
                            <div className="relative">
                                <FaNotesMedical className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="reason"
                                    placeholder="Enter Note"
                                    className="w-full pl-10 pr-4 py-3 bg-[#ECF1FF] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                    value={formData.appointments[0].reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <div className="flex space-x-2 overflow-x-auto py-2">
                                {['Scheduled', 'Completed', 'Cancelled'].map(
                                    (status) => (
                                        <label
                                            key={status}
                                            className="flex items-center text-xs px-3 py-2 bg-[#ECF1FF] rounded-full whitespace-nowrap"
                                        >
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={formData.appointments[0].status === status}
                                                onChange={handleChange}
                                                className="mr-2"
                                                required
                                            />
                                            <span className="text-xs">{status}</span>
                                        </label>
                                    )
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                    {isLoading ? "Adding..." : "Add Patient Record"}
                </button>

            </form>
        </div>
    );
};

export default AddPatient;