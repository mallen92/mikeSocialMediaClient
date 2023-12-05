import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../../util/url";
import "../styles/UserConnect.css";

export const UserConnect = ({
  reqUserId,
  showSuccess,
  showWarning,
  showError,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [reqUserInfo, setReqUserInfo] = useState({});
  const [friendStatus, setFriendStatus] = useState("");
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [showFriendsOptions, setShowFriendsOptions] = useState(false);
  const responseRef = useRef(null);
  const friendsRef = useRef(null);

  const requestURL = `${URL}/users/request`;
  const friendURL = `${URL}/users/friend`;

  const sendReqInfo = {
    senderName: user.full_name,
    senderPicFile: user.pic_filename,
    recipName: reqUserInfo.full_name,
    recipPicFile: reqUserInfo.pic_filename,
  };

  const acceptReqInfo = {
    senderName: reqUserInfo.full_name,
    senderPicFile: reqUserInfo.pic_filename,
    recipName: user.full_name,
    recipPicFile: user.pic_filename,
  };

  const reqHeader = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  /*------------------------- SET FRIEND STATUS ------------------------*/

  useEffect(() => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);

    for (let i = 0; i < visitedProfilesArray.length; i++) {
      const visitedProfile = visitedProfilesArray[i];

      if (visitedProfile.id === reqUserId) {
        setFriendStatus(visitedProfile.friend_status);
        setReqUserInfo({
          full_name: visitedProfile.full_name,
          pic_filename: visitedProfile.pic_filename,
        });
        break;
      }
    }
  }, [reqUserId]);

  /*------------------------- END SET FRIEND STATUS ------------------------*/

  /*------------------------- CONNECT OPTIONS MENUS ------------------------*/

  const toggleShowResponseOptions = () => {
    if (showResponseOptions) setShowResponseOptions(false);
    else setShowResponseOptions(true);
  };

  const toggleShowFriendsOptions = () => {
    if (showFriendsOptions) setShowFriendsOptions(false);
    else setShowFriendsOptions(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  const handleOutsideClick = (e) => {
    if (responseRef.current && !responseRef.current.contains(e.target)) {
      setShowResponseOptions(false);
    }
    if (friendsRef.current && !friendsRef.current.contains(e.target)) {
      setShowFriendsOptions(false);
    }
  };

  /*------------------------- END CONNECT OPTIONS MENUS ------------------------*/

  /*------------------------- HANDLE FRIEND CONNECT ------------------------*/

  const sendRequest = () => {
    axios
      .put(`${requestURL}?id=${reqUserId}`, sendReqInfo, reqHeader)
      .then((response) => {
        setFriendStatus(response.data.status);
        const friendName = updateFriendStatus(response.data);
        showSuccess(`Friend request sent to ${friendName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const cancelRequest = () => {
    axios
      .delete(`${requestURL}/cancel?id=${reqUserId}`, reqHeader)
      .then((response) => {
        setFriendStatus(response.data.status);
        const friendName = updateFriendStatus(response.data);
        showWarning(`Friend request to ${friendName} cancelled.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const rejectRequest = () => {
    axios
      .delete(`${requestURL}/reject?id=${reqUserId}`, reqHeader)
      .then((response) => {
        setFriendStatus(response.data.status);
        const friendName = updateFriendStatus(response.data);
        showWarning(`Friend request from ${friendName} rejected.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const acceptRequest = () => {
    axios
      .put(`${friendURL}?id=${reqUserId}`, acceptReqInfo, reqHeader)
      .then((response) => {
        setFriendStatus(response.data.status);
        const friendName = updateFriendStatus(response.data);
        showSuccess(`You are now friends with ${friendName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const removeFriend = () => {
    axios
      .delete(`${friendURL}?id=${reqUserId}`, reqHeader)
      .then((response) => {
        setFriendStatus(response.data.status);
        const friendName = updateFriendStatus(response.data);
        showWarning(`You are no longer friends with ${friendName}.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  /*------------------------- END HANDLE FRIEND CONNECT ------------------------*/

  /*------------------------- CACHE FRIEND STATUS UPDATE ------------------------*/

  const updateFriendStatus = (status) => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);
    let userName = "";

    for (let i = 0; i < visitedProfilesArray.length; i++) {
      const visitedProfile = visitedProfilesArray[i];

      if (visitedProfile.id === reqUserId) {
        visitedProfile.friend_status = status;
        userName = visitedProfile.full_name;
        break;
      }
    }

    window.localStorage.setItem(
      "visited_profiles",
      JSON.stringify(visitedProfilesArray)
    );

    return userName;
  };

  /*------------------------- END CACHE FRIEND STATUS UPDATE ------------------------*/

  return (
    <div className="userConnect">
      {(() => {
        switch (friendStatus) {
          case "not a friend":
            return (
              <div className="userConnectBtn" onClick={sendRequest}>
                Send Request
              </div>
            );
          case "sent request to":
            return (
              <div className="userConnectBtn" onClick={cancelRequest}>
                Cancel Request
              </div>
            );
          case "received request from":
            return (
              <div className="requestResponse" ref={responseRef}>
                <div
                  className="userConnectBtn"
                  onClick={toggleShowResponseOptions}
                >
                  Respond to Request
                </div>

                {showResponseOptions ? (
                  <div className="connectOptionsMenu">
                    <div className="optionBtn" onClick={acceptRequest}>
                      Accept
                    </div>
                    <div className="optionBtn" onClick={rejectRequest}>
                      Reject
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          case "friend":
            return (
              <div className="requestResponse" ref={friendsRef}>
                <div
                  className="userConnectBtn"
                  onClick={toggleShowFriendsOptions}
                >
                  Friends
                </div>

                {showFriendsOptions ? (
                  <div className="connectOptionsMenu">
                    <div
                      className="optionBtn removeFriendBtn"
                      onClick={removeFriend}
                    >
                      Unfriend This User
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          default:
            return null;
        }
      })()}

      {friendStatus === "friend" ? (
        <div className="userConnectBtn">Message</div>
      ) : (
        <></>
      )}
    </div>
  );
};
