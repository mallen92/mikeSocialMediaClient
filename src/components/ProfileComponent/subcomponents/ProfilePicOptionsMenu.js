import { useSelector } from "react-redux";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfilePicOptionsMenu.css";

export const ProfilePicOptionsMenu = ({
  showMenu,
  uploadImage,
  confirmDelete,
}) => {
  const picFilename = useSelector((state) => state.userSlice.user.picFilename);

  return (
    <div className="profilePicOptions" onClick={() => showMenu(false)}>
      {picFilename.includes("default") ? (
        <>
          <div className="picOption" onClick={() => uploadImage(true)}>
            <UploadIcon />
            <div>Upload Picture</div>
          </div>
        </>
      ) : (
        <>
          <div className="picOption" onClick={() => uploadImage(true)}>
            <SyncIcon />
            <div>Change Picture</div>
          </div>

          <div
            className="picOption deletePicOption"
            onClick={() => confirmDelete(true)}
          >
            <DeleteIcon />
            <div>Delete Picture</div>
          </div>
        </>
      )}
    </div>
  );
};
