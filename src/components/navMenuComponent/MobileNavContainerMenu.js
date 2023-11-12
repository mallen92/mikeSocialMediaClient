import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import "./MobileNavContainerMenu.css";

export const MobileNavContainerMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mobileIconsContainer">
      {location.pathname === "/" ? (
        <div className="mobileNavTab currentComp" onClick={() => navigate("/")}>
          <HomeIcon fontSize="large" />
        </div>
      ) : (
        <div className="mobileNavTab" onClick={() => navigate("/")}>
          <HomeIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/friends" ? (
        <div className="mobileNavTab">
          <GroupIcon fontSize="large" className="currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <GroupIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/notifications" ? (
        <div className="mobileNavTab">
          <NotificationsIcon fontSize="large" className="currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <NotificationsIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/messages" ? (
        <div className="mobileNavTab">
          <MailIcon fontSize="large" className="currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <MailIcon fontSize="large" />
        </div>
      )}

      {location.pathname === "/menu" ? (
        <div
          className="mobileNavTab currentComp"
          onClick={() => navigate("/menu")}
        >
          <MenuIcon fontSize="large" />
        </div>
      ) : (
        <div className="mobileNavTab" onClick={() => navigate("/menu")}>
          <MenuIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};
