import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    empId: "",
    age: "",
    officeLocation: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.empId.trim()) newErrors.empId = "EPM ID is required";
    if (!formData.age || isNaN(formData.age) || formData.age < 18)
      newErrors.age = "Valid age (18+) is required";
    if (!formData.officeLocation.trim())
      newErrors.officeLocation = "Office Location is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     // Save full user data to Redux and localStorage
  //     dispatch(login(formData));
  //     alert("Signup successful!");
  //     navigate("/");
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = { ...formData };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      dispatch(login(newUser));
      alert("Signup successful!");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#3d4fff] to-[#673ab7] text-white px-4 ">
      <form
        onSubmit={handleSubmit}
        className="bg-[#20155c] p-8 rounded-xl shadow-xl w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* EPM ID */}
        <div>
          <label className="block text-sm font-medium text-white">EPM ID</label>
          <input
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
          />
          {errors.empId && (
            <p className="text-red-400 text-sm">{errors.empId}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-white">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
          />
          {errors.age && <p className="text-red-400 text-sm">{errors.age}</p>}
        </div>

        {/* Office Location */}
        <div>
          <label className="block text-sm font-medium text-white">
            Office Location
          </label>
          <input
            type="text"
            name="officeLocation"
            value={formData.officeLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
          />
          {errors.officeLocation && (
            <p className="text-red-400 text-sm">{errors.officeLocation}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-[#3d4fff] focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3d4fff] hover:bg-[#2c3fe6] text-white py-2 rounded-md transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
