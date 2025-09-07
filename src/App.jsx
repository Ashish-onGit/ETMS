import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Link } from "react-router-dom";
import Layout from "./Components/Layout";
import SplashScreen from "./Components/SplashScreen";
import BusServicePage from "./Pages/BusServicePage";
import CabService from "./Pages/CabService";
import GeoCodeYourselfPage from "./Pages/GeoCodeYourselfPage";
import AuthGuard from "./ProtectedRoute/AuthGuard";
import BusPassRequestStatus from "./Pages/BusPassRequestStatus";
import ApplyBusPass from "./Pages/ApplyBusPass";
import Settings from "./Pages/Settings";
import Loader from "./Components/Loader";

function App() {
  const [splashScreen, setSplashScreen] = useState(true);

  // this useeffect is to show splashscreen only once
  useEffect(() => {
    const timer = setTimeout(() => setSplashScreen(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (splashScreen) {
    return <SplashScreen />;
  }

  return (
    <>
      <Loader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route
            path="bus-service"
            element={
              <AuthGuard>
                <BusServicePage />
              </AuthGuard>
            }
          />
          <Route
            path="cab-service"
            element={
              <AuthGuard>
                <CabService />
              </AuthGuard>
            }
          />
          <Route
            path="geocode-yourself"
            element={
              <AuthGuard>
                <GeoCodeYourselfPage />
              </AuthGuard>
            }
          />
          <Route
            path="apply-bus-pass"
            element={
              <AuthGuard>
                <ApplyBusPass />
              </AuthGuard>
            }
          />
          <Route
            path="bus-pass-status"
            element={
              <AuthGuard>
                <BusPassRequestStatus />
              </AuthGuard>
            }
          />
          <Route
            path="settings"
            element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
