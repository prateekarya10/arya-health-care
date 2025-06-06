import React from 'react';
import { useGetAllUsers } from '../../services/apis/auth/auth';
import { FaUserShield, FaUserMd, FaUserNurse, FaUserTie } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';  // For loading skeleton icon
import PageHeader from '../../components/PageHeader';

const roleIcons = {
    admin: <FaUserShield className="text-blue-600" />,
    doctor: <FaUserMd className="text-green-600" />,
    nurse: <FaUserNurse className="text-purple-600" />,
    receptionist: <FaUserTie className="text-pink-600" />,
};

const roleColors = {
    admin: 'bg-blue-100 text-blue-700',
    doctor: 'bg-green-100 text-green-700',
    nurse: 'bg-purple-100 text-purple-700',
    receptionist: 'bg-pink-100 text-pink-700',
};

const Team = () => {
    const { data, isLoading } = useGetAllUsers();

    if (isLoading) {
        // Loading skeleton placeholders (6 cards)
        return (
            <div className="pb-28">
                <PageHeader title={"Team Members"} className={"py-5"} />
                <div className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 rounded-xl shadow-sm flex items-center animate-pulse"
                            >
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
                </div>
            </div>
        );
    }

    return (
        <div className='pb-28'>
            <PageHeader title={"Team Members"} className={"pt-5"} />
            <div className="bg-gray-50 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data?.data?.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white shadow rounded-xl p-5 flex items-center space-x-4 transition-shadow"
                        >
                            <div className="text-3xl">
                                {roleIcons[user.role] || <FaUserTie className="text-gray-500" />}
                            </div>
                            <div className="flex-1">
                                <div className="text-gray-800 font-medium capitalize text-sm">{user.username}</div>
                                <span
                                    className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-700'}`}
                                >
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
