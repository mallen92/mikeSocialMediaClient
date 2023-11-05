import { useSelector } from "react-redux";
import { LSNavigationIcons } from "../navIconsComponent/LSNavigationIcons";
import { MobileNavigationIcons } from "../navIconsComponent/MobileNavigationIcons";
import "./NavigationPanel.css";

export const NavigationPanel = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className="navPanelContents">
      <div className="navBranding">TheSocial</div>

      <div className="userInfo smallHideableComp">
        <img
          src={user.user_profile_pic}
          className="profilePic"
          alt="profile_picture"
        />
        <div className="userName">{`${user.user_first_name} ${user.user_last_name}`}</div>
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
