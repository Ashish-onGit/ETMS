import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setLoading } from "../store/authSlice";

const LoginPage = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.empId === empId && user.password === password
    );

    if (matchedUser) {
      setError(""); 
      dispatch(setLoading(true));
      dispatch(login(matchedUser));

      setTimeout(() => {
        dispatch(setLoading(false));
        navigate("/");
      }, 1500);
    } else {
      setError("Invalid credentials. Please try again."); 
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#3d4fff] to-[#673ab7] text-white ">
      <div className="bg-[#20155c] shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Employee Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="empId" className="block text-sm font-medium text-white">
              Employee ID
            </label>
            <input
              type="text"
              id="empId"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 border-none focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 border-none focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
              required
            />
          </div>

          
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#3d4fff] hover:bg-[#2c3fe6] text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
