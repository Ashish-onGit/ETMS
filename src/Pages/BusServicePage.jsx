import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qrScanner from "../assets/scan.png";
import TicketDetails from "../Components/TicketDetails";
import { loadApplication } from "../store/busPassSlice";
import TCSLogo from "../Components/TCSLogo";

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
  console.log(application);

  return (
    <>
      <div className="flex flex-col items-center justify-start  pb-8 mb-8 ">
        <div className="bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-lg mt-2 p-5 w-[90%] max-w-md text-center">
          <h2 className="text-lg font-semibold">
            {application?.selectedRoute || "Branch"}
          </h2>
          <div className="text-2xl my-2">⇆</div>
          <h2 className="text-lg font-semibold">
            {application?.office || "Office"}
          </h2>
          <div className="flex justify-between mt-4 text-sm">
            <p>Office In - 09:30 </p>
            <p>Office Out - 18:30 </p>
          </div>
        </div>

<div className="mt-6 w-[90%] max-w-md border border-gray-300 rounded-lg flex flex-col items-center relative overflow-hidden">
  {/* Inward Green Curve */}
  <div className="absolute top-0 left-0 w-16 h-16 bg-green-500 rotate-180 ">
    <div className="w-full h-full bg-white rounded-br-full"></div>
  </div>

  <h3 className="font-bold text-xl text-gray-700 mb-3 border-b-2 border-dashed border-gray-300">
    Confirmed Bus Pass
  </h3>

  <div className="qr-and-details-area rounded-lg w-full">
    {showTicketDetails ? (
      <TicketDetails />
    ) : (
      <div className="flex justify-center items-center p-4 pt-8">
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
</div>


        <button
          onClick={handleShowDetails}
          className="mt-6 w-[90%] max-w-md px-6 py-2 bg-purple-700 text-white rounded-lg shadow-md"
        >
          {showTicketDetails ? "View QR" : "View Details"}
        </button>
      </div>
      <TCSLogo />
    </>
  );
};

export default BusServicePage;
