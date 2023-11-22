import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "../styles/ProfilePic.css";

export const ProfilePic = ({ requestedUser, requestedUserId }) => {
  const user = useSelector((state) => state.userSlice.user);
  const userToken = user.token;
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const newRef = useRef(null);

  const toggleProfilePicOptions = () => {
    if (requestedUserId === user.id) {
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

  return (
    <div className="profilePicBody" ref={newRef}>
      {userToken && requestedUser.id === user.id ? (
        <img
          src={requestedUser.pic_url}
          className="authUserPic"
          alt="User"
          onClick={toggleProfilePicOptions}
        />
      ) : (
        <img
          src={requestedUser.pic_url}
          className="requestedUserPic"
          alt="User"
          onClick={toggleProfilePicOptions}
        />
      )}

      {/* {showProfilePicOptions ? (
          <ProfilePicOptions
            closeMenu={setShowProfilePicOptions}
            uploadImage={setShowUploadImageWindow}
            openDeleteConfWindow={setShowDeleteConfWindow}
          />
        ) : (
          <></>
        )} */}
    </div>
  );
};
