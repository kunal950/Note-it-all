import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "password"}
          className="w-full text-sm bg-transparent py-3 rounded outline-none"
        />
        {showPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => {
              togglePassword();
            }}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={() => {
              togglePassword();
            }}
          />
        )}
      </div>
    </>
  );
};

export default PasswordInput;
