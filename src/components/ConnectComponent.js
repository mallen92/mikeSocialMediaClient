import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL } from "../util/url";
import {
  addFriendRequestOut,
  deleteFriendRequestOut,
} from "../state/userSlice";
import { ErrorBanner } from "./ErrorBanner";

export const ConnectComponent = ({
  friendStatus,
  requestedUser,
  userToken,
}) => {
  const [requestSuccessMsg, setRequestSuccessMsg] = useState("");
  const [requestErrorMsg, setRequestErrorMsg] = useState("");
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
      setRequestSuccessMsg(response.data.message);
    } catch (error) {
      setRequestErrorMsg(error.response.data.message);
    }
  };

  const cancelRequest = async () => {
    try {
      const response = await axios.delete(
        `${URL}/users/request?id=${requestedUser}`,
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
      setRequestSuccessMsg(response.data.message);
    } catch (error) {
      setRequestErrorMsg(error.response.data.message);
    }
  };

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
              <div className="connectComponentBtn requestReceivedBtn">
                Respond to Request
              </div>
            );
          case "friend":
            return (
              <div className="connectComponentBtn removeFriendBtn">
                Remove Friend
              </div>
            );
          default:
            return null;
        }
      })()}

      <div className="connectComponentBtn sendMessageBtn">Send Message</div>

      {requestSuccessMsg ? (
        <div
          className="connectBanner requestSuccessMsg"
          onClick={() => setRequestSuccessMsg("")}
        >
          {requestSuccessMsg}
        </div>
      ) : (
        <></>
      )}

      {requestErrorMsg ? <ErrorBanner error={requestErrorMsg} /> : <></>}
    </div>
  );
};
