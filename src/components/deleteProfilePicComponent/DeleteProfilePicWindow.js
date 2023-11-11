import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../../state/userSlice";
import axios from "axios";
import { URL } from "../../util/url";

export const DeleteProfilePicWindow = ({
  closeWindow,
  showLoadingWindow,
  showErrorWindow,
  updateViewedUser,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  const deleteProfilePic = async () => {
    try {
      closeWindow(false);
      showLoadingWindow(true);

      const response = await axios.delete(`${URL}/images`, {
        headers: {
          Authorization: `Bearer ${user.user_token}`,
        },
      });

      saveNewProfilePic(response.data);
      showLoadingWindow(false);
    } catch (error) {
      showErrorWindow(error.response.data.message);
      showLoadingWindow(false);
    }
  };

  const saveNewProfilePic = (newPic) => {
    dispatch(updateProfilePic(newPic));

    let authUser = JSON.parse(window.localStorage.getItem("user"));
    authUser.user_profile_pic = newPic;
    window.localStorage.setItem("user", JSON.stringify(authUser));

    let visitedProfilesCache = JSON.parse(
      window.localStorage.getItem("visited_profiles")
    );
    let userFound = false;

    for (let i = 0; i < visitedProfilesCache.length; i++) {
      const visitedProfile = visitedProfilesCache[i];

      if (visitedProfile.user_id === user.user_id) {
        userFound = true;
        visitedProfile.user_profile_pic = newPic;
        updateViewedUser(visitedProfile);
      }
      if (userFound) break;
    }

    window.localStorage.setItem(
      "visited_profiles",
      JSON.stringify(visitedProfilesCache)
    );
  };

  return (
    <div className="deleteConfWindow">
      <div className="deleteConfMsg">
        Are you sure you want to delete your profile picture?
      </div>
      <div className="deleteConfWindowBtns">
        <div
          className="deleteConfWindowBtn confirmDeleteBtn"
          onClick={deleteProfilePic}
        >
          Yes
        </div>
        <div
          className="deleteConfWindowBtn cancelDeleteBtn"
          onClick={() => closeWindow(false)}
        >
          No
        </div>
      </div>
    </div>
  );
};
