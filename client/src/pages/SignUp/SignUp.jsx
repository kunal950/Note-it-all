import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !currentPassword) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (password !== currentPassword) {
      setError("Password and Current Password must be same");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError(null);

    //Signup api call
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 ">SignUP</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
            />
            <PasswordInput
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={"Current Password"}
            />
            {error && <p className="text-xs text-red-500 pb-1">{error}</p>}
            <button type="sumbit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already a User{"  "}
              <Link
                to={"/login"}
                className="font-medium text-primary underline"
              >
                Login.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
