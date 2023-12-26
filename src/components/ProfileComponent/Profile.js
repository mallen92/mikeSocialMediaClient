/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useEffect, useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { userURL } from "../../util/urls";

/*-------------- COMPONENT IMPORTS --------------*/
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import { ProfilePic } from "./subcomponents/ProfilePic";
import { UploadImageWindow } from "./subcomponents/UploadImageWindow";
import { SavePicWindow } from "./subcomponents/SavePicWindow";
import { LoadingWindow } from "./subcomponents/LoadingWindow";
import { DeletePicWindow } from "./subcomponents/DeletePicWindow";
import { UserConnect } from "./subcomponents/UserConnect";

/*-------------- IMAGE IMPORTS --------------*/
import placeholder from "./images/Placeholder.png";

/*-------------- STYLE IMPORTS --------------*/
import "./styles/Profile.css";

export const Profile = () => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const location = useLocation();

  /*-------------------- REDUX STATE VARIABLES -------------------*/
  const user = useSelector((state) => state.userSlice.user);

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [isLoading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(true);
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showSavePicWindow, setShowSavePicWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);
  const [showDeletePicWindow, setShowDeletePicWindow] = useState(false);

  /*---------------------- REGULAR VARIABLES ---------------------*/
  const requestedUserId = location.pathname.split("/")[1];
  const visitedProfile = window.localStorage.getItem(`vp#${requestedUserId}`);
  const key = JSON.parse(visitedProfile);

  /*----------------------- USEEFFECT HOOK ----------------------*/
  useEffect(() => {
    let requestingUserId = null;
    let url = "";

    if (user.accessToken && user.id !== requestedUserId)
      requestingUserId = user.id;

    if (key) url = `${userURL}?id=${requestedUserId}&key=${key}`;
    else url = `${userURL}?id=${requestedUserId}`;

    axios
      .get(url, {
        headers: {
          "Requesting-User-ID": requestingUserId,
        },
      })
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setLoading(false);
          setProfileExists(false);
        } else {
          setProfileExists(true);
          setProfile(response.data);
          setLoading(false);

          if (response.data.cacheKey) {
            window.localStorage.setItem(
              `vp#${requestedUserId}`,
              JSON.stringify(response.data.cacheKey)
            );
          }
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
    //eslint-disable-next-line
  }, [requestedUserId]);

  /*------------------------- END USEEFFECT HOOK ------------------------*/

  return (
    <div className="profilePageContent">
      {isLoading ? (
        <>
          <div className="loading">
            <div className="requestedUserIntro">
              <img src={placeholder} className="loadingUserPic" alt="loading" />
              <img src={placeholder} className="loadingName" alt="loading" />
            </div>

            <img
              src={placeholder}
              className="loadingUserConnect"
              alt="loading"
            />
          </div>
        </>
      ) : (
        <>
          {!profileExists ? (
            <>
              <div className="loading">
                <div className="requestedUserIntro">
                  <img
                    src={placeholder}
                    className="loadingUserPic"
                    alt="loading"
                  />
                  <img
                    src={placeholder}
                    className="loadingName"
                    alt="loading"
                  />
                </div>

                <img
                  src={placeholder}
                  className="loadingUserConnect"
                  alt="loading"
                />
              </div>
              <div className="noUserMsg">
                Oops... <br /> That user doesn't exist!
              </div>
            </>
          ) : (
            <>
              <div className="requestedUserIntro">
                <ProfilePic
                  appUser={user}
                  viewedUser={profile}
                  uploadImage={setShowUploadImageWindow}
                  confirmDelete={setShowDeletePicWindow}
                />
                <div className="requestedUserName">
                  {profile.firstName} {profile.lastName}
                </div>
              </div>
              {user.accessToken && user.id === requestedUserId ? (
                <div className="editProfile">
                  <div className="editProfileBtn">Edit Profile</div>
                </div>
              ) : (
                <></>
              )}
              {user.accessToken && user.id !== requestedUserId ? (
                <UserConnect
                  appUser={user}
                  viewedUserKey={key}
                  viewedUser={profile}
                  updateViewedUser={setProfile}
                  showSuccess={setSuccessMessage}
                  showWarning={setWarningMessage}
                  showError={setErrorMessage}
                />
              ) : (
                <></>
              )}

              {/*-------------------------- DIALOGUE WINDOWS ---------------------------------*/}

              {showUploadImageWindow ? (
                <UploadImageWindow
                  showThisWindow={setShowUploadImageWindow}
                  setImage={setImage}
                  openNextWindow={setShowSavePicWindow}
                />
              ) : (
                <></>
              )}

              {showSavePicWindow ? (
                <SavePicWindow
                  appUser={user}
                  image={image}
                  profileKey={key}
                  viewedUser={profile}
                  updateViewedUser={setProfile}
                  showThisWindow={setShowSavePicWindow}
                  showLoadingWindow={setShowLoadingWindow}
                  showError={setErrorMessage}
                />
              ) : (
                <></>
              )}

              {showDeletePicWindow ? (
                <DeletePicWindow
                  profileKey={key}
                  viewedUser={profile}
                  updateViewedUser={setProfile}
                  showThisWindow={setShowDeletePicWindow}
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

              {/*-------------------------- END DIALOGUE WINDOWS ---------------------------------*/}

              <div className="profileContent">
                <Outlet context={setErrorMessage} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
