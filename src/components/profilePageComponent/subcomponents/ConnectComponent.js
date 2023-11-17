import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL } from "../../../util/url";
import {
  addFriendRequestOut,
  deleteFriendRequestOut,
  deleteFriendRequestIn,
  addFriend,
  removeFriend,
} from "../../../state/userSlice";
import { ErrorBanner } from "../../authErrorBannerComponent/ErrorBanner";
import CloseIcon from "@mui/icons-material/Close";

export const ConnectComponent = ({
  friendStatus,
  requestedUser,
  userToken,
}) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [neutralMsg, setNeutralMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const sendRequest = async () => {
    try {
      const response = await axios.put(
        `${URL}/users/request?id=${requestedUser}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch(addFriendRequestOut(requestedUser));

      let authUser = JSON.parse(window.localStorage.getItem("user"));
      authUser.friend_requests_out.push(requestedUser);
      window.localStorage.setItem("user", JSON.stringify(authUser));
      setSuccessMsg(response.data.message);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const cancelRequest = async () => {
    try {
      const response = await axios.delete(
        `${URL}/users/request/revoke?id=${requestedUser}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch(deleteFriendRequestOut(response.data.index));

      let authUser = JSON.parse(window.localStorage.getItem("user"));
      authUser.friend_requests_out.splice(response.data.index, 1);
      window.localStorage.setItem("user", JSON.stringify(authUser));
      setNeutralMsg(response.data.message);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const rejectRequest = async () => {
    try {
      const response = await axios.delete(
        `${URL}/users/request/reject?id=${requestedUser}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch(deleteFriendRequestIn(response.data.index));

      let authUser = JSON.parse(window.localStorage.getItem("user"));
      authUser.friend_requests_in.splice(response.data.index, 1);
      window.localStorage.setItem("user", JSON.stringify(authUser));
      setNeutralMsg(response.data.message);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const acceptRequest = async () => {
    try {
      const response = await axios.post(
        `${URL}/users/friend?id=${requestedUser}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const index = response.data.deletedRequestIndex;

      dispatch(addFriend(index));

      let authUser = JSON.parse(window.localStorage.getItem("user"));
      const friendId = authUser.friend_requests_in.splice(index, 1);
      authUser.user_friends.push(friendId[0]);
      window.localStorage.setItem("user", JSON.stringify(authUser));

      let visitedProfilesCache = JSON.parse(
        window.localStorage.getItem("visited_profiles")
      );
      let reqUserName = "";

      for (let i = 0; i < visitedProfilesCache.length; i++) {
        if (visitedProfilesCache[i].user_id === requestedUser) {
          reqUserName = `${visitedProfilesCache[i].user_first_name} ${visitedProfilesCache[i].user_last_name}`;
          break;
        }
      }

      setSuccessMsg(`You are now friends with ${reqUserName}!`);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const deleteFriend = async () => {
    try {
      const response = await axios.delete(
        `${URL}/users/friend?id=${requestedUser}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const index = response.data.removedFriendIndex;
      dispatch(removeFriend(index));

      let authUser = JSON.parse(window.localStorage.getItem("user"));
      authUser.user_friends.splice(index, 1);
      window.localStorage.setItem("user", JSON.stringify(authUser));

      let visitedProfilesCache = JSON.parse(
        window.localStorage.getItem("visited_profiles")
      );
      let reqUserName = "";

      for (let i = 0; i < visitedProfilesCache.length; i++) {
        if (visitedProfilesCache[i].user_id === requestedUser) {
          reqUserName = `${visitedProfilesCache[i].user_first_name} ${visitedProfilesCache[i].user_last_name}`;
          break;
        }
      }

      setNeutralMsg(`You are no longer friends with ${reqUserName}.`);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

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
    <div className="connectComponent">
      {(() => {
        switch (friendStatus) {
          case "not friend":
            return (
              <div
                className="connectComponentBtn addFriendBtn"
                onClick={sendRequest}
              >
                Add Friend
              </div>
            );
          case "pending_req_user_decision":
            return (
              <div
                className="connectComponentBtn requestSentBtn"
                onClick={cancelRequest}
              >
                Cancel Request
              </div>
            );
          case "pending_this_user_decision":
            return (
              <div className="requestResponse" ref={newRef}>
                <div
                  className="connectComponentBtn requestReceivedBtn"
                  onClick={toggleShowResponseOptions}
                >
                  Respond to Request
                </div>

                {showResponseOptions ? (
                  <div className="responseOptionsMenu">
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
              <div
                className="connectComponentBtn removeFriendBtn"
                onClick={deleteFriend}
              >
                Remove Friend
              </div>
            );
          default:
            return null;
        }
      })()}

      <div className="connectComponentBtn sendMessageBtn">Send Message</div>

      {successMsg ? (
        <div className="dialogueBanner successBanner">
          <div className="bannerMsg">{successMsg}</div>
          <CloseIcon
            fontSize="large"
            className="closeBanner"
            onClick={() => setSuccessMsg("")}
          />
        </div>
      ) : (
        <></>
      )}

      {neutralMsg ? (
        <div className="dialogueBanner neutralBanner">
          <div className="bannerMsg">{neutralMsg}</div>
          <CloseIcon
            fontSize="large"
            className="closeBanner"
            onClick={() => setNeutralMsg("")}
          />
        </div>
      ) : (
        <></>
      )}

      {errorMsg ? <ErrorBanner error={errorMsg} /> : <></>}
    </div>
  );
};
