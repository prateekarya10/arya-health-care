import { FaHeartbeat, FaProcedures, FaUserNurse, FaClipboardList } from "react-icons/fa";
import { MdOutlineVaccines } from "react-icons/md";

const NurseHome = () => {
  const stats = {
    patientsToCheck: 8,
    vitalsUpdatedToday: 5,
    totalPatientsAssigned: 20,
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
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Nurse</h1>
            <p className="text-gray-500 mt-1">{currentDate}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <FaUserNurse className="text-blue-600 text-xl" />
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Your patient vitals updates and tasks
        </p>
      </div>

      {/* Stats Cards - 2 columns */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Patients to Check */}
        <div 
          className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 flex items-start"
        >
          <div className="bg-red-100 p-2 rounded-lg mr-3">
            <FaHeartbeat className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Patients to Check</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.patientsToCheck}
            </h3>
          </div>
        </div>

        {/* Vitals Updated Today */}
        <div 
          className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 flex items-start"
        >
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <FaProcedures className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Vitals Updated</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.vitalsUpdatedToday}
            </h3>
          </div>
        </div>

        {/* Total Patients Assigned */}
        <div 
          className="bg-white p-4 py-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-start col-span-2"
        >
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <FaClipboardList className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Patients Assigned</p>
            <h3 className="text-xl font-bold text-gray-800">
              {stats.totalPatientsAssigned}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition">
            <FaHeartbeat className="mr-2" />
            Update Vitals
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center transition">
            <MdOutlineVaccines className="mr-2" />
            Medication
          </button>
        </div>
      </div>
    </div>
  );
};

export default NurseHome;