import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ProfilePicOptionsMenu } from "./ProfilePicOptionsMenu";
import "../styles/ProfilePic.css";

export const ProfilePic = ({ requestedUser, uploadImage, confirmDelete }) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const newRef = useRef(null);

  /*-------------------- REDUX STATE VARIABLES -------------------*/
  const user = useSelector((state) => state.userSlice.user);
  const userToken = user.accessToken;

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  const toggleProfilePicOptions = () => {
    if (requestedUser.id === user.id) {
      if (showProfilePicOptions) setShowProfilePicOptions(false);
      else setShowProfilePicOptions(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  return (
    <div className="profilePicBody" ref={newRef}>
      {userToken && requestedUser.id === user.id ? (
        <img
          src={requestedUser.picUrl}
          className="authUserPic"
          alt="User"
          onClick={toggleProfilePicOptions}
        />
      ) : (
        <img
          src={requestedUser.picUrl}
          className="requestedUserPic"
          alt="User"
        />
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
