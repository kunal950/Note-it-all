import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import instance from "../../utils/axios.intance";
const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError(null);

    //login api call
    try {
      const response = await instance.post("/api/auth/login", {
        email,
        password,
      });
      if (!response.data.error && response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        Navigate("/dashboard");
      } else if (response.data.error) {
        setError(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 ">Login</h4>
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
            {error && <p className="text-xs text-red-500 pb-1">{error}</p>}
            <button type="sumbit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not register yet?{"  "}
              <Link
                to={"/signup"}
                className="font-medium text-primary underline"
              >
                craete a Acc
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
