import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GlobalLoading from "./components/GlobalLoading";
import ProtectedRoute from "./pages/routes/ProtectedRoute";
import BottomNav from "./components/BottomNav";
import { useAuthContext } from "./context/AuthProvider";

const Welcome = React.lazy(() => import("./pages/auth/Welcome"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Team = React.lazy(() => import("./pages/profile/Team"));

const Patients = React.lazy(() => import("./pages/patients/Patients"));
const PatientsList = React.lazy(() => import("./pages/patients/pages/PatientsList"));
const AddPatient = React.lazy(() => import("./pages/patients/pages/AddPatient"));
const UpdatePatient = React.lazy(() => import("./pages/patients/pages/UpdatePatient"));
const PatientDetail = React.lazy(() => import("./pages/patients/pages/PatientDetail"));
const VitalsList = React.lazy(() => import("./pages/patients/pages/VitalsList"));
const UpdateVitals = React.lazy(() => import("./pages/patients/pages/UpdateVitals"));
// Add the new Appointments components
const Appointments = React.lazy(() => import("./pages/appointments/Appointments"));
const AppointmentsList = React.lazy(() => import("./pages/appointments/pages/AppointmentsList"));
// const AddAppointment = React.lazy(() => import("./pages/appointments/pages/AddAppointment"));
const UpdateAppointment = React.lazy(() => import("./pages/appointments/pages/UpdateAppointment"));
const MOBILE_MAX_WIDTH = 768;

const App = () => {
    const { user } = useAuthContext();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= MOBILE_MAX_WIDTH
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile) {
        return (
            <div style={{ padding: 20, textAlign: "center" }}>
                <h2>This app is only accessible on mobile devices.</h2>
                <p>Please open this page on a mobile device.</p>
            </div>
        );
    }

    const hideBottomNavPaths = ["/profile", "/login", "/register", "/welcome"];
    const shouldShowBottomNav =
        user && !hideBottomNavPaths.includes(location.pathname);

    return (
        <div className="bg-gray-50 h-screen">
            <Suspense fallback={<GlobalLoading />}>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<ProtectedRoute isProtected={false} />}>
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute isProtected={true} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/patients" element={<Patients />}>
                            <Route index element={<PatientsList />} />
                            <Route path="add" element={<AddPatient />} />
                            <Route path="update/:patientId" element={<UpdatePatient />} />
                            <Route path=":patientId" element={<PatientDetail />} />
                            <Route path="vitals" element={<VitalsList />} />
                            <Route path="vitals/:id" element={<UpdateVitals />} />
                        </Route>
                        <Route path="/appointments" element={<Appointments />}>
                            <Route index element={<AppointmentsList />} />
                            {/* <Route path="add" element={<AddAppointment />} /> */}
                            <Route path="update/:appointmentId" element={<UpdateAppointment />} />
                        </Route>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/team" element={<Team />} />
                    </Route>
                </Routes>
            </Suspense>
            {shouldShowBottomNav && <BottomNav />}
        </div>
    );
};

export default App;
