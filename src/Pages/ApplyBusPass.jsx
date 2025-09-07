import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveApplication } from "../store/busPassSlice";
import { useNavigate } from "react-router-dom";
const ApplyBusPass = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: "",
    office: "",
    fromDate: "",
    toDate: "",
  });

  const [errors, setErrors] = useState({});
  const branches = ["Delhi", "Mumbai", "Bangalore", "Hyderabad"];
  const offices = ["TCS X", "TCS Y", "TCS Z"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.office && formData.branch) newErrors.office = "Office is required";
    if (!formData.fromDate) newErrors.fromDate = "From Date is required";
    if (!formData.toDate) newErrors.toDate = "To Date is required";

    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      if (from.getTime() > to.getTime()) {
        newErrors.date = "From Date must be before To Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    const applicationData = {
      ...formData,
      name: user?.name,
      empId: user?.empId,
    };

    dispatch(saveApplication(applicationData));
    alert("Bus Pass Application Submitted!");


    setFormData({
      branch: "",
      office: "",
      fromDate: "",
      toDate: "",
    });

    setErrors({});
    navigate("/bus-service");
  }
};


  return (
    <div className="bg-white text-gray-800 px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Apply for Bus Pass</h2>

        {/* Header Info */}
        <div className="mb-6 space-y-1">
          <p><strong>Name:</strong> {user?.fullName || "N/A"}</p>
          <p><strong>Employee ID:</strong> {user?.empId || "N/A"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Branch Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
          </div>

          {/* Office Dropdown (only if branch selected) */}
          {formData.branch && (
            <div>
              <label className="block text-sm font-medium mb-1">Office</label>
              <select
                name="office"
                value={formData.office}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Office</option>
                {offices.map((office) => (
                  <option key={office} value={office}>
                    {office}
                  </option>
                ))}
              </select>
              {errors.office && <p className="text-red-500 text-sm mt-1">{errors.office}</p>}
            </div>
          )}

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.fromDate && <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>}
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.toDate && <p className="text-red-500 text-sm mt-1">{errors.toDate}</p>}
          </div>

          {/* Date Range Validation */}
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3d4fff] hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyBusPass;
