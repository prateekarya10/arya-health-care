import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthWrapper from "../../components/AuthWrapper";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { register } from "../../services/apis/auth/auth";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const registerMutation = useMutation({
        mutationKey: ['register'],
        mutationFn: register,
    });


    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (
            !form.username ||
            !form.password ||
            !form.confirmPassword ||
            !form.role
        ) {
            alert("Please fill all fields.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await registerMutation.mutateAsync({
                username: form.username,
                password: form.password,
                role: form.role,
            });
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert(
                `Registration failed: ${error?.response?.data?.message || error.message
                }`
            );
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-start items-center px-4 bg-white text-center">
            <PageHeader title="Register" showBack />
            <AuthWrapper>
                <div className="text-start space-y-2">
                    <h2 className="text-[24px] font-semibold text-[#2260FF]">
                        Create Account
                    </h2>
                    <p className="text-[12px] font-[300] text-gray-700">
                        Fill in the details to create your Arya Care account.
                    </p>
                </div>

                <div className="w-full mt-7 space-y-6">
                    <InputField
                        label="Username"
                        id="username"
                        type="text"
                        placeholder="example@example.com"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Role"
                        id="role"
                        options={[
                            { label: "User", value: "user" },
                            { label: "Admin", value: "admin" },
                            { label: "Doctor", value: "doctor" },
                        ]}
                        value={form.role}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-center gap-3 w-full mt-10">
                    <PrimaryButton
                        onClick={handleSubmit}
                        label={
                            registerMutation.isLoading
                                ? "Registering..."
                                : "Register"
                        }
                        width="w-[207px]"
                        className="bg-[#2260FF] text-white shadow"
                        disabled={registerMutation.isLoading}
                    />
                    <div className="text-[12px]">
                        <span>
                            Already have an account?{" "}
                            <span
                                className="text-[#2260FF] cursor-pointer"
                                onClick={() => navigate("/login")}>
                                Log In
                            </span>
                        </span>
                    </div>
                </div>
            </AuthWrapper>
        </div>
    );
};

export default Register;
