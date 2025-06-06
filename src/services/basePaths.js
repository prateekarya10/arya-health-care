export const endpoints = {
    auth: {
        login: `/auth/login`,
        logout: `/auth/logout`,
        register: `/auth/register`,
        refreshToken: `/auth/refresh-token`,
        profile: `/auth/profile`,
        allUsers: `/auth/users`,
    },

    patients: {
        list: `/patients/search`,
        create: `/patients`,
        update: (id) => `/patients/${id}`,
        getById: (id) => `/patients/${id}`,
        vitalsUpdate: (id) => `/patients/${id}/vitals`,
        appointments: (id) => `/patients/${id}/appointments`,
        delete: (id) => `/patients/${id}`,
    },

    doctor: {
        dashboardStats: `/patients/dashboard-stats`,
    },

    admin: {
        analytics: `/patients/analytics`,
    },
    nurse: {
        updateVitals: (patientId) => `/patients/${patientId}/vitals`,
        pendingVitals: `/patients/pending/vitals`,
        nurseStats: '/patients/nurse/stats',
    },

    receptionist: {
        patientAppointments: (patientId) => `/patients/${patientId}/appointments`,
        todaysAppointments: `/patients/appointments/today`,
        receptionistSstats: `/patients/receptionist/stats`,
    }
};

export default endpoints;
