import { useState } from "react";
import { useSelector } from "react-redux";
import ReactCrop from "react-image-crop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Profile.css";
import "react-image-crop/dist/ReactCrop.css";

export const Profile = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [showPicMenu, setShowPicMenu] = useState(false);
  const [showPicChangeBtn, setShowPicChangeBtn] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({aspect: 1/1});
  const [completeCrop, setCompleteCrop] = useState(null);

  const togglePicMenu = () => {
    if (showPicMenu) setShowPicMenu(false);
    else setShowPicMenu(true);
  };

  const togglePicChangeBtn = () => {
    if (showPicChangeBtn) setShowPicChangeBtn(false);
    else setShowPicChangeBtn(true);
  };

  const setImage = (event) => {
    const image = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImgSrc(fileReader.result);
      setShowImgModal(true);
      setShowPicMenu(false);
    });
    fileReader.readAsDataURL(image);
  };

  const cancelImgCrop = () => {
    setShowImgModal(false);
    setShowPicMenu(true);
  }

  return (
    <div className="profileViewContents">
      <div className="profileUserInfo">
        <img src={user.user_profile_pic} className="profilePic" alt="profile_picture" onClick={togglePicMenu} />
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
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onInput={(e) => setImage(e)}
                />
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

        {showImgModal ? (
          <div className="imgModal">
            <div className="modalContent">
              <div className="picContainer">
                <ReactCrop crop={crop} onChange={(e) => setCrop(e)} onComplete={(e) => {setCompleteCrop(e); console.log(e)} }>
                  <img src={imgSrc} className="uploadedPic" alt="uploaded_pic" />
                </ReactCrop>
              </div>
              <div className="modalBtns">
                <div className="modalBtn saveBtn" onClick={cancelImgCrop}>Save</div>
                <div className="modalBtn cancelBtn" onClick={cancelImgCrop}>Cancel</div>
              </div>

            </div>
          </div>
        ) : (<></>)
        }
      </div>

      <div></div>
    </div>
  );
};
