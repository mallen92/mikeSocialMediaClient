import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProfilePicOptions = () => {
  const sayHello = () => {
    console.log("Hello!");
  };

  return (
    <div className="profilePicOptions">
      <div className="picOption">
        <VisibilityIcon />
        <div>View Profile Picture</div>
      </div>

      <div className="picOption" onClick={sayHello}>
        <SyncIcon />
        <div>Change Profile Picture</div>
      </div>

      <div className="picOption deletePicPrompt">
        <DeleteIcon />
        <div>Delete Profile Picture</div>
      </div>
    </div>
  );
};
