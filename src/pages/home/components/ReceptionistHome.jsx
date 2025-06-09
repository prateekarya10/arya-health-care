import React from "react";
import {HiOutlineUserGroup,HiOutlineClipboardList} from "react-icons/hi";
import { FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetReceptionistStats, useTodaysAppointments } from "../../../services/apis/patients/hook";

const ReceptionistHome = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetReceptionistStats();
	const { data:dat2 } = useTodaysAppointments();
    console.log(dat2);

	const stats = {
		todaysAppointments: data?.data?.todaysAppointments ?? 0,
		pendingAppointments: data?.data?.pendingAppointments ?? 0,
		totalPatients: data?.data?.totalPatients ?? 0,
	};

	const currentDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	if (isLoading) {
		return <div className="p-4">Loading receptionist stats...</div>;
	}

	if (isError) {
		return (
			<div className="p-4 text-red-600">
				Error loading stats: {error?.message || "Unknown error"}
			</div>
		);
	}

     console.log(stats);
	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			{/* Header with greeting and date */}
			<div className="mb-6">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-lg font-bold text-gray-800">
							Welcome, Receptionist
						</h1>
						<p className="text-gray-500 mt-1 text-xs">{currentDate}</p>
					</div>
					<div className="bg-blue-100 p-2 rounded-full">
						<FaUserTie className="text-blue-600 text-lg" />
					</div>
				</div>
				<p className="text-gray-600 mt-2 text-xs">
					Manage appointments and patient information
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-2 gap-3 mb-6">
				{/* Today's Appointments */}
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 flex items-start">
					<div className="bg-indigo-100 p-2 rounded-lg mr-3">
						<FaCalendarAlt className="text-indigo-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Today's Appointments</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.todaysAppointments}
						</h3>
					</div>
				</div>

				{/* Pending Appointments */}
				<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-start">
					<div className="bg-yellow-100 p-2 rounded-lg mr-3">
						<HiOutlineClipboardList className="text-yellow-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Pending Appointments</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.pendingAppointments}
						</h3>
					</div>
				</div>

				{/* Total Patients */}
				<div className="bg-white p-4 py-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-start col-span-2">
					<div className="bg-blue-100 p-2 rounded-lg mr-3">
						<HiOutlineUserGroup className="text-blue-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500">Total Patients</p>
						<h3 className="text-lg font-bold text-gray-800">
							{stats.totalPatients}
						</h3>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-white rounded-xl shadow-sm p-5">
				<h2 className="text-sm font-semibold text-gray-800 mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 gap-3">
					<button
						onClick={() => navigate("/appointments")}
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition text-xs"
					>
						<FaCalendarAlt className="mr-2" />
						View Appointments
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReceptionistHome;
