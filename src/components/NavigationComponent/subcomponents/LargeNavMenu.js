/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*-------------- CONFIG IMPORTS --------------*/
import { unsetUser } from "../../../app/userSlice";
import { authURL } from "../../../util/urls";

/*-------------- ICON IMPORTS --------------*/
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/LargeNavMenu.css";

export const LargeNavMenu = ({ setError }) => {
  /*---------- HOOKS ----------*/
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /*---------- REACT STATE VARIABLES ----------*/
  const user = useSelector((state) => state.userSlice.user);

  /*--------- FUNCTIONS ---------*/
  const logOutUser = async () => {
    try {
      await axios.post(`${authURL}/logout`, null, {
        withCredentials: true,
      });

      dispatch(unsetUser());
      localStorage.clear();
      navigate("/access");
    } catch (error) {
      setError(error);
    }
  };

  /*------------------ JSX ------------------*/
  return (
    <div className="largeNavMenuBody">
      <div
        className="appUserInfo"
        onClick={() => navigate(`/${user.username}`)}
      >
        <img src={user.picUrl} className="appUserPic" alt="profile_picture" />
        <div className="appUserName">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="navLinks">
        {location.pathname === "/" ? (
          <div className="navLink currentView">
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

        {location.pathname === `/${user.username}/friends` ? (
          <div className="navLink currentView">
            <GroupIcon fontSize="large" />
            <div>Friends</div>
          </div>
        ) : (
          <div
            className="navLink"
            onClick={() => navigate(`/${user.username}/friends`)}
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
          <div className="navLink" onClick={() => navigate("/search")}>
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
