import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../../util/url";
import { updateUserPic } from "../../../state/userSlice";
import "../styles/DeletePicWindow.css";

export const DeletePicWindow = ({
  token,
  updateViewedUser,
  showThisWindow,
  showLoadingWindow,
  showError,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  const deleteProfilePic = async () => {
    try {
      showThisWindow(false);
      showLoadingWindow(true);

      const response = await axios.delete(`${URL}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      revertProfilePic(response.data.picUrl, response.data.picFilename);
      showLoadingWindow(false);
    } catch (error) {
      showError(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const revertProfilePic = (newPic, newPicFilename) => {
    dispatch(updateUserPic({ newPic, newPicFilename }));

    let authUser = JSON.parse(window.localStorage.getItem("user"));
    authUser.pic_url = newPic;
    authUser.pic_filename = newPicFilename;
    window.localStorage.setItem("user", JSON.stringify(authUser));

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
