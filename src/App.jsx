import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalLoading from "./components/GlobalLoading";
import ProtectedRoute from "./pages/routes/ProtectedRoute";
import BottomNav from "./components/BottomNav";
import { useAuthContext } from "./context/AuthProvider";

const Welcome = React.lazy(() => import("./pages/auth/Welcome"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Home = React.lazy(() => import("./pages/home/Home"));

const Patients = React.lazy(() => import("./pages/patients/Patients"));
const PatientsList = React.lazy(() => import("./pages/patients/pages/PatientsList"));
const AddPatient = React.lazy(() => import("./pages/patients/pages/AddPatient"));
const UpdatePatient = React.lazy(() => import("./pages/patients/pages/UpdatePatient"));
const PatientDetail = React.lazy(() => import("./pages/patients/pages/PatientDetail"));

const MOBILE_MAX_WIDTH = 768;

const App = () => {
    const { user } = useAuthContext();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_MAX_WIDTH);

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

    return (
        <>
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
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
            {user && <BottomNav />}
        </>
    );
};

export default App;
