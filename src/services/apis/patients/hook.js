import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient, dashboardStats, deletePatient, getPatientById, searchPatients, updatePatient } from "./patients";

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