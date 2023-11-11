import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LargeNavContainerMenu } from "../navMenuComponent/LargeNavContainerMenu";
import { MobileNavContainerMenu } from "../navMenuComponent/MobileNavContainerMenu";
import "./NavContainer.css";

export const NavContainer = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  return (
    <div className="navPanelContents">
      <div className="navBranding">TheSocial</div>

      <div className="navContainerUserInfo hideOnMobile">
        <img
          src={user.user_profile_pic}
          className="homeProfilePic"
          alt="profile_picture"
          onClick={() => navigate(`/profile/${user.user_id}`)}
        />
        <div
          className="navContainerUserName"
          onClick={() => navigate(`/profile/${user.user_id}`)}
        >{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      <div className="hideOnMobile">
        <LargeNavContainerMenu />
      </div>

      <div className="hideOnLarge">
        <MobileNavContainerMenu />
      </div>
    </div>
  );
};
