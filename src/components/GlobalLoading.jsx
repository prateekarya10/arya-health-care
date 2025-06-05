import logo from "../assets/loadingLogo.png";

const GlobalLoading = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-[#2260FF] text-white px-4">
			<img
				src={logo}
				alt="Loading Logo"
				className="h-[135px] w-[135px]  mb-4"
			/>
			<div className="text-center">
				<h2 className="text-[42px] font-[100] leading-10">
					Arya <br />
					Care
				</h2>
				<p className="text-xs mt-2">Health Care Center</p>
			</div>
		</div>
	);
};

export default GlobalLoading;
