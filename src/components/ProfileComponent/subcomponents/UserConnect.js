/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useSelector } from "react-redux";

/*--------------- REACT IMPORTS ---------------*/
import { useEffect, useRef, useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { userURL } from "../../../util/urls";
import "../styles/UserConnect.css";

export const UserConnect = ({
  viewedUser,
  updateViewedUser,
  showSuccess,
  showWarning,
  showError,
}) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const responseRef = useRef(null);
  const friendsRef = useRef(null);

  /*-------------------- REDUX STATE VARIABLES -------------------*/
  const user = useSelector((state) => state.userSlice.user);

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [showFriendsOptions, setShowFriendsOptions] = useState(false);

  /*---------------------- REGULAR VARIABLES ---------------------*/
  const viewedUserFName = viewedUser.firstName;
  const viewedUserLName = viewedUser.lastName;
  const viewedUserId = viewedUser.id;
  const requestURL = `${userURL}/request`;
  const friendURL = `${userURL}/friend`;

  const sendReqInfo = {
    senderFName: user.firstName,
    senderLName: user.lastName,
    senderPicFile: user.picFilename,
    recipFName: viewedUserFName,
    recipLName: viewedUserLName,
    recipPicFile: viewedUser.picFilename,
  };

  const acceptReqInfo = {
    senderFName: viewedUserFName,
    senderLName: viewedUserLName,
    senderPicFile: viewedUser.picFilename,
    recipFName: user.firstName,
    recipLName: user.lastName,
    recipPicFile: user.picFilename,
  };

  const reqHeader = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  let friendStatus = viewedUser.friendStatus;

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
      .put(`${requestURL}?id=${viewedUserId}`, sendReqInfo, reqHeader)
      .then((response) => {
        viewedUser.friendStatus = response.data.status;
        updateViewedUser(viewedUser);
        updateStatusInCache(response.data.status);
        showSuccess(`Friend request sent to ${viewedUserFName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const cancelRequest = () => {
    axios
      .delete(`${requestURL}/cancel?id=${viewedUserId}`, reqHeader)
      .then((response) => {
        viewedUser.friendStatus = response.data.status;
        updateViewedUser(viewedUser);
        updateStatusInCache(response.data.status);
        showWarning(`Friend request to ${viewedUserFName} cancelled.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const acceptRequest = () => {
    axios
      .put(`${friendURL}?id=${viewedUserId}`, acceptReqInfo, reqHeader)
      .then((response) => {
        viewedUser.friendStatus = response.data.status;
        updateViewedUser(viewedUser);
        updateStatusInCache(response.data.status);
        showSuccess(`You are now friends with ${viewedUserFName}!`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const rejectRequest = () => {
    axios
      .delete(`${requestURL}/reject?id=${viewedUserId}`, reqHeader)
      .then((response) => {
        viewedUser.friendStatus = response.data.status;
        updateViewedUser(viewedUser);
        updateStatusInCache(response.data.status);
        showWarning(`Friend request from ${viewedUserFName} rejected.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  const removeFriend = () => {
    axios
      .delete(`${friendURL}?id=${viewedUserId}`, reqHeader)
      .then((response) => {
        viewedUser.friendStatus = response.data.status;
        updateViewedUser(viewedUser);
        updateStatusInCache(response.data.status);
        showWarning(`You are no longer friends with ${viewedUserFName}.`);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  };

  /*------------------------- END HANDLE FRIEND CONNECT ------------------------*/

  /*------------------------- CACHE FRIEND STATUS UPDATE ------------------------*/

  const updateStatusInCache = (status) => {
    // const visitedProfilesCache =
    //   window.localStorage.getItem("visited_profiles");
    // let visitedProfilesArray = JSON.parse(visitedProfilesCache);
    // for (let i = 0; i < visitedProfilesArray.length; i++) {
    //   const visitedProfile = visitedProfilesArray[i];
    //   if (visitedProfile.id === viewedUserId) {
    //     visitedProfile.friendStatus = status;
    //     break;
    //   }
    // }
    // window.localStorage.setItem(
    //   "visited_profiles",
    //   JSON.stringify(visitedProfilesArray)
    // );
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
