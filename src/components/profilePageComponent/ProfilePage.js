import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import { NavContainer } from "../navContainerComponent/NavContainer";
import { ProfilePicOptions } from "../ProfilePicOptions";
import { UploadImageWindow } from "../UploadImageWindow";
import { CropAndSavePicWindow } from "../CropAndSavePicWindow";
import { DeleteProfilePicWindow } from "../DeleteProfilePicWindow";
import { LoadingWindow } from "../loadingComponent/LoadingWindow";
import { ErrorWindow } from "../ErrorWindow";
import placeholder from "./Placeholder.png";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [requestedUser, setRequestedUser] = useState({});
  const [image, setImage] = useState(null);
  const location = useLocation();

  const userToken = user.user_token;
  const requestedUserId = location.pathname.split("/")[1];

/*------------------------- 1. LOADING PROFILE ------------------------*/

  const [isLoading, setLoading] = useState(true);

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
        axios.get(`${URL}/users?id=${requestedUserId}`)
        .then ((response) => {
          setRequestedUser(response.data);
          setLoading(false);
  
          visitedProfilesArray.push(response.data);
          window.localStorage.setItem("visited_profiles", JSON.stringify(visitedProfilesArray));
        }).catch ((error) => {
          setError(error.response.data.message);
        })
      }
    } else {
      axios.get(`${URL}/users?id=${requestedUserId}`)
      .then((response) => {
        setRequestedUser(response.data);
        setLoading(false);

        const visitedUsers = [response.data];
        window.localStorage.setItem("visited_profiles", JSON.stringify(visitedUsers));
      }).catch ((error) => {
        setError(error.response.data.message);
      })
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

  /*------------------------- 3. POP UP WINDOWs ------------------------*/

  const [showUploadImageWindow, setShowUploadImageWindow] = useState(false);
  const [showCropAndSavePicWindow, setShowCropAndSavePicWindow] = useState(false);
  const [showDeleteConfWindow, setShowDeleteConfWindow] = useState(false);
  const [showLoadingWindow, setShowLoadingWindow] = useState(false);
  const [error, setError] = useState("");

  /*------------------------- 3. END POP UP WINDOWs ------------------------*/

  return (
    <div className="profilePageBody">
      <div className="navContainer">
        <NavContainer />
      </div>

      <div className="profilePage_Content">
        {isLoading ? (
          <div className="profilePage_UserInfo">
            <img src={placeholder} className="profilePage_UserProfilePic" alt="loading" />
            <img src={placeholder} className="loadingName" alt="loading" />
          </div>
        ) : (
          <div className="profilePage_UserInfo">
            <div className="profilePage_ProfilePicAndPicOptions" ref={newRef}>
              <img src={requestedUser.user_profile_pic} className="profilePage_UserProfilePic" alt="User" onClick={toggleProfilePicOptions} />

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
            showErrorWindow={setError}
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
            showErrorWindow={setError}
          />
        ) : (
        <></>
        )}

        {error ? (
          <ErrorWindow error={error} />
        ) : (
        <></>
        )}

      </div>
    </div>
  )
}
