import React from "react";

export const ConnectComponent = ({ friendStatus }) => {
  return (
    <div className="connectComponent">
      {(() => {
        switch (friendStatus) {
          case "not friend":
            return (
              <div className="connectComponentBtn addFriendBtn">Add Friend</div>
            );
          case "pending_req_user_decision":
            return (
              <div className="connectComponentBtn requestSentBtn">
                Request Sent
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
    </div>
  );
};
