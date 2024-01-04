/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch } from "react-redux";

/*--------------- REACT IMPORTS ---------------*/
import { useEffect, useRef, useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { authURL, connectURL } from "../../../util/urls";
import { updateAccessToken } from "../../../app/userSlice";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/UserConnect.css";

export const UserConnect = ({
  appUser,
  viewedUserKey,
  viewedUser,
  updateViewedUser,
  showSuccess,
  showWarning,
  showError,
}) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const dispatch = useDispatch();
  const responseRef = useRef(null);
  const friendsRef = useRef(null);

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [showFriendsOptions, setShowFriendsOptions] = useState(false);

  /*---------------------- REGULAR VARIABLES ---------------------*/
  const accessToken = appUser.accessToken;
  const viewedUserId = viewedUser.username;
  const viewedUserName = `${viewedUser.firstName} ${viewedUser.lastName}`;
  let friendStatus = viewedUser.friendStatus;

  /*------------------------- FUNCTIONALITY: OPTION MENUS ------------------------*/

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

  /*------------------------- END FUNCTIONALITY: OPTION MENUS ------------------------*/

  /*---------------------------- FUNCTIONALITY: API CALLS ----------------------------*/

  const connectAPI = async (action, token) => {
    try {
      const response = await axios.post(
        `${connectURL}/${action}?id=${viewedUserId}`,
        null,
        {
          headers: {
            "Profile-Cache-Key": viewedUserKey,
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  const newAccessTokenAPI = async () => {
    try {
      const response = await axios.get(`${authURL}/refresh`, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  /*---------------------- END FUNCTIONALITY: API CALLS ----------------------*/

  /*------------------------- HANDLE FRIEND CONNECT ------------------------*/

  const handleConnect = async (action, token) => {
    let reqResponse = await connectAPI(action, token);
    const errorCode = reqResponse.response?.status;
    const errorMsg = reqResponse.response?.data.message;

    if (errorCode) {
      if (errorCode === 403) {
        const newAPIResponse = await newAccessTokenAPI();
        const newToken = newAPIResponse.data.accessToken;
        dispatch(updateAccessToken(newToken));
        handleConnect(action, newToken);
      } else showError(errorMsg);
    } else {
      viewedUser.friendStatus = reqResponse.data.status;
      updateViewedUser(viewedUser);
      // eslint-disable-next-line
      switch (action) {
        case "send": {
          showSuccess(`Friend request sent to ${viewedUserName}!`);
          break;
        }
        case "cancel": {
          showWarning(`Friend request to ${viewedUserName} cancelled.`);
          break;
        }
        case "reject": {
          showWarning(`Friend request from ${viewedUserName} rejected.`);
          break;
        }
        case "accept": {
          showSuccess(`You are now friends with ${viewedUserName}!`);
          break;
        }
        case "removeFriend": {
          showWarning(`You are no longer friends with ${viewedUserName}.`);
          break;
        }
      }
    }
  };

  /*------------------------- END HANDLE FRIEND CONNECT ------------------------*/

  return (
    <div className="userConnect">
      {(() => {
        switch (friendStatus) {
          case "not a friend":
            return (
              <div
                className="userConnectBtn"
                onClick={() => handleConnect("send", accessToken)}
              >
                Send Request
              </div>
            );
          case "sent request to":
            return (
              <div>
                <div
                  className="userConnectBtn"
                  onClick={() => handleConnect("cancel", accessToken)}
                >
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
                    <div
                      className="optionBtn"
                      onClick={() => handleConnect("accept", accessToken)}
                    >
                      Accept
                    </div>
                    <div
                      className="optionBtn"
                      onClick={() => handleConnect("reject", accessToken)}
                    >
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
                      onClick={() => handleConnect("removeFriend", accessToken)}
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
