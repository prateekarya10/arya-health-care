export const endpoints = {
    auth: {
        login: `/auth/login`,
        logout: `/auth/logout`,
        register: `/auth/register`,
        refreshToken: `/auth/refresh-token`,
        profile: `/auth/profile`,
    },

    patients: {
        list: `/patients/search`,                          // Search patients
        create: `/patients`,                               // Create new patient (Doctor only)
        update: (id) => `/patients/${id}`,                 // Update patient (Doctor only)
        getById: (id) => `/patients/${id}`,                // Get patient by ID
        vitalsUpdate: (id) => `/patients/${id}/vitals`,    // Update vitals (Nurse only)
        appointments: (id) => `/patients/${id}/appointments`, // Get appointments (Receptionist/Admin/Doctor)
        delete: (id) => `/patients/${id}`,                 // Delete patient (Admin only)
    },

    doctor: {
        dashboardStats: `/patients/dashboard-stats`,       // Doctor dashboard overview stats
    },

    admin: {
        analytics: `/patients/analytics`,                  // Admin analytics
    }
};

export default endpoints;
