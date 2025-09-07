import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  BusFront,
  ClipboardList,
  Settings,
  LogOut,
  Home,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { logout, setLoading } from "../store/authSlice";

import Loader from "./Loader";

const Navbar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const username = user?.fullName;
  console.log(user);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Map path to readable page name
  const pageTitles = {
    "/": "Home",
    "/login": "Login",
    "/signup": "Signup",
    "/apply-bus-pass": "Apply Bus Pass",
    "/bus-pass-status": "Bus Pass Request Status",
    "/settings": "Settings",
    "/bus-service": "Digital Bus Pass",
  };

  const currentPage = pageTitles[location.pathname] || "Page";

  // Menu items based on auth status
  const menuItems = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    !isAuthenticated && {
      to: "/login",
      label: "Login",
      icon: <LogIn size={18} />,
    },
    !isAuthenticated && {
      to: "/signup",
      label: "Signup",
      icon: <UserPlus size={18} />,
    },
    {
      to: "/apply-bus-pass",
      label: "Apply Bus Pass",
      icon: <BusFront size={18} />,
    },
    {
      to: "/bus-pass-status",
      label: "Bus Pass Request Status",
      icon: <ClipboardList size={18} />,
    },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ].filter(Boolean); 
  // Logout handler with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");


    if (confirmLogout) {
      dispatch(setLoading(true));
      dispatch(logout());

      setTimeout(() => {
        dispatch(setLoading(false));
        navigate("/");
      }, 1500);
    }
  };

  return (
    <>
      <nav className="bg-[#3d4fff] text-white px-6 py-4 relative">
        <div className="flex items-center">
          {/* Hamburger always visible */}
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="pl-4 text-lg font-semibold text-white">
            {currentPage}
          </div>
        </div>

        {/* Mobile Side Menu */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header with Username */}
            <div className="flex justify-between items-center mb-4 bg-[#3d4fff] text-white">
              <div className="flex items-center gap-2 p-4">
                <span className="font-semibold">Hi,</span>
                <span className="font-semibold">{username}</span>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="space-y-6 flex-1 p-4">
              {menuItems.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={toggleMenu}
                    className="flex items-center gap-4 hover:underline"
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Logout at Bottom */}
            {isAuthenticated && (
              <div className="mt-auto p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:underline text-red-600 bg-red-100 p-2 rounded-md w-full"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {isLoggingOut && <Loader />}
    </>
  );
};

export default Navbar;
