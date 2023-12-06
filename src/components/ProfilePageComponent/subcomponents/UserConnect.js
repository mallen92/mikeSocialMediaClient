import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../../util/url";
import "../styles/UserConnect.css";

export const UserConnect = ({
  reqUser,
  friendStatus,
  updateFriendStatus,
  showSuccess,
  showWarning,
  showError,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [showFriendsOptions, setShowFriendsOptions] = useState(false);
  const responseRef = useRef(null);
  const friendsRef = useRef(null);

  const reqUserName = reqUser.full_name;
  const reqUserId = reqUser.id;
  const requestURL = `${URL}/users/request`;
  const friendURL = `${URL}/users/friend`;

  const sendReqInfo = {
    senderName: user.full_name,
    senderPicFile: user.pic_filename,
    recipName: reqUserName,
    recipPicFile: reqUser.pic_filename,
  };

  const acceptReqInfo = {
    senderName: reqUserName,
    senderPicFile: reqUser.pic_filename,
    recipName: user.full_name,
    recipPicFile: user.pic_filename,
  };

  const reqHeader = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

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
        updateFriendStatus(response.data.status);
        updateStatusInCache(response.data.status);
        showSuccess(`Friend request sent to ${reqUserName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const cancelRequest = () => {
    axios
      .delete(`${requestURL}/cancel?id=${reqUserId}`, reqHeader)
      .then((response) => {
        updateFriendStatus(response.data.status);
        updateStatusInCache(response.data.status);
        showWarning(`Friend request to ${reqUserName} cancelled.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const acceptRequest = () => {
    axios
      .put(`${friendURL}?id=${reqUserId}`, acceptReqInfo, reqHeader)
      .then((response) => {
        updateFriendStatus(response.data.status);
        updateStatusInCache(response.data.status);
        showSuccess(`You are now friends with ${reqUserName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const rejectRequest = () => {
    axios
      .delete(`${requestURL}/reject?id=${reqUserId}`, reqHeader)
      .then((response) => {
        updateFriendStatus(response.data.status);
        updateStatusInCache(response.data.status);
        showWarning(`Friend request from ${reqUserName} rejected.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const removeFriend = () => {
    axios
      .delete(`${friendURL}?id=${reqUserId}`, reqHeader)
      .then((response) => {
        updateFriendStatus(response.data.status);
        updateStatusInCache(response.data.status);
        showWarning(`You are no longer friends with ${reqUserName}.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  /*------------------------- END HANDLE FRIEND CONNECT ------------------------*/

  /*------------------------- CACHE FRIEND STATUS UPDATE ------------------------*/

  const updateStatusInCache = (status) => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);

    for (let i = 0; i < visitedProfilesArray.length; i++) {
      const visitedProfile = visitedProfilesArray[i];

      if (visitedProfile.id === reqUserId) {
        visitedProfile.friend_status = status;
        break;
      }
    }

    window.localStorage.setItem(
      "visited_profiles",
      JSON.stringify(visitedProfilesArray)
    );
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
              <div>
                <div className="userConnectBtn" onClick={cancelRequest}>
                  Cancel Request
                </div>
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

                <div className="userConnectBtn">Message</div>

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
    </div>
  );
};
