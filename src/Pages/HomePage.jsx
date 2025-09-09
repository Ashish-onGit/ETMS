import React from "react";
import { Bus, Car, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex flex-col items-center pt-10  h-[93vh] bg-gradient-to-b from-[#3d4fff] to-[#673ab7] text-white ">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-lg">Welcome To</h2>
        <h1 className="text-3xl font-bold">TCS eTMS</h1>
        <p className="mt-2 font-semibold">PLEASE SELECT YOUR SERVICE</p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col items-end space-y-6 px-6 pr-0">
        {/* Bus Services */}
        <Link
          to="bus-service"
          className="w-4/5 flex items-center gap-4 bg-[#20155c] py-7 px-6 rounded-l-full shadow-md border border-white hover:scale-105 transition-transform"
        >
          <Bus className="w-6 h-6" />
          <span className="text-xl font-semibold">Bus Services</span>
        </Link>

        {/* Cab Services */}
        <Link
          to="cab-service"
          className="w-4/5 flex items-center gap-4 bg-[#20155c] py-7 px-6 rounded-l-full shadow-md border border-white hover:scale-105 transition-transform"
        >
          <Car className="w-6 h-6" />
          <span className="text-xl font-semibold">Cab Services</span>
        </Link>

        {/* Geocode Yourself */}
        <Link
          to="geocode-yourself"
          className="w-4/5 flex items-center gap-4 bg-[#20155c] py-7 px-6 rounded-l-full shadow-md border border-white hover:scale-105 transition-transform"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xl font-semibold">Geocode Yourself</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
