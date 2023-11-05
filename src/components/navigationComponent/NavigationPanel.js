import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LSNavigationIcons } from "../navIconsComponent/LSNavigationIcons";
import { MobileNavigationIcons } from "../navIconsComponent/MobileNavigationIcons";
import "./NavigationPanel.css";

export const NavigationPanel = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  return (
    <div className="navPanelContents">
      <div className="navBranding">TheSocial</div>

      <div className="userInfo smallHideableComp">
        <img
          src={user.user_profile_pic}
          className="homeProfilePic"
          alt="profile_picture"
          onClick={() => navigate("/profile")}
        />
        <div
          className="userName"
          onClick={() => navigate("/profile")}
        >{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      <div className="smallHideableComp">
        <LSNavigationIcons />
      </div>

      <div className="largeHideableComp">
        <MobileNavigationIcons />
      </div>
    </div>
  );
};
