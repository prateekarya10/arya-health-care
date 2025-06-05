export const endpoints = {
    auth: {
        login: `/auth/login`,
        logout: `/auth/logout`,
        register: `/auth/register`,
        refreshToken: `/auth/refresh-token`,
        profile: `/auth/profile`,
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
    }
};

export default endpoints;
