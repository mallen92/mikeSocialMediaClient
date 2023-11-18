import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import { NavContainer } from "../navContainerComponent/NavContainer";
import { ProfilePicOptions } from "./subcomponents/ProfilePicOptions";
import { UploadImageWindow } from "./subcomponents/UploadImageWindow";
import { CropAndSavePicWindow } from "./subcomponents/CropAndSavePicWindow";
import { DeleteProfilePicWindow } from "./subcomponents/DeleteProfilePicWindow";
import { LoadingWindow } from "../loadingComponent/LoadingWindow";
import { ErrorBanner } from "../authErrorBannerComponent/ErrorBanner";
import { ConnectComponent } from "./subcomponents/ConnectComponent";
import placeholder from "./images/Placeholder.png";
import "./styles/ProfilePage.css";
import "./styles/ConnectComponent.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [requestedUser, setRequestedUser] = useState({});
  const [image, setImage] = useState(null);
  const [friendStatus, setFriendStatus] = useState("");
  const location = useLocation();

  const userToken = user.user_token;
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

        if (visitedProfile.user_id === requestedUserId) {
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
            setError(error.response.data.message);
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
          setError(error.response.data.message);
        });
    }
  }, [requestedUserId]);

  /*------------------------- 1. END LOADING PROFILE ------------------------*/

  /*------------------------- 2. PROFILE PIC OPTIONS MENU ------------------------*/

  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const newRef = useRef(null);

  const toggleProfilePicOptions = () => {
    if (requestedUserId === user.user_id) {
      if (showProfilePicOptions) setShowProfilePicOptions(false);
      else setShowProfilePicOptions(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  /*------------------------- 2. END PROFILE PIC OPTIONS MENU ------------------------*/

  /*------------------------- 3. PROFILE PIC DIALOGUE WINDOWS ------------------------*/

  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showCropAndSavePicWindow, setShowCropAndSavePicWindow] =
    useState(false);
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);
  const [error, setError] = useState("");

  /*------------------------- 3. END PROFILE PIC DIALOGUE WINDOWS ------------------------*/

  /*------------------------- 4. FRIEND STATUS ------------------------*/

  useEffect(() => {
    if (user.user_token) {
      const userFriends = user.user_friends;
      const requestsSent = user.friend_requests_out;
      const requestsReceived = user.friend_requests_in;
      let requestSentToUser = false;
      let requestReceivedFromUser = false;
      let friendsWithUser = false;

      if (
        requestsSent.length === 0 &&
        requestsReceived.length === 0 &&
        userFriends.length === 0
      )
        setFriendStatus("not friend");
      else {
        for (let i = 0; i < requestsSent.length; i++) {
          if (requestsSent[i] === requestedUserId) {
            requestSentToUser = true;
            setFriendStatus("pending_req_user_decision");
          }

          if (requestSentToUser) break;
        }

        if (!requestSentToUser) {
          for (let i = 0; i < requestsReceived.length; i++) {
            if (requestsReceived[i] === requestedUserId) {
              requestReceivedFromUser = true;
              setFriendStatus("pending_this_user_decision");
            }

            if (requestReceivedFromUser) break;
          }
        }

        if (!requestReceivedFromUser) {
          for (let i = 0; i < userFriends.length; i++) {
            if (userFriends[i] === requestedUserId) {
              friendsWithUser = true;
              setFriendStatus("friend");
            }

            if (friendsWithUser) break;
          }
        }

        if (!requestSentToUser && !requestReceivedFromUser && !friendsWithUser)
          setFriendStatus("not friend");
      }
    }
  }, [
    user.user_token,
    user.user_friends,
    user.friend_requests_out,
    user.friend_requests_in,
    requestedUserId,
  ]);

  /*------------------------- 4. END FRIEND STATUS ------------------------*/

  return (
    <div className="profilePage">
      <div className="navContainer">
        <NavContainer />
      </div>

      {isLoading ? (
        <div className="profileContent">
          <div className="profileUserInfo">
            <img
              src={placeholder}
              className="profileUserProfilePic"
              alt="loading"
            />
            <img src={placeholder} className="loadingName" alt="loading" />
          </div>
        </div>
      ) : (
        <div className="profileContent">
          <div className="profileUserInfo">
            <div className="profilePicAndOptionsMenu" ref={newRef}>
              {user.user_token && requestedUser.user_id === user.user_id ? (
                <img
                  src={requestedUser.profile_pic_url}
                  className="profileAuthUserProfilePic"
                  alt="User"
                  onClick={toggleProfilePicOptions}
                />
              ) : (
                <img
                  src={requestedUser.profile_pic_url}
                  className="profileUserProfilePic"
                  alt="User"
                  onClick={toggleProfilePicOptions}
                />
              )}

              {showProfilePicOptions ? (
                <ProfilePicOptions
                  closeMenu={setShowProfilePicOptions}
                  uploadImage={setShowUploadImageWindow}
                  openDeleteConfWindow={setShowDeleteConfWindow}
                />
              ) : (
                <></>
              )}
            </div>

            <div className="profileUserName">{`${requestedUser.user_first_name} ${requestedUser.user_last_name}`}</div>
          </div>

          {/*-------------------- DIALOGUE WINDOWS FOR PROFILE PIC CONFIG --------------------*/}

          {showUploadImageWindow ? (
            <UploadImageWindow
              setImage={setImage}
              showThisWindow={setShowUploadImageWindow}
              openNextWindow={setShowCropAndSavePicWindow}
            />
          ) : (
            <></>
          )}

          {showCropAndSavePicWindow ? (
            <CropAndSavePicWindow
              image={image}
              token={userToken}
              updateViewedUser={setRequestedUser}
              showThisWindow={setShowCropAndSavePicWindow}
              showLoadingWindow={setShowLoadingWindow}
              showErrorBanner={setError}
            />
          ) : (
            <></>
          )}

          {showLoadingWindow ? <LoadingWindow /> : <></>}

          {showDeleteConfWindow ? (
            <DeleteProfilePicWindow
              updateViewedUser={setRequestedUser}
              closeWindow={setShowDeleteConfWindow}
              showLoadingWindow={setShowLoadingWindow}
              showErrorBanner={setError}
            />
          ) : (
            <></>
          )}

          {error ? <ErrorBanner error={error} closeBanner={setError} /> : <></>}

          {/*-------------------- END DIALOGUE WINDOWS FOR PROFILE PIC CONFIG --------------------*/}

          {user.user_token && requestedUser.user_id !== user.user_id ? (
            <ConnectComponent
              friendStatus={friendStatus}
              requestedUser={requestedUserId}
              userToken={userToken}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
