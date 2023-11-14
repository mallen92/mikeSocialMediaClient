import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../../state/userSlice";
import { useSelector } from "react-redux";
import "./MobileMenu.css";

export const MobileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mobileMenuContents">
      <div className="mobileMenuHeader">Menu</div>

      <div className="userInfoMobile">
        <img
          src={user.user_profile_pic}
          className="mobileProfilePic"
          alt="profile_picture"
        />
        <div className="userName">{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      <div
        className="menuButton"
        onClick={() => navigate(`/profile/${user.user_id}`)}
      >
        View Your Profile
      </div>

      <div className="menuButton">Search</div>

      <div className="menuButton" onClick={logOutUser}>
        Log Out
      </div>
    </div>
  );
};
