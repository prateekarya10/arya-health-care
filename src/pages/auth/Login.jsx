import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import InputField from "../../components/InputField";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { useAuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
	const [loginData, setLoginData] = useState({ username: "", password: "" });
	const { login } = useAuthContext();
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { id, value } = e.target;
		setLoginData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!loginData.username.trim() || !loginData.password.trim()) {
			toast.error("Please fill in both username and password");
			return;
		}
		try {
			await login.mutateAsync(loginData);
			navigate("/");
		} catch (error) {
			const errorMsg = error?.response?.data?.msg || "Login failed";
			toast.error(errorMsg);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-start items-center px-4 bg-white text-center">
			<PageHeader title="Log In" textSize="text-[24px]" />
			<AuthWrapper>
				<div className="text-start space-y-2">
					<h2 className="text-[24px] font-semibold text-[#2260FF]">
						Welcome
					</h2>
					<p className="text-[12px] font-[300] text-gray-700">
						Please log in to your Arya Care account to access your
						health records, book appointments, and manage your
						wellness with ease.
					</p>
				</div>
				<form className="w-full mt-7 space-y-6" onSubmit={handleLogin}>
					<InputField
						label="Username"
						id="username"
						type="text"
						placeholder="Enter Your Username"
						value={loginData.username}
						onChange={handleChange}
					/>

					<InputField
						label="Password"
						id="password"
						type="password"
						placeholder="Enter your password"
						value={loginData.password}
						onChange={handleChange}
					/>

					{/* <div
						className="text-xs text-[#2260FF] mt-2 text-end mr-2 font-medium cursor-pointer"
						onClick={() => navigate("/forgot-password")}>
						Forget Password
					</div> */}

					<div className="flex flex-col items-center gap-3 w-full mt-10">
						<PrimaryButton
							label="Log In"
							loading={login.isPending}
							disabled={login.isPending}
							width="w-[207px]"
							className="bg-[#2260FF] text-white shadow"
						/>

						<div className="text-[12px]">
							<span>
								Don’t have an account?{" "}
								<span
									className="text-[#2260FF] cursor-pointer"
									onClick={() => navigate("/register")}>
									Sign Up
								</span>
							</span>
						</div>
					</div>
				</form>
			</AuthWrapper>
		</div>
	);
};

export default Login;
