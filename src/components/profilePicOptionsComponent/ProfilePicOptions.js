import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProfilePicOptions = ({
  closeMenu,
  uploadImage,
  openDeleteConfWindow,
}) => {
  return (
    <div className="profilePicOptions" onClick={() => closeMenu(false)}>
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
    </div>
  );
};
