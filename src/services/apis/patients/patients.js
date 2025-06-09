import { api } from "../../apiClient";
import endpoints from "../../basePaths";

// Get dashboard statistics for doctor
export const dashboardStats = async () => {
    const response = await api.get(endpoints.doctor.dashboardStats);
    return response.data;
};

// Get patient by ID
export const getPatientById = async (patientId) => {
    const response = await api.get(endpoints.patients.getById(patientId));
    return response.data;
};

// Create new patient
export const createPatient = async (patientData) => {
    const response = await api.post(endpoints.patients.create, patientData);
    return response.data;
};

// Update existing patient
export const updatePatient = async (patientId, updatedData) => {
    console.log("Sending to backend:", updatedData);
    const response = await api.put(`/patients/${patientId}`, updatedData);
    return response.data;
};


// Delete patient (admin only)
export const deletePatient = async (patientId) => {
    const response = await api.delete(endpoints.patients.delete(patientId));
    return response.data;
};
// Search patient (admin only)

export const searchPatients = async ({ search = "", page = 1, limit = 10, sort = "name" }) => {
    const response = await api.get(endpoints.patients.list, {
        params: { search, page, limit, sort },
    });
    return response.data;
};


// 
export const getAdminAnalytics = async () => {
    const response = await api.get(endpoints.admin.analytics);
    return response.data;
};

// ------------------- Nurse -------------------
export const updatePatientVitals = async (patientId, vitalsData) => {
    const response = await api.patch(endpoints.nurse.updateVitals(patientId), vitalsData);
    return response.data;
};

export const getPatientsPendingVitals = async () => {
    const response = await api.get(endpoints.nurse.pendingVitals);
    return response.data;
};

export const getNurseStats = async () => {
    const response = await api.get(endpoints.nurse.nurseStats);
    return response.data;
};

// ------------------- Receptionist -------------------
export const getPatientAppointments = async (patientId) => {
    const response = await api.get(endpoints.receptionist.patientAppointments(patientId));
    return response.data;
};

export const getTodaysAppointments = async () => {
    const response = await api.get(endpoints.receptionist.todaysAppointments);
    return response.data;
};

export const getReceptionistStats = async () => {
    const response = await api.get(endpoints.receptionist.receptionistSstats);
    return response.data;
};

export const updatePatientAppointments = async ({ patientId, appointmentDate, updates }) => {
	return await api.patch(endpoints.receptionist.patientAppointments(patientId), {
		appointmentDate,
		updates,
	});
};


