import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import "./MobileNavigationIcons.css";

export const MobileNavigationIcons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div class="mobileIconsContainer">
      {location.pathname === "/" ? (
        <div className="mobileNavTab currentComp">
          <HomeIcon fontSize="large" className="icon" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <HomeIcon
            fontSize="large"
            className="icon"
            onClick={() => navigate("/")}
          />
        </div>
      )}

      {location.pathname === "/friends" ? (
        <div className="mobileNavTab">
          <GroupIcon fontSize="large" className="icon currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <GroupIcon fontSize="large" className="icon" />
        </div>
      )}

      {location.pathname === "/notifications" ? (
        <div className="mobileNavTab">
          <NotificationsIcon fontSize="large" className="icon currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <NotificationsIcon fontSize="large" className="icon" />
        </div>
      )}

      {location.pathname === "/search" ? (
        <div className="mobileNavTab">
          <SearchIcon fontSize="large" className="icon currentComp" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <SearchIcon fontSize="large" className="icon" />
        </div>
      )}

      {location.pathname === "/menu" ? (
        <div className="mobileNavTab currentComp">
          <MenuIcon fontSize="large" className="icon" />
        </div>
      ) : (
        <div className="mobileNavTab">
          <MenuIcon
            fontSize="large"
            className="icon"
            onClick={() => navigate("/menu")}
          />
        </div>
      )}
    </div>
  );
};
