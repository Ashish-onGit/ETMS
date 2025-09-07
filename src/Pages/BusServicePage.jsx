import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qrScanner from "../assets/scan.png";
import TicketDetails from "../Components/TicketDetails";
import { loadApplication } from "../store/busPassSlice";

const BusServicePage = () => {
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [application, setApplication] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.empId || user?.empId) {
      const empId = user.empId || user.empId;
      const stored = localStorage.getItem(`busPass_${empId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setApplication(parsed);
        dispatch(loadApplication(parsed)); 
      }
    }
  }, [user, dispatch]);

  const handleShowDetails = () => {
    setShowTicketDetails(!showTicketDetails);
  };
// console.log(app)

  return (
    <div className="flex flex-col items-center justify-start px-4 py-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-lg mt-6 p-5 w-[90%] max-w-md text-center">
        <h2 className="text-lg font-semibold">{application?.branch || "Branch"}</h2>
        <div className="text-2xl my-2">⇆</div>
        <h2 className="text-lg font-semibold">{application?.office || "Office"}</h2>
        <div className="flex justify-between mt-4 text-sm">
          <p>From: {application?.fromDate || "--"}</p>
          <p>To: {application?.toDate || "--"}</p>
        </div>
      </div>

      <div className="mt-6 w-[90%] max-w-md border border-gray-300 rounded-lg p-5 flex flex-col items-center relative">
        <h3 className="font-medium text-gray-700 mb-3">Confirmed Bus Pass</h3>
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="w-full h-full bg-green-500 clip-inward-triangle"></div>
        </div>

        {showTicketDetails ? (
          <TicketDetails />
        ) : (
          <div className="w-[384px] h-[384px] flex justify-center items-center">
            <div className="w-72 h-72 bg-gray-200 flex items-center justify-center rounded">
              <img
                src={qrScanner}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleShowDetails}
        className="mt-6 w-[90%] max-w-md px-6 py-2 bg-purple-700 text-white rounded-lg shadow-md"
      >
        View Details
      </button>
    </div>
  );
};

export default BusServicePage;
