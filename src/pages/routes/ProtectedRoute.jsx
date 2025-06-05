import { Navigate, Outlet } from "react-router-dom";
import GlobalLoading from "../../components/GlobalLoading";
import { useAuthContext } from "../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
	try {
		const decoded = jwtDecode(token);
		const now = Math.floor(Date.now() / 1000);
		return !decoded.exp || decoded.exp < now;
	} catch {
		return true;
	}
};

const ProtectedRoute = ({ isProtected }) => {
	const { user, isLoading } = useAuthContext();
	const token = localStorage.getItem("accessToken");

	if (isLoading) return <GlobalLoading />;

	const tokenValid = token && !isTokenExpired(token);

	if (isProtected && (!user || !tokenValid)) {
		return <Navigate to="/welcome" replace />;
	}

	if (!isProtected && user && tokenValid) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
