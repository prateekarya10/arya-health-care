import React from "react";
import { HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineUserAdd } from "react-icons/hi";
import { FaUserTie, FaCalendarAlt, FaUserPlus } from "react-icons/fa";

const ReceptionistHome = () => {
  const stats = {
    todaysAppointments: 15,
    pendingAppointments: 4,
    totalPatients: 120,
  };

  // Current date formatted
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header with greeting and date */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Receptionist</h1>
            <p className="text-gray-500 mt-1">{currentDate}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <FaUserTie className="text-blue-600 text-xl" />
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Manage appointments and patient information
        </p>
      </div>

      {/* Stats Cards - 2 columns */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Today's Appointments */}
        <div 
          className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 flex items-start"
        >
          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
            <FaCalendarAlt className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Today's Appointments</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.todaysAppointments}
            </h3>
          </div>
        </div>

        {/* Pending Appointments */}
        <div 
          className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-start"
        >
          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
            <HiOutlineClipboardList className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Appointments</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.pendingAppointments}
            </h3>
          </div>
        </div>

        {/* Total Patients */}
        <div 
          className="bg-white p-4 py-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-start col-span-2"
        >
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <HiOutlineUserGroup className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Patients</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.totalPatients}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition">
            <FaCalendarAlt className="mr-2" />
            Appointments
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition">
            <FaUserPlus className="mr-2" />
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistHome;