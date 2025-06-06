import { useQuery } from "@tanstack/react-query";
import { api } from "../../apiClient";
import endpoints from "../../basePaths";

export const login = async (credentials) => {
    const response = await api.post(endpoints.auth.login, credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post(endpoints.auth.register, userData);
    return response.data;
};
export const logout = async ({ refreshToken }) => {
    const response = await api.post("/auth/logout", { refreshToken });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get(endpoints.auth.profile);
    return response.data;
};

export const refreshToken = async () => {
    const response = await api.post(endpoints.auth.refreshToken());
    return response.data;
};

const getAllUsers = async () => {
    const response = await api.get(endpoints.auth.allUsers);
    return response.data;
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["getAllUsers"],
        queryFn: getAllUsers,
    });
};
