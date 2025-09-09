import React from "react";
import { useSelector } from "react-redux";

const TicketDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const application = useSelector((state) => state.busPass.application);

  if (!application || !user) {
    return (
      <div className="w-full h-[384px] bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-gray-600">
        No ticket details available.
      </div>
    );
  }
  console.log(application)
  return (
    <div className="w-full bg-white rounded-lg p-4 space-y-2 shadow-md pt-8">
      <div className="space-y-4 flex-col">
        {/* Name and Employee ID */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="text-gray-800">{user.fullName || "N/A"}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-600">Employee ID</p>
            <p className="text-gray-800">{user.empId || "N/A"}</p>
          </div>
        </div>

        {/* Branch and Route Type */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Bus Stop Name</p>
            <p className="text-gray-800">{application.branch || "N/A"}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-600">Route Type</p>
            <p className="text-gray-800">
              Both
              {/* {application.branch} to {application.office} and return */}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Start Date</p>
            <p className="text-gray-800">{application.fromDate || "--"}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-600">End Date</p>
            <p className="text-gray-800">{application.toDate || "--"}</p>
          </div>
        </div>

        {/* Route Summary */}
        <div className="flex text-center w-full">
          <p className="text-gray-800 w-full">
            Route: {application.selectedRoute} to {application.office} and return via{" "}
            {application.busStopName || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
