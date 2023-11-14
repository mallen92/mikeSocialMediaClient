import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { URL } from "../util/url";
import getCroppedImg from "../util/getCroppedImage";
import { updateProfilePic } from "../state/userSlice";

export const CropAndSavePicWindow = ({
  image,
  token,
  updateViewedUser,
  showThisWindow,
  showLoadingWindow,
  showErrorWindow,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const dispatch = useDispatch();

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
          Authorization: `Bearer ${token}`,
        },
      });

      changeProfilePic(response.data);
      showLoadingWindow(false);
    } catch (error) {
      showErrorWindow(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const changeProfilePic = (newPic) => {
    /* Update the current state we're using */
    dispatch(updateProfilePic(newPic));

    /* Update the state stored in our current session  */
    let authUser = JSON.parse(window.localStorage.getItem("user"));
    authUser.user_profile_pic = newPic;
    window.localStorage.setItem("user", JSON.stringify(authUser));

    /* If we have viewed our own profile, we need to update our information
    that was cached the first time we viewed it. */
    let visitedProfilesCache = JSON.parse(
      window.localStorage.getItem("visited_profiles")
    );
    let userFound = false;

    for (let i = 0; i < visitedProfilesCache.length; i++) {
      if (visitedProfilesCache[i].user_id === user.user_id) {
        userFound = true;
        visitedProfilesCache[i].user_profile_pic = newPic;
        updateViewedUser(visitedProfilesCache[i]);
      }
      if (userFound) break;
    }

    window.localStorage.setItem(
      "visited_profiles",
      JSON.stringify(visitedProfilesCache)
    );
  };

  return (
    <div className="cropAndSavePicWindow">
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

        <div className="cropandSavePicWindowBtns">
          <div
            className="cropandSavePicWindowBtn saveCropBtn"
            onClick={saveProfilePic}
          >
            Save
          </div>
          <div
            className="cropandSavePicWindowBtn cancelCropBtn"
            onClick={() => showThisWindow(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
