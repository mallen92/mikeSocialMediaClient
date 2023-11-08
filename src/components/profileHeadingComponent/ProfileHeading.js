import Cropper from "react-easy-crop";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import imageCompression from "browser-image-compression";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getCroppedImg from "../../util/getCroppedImage";
import { URL } from "../../util/url";
import { updateProfilePic } from "../../state/userSlice";
import { Loading } from "../loadingComponent/Loading";
import "./ProfileHeading.css";

export const ProfileHeading = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const [showPicMenu, setShowPicMenu] = useState(false);
  const [showPicChangeBtn, setShowPicChangeBtn] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const togglePicMenu = () => {
    if (showPicMenu) setShowPicMenu(false);
    else setShowPicMenu(true);
  };

  const togglePicChangeBtn = () => {
    if (showPicChangeBtn) setShowPicChangeBtn(false);
    else setShowPicChangeBtn(true);
  };

  const handleImageSrcChange = (e) => {
    const currentFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImageSrc(fileReader.result);
      setShowPicMenu(false);
      setShowImgModal(true);
    });

    fileReader.readAsDataURL(currentFile);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cancelImgCrop = () => {
    setShowImgModal(false);
    setShowPicMenu(true);
  };

  const changeProfilePic = async () => {
    try {
      setShowImgModal(false);
      setShowPicMenu(false);
      setShowLoading(true);

      const uncompressedProfilePic = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };

      const newProfilePic = await imageCompression(
        uncompressedProfilePic,
        options
      );

      const formData = new FormData();
      formData.append("image", newProfilePic);

      const response = await axios.post(`${URL}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.user_token}`,
        },
      });

      dispatch(updateProfilePic(response.data));
      let localUser = JSON.parse(window.localStorage.getItem("user"));
      localUser.user_profile_pic = response.data;
      window.localStorage.setItem("user", JSON.stringify(localUser));
      setShowLoading(false);
    } catch (e) {
      console.error(e);
    }
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
                  onChange={handleImageSrcChange}
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

        <div className="profileUserName">{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      {showImgModal ? (
        <div className="imageModal">
          <div className="cropperContainer">
            <div className="cropper">
              <Cropper
                className="cropper"
                image={imageSrc}
                crop={crop}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="modalBtns">
              <div className="modalBtn saveBtn" onClick={changeProfilePic}>
                Save
              </div>
              <div className="modalBtn cancelBtn" onClick={cancelImgCrop}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {showLoading ? (
        <div className="loadingModal">
          <div className="loadingGifContainer">
            <Loading />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div></div>
    </div>
  );
};
