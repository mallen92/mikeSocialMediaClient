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
          case "pending":
            return (
              <div className="connectComponentBtn requestSentBtn">
                Request Sent
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
