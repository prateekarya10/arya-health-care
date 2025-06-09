import { Outlet } from "react-router-dom";

const Patients = () => {
  return (
    <div className="bg-gray-50   pb-28">
      <Outlet />
    </div>
  );
};

export default Patients;
