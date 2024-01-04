import { useEffect, useRef, useState } from "react";
import { ProfilePicOptionsMenu } from "./ProfilePicOptionsMenu";
import "../styles/ProfilePic.css";

export const ProfilePic = ({
  appUser,
  viewedUser,
  uploadImage,
  confirmDelete,
}) => {
  const newRef = useRef(null);
  const userToken = appUser.accessToken;
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);

  /*------------------ FUNCTIONS -----------------*/
  const toggleProfilePicOptions = () => {
    if (viewedUser.username === appUser.username) {
      if (showProfilePicOptions) setShowProfilePicOptions(false);
      else setShowProfilePicOptions(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  /*----------------------- USEEFFECT HOOK ----------------------*/
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  return (
    <div className="profilePicBody" ref={newRef}>
      {userToken && viewedUser.username === appUser.username ? (
        <img
          src={viewedUser.picUrl}
          className="authUserPic"
          alt="User"
          onClick={toggleProfilePicOptions}
        />
      ) : (
        <img src={viewedUser.picUrl} className="requestedUserPic" alt="User" />
      )}

      {showProfilePicOptions ? (
        <ProfilePicOptionsMenu
          showMenu={setShowProfilePicOptions}
          uploadImage={uploadImage}
          confirmDelete={confirmDelete}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
