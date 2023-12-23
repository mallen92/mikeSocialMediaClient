/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*-------------- CONFIG IMPORTS --------------*/
import { unsetUser } from "../../app/userSlice";
import { authURL } from "../../util/urls";

/*-------------- ICON IMPORTS --------------*/
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

/*-------------- STYLE IMPORTS --------------*/
import "./MobileMenu.css";

export const MobileMenu = ({ setError }) => {
  /*--------- HOOKS ---------*/
  const dispatch = useDispatch();
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
    <div className="mobileMenu">
      <div className="appUserInfo">
        <img src={user.picUrl} className="appUserPic" alt="profile_picture" />
        <div className="appUserName">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="mobileMenuLinks">
        <div className="mobileMenuLink" onClick={() => navigate(`/${user.id}`)}>
          <AccountBoxIcon fontSize="large" />
          View Your Profile
        </div>
        <div className="mobileMenuLink" onClick={() => navigate("/search")}>
          <SearchIcon fontSize="large" />
          Search for Users
        </div>
        <div className="mobileMenuLink" onClick={logOutUser}>
          <LogoutIcon fontSize="large" />
          Logout
        </div>
      </div>
    </div>
  );
};
