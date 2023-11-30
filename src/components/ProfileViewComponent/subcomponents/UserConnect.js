import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../../util/url";
import "../styles/UserConnect.css";

export const UserConnect = ({
  reqUserId,
  token,
  showSuccess,
  showWarning,
  showError,
}) => {
  /*------------------------- SET FRIEND STATUS ------------------------*/

  const [friendStatus, setFriendStatus] = useState("");
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [showFriendsOptions, setShowFriendsOptions] = useState(false);
  const responseRef = useRef(null);
  const friendsRef = useRef(null);

  useEffect(() => {
    const visitedProfilesCache =
      window.localStorage.getItem("visited_profiles");
    let visitedProfilesArray = JSON.parse(visitedProfilesCache);

    for (let i = 0; i < visitedProfilesArray.length; i++) {
      const visitedProfile = visitedProfilesArray[i];

      if (visitedProfile.id === reqUserId) {
        setFriendStatus(visitedProfile.friend_status);
        break;
      }
    }
  }, [reqUserId]);

  /*------------------------- END SET FRIEND STATUS ------------------------*/

  /*------------------------- HANDLE FRIEND CONNECT ------------------------*/

  const sendRequest = () => {
    axios
      .put(`${URL}/users/request?id=${reqUserId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendStatus(response.data);
        const friendName = updateFriendStatus(response.data);
        showSuccess(`Friend request sent to ${friendName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const cancelRequest = () => {
    axios
      .delete(`${URL}/users/request/cancel?id=${reqUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendStatus(response.data);
        const friendName = updateFriendStatus(response.data);
        showWarning(`Friend request to ${friendName} cancelled.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const rejectRequest = () => {
    axios
      .delete(`${URL}/users/request/reject?id=${reqUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendStatus(response.data);
        const friendName = updateFriendStatus(response.data);
        showWarning(`Friend request from ${friendName} rejected.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const acceptRequest = () => {
    axios
      .put(`${URL}/users/friend?id=${reqUserId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendStatus(response.data);
        const friendName = updateFriendStatus(response.data);
        showSuccess(`You are now friends with ${friendName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const removeFriend = () => {
    axios
      .delete(`${URL}/users/friend?id=${reqUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendStatus(response.data);
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
