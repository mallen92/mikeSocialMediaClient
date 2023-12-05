import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import { ProfilePic } from "./subcomponents/ProfilePic";
import { UserConnect } from "./subcomponents/UserConnect";
import { UploadImageWindow } from "./subcomponents/UploadImageWindow";
import { LoadingWindow } from "./subcomponents/LoadingWindow";
import { SavePicWindow } from "./subcomponents/SavePicWindow";
import { DeletePicWindow } from "./subcomponents/DeletePicWindow";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import { FriendsPanel } from "./subcomponents/FriendsPanel";
import { AboutPanel } from "./subcomponents/AboutPanel";
import { PostsPanel } from "./subcomponents/PostsPanel";
import placeholder from "./images/Placeholder.png";
import "./styles/ProfileView.css";

export const ProfileView = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [isLoading, setLoading] = useState(true);
  const [requestedUser, setRequestedUser] = useState({});
  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showSavePicWindow, setShowSavePicWindow] = useState(false);
  const [showDeletePicWindow, setShowDeletePicWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [postsPanel] = useState(false);
  const [infoPanel] = useState(true);
  const location = useLocation();

  const userToken = user.token;
  const requestedUserId = location.pathname.split("/")[1];

  /*------------------------- LOADING PROFILE ------------------------*/

  useEffect(() => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);

    let requestingUserId = null;
    if (user.id && user.id !== requestedUserId) requestingUserId = user.id;

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
        if (visitedProfilesArray.length === 6) visitedProfilesArray = [];

        window.localStorage.setItem(
          "visited_profiles",
          JSON.stringify(visitedProfilesArray)
        );

        axios
          .get(`${URL}/users?id=${requestedUserId}`, {
            headers: {
              "Requesting-User-ID": requestingUserId,
            },
          })
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
        .get(`${URL}/users?id=${requestedUserId}`, {
          headers: {
            "Requesting-User-ID": requestingUserId,
          },
        })
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
  }, [requestedUserId, user.id]);

  /*------------------------- END LOADING PROFILE ------------------------*/

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
              uploadImage={setShowUploadImageWindow}
              confirmDelete={setShowDeletePicWindow}
            />
            <div className="requestedUserName">{requestedUser.full_name}</div>
          </div>

          {userToken && user.id !== requestedUserId ? (
            <UserConnect
              reqUserId={requestedUserId}
              showSuccess={setSuccessMessage}
              showWarning={setWarningMessage}
              showError={setErrorMessage}
            />
          ) : (
            <></>
          )}

          {showUploadImageWindow ? (
            <UploadImageWindow
              setImage={setImage}
              showThisWindow={setShowUploadImageWindow}
              openNextWindow={setShowSavePicWindow}
            />
          ) : (
            <></>
          )}

          {showDeletePicWindow ? (
            <DeletePicWindow
              updateViewedUser={setRequestedUser}
              showThisWindow={setShowDeletePicWindow}
              showLoadingWindow={setShowLoadingWindow}
              showError={setErrorMessage}
            />
          ) : (
            <></>
          )}

          {showSavePicWindow ? (
            <SavePicWindow
              image={image}
              updateViewedUser={setRequestedUser}
              showThisWindow={setShowSavePicWindow}
              showLoadingWindow={setShowLoadingWindow}
              showError={setErrorMessage}
            />
          ) : (
            <></>
          )}

          {showLoadingWindow ? <LoadingWindow /> : <></>}

          {successMessage || warningMessage || errorMessage ? (
            <MessageBanner
              success={successMessage}
              closeSuccess={setSuccessMessage}
              warning={warningMessage}
              closeWarning={setWarningMessage}
              error={errorMessage}
              closeError={setErrorMessage}
            />
          ) : (
            <></>
          )}
        </>
      )}

      {postsPanel ? <PostsPanel /> : <></>}

      {infoPanel ? (
        <div className="infoPanel">
          <FriendsPanel showError={setErrorMessage} />
          <AboutPanel />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
