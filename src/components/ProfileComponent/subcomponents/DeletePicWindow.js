/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

/*-------------- CONFIG IMPORTS --------------*/
import { authURL, imagesURL } from "../../../util/urls";
import { updateAccessToken, updateUserPic } from "../../../app/userSlice";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/DeletePicWindow.css";

export const DeletePicWindow = ({
  profileKey,
  viewedUser,
  updateViewedUser,
  showThisWindow,
  showLoadingWindow,
  showError,
}) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  /*----------------------- FUNCTIONS ----------------------*/
  const deleteImageAPI = async (token) => {
    try {
      const response = await axios.delete(`${imagesURL}`, {
        headers: {
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

  const deleteProfilePic = async () => {
    showThisWindow(false);
    showLoadingWindow(true);

    try {
      let deleteResponse = await deleteImageAPI(user.accessToken);

      if (deleteResponse.response?.status === 403) {
        const newAPIResponse = await newAccessTokenAPI();
        const newToken = newAPIResponse.data.accessToken;
        dispatch(updateAccessToken(newToken));
        deleteResponse = await deleteImageAPI(newToken);
      }

      revertProfilePic(
        deleteResponse.data.picUrl,
        deleteResponse.data.picFilename
      );
      showLoadingWindow(false);
    } catch (error) {
      showError(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const revertProfilePic = (newPic, newPicFilename) => {
    dispatch(updateUserPic({ newPic, newPicFilename }));
    viewedUser.picUrl = newPic;
    viewedUser.picFilename = newPicFilename;
    updateViewedUser(viewedUser);
  };

  return (
    <div className="deletePicWindow">
      <div className="deletePicMsg">
        Are you sure you want to delete your profile picture?
      </div>
      <div className="deletePicWindowBtns">
        <div
          className="deletePicWindowBtn confirmDeleteBtn"
          onClick={deleteProfilePic}
        >
          Yes
        </div>
        <div
          className="deletePicWindowBtn cancelDeleteBtn"
          onClick={() => showThisWindow(false)}
        >
          No
        </div>
      </div>
    </div>
  );
};
