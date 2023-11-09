import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfilePicOptions } from "../profilePicOptionsComponent/ProfilePicOptions";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const newRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const toggleProfilePicOptions = () => {
    if (showProfilePicOptions) setShowProfilePicOptions(false);
    else setShowProfilePicOptions(true);
  };

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowProfilePicOptions(false);
    }
  };

  return (
    <div className="profilePage_Content">
      <div className="profilePage_UserInfo">
        <div className="profilePage_ProfilePicAndPicOptions" ref={newRef}>
          <img
            src={user.user_profile_pic}
            className="profilePage_UserProfilePic"
            alt="profile_picture"
            onClick={toggleProfilePicOptions}
          />

          {showProfilePicOptions ? (
            <div onClick={() => setShowProfilePicOptions(false)}>
              <ProfilePicOptions />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="profilePage_UserName">{`${user.user_first_name} ${user.user_last_name}`}</div>
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus est
        corrupti, dolore voluptatum et commodi necessitatibus odit consectetur
        nemo exercitationem eveniet inventore doloremque quidem, veniam dolor
        adipisci facilis consequatur voluptatem? Quae eligendi maxime saepe
        adipisci labore nam pariatur reprehenderit, eum a eos quam recusandae
        doloribus neque beatae iste maiores debitis numquam accusantium quasi
        rem temporibus! Quisquam illum eius adipisci itaque. Saepe, sapiente?
      </div>
    </div>
  );
};
