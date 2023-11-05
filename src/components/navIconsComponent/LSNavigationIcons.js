import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../state/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import "./LSNavigationIcons.css";

export const LSNavigationIcons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div class="lsIconsContainer">
      {location.pathname === "/" ? (
        <div
          className="navTab lsCurrentComponent"
          onClick={() => navigate("/")}
        >
          <HomeIcon fontSize="large" />
          <div>Home</div>
        </div>
      ) : (
        <div className="navTab" onClick={() => navigate("/")}>
          <HomeIcon fontSize="large" />
          <div>Home</div>
        </div>
      )}

      {location.pathname === "/friends" ? (
        <div className="navTab lsCurrentComponent">
          <GroupIcon fontSize="large" />
          <div>Friends</div>
        </div>
      ) : (
        <div className="navTab">
          <GroupIcon fontSize="large" />
          <div>Friends</div>
        </div>
      )}

      {location.pathname === "/notifications" ? (
        <div className="navTab lsCurrentComponent">
          <NotificationsIcon fontSize="large" />
          <div>Notifications</div>
        </div>
      ) : (
        <div className="navTab">
          <NotificationsIcon fontSize="large" />
          <div>Notifications</div>
        </div>
      )}

      {location.pathname === "/search" ? (
        <div className="navTab lsCurrentComponent">
          <SearchIcon fontSize="large" />
          <div>Search</div>
        </div>
      ) : (
        <div className="navTab">
          <SearchIcon fontSize="large" />
          <div>Search</div>
        </div>
      )}

      <div className="navTab" onClick={logOutUser}>
        <LogoutIcon fontSize="large" />
        <div>Logout</div>
      </div>
    </div>
  );
};
