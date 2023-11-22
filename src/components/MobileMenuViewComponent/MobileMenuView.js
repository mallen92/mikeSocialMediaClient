import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../state/userSlice";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import "./MobileMenuView.css";

export const MobileMenuView = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mobileMenuViewBody">
      <div className="appUserInfo">
        <img src={user.pic_url} className="appUserPic" alt="profile_picture" />
        <div className="appUserName">{user.full_name}</div>
      </div>
      <div className="mobileMenuLinks">
        <div className="mobileMenuLink" onClick={() => navigate(`/${user.id}`)}>
          <AccountBoxIcon fontSize="large" />
          View Your Profile
        </div>
        <div className="mobileMenuLink" onClick={logOutUser}>
          <LogoutIcon fontSize="large" />
          Logout
        </div>
      </div>
    </div>
  );
};
