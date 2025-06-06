import { Outlet } from "react-router-dom";

const Appointments = () => {
	return (
		<div className="bg-gray-50   pb-28">
			<Outlet />
		</div>
	);
};

export default Appointments;
