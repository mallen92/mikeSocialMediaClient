import { useState } from "react";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Profile.css";

export const Profile = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [showPicMenu, setShowPicMenu] = useState(false);
  const [showPicChangeBtn, setShowPicChangeBtn] = useState(false);

  const togglePicMenu = () => {
    if (showPicMenu) setShowPicMenu(false);
    else setShowPicMenu(true);
  };

  const togglePicChangeBtn = () => {
    if (showPicChangeBtn) setShowPicChangeBtn(false);
    else setShowPicChangeBtn(true);
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
            <div className="picOption">
              <VisibilityIcon />
              <div>View Profile Picture</div>
            </div>
            <div className="picOption" onClick={togglePicChangeBtn}>
              <SyncIcon />
              <div>Change Profile Picture</div>
            </div>
            {showPicChangeBtn ? (
              <label className="picOption picUploadPrompt">
                <input type="file" accept="image/png, image/jpeg" />
                <UploadIcon />
                <div>Choose a File</div>
              </label>
            ) : (
              <></>
            )}
            <div className="picOption deletePicPrompt">
              <DeleteIcon />
              <div>Delete Profile Picture</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div></div>
    </div>
  );
};
