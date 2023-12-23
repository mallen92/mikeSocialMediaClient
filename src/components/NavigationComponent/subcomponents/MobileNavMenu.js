/*------------- 3RD PARTY IMPORTS -------------*/
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*-------------- ICON IMPORTS --------------*/
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/MobileNavMenu.css";

export const MobileNavMenu = () => {
  /*----------- HOOKS -----------*/
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation();
  const navigate = useNavigate();

  /*------------------ JSX ------------------*/
  return (
    <div className="mobileNavMenuBody">
      {location.pathname === "/" ? (
        <div className="mobileNavLink currentView">
          <HomeIcon fontSize="large" />
        </div>
      ) : (
        <div className="mobileNavLink">
          <HomeIcon fontSize="large" />
        </div>
      )}

      {location.pathname === `/${user.id}/friends` ? (
        <div className="mobileNavLink currentView">
          <GroupIcon fontSize="large" className="currentView" />
        </div>
      ) : (
        <div
          className="mobileNavLink"
          onClick={() => navigate(`/${user.id}/friends`)}
        >
          <GroupIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/notifications" ? (
        <div className="mobileNavLink">
          <NotificationsIcon fontSize="large" className="currentView" />
        </div>
      ) : (
        <div className="mobileNavLink">
          <NotificationsIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/messages" ? (
        <div className="mobileNavLink">
          <MailIcon fontSize="large" className="currentView" />
        </div>
      ) : (
        <div className="mobileNavLink">
          <MailIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/menu" ? (
        <div
          className="lastMobileNavLink currentView"
          onClick={() => navigate("/menu")}
        >
          <MenuIcon fontSize="large" />
        </div>
      ) : (
        <div className="lastMobileNavLink" onClick={() => navigate("/menu")}>
          <MenuIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};
