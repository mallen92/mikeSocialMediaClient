import { useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProfilePicOptions = ({ setShowProfilePicOptions }) => {
  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);

  const sayHello = () => {
    console.log("Hello!");
  };

  return (
    <div
      className="profilePicOptions"
      onClick={() => setShowProfilePicOptions(false)}
    >
      <div className="picOption" onClick={sayHello}>
        <SyncIcon />
        <div>Change Profile Picture</div>
      </div>

      <div
        className="picOption deletePicOption"
        onClick={() => setShowDeleteConfWindow(true)}
      >
        <DeleteIcon />
        <div>Delete Profile Picture</div>
      </div>
    </div>
  );
};
