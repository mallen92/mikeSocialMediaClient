import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../../state/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import "../styles/LargeNavMenu.css";

export const LargeNavMenu = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="largeNavMenuBody">
      <div className="appUserInfo" onClick={() => navigate(`/${user.id}`)}>
        <img src={user.pic_url} className="appUserPic" alt="profile_picture" />
        <div className="appUserName">{user.full_name}</div>
      </div>

      <div className="navLinks">
        {location.pathname === "/" ? (
          <div className="navLink currentView" onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" />
            <div>Home</div>
          </div>
        ) : (
          <div className="navLink" onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" />
            <div>Home</div>
          </div>
        )}

        {location.pathname === "/notifications" ? (
          <div className="navLink currentView">
            <NotificationsIcon fontSize="large" />
            <div>Notifications</div>
          </div>
        ) : (
          <div className="navLink">
            <NotificationsIcon fontSize="large" />
            <div>Notifications</div>
          </div>
        )}

        {location.pathname === "/friends" ? (
          <div className="navLink currentView">
            <GroupIcon fontSize="large" />
            <div>Friends</div>
          </div>
        ) : (
          <div
            className="navLink"
            onClick={() => navigate(`/friends/${user.id}`)}
          >
            <GroupIcon fontSize="large" />
            <div>Friends</div>
          </div>
        )}

        {location.pathname === "/messages" ? (
          <div className="navLink currentView">
            <MailIcon fontSize="large" />
            <div>Messages</div>
          </div>
        ) : (
          <div className="navLink">
            <MailIcon fontSize="large" />
            <div>Messages</div>
          </div>
        )}

        {location.pathname === "/search" ? (
          <div className="navLink currentView">
            <SearchIcon fontSize="large" />
            <div>Search</div>
          </div>
        ) : (
          <div className="navLink">
            <SearchIcon fontSize="large" />
            <div>Search</div>
          </div>
        )}

        <div className="navLink" onClick={logOutUser}>
          <LogoutIcon fontSize="large" />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};