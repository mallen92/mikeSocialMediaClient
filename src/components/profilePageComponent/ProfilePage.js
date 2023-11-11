import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { URL } from "../../util/url";
import axios from "axios";
import { ProfilePicOptions } from "../profilePicOptionsComponent/ProfilePicOptions";
import placeholder from "./Placeholder.png";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [requestedUser, setRequestedUser] = useState({});
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);

  const requestedUserId = location.pathname.split("/")[2];
  const userToken = user.user_token;
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  useEffect(() => {
    const visitedProfilesCache = window.localStorage.getItem("visited_profiles");

    if(visitedProfilesCache) {

      const visitedProfilesArray = JSON.parse(visitedProfilesCache);
      let userFound = false;

      for(let i = 0; i < visitedProfilesArray.length; i++) {
        const visitedProfile = visitedProfilesArray[i];

        if(visitedProfile.user_id === requestedUserId)
        {
          setRequestedUser(visitedProfile);
          setLoading(false);
          userFound = true;
        }

        if(userFound) break;
      }

      if(!userFound) {
        axios.get(`${URL}/user?id=${requestedUserId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        }).then((response) => {
          setRequestedUser(response.data);
          setLoading(false);
  
          visitedProfilesArray.push(response.data);
          window.localStorage.setItem("visited_profiles", JSON.stringify(visitedProfilesArray));
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
        
      })
    }


  }, [requestedUserId, userToken]);

  const newRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const toggleProfilePicOptions = () => {
    if(requestedUserId === user.user_id) {
      if (showProfilePicOptions) setShowProfilePicOptions(false);
      else setShowProfilePicOptions(true);
    }
  };


  return (
    <div className="profilePage_Content">
      { isLoading ? (
        <div className="profilePage_UserInfo">
          <img src={placeholder} className="profilePage_UserProfilePic" alt="loading" />
          <img src={placeholder} className="loadingName" alt="loading" />
        </div>
      ) : (
        <div className="profilePage_UserInfo">
          <div className="profilePage_ProfilePicAndPicOptions" ref={newRef}>
            <img src={requestedUser.user_profile_pic} className="profilePage_UserProfilePic" alt="profile_picture" onClick={toggleProfilePicOptions} />

            {showProfilePicOptions ? (
              <ProfilePicOptions setShowProfilePicOptions={setShowProfilePicOptions} />
            ) : (
              <></>
            )}
          </div>

          <div className="profilePage_UserName">{`${requestedUser.user_first_name} ${requestedUser.user_last_name}`}</div>
        </div>
      )}
    </div>
  )
}
