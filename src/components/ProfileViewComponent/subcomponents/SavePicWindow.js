import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { URL } from "../../../util/url";
import getCroppedImg from "../../../util/getCroppedImage";
import { updateUserPic } from "../../../state/userSlice";
import "../styles/SavePicWindow.css";

export const SavePicWindow = ({
  image,
  updateViewedUser,
  showThisWindow,
  showLoadingWindow,
  showError,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const dispatch = useDispatch();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveProfilePic = async () => {
    try {
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
      const response = await axios.post(`${URL}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      changeProfilePic(response.data.picUrl, response.data.picFilename);
      showLoadingWindow(false);
    } catch (error) {
      showError(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const changeProfilePic = (newPic, newPicFilename) => {
    /* Update the current state we're using */
    dispatch(updateUserPic({ newPic, newPicFilename }));

    /* Update the state stored in our current session  */
    let authUser = JSON.parse(window.localStorage.getItem("user"));
    authUser.pic_url = newPic;
    authUser.pic_filename = newPicFilename;
    window.localStorage.setItem("user", JSON.stringify(authUser));

    /* If we have viewed our own profile, we need to update our information
    that was cached the first time we viewed it. */
    let visitedProfilesCache = JSON.parse(
      window.localStorage.getItem("visited_profiles")
    );

    for (let i = 0; i < visitedProfilesCache.length; i++) {
      if (visitedProfilesCache[i].id === user.id) {
        visitedProfilesCache[i].pic_filename = newPicFilename;
        visitedProfilesCache[i].pic_url = newPic;
        updateViewedUser(visitedProfilesCache[i]);
        break;
      }
    }

    window.localStorage.setItem(
      "visited_profiles",
      JSON.stringify(visitedProfilesCache)
    );
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
