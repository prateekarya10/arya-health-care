import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ label, id, type = "text", placeholder, value, onChange, className = "" }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className={`flex flex-col gap-2 items-start w-full ${className}`}>
            <label htmlFor={id} className="text-[16px] font-medium text-black">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    id={id}
                    type={isPassword && showPassword ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="bg-[#ECF1FF] placeholder:text-[#809CFF] text-[16px] px-3 py-3 w-full rounded-xl outline-none pr-10"
                />
                {/* Password toggle icon */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;
