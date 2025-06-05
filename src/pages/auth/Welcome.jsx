import { useNavigate } from "react-router-dom";
import logo from "../../assets/WelcomeLogo.png";
import PrimaryButton from "../../components/PrimaryButton";

const Welcome = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-col justify-between items-center px-4 py-20 bg-white text-center">
			<div></div>

			<div>
				<img
					src={logo}
					alt="Loading Logo"
					className="h-[135px] w-[135px] mb-4 mx-auto"
				/>
				<h2 className="text-[42px] font-thin leading-10">
					Arya <br />
					Care
				</h2>
				<p className="text-xs mt-2 text-gray-600">Health Care Center</p>
			</div>

			<div className="flex flex-col items-center gap-3 w-full">
				<p className="text-[12px] text-gray-700 max-w-xs mb-4">
					Welcome to Arya Care – your trusted partner in health and
					wellness. Let's get started.
				</p>
				<PrimaryButton
					onClick={() => navigate("/login")}
					label="Log In"
					width="w-[207px]"
					className="bg-[#2260FF] text-white shadow"
				/>

				<PrimaryButton
					onClick={() => navigate("/register")}
					label="Sign Up"
					width="w-[207px]"
					className="border border-[#2260FF] text-[#2260FF] bg-[#CAD6FF]"
				/>
			</div>
		</div>
	);
};

export default Welcome;
