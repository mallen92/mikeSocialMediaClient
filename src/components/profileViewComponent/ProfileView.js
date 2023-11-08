import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { useDetectClickOutside } from "react-detect-click-outside";
import getCroppedImg from "../../util/getCroppedImage";
import { URL } from "../../util/url";
import { updateProfilePic } from "../../state/userSlice";
import { Loading } from "../loadingComponent/Loading";
import "./ProfileView.css";

export const ProfileView = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const [showUploadProfilePicModal, setShowUploadProfilePicModal] =
    useState(false);
  const [showCropPicAndSaveModal, setShowCropPicAndSaveModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const toggleProfilePicOptions = () => {
    if (showProfilePicOptions) setShowProfilePicOptions(false);
    else setShowProfilePicOptions(true);
  };

  const closeProfilePicOptions = () => {
    setShowProfilePicOptions(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeProfilePicOptions });

  const handleImageSrcChange = (e) => {
    const currentFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImageSrc(fileReader.result);
      setShowUploadProfilePicModal(false);
      setShowCropPicAndSaveModal(true);
    });

    fileReader.readAsDataURL(currentFile);
  };

  const openChangeProfilePicModal = () => {
    setShowUploadProfilePicModal(true);
  };

  const closeChangeProfilePicModal = () => {
    setShowUploadProfilePicModal(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cancelProfilePicChange = () => {
    setShowCropPicAndSaveModal(false);
    setShowProfilePicOptions(true);
  };

  const changeProfilePic = async () => {
    try {
      setShowCropPicAndSaveModal(false);
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
          onClick={toggleProfilePicOptions}
          ref={ref}
        />

        {showProfilePicOptions ? (
          <div className="profilePicOptions">
            <div className="picOption">
              <VisibilityIcon />
              <div>View Profile Picture</div>
            </div>

            <div className="picOption" onClick={openChangeProfilePicModal}>
              <SyncIcon />
              <div>Change Profile Picture</div>
            </div>

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

      {showUploadProfilePicModal ? (
        <div className="uploadProfilePicModal">
          <label className="picUploadPrompt">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageSrcChange}
            />
            <UploadIcon style={{ fontSize: "70px" }} />
            <div className="chooseFilePrompt">Choose a File</div>
          </label>
          <div className="modalBtns">
            <div
              className="modalBtn cancelBtn"
              onClick={closeChangeProfilePicModal}
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {showCropPicAndSaveModal ? (
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
              <div
                className="modalBtn cancelBtn"
                onClick={cancelProfilePicChange}
              >
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
