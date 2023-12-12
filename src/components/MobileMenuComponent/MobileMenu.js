/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/*-------------- CONFIG IMPORTS --------------*/
import { unsetUser } from "../../app/userSlice";
import { URL } from "../../util/url";

/*-------------- ICON IMPORTS --------------*/
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

/*-------------- STYLE IMPORTS --------------*/
import "./MobileMenu.css";

export const MobileMenu = ({ setError }) => {
  /*--------- CONFIGURATIONS ---------*/
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*--------- STATE VARIABLES ---------*/
  const user = useSelector((state) => state.userSlice.user);

  /*--------- FUNCTIONS ---------*/
  const logOutUser = async () => {
    try {
      await axios.post(`${URL}/auth/logout`, null, {
        withCredentials: true,
      });

      dispatch(unsetUser());
      localStorage.clear();
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  /*------------------ JSX ------------------*/
  return (
    <div className="mobileMenuViewBody">
      <div className="appUserInfo">
        <img src={user.picUrl} className="appUserPic" alt="profile_picture" />
        <div className="appUserName">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="mobileMenuLinks">
        <div
          className="mobileMenuLink"
          onClick={() => navigate(`/ms/${user.id}`)}
        >
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