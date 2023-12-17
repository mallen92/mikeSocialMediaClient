/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import imageCompression from "browser-image-compression";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";

/*--------------- REACT IMPORTS ---------------*/
import { useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import getCroppedImg from "../../../util/getCroppedImage";
import { authURL, imagesURL } from "../../../util/urls";
import { updateAccessToken, updateUserPic } from "../../../app/userSlice";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/SavePicWindow.css";

export const SavePicWindow = ({
  image,
  profileKey,
  viewedUser,
  updateViewedUser,
  showThisWindow,
  showLoadingWindow,
  showError,
}) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const dispatch = useDispatch();

  /*-------------------- REDUX STATE VARIABLES -------------------*/
  const user = useSelector((state) => state.userSlice.user);

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /*----------------------- FUNCTIONS ----------------------*/
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const uploadImageAPI = async (formData, token) => {
    try {
      const response = await axios.post(`${imagesURL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Profile-Cache-Key": `${profileKey}`,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  const newAccessTokenAPI = async () => {
    try {
      const response = await axios.get(`${authURL}/refresh`, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  const saveProfilePic = async () => {
    showThisWindow(false);
    showLoadingWindow(true);

    const uncompressedProfilePic = await getCroppedImg(
      image,
      croppedAreaPixels
    );
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
    };
    const newProfilePic = await imageCompression(
      uncompressedProfilePic,
      options
    );

    const formData = new FormData();
    formData.append("image", newProfilePic);

    try {
      let uploadResponse = await uploadImageAPI(formData, user.accessToken);

      if (uploadResponse.response?.status === 403) {
        const newAPIResponse = await newAccessTokenAPI();
        const newToken = newAPIResponse.data.accessToken;
        dispatch(updateAccessToken(newToken));
        uploadResponse = await uploadImageAPI(formData, newToken);
      }

      changeProfilePic(
        uploadResponse.data.picUrl,
        uploadResponse.data.picFilename
      );
      showLoadingWindow(false);
    } catch (error) {
      showError(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const changeProfilePic = (newPic, newPicFilename) => {
    dispatch(updateUserPic({ newPic, newPicFilename }));
    viewedUser.picUrl = newPic;
    viewedUser.picFilename = newPicFilename;
    updateViewedUser(viewedUser);
  };

  return (
    <div className="savePicWindowBody">
      <div className="cropperContainer">
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="savePicWindowBtns">
          <div
            className="savePicWindowBtn saveCropBtn"
            onClick={saveProfilePic}
          >
            Save
          </div>
          <div
            className="savePicWindowBtn cancelCropBtn"
            onClick={() => showThisWindow(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
