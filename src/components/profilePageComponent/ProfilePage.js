import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import { ProfilePicOptions } from "../profilePicOptionsComponent/ProfilePicOptions";
import { UploadImageWindow } from "../uploadImageComponent/UploadImageWindow";
import { CropAndSavePicWindow } from "../cropImageComponent/CropAndSavePicWindow";
import { DeleteProfilePicWindow } from "../deleteProfilePicComponent/DeleteProfilePicWindow";
import { LoadingWindow } from "../loadingComponent/LoadingWindow";
import { ErrorWindow } from "../errorWindowComponent/ErrorWindow";
import placeholder from "./Placeholder.png";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation();

/*------------------------- 1. LOADING PROFILE ------------------------*/

  const [isLoading, setLoading] = useState(true);
  const [requestedUser, setRequestedUser] = useState({});
  const [error, setError] = useState(null);

  const requestedUserId = location.pathname.split("/")[2];
  const userToken = user.user_token;

  useEffect(() => {
    const visitedProfilesCache = window.localStorage.getItem("visited_profiles");

    if (visitedProfilesCache) {
      const visitedProfilesArray = JSON.parse(visitedProfilesCache);
      let userFound = false;

      for (let i = 0; i < visitedProfilesArray.length; i++) {
        const visitedProfile = visitedProfilesArray[i];

        if (visitedProfile.user_id === requestedUserId) {
          setRequestedUser(visitedProfile);
          setLoading(false);
          userFound = true;
        }

        if (userFound) break;
      }

      if (!userFound) {
        axios.get(`${URL}/user?id=${requestedUserId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        }).then ((response) => {
          setRequestedUser(response.data);
          setLoading(false);
  
          visitedProfilesArray.push(response.data);
          window.localStorage.setItem("visited_profiles", JSON.stringify(visitedProfilesArray));
        }).catch ((error) => {
          setError(error.response.data.message);
        })
      }
    }
    else {
      axios.get(`${URL}/user?id=${requestedUserId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      }).then((response) => {
        setRequestedUser(response.data);
        setLoading(false);

        const visitedUsers = [response.data];
        window.localStorage.setItem("visited_profiles", JSON.stringify(visitedUsers));
      }).catch ((error) => {
        setError(error.response.data.message);
      })
    }
  }, [requestedUserId, userToken]);

  /*------------------------- 1. END LOADING PROFILE ------------------------*/
  
  /*------------------------- 2. PROFILE PIC OPTIONS MENU ------------------------*/

  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);

  const toggleProfilePicOptions = () => {
    if(requestedUserId === user.user_id) {
      if (showProfilePicOptions) setShowProfilePicOptions(false);
      else setShowProfilePicOptions(true);
    }
  };

  const newRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  /*------------------------- 2. END PROFILE PIC OPTIONS MENU ------------------------*/

  /*------------------------- 3. POP UP WINDOWs ------------------------*/

  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [image, setImage] = useState(null);
  const [showCropAndSavePicWindow, setShowCropAndSavePicWindow] = useState(false);
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);

  /*------------------------- 3. END POP UP WINDOWs ------------------------*/

  return (
    <div className="profilePage_Content">
      {isLoading ? (
        <div className="profilePage_UserInfo">
          <img src={placeholder} className="profilePage_UserProfilePic" alt="loading" />
          <img src={placeholder} className="loadingName" alt="loading" />
        </div>
      ) : (
        <div className="profilePage_UserInfo">
          <div className="profilePage_ProfilePicAndPicOptions" ref={newRef}>
            <img src={requestedUser.user_profile_pic} className="profilePage_UserProfilePic" alt="profile_picture" onClick={toggleProfilePicOptions} />

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

          <div className="profilePage_UserName">{`${requestedUser.user_first_name} ${requestedUser.user_last_name}`}</div>
        </div>
      )}

      {showUploadImageWindow ? (
        <UploadImageWindow
          setImage={setImage}
          closeWindow={setShowUploadImageWindow}
          openNextWindow={setShowCropAndSavePicWindow}
        />
      ) : (
      <></>
      )}

      {showCropAndSavePicWindow ? (
        <CropAndSavePicWindow 
          image={image}
          token={user.user_token}
          showThisWindow={setShowCropAndSavePicWindow}
          showLoadingWindow={setShowLoadingWindow}
          showErrorWindow={setError}
          updateViewedUser={setRequestedUser}
         />
      ) : (
      <></>
      )}

      {showDeleteConfWindow ? (
        <DeleteProfilePicWindow
          closeWindow={setShowDeleteConfWindow}
          showLoadingWindow={setShowLoadingWindow}
          showErrorWindow={setError}
          updateViewedUser={setRequestedUser}
        />
      ) : (
      <></>
      )}

      {showLoadingWindow ? (
        <div className="loadingWindow">
          <div className="loadingGifContainer">
            <LoadingWindow />
          </div>
        </div>
      ) : (
        <></>
      )}

      {error ? (
        <ErrorWindow
          error={error}
          closeWindow={setError}
        />
      ) : (
      <></>
      )}

    </div>
  )
}
