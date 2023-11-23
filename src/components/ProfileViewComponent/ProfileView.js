import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import { ProfilePic } from "./subcomponents/ProfilePic";
import { UploadImageWindow } from "./subcomponents/UploadImageWindow";
import { SavePicWindow } from "./subcomponents/SavePicWindow";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import placeholder from "./images/Placeholder.png";
import "./styles/ProfileView.css";

export const ProfileView = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [requestedUser, setRequestedUser] = useState({});
  const [image, setImage] = useState(null);
  const [friendStatus, setFriendStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  const userToken = user.token;
  const requestedUserId = location.pathname.split("/")[1];

  /*------------------------- 1. LOADING PROFILE ------------------------*/

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);

    if (visitedProfilesCache) {
      let userFound = false;

      for (let i = 0; i < visitedProfilesArray.length; i++) {
        const visitedProfile = visitedProfilesArray[i];

        if (visitedProfile.id === requestedUserId) {
          setRequestedUser(visitedProfile);
          setLoading(false);
          userFound = true;
          break;
        }
      }

      if (!userFound) {
        /* Check to see how many items are already in the visited profiles cache.
        If there are already three, reset the cache to an empty array. */
        if (visitedProfilesArray.length === 3) visitedProfilesArray = [];
        window.localStorage.setItem(
          "visited_profiles",
          JSON.stringify(visitedProfilesArray)
        );

        axios
          .get(`${URL}/users?id=${requestedUserId}`)
          .then((response) => {
            setRequestedUser(response.data);
            setLoading(false);

            visitedProfilesArray.push(response.data);
            window.localStorage.setItem(
              "visited_profiles",
              JSON.stringify(visitedProfilesArray)
            );
          })
          .catch((error) => {
            setErrorMessage(error.response.data.message);
          });
      }
    } else {
      axios
        .get(`${URL}/users?id=${requestedUserId}`)
        .then((response) => {
          setRequestedUser(response.data);
          setLoading(false);

          const visitedUsers = [response.data];
          window.localStorage.setItem(
            "visited_profiles",
            JSON.stringify(visitedUsers)
          );
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  }, [requestedUserId]);

  /*------------------------- END LOADING PROFILE ------------------------*/

  /*------------------------- PROFILE PIC DIALOGUE WINDOWS ------------------------*/

  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showSavePicWindow, setShowSavePicWindow] = useState(false);
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);

  /*------------------------- END PROFILE PIC DIALOGUE WINDOWS ------------------------*/

  return (
    <div className="profileViewBody">
      {isLoading ? (
        <>
          <div className="requestedUserIntro">
            <img src={placeholder} className="loadingUserPic" alt="loading" />
            <img src={placeholder} className="loadingName" alt="loading" />
          </div>
        </>
      ) : (
        <>
          <div className="requestedUserIntro">
            <ProfilePic
              requestedUser={requestedUser}
              requestedUserId={requestedUserId}
              uploadImage={setShowUploadImageWindow}
              confirmDelete={setShowDeleteConfWindow}
            />
            <div className="requestedUserName">{requestedUser.full_name}</div>
          </div>

          {showUploadImageWindow ? (
            <UploadImageWindow
              setImage={setImage}
              showThisWindow={setShowUploadImageWindow}
              openNextWindow={setShowSavePicWindow}
            />
          ) : (
            <></>
          )}

          {showSavePicWindow ? (
            <SavePicWindow
              image={image}
              token={userToken}
              updateViewedUser={setRequestedUser}
              showThisWindow={setShowSavePicWindow}
              showLoadingWindow={setShowLoadingWindow}
              showError={setErrorMessage}
            />
          ) : (
            <></>
          )}

          {successMessage || warningMessage || errorMessage ? (
            <MessageBanner
              success={successMessage}
              showSuccess={setSuccessMessage}
              warning={warningMessage}
              showWarning={setWarningMessage}
              error={errorMessage}
              showError={setErrorMessage}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
