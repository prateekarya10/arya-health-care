import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, login, logout } from "../services/apis/auth/auth.js";

const AuthContext = createContext({
	user: null,
	isLoading: false,
	login: null,
	logout: null,
});

export const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const accessToken = localStorage.getItem("accessToken");

	const { data: user, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: getProfile,
		enabled: !!accessToken,
	});

	const loginMutation = useMutation({
		mutationFn: login,
		mutationKey: ["login"],
		onSuccess: (data) => {
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
			queryClient.invalidateQueries(["authUser"]);
		},
	});

	// Fix and enable logout mutation:
	const logoutMutation = useMutation({
		mutationFn: logout,
		mutationKey: ["logout"],
		onSuccess: () => {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			queryClient.invalidateQueries(["authUser"]);
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			// Optionally clear tokens anyway:
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			queryClient.invalidateQueries(["authUser"]);
		},
	});

	const value = {
		user,
		isLoading,
		login: loginMutation,
		logout: logoutMutation,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuthContext must be used within AuthProvider");
	return context;
};
