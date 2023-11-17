import { useSelector } from "react-redux";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProfilePicOptions = ({
  closeMenu,
  uploadImage,
  openDeleteConfWindow,
}) => {
  const profilePicUrl = useSelector(
    (state) => state.userSlice.user.user_profile_pic
  );

  return (
    <div className="profilePicOptions" onClick={() => closeMenu(false)}>
      {profilePicUrl.includes("default") ? (
        <>
          <div className="picOption" onClick={() => uploadImage(true)}>
            <UploadIcon />
            <div>Upload Profile Picture</div>
          </div>
        </>
      ) : (
        <>
          <div className="picOption" onClick={() => uploadImage(true)}>
            <SyncIcon />
            <div>Change Profile Picture</div>
          </div>

          <div
            className="picOption deletePicOption"
            onClick={() => openDeleteConfWindow(true)}
          >
            <DeleteIcon />
            <div>Delete Profile Picture</div>
          </div>
        </>
      )}
    </div>
  );
};
