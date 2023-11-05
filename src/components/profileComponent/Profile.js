import { useState } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

export const Profile = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [showPicMenu, setShowPicMenu] = useState(false);

  const togglePicMenu = () => {
    if (showPicMenu) setShowPicMenu(false);
    else setShowPicMenu(true);
  };

  return (
    <div className="profileViewContents">
      <div className="profileUserInfo">
        <img
          src={user.user_profile_pic}
          className="profilePic"
          alt="profile_picture"
          onClick={togglePicMenu}
        />
        <div className="profileUserName">{`${user.user_first_name} ${user.user_last_name}`}</div>
        {showPicMenu ? (
          <div className="profilePicMenu">
            <div className="picOption">View Profile Picture</div>
            <div className="picOption">Change Profile Picture</div>
            <div className="picOption">Delete Profile Picture</div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div></div>
    </div>
  );
};
