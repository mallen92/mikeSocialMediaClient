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

  /*------------------------- SEND FRIEND REQUEST ------------------------*/

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
      });
  };

  /*------------------------- END SEND FRIEND REQUEST ------------------------*/

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

  /*------------------------- REQUEST REPONSE OPTIONS MENU ------------------------*/

  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const newRef = useRef(null);

  const toggleShowResponseOptions = () => {
    if (showResponseOptions) setShowResponseOptions(false);
    else setShowResponseOptions(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowResponseOptions(false);
    }
  };

  /*------------------------- END REQUEST REPONSE OPTIONS MENU ------------------------*/

  return (
    <div className="userConnect">
      {(() => {
        switch (friendStatus) {
          case "not a friend":
            return (
              <div
                className="userConnectBtn addFriendBtn"
                onClick={sendRequest}
              >
                Send Request
              </div>
            );
          case "sent request to":
            return (
              <div className="userConnectBtn requestSentBtn">
                Cancel Request
              </div>
            );
          // case "pending_this_user_decision":
          //   return (
          //     <div className="requestResponse" ref={newRef}>
          //       <div
          //         className="userConnectBtn requestReceivedBtn"
          //         onClick={toggleShowResponseOptions}
          //       >
          //         Respond to Request
          //       </div>

          //       {showResponseOptions ? (
          //         <div className="responseOptionsMenu">
          //           <div className="optionBtn">Accept</div>
          //           <div className="optionBtn">Reject</div>
          //         </div>
          //       ) : (
          //         <></>
          //       )}
          //     </div>
          //   );
          // case "friend":
          //   return (
          //     <div className="userConnectBtn removeFriendBtn">
          //       Unfriend
          //     </div>
          //   );
          default:
            return null;
        }
      })()}

      {friendStatus === "friend" ? (
        <div className="userConnectBtn sendMessageBtn">Message</div>
      ) : (
        <></>
      )}
    </div>
  );
};
