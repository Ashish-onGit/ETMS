import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveApplication } from "../store/busPassSlice";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const ApplyBusPass = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branch: "",
    office: "",
    selectedMonth: "",
    selectedRoute: "",
    busStopName: "",
  });

  const [showMonthBoxes, setShowMonthBoxes] = useState(false);
  const [errors, setErrors] = useState({});
  const [routes, setRoutes] = useState([]);

  // const [errors, setErrors] = useState({});
  const [filteredStops, setFilteredStops] = useState([]);

  const branches = ["Kolkata"];
  const offices = ["Delta Park", "Gitanjali Park", "Eco Sapce", "Unitech IT"];
  const routeOptions = {
    "Delta Park": ["Barasat Colony More", "Santragachi Station"],
    "Gitanjali Park": ["Barasat Colony More", "Santragachi Station"],
    "Eco Sapce": ["Barasat Colony More", "Santragachi Station"],
    "Unitech IT": ["Barasat Colony More", "Santragachi Station"],
  };

  const busStops = [
    "Barasat Station Road",
    "Airport 1 No.",
    "Park Circus",
    "Tallyganj Metro",
  ];

  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const nextMonth = nextMonthDate.toLocaleString("default", { month: "short" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateWithSuffix = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const suffix =
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

    return `${day}${suffix} ${month}, ${year}`;
  };
  // bus stop name
  const handleBusStopNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, busStopName: value });

    // Filter bus stops based on input
    const filtered = busStops.filter((stop) =>
      stop.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStops(filtered);
  };

  const handleSelect = (stop) => {
    setFormData({ ...formData, busStopName: stop });
    setFilteredStops([]);
  };

  useEffect(() => {
    if (formData.branch && formData.office) {
      setShowMonthBoxes(true);
      setRoutes(routeOptions[formData.office] || []);
    } else {
      setShowMonthBoxes(false);
      setFormData((prev) => ({
        ...prev,
        selectedMonth: "",
        selectedRoute: "",
        busStopName: "",
      }));
      setRoutes([]);
    }
  }, [formData.branch, formData.office]);

  const handleNext = () => {
    const newErrors = {};
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.office) newErrors.office = "Office is required";
    if (!formData.selectedMonth)
      newErrors.selectedMonth = "Month selection is required";
    if (!formData.selectedRoute)
      newErrors.selectedRoute = "Route selection is required";
    if (!formData.busStopName)
      newErrors.busStopName = "Bus Stop Name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const year = new Date().getFullYear();
      const monthIndex = new Date(
        `${formData.selectedMonth} 1, ${year}`
      ).getMonth();
      const fromDateRaw = new Date(year, monthIndex, 1);
      const toDateRaw = new Date(year, monthIndex + 1, 0);

      const fromDate = formatDateWithSuffix(fromDateRaw);
      const toDate = formatDateWithSuffix(toDateRaw);

      const applicationData = {
        ...formData,
        name: user?.name,
        empId: user?.empId,
        fromDate,
        toDate,
      };

      dispatch(saveApplication(applicationData));
      navigate("/bus-service");
    }
  };

  const showRouteDropdown =
    formData.branch && formData.office && formData.selectedMonth;

  return (
    <div className="bg-white text-gray-800 px-4 py-8 pt-4 relative h-[90vh]">
      <div className="max-w-xl mx-auto">
        {/* User Info */}
        <div className="mb-6 space-y-1">
          <p>
            <strong>Name :</strong> {user?.fullName || "N/A"}
          </p>
          <p>
            <strong>Employee Id :</strong> {user?.empId || "N/A"}
          </p>
        </div>

        {/* Branch Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
          )}
        </div>

        {/* Office Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">TCS Office</label>
          <select
            name="office"
            value={formData.office}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            disabled={!formData.branch}
          >
            <option value="">Select Office</option>
            {offices.map((office) => (
              <option key={office} value={office}>
                {office}
              </option>
            ))}
          </select>
          {errors.office && (
            <p className="text-red-500 text-sm mt-1">{errors.office}</p>
          )}
        </div>

        {/* Month Boxes */}
        <label className="block text-sm font-medium mb-1">Select Month</label>
        {showMonthBoxes && (
          <div className="mt-4 flex justify-between gap-4">
            <div
              className={`p-4 border rounded-md cursor-pointer w-full text-center ${
                formData.selectedMonth === currentMonth ? "bg-purple-200" : ""
              }`}
              onClick={() =>
                setFormData({ ...formData, selectedMonth: currentMonth })
              }
            >
              {currentMonth}
            </div>
            <div
              className={`p-4 border rounded-md cursor-pointer w-full text-center ${
                formData.selectedMonth === nextMonth ? "bg-purple-200" : ""
              }`}
              onClick={() =>
                setFormData({ ...formData, selectedMonth: nextMonth })
              }
            >
              {nextMonth}
            </div>
          </div>
        )}
        {errors.selectedMonth && (
          <p className="text-red-500 text-sm mt-2">{errors.selectedMonth}</p>
        )}

        {/* Route Dropdown */}
        {showRouteDropdown && (
          <>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Select Route
              </label>
              <select
                name="selectedRoute"
                value={formData.selectedRoute}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300"
              >
                <option value="">Select Route</option>
                {routes.map((route) => (
                  <option key={route} value={route}>
                    {route}
                  </option>
                ))}
              </select>
              {errors.selectedRoute && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedRoute}
                </p>
              )}
            </div>

            {/* Bus Stop Name Input */}

            <div className="mt-4 relative">
              <label className="block text-sm font-medium mb-1">
                Bus Stop Name
              </label>
              <input
                type="text"
                name="busStopName"
                value={formData.busStopName}
                onChange={handleBusStopNameChange}
                placeholder="Enter your nearest bus stop"
                className="w-full px-4 py-2 rounded-md border border-gray-300"
              />
              {errors.busStopName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.busStopName}
                </p>
              )}

              {/* Suggestions Dropdown */}
              {filteredStops.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                  {filteredStops.map((stop, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(stop)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {stop}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        type="submit"
        onClick={handleNext}
        className="absolute bottom-20 right-4 bg-white text-black border-4 rounded-full flex items-center justify-center w-12 h-12 hover:bg-gray-100 transition duration-200"
      >
        <IoIosArrowForward className="text-3xl font-bold" />
      </button>
    </div>
  );
};

export default ApplyBusPass;
