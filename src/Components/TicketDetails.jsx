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
    <div className="w-full h-[384px] bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Ticket Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{user.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Emp ID:</span>
          <span className="text-gray-800">{user.empId || user.empId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Branch:</span>
          <span className="text-gray-800">{application.branch}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Office:</span>
          <span className="text-gray-800">{application.office}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Start Date:</span>
          <span className="text-gray-800">{application.fromDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">End Date:</span>
          <span className="text-gray-800">{application.toDate}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        Route: <strong>{application.branch}</strong> to <strong>{application.office}</strong> and return
      </div>
    </div>
  );
};

export default TicketDetails;
