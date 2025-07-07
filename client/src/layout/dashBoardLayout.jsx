import SideBar from "../component/sidebar/sideBar";
import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardlayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const DashBoardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="layout">
      <div className="menu">
        <SideBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
