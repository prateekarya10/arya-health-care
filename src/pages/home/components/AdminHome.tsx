import {FaUsers,FaVenusMars,FaClipboardList} from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useGetAdminAnalytics } from "../../../services/apis/patients/hook";
import {
   Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const AdminHome = () => {
    const { data } = useGetAdminAnalytics();

    const totalPatients = data?.totalPatients || 0;
    const averageAge = data?.averageAge || 0;
    const genderDistribution = data?.genderDistribution || [];
    const appointmentsByDept = data?.appointmentsPerDepartment || [];
    const appointmentsByStatus = data?.appointmentsPerStatus || [];

    const genderChartData = {
        labels: genderDistribution.map(g => g._id),
        datasets: [
            {
                label: 'Patients by Gender',
                data: genderDistribution.map(g => g.count),
                backgroundColor: ['#60a5fa', '#f87171', '#facc15'],
                borderColor: ['#3b82f6', '#ef4444', '#eab308'],
                borderWidth: 1
            }
        ]
    };

    const deptChartData = {
        labels: appointmentsByDept.map(d => d._id),
        datasets: [
            {
                label: 'Appointments',
                data: appointmentsByDept.map(d => d.count),
                backgroundColor: '#34d399',
                borderColor: '#10b981',
                borderWidth: 1
            }
        ]
    };

    const statusChartData = {
        labels: appointmentsByStatus.map(s => s._id),
        datasets: [
            {
                label: 'Appointments',
                data: appointmentsByStatus.map(s => s.count),
                backgroundColor: '#c084fc',
                borderColor: '#a855f7',
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="p-4 min-h-screen pb-28 bg-gray-50">
            <h1 className="text-[24px] font-bold text-[#2260FF] mb-6 mt-3">Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 flex flex-col">
                    <div className="flex items-center mb-2">
                        <FaUsers className="text-blue-500 mr-2 text-lg" />
                        <span className="text-xs font-medium text-gray-500">Total Patients</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">{totalPatients}</h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500 flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-gray-500">Avg. Age</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">{averageAge.toFixed(2)} yrs</h3>
                </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-5">
                {/* Gender Distribution */}
                <div className="bg-white rounded-xl shadow-md p-5">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                            <FaVenusMars className="text-purple-600 text-lg" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-800">Gender Distribution</h2>
                    </div>
                    <div className="h-64">
                        <Pie
                            data={genderChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            usePointStyle: true,
                                            pointStyle: 'circle'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Appointments by Department */}
                <div className="bg-white rounded-xl shadow-md p-5">
                    <div className="flex items-center mb-4">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                            <MdOutlineHealthAndSafety className="text-red-600 text-lg" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-800">Appointments by Department</h2>
                    </div>
                    <div className="h-64">
                        <Bar
                            data={deptChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { 
                                        beginAtZero: true,
                                        ticks: {
                                            precision: 0
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Appointments by Status */}
                <div className="bg-white rounded-xl shadow-md p-5">
                    <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                            <FaClipboardList className="text-yellow-600 text-lg" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-800">Appointments by Status</h2>
                    </div>
                    <div className="h-64">
                        <Bar
                            data={statusChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { 
                                        beginAtZero: true,
                                        ticks: {
                                            precision: 0
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;