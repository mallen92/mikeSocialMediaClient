import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import "../../styles/nav.css";

export const NavigationPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="branding">TheSocial</div>
      <div className="icons">
        {location.pathname === "/" ? (
          <div className="currentComp">
            <HomeIcon fontSize="large" className="icon" />
          </div>
        ) : (
          <HomeIcon
            fontSize="large"
            className="icon"
            onClick={() => navigate("/")}
          />
        )}

        {location.pathname === "/friends" ? (
          <GroupIcon fontSize="large" className="icon currentComp" />
        ) : (
          <GroupIcon fontSize="large" className="icon" />
        )}

        {location.pathname === "/notifications" ? (
          <NotificationsIcon fontSize="large" className="icon currentComp" />
        ) : (
          <NotificationsIcon fontSize="large" className="icon" />
        )}

        {location.pathname === "/search" ? (
          <SearchIcon fontSize="large" className="icon currentComp" />
        ) : (
          <SearchIcon fontSize="large" className="icon" />
        )}

        {location.pathname === "/menu" ? (
          <div className="currentComp">
            <MenuIcon fontSize="large" className="icon" />
          </div>
        ) : (
          <MenuIcon
            fontSize="large"
            className="icon"
            onClick={() => navigate("/menu")}
          />
        )}
      </div>
    </>
  );
};
