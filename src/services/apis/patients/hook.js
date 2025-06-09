import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient, dashboardStats, deletePatient, getAdminAnalytics, getNurseStats, getPatientAppointments, getPatientById, getPatientsPendingVitals, getReceptionistStats, getTodaysAppointments, searchPatients, updatePatient, updatePatientAppointments, updatePatientVitals } from "./patients";

// 1. Dashboard stats hook (GET)
export const useDoctorDashboardStats = () => {
    return useQuery({
        queryKey: ["doctor-dashboard-stats"],
        queryFn: dashboardStats,
    });
};

// 2. Get patient by ID (GET)
export const useGetPatientById = (patientId) => {
    return useQuery({
        queryKey: ["patient", patientId],
        queryFn: () => getPatientById(patientId),
        enabled: !!patientId, // only runs if ID is provided
    });
};

// 3. Create patient (POST)
export const useCreatePatient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPatient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });
};

// 4. Update patient (PUT)
export const useUpdatePatient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ patientId, updatedData }) => updatePatient(patientId, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: (error) => {
            console.error("Failed to update patient:", error);
        },
    });
};

// 5. Delete patient (optional if admin)
export const useDeletePatient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePatient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });
};


// 6. Search patients (GET with query params)
export const useSearchPatients = ({ search = "", page = 1, limit = 10, sort = "name" }) => {
    return useQuery({
        queryKey: ["patients", { search, page, limit, sort }],
        queryFn: () => searchPatients({ search, page, limit, sort }),
        keepPreviousData: true,
    });
};

// 
export const useGetAdminAnalytics = () => {
    return useQuery({
        queryKey: ["admin-analytics"],
        queryFn: getAdminAnalytics,
    });
}


// ------------------ Nurse ------------------

// Update vitals for a patient (PATCH)
export const useUpdatePatientVitals = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ patientId, vitalsData }) =>
            updatePatientVitals(patientId, vitalsData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            queryClient.invalidateQueries({ queryKey: ["patients-pending-vitals"] });
        },
    });
};

// Get list of patients pending vitals
export const usePendingVitalsPatients = () => {
    return useQuery({
        queryKey: ["patients-pending-vitals"],
        queryFn: getPatientsPendingVitals,
    });
};
export const useGetNurseStats = () => {
    return useQuery({
        queryKey: ["getNurseStats"],
        queryFn: getNurseStats,
    });
};

// ------------------ Receptionist ------------------

// Get appointments for a specific patient
export const usePatientAppointments = (patientId) => {
    return useQuery({
        queryKey: ["patient-appointments", patientId],
        queryFn: () => getPatientAppointments(patientId),
        enabled: !!patientId,
    });
};

// Get today's appointments
export const useTodaysAppointments = () => {
    return useQuery({
        queryKey: ["todays-appointments"],
        queryFn: getTodaysAppointments,
    });
};
// receptionistStats
export const useGetReceptionistStats = () => {
    return useQuery({
        queryKey: ["receptionistStats"],
        queryFn: getReceptionistStats,
    });
};

export const useUpdatePatientAppointments = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updatePatientAppointments,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(["patient-appointments", variables.patientId]);
			queryClient.invalidateQueries(["todays-appointments"]);
		},
	});
};