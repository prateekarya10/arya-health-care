import {FaUserInjured,FaNotesMedical,FaCalendarAlt,FaRegCalendarAlt,} from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { useDoctorDashboardStats } from "../../../services/apis/patients/hook";
import { useAuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
	const { user } = useAuthContext();
	const { data } = useDoctorDashboardStats();
	const navigate = useNavigate();
	const doctorName = `Dr. ${user?.username}`;

	const currentDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-lg font-bold text-gray-800">
							Welcome, {doctorName}
						</h1>
						<p className="text-gray-500 mt-1 text-xs">
							{currentDate}
						</p>
					</div>
					<div className="bg-blue-100 p-2 rounded-full ">
						<FaUserInjured className="text-blue-600 text-xl" />
					</div>
				</div>
				<p className="text-gray-600 mt-2 text-xs">
					Here's your schedule and updates for today
				</p>
			</div>
			<div className="grid grid-cols-2 gap-3 mb-6">
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-start">
					<div className="bg-blue-100 p-2 rounded-lg mr-3">
						<FaUserInjured className="text-blue-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Patients Today</p>
						<h3 className="text-lg font-bold text-gray-800">
							{data?.patientsToday || 0}
						</h3>
					</div>
				</div>
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 flex items-start">
					<div className="bg-green-100 p-2 rounded-lg mr-3">
						<FaCalendarAlt className="text-green-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Appoi.. Left</p>
						<h3 className="text-lg font-bold text-gray-800">
							{data?.appointmentsLeft || 0}
						</h3>
					</div>
				</div>
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 flex items-start">
					<div className="bg-indigo-100 p-2 rounded-lg mr-3">
						<AiOutlineCheckCircle className="text-indigo-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Completed</p>
						<h3 className="text-lg font-bold text-gray-800">
							{data?.appointmentsCompleted || 0}
						</h3>
					</div>
				</div>
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-start">
					<div className="bg-yellow-100 p-2 rounded-lg mr-3">
						<BsPeopleFill className="text-yellow-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">New Patients</p>
						<h3 className="text-lg font-bold text-gray-800">
							{data?.newPatients || 0}
						</h3>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-5">
				<h2 className="text-sm font-semibold text-gray-800 mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 gap-3 text-xs">
					<button onClick={() => navigate("/appointments")} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition text-xs">
						<FaRegCalendarAlt className="mr-2" />
						Appointments
					</button>
					<button
						onClick={() => navigate("/patients/add")}
						className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition text-xs">
						<FaNotesMedical className="mr-2" />
						Add Patient
					</button>
				</div>
			</div>
		</div>
	);
};

export default DoctorHome;
