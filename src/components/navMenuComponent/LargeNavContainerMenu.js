import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../state/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import "./LargeNavContainerMenu.css";

export const LargeNavContainerMenu = () => {
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
    <>
      <div className="navContainerUserInfo">
        <img
          src={user.profile_pic_url}
          className="homeProfilePic"
          alt="profile_picture"
          onClick={() => navigate(`/${user.user_id}`)}
        />

        <div
          className="navContainerUserName"
          onClick={() => navigate(`/${user.user_id}`)}
        >
          {`${user.user_first_name} ${user.user_last_name}`}
        </div>
      </div>

      <div className="lsIconsContainer">
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
    </>
  );
};
