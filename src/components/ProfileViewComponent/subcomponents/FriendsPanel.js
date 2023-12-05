import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../util/url";
import Loading from "../images/Loading.gif";
import "../styles/FriendsPanel.css";

export const FriendsPanel = ({ showError }) => {
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const [friendsList, setFriendsList] = useState([]);
  const [moreFriends, setMoreFriends] = useState(null);
  const navigate = useNavigate();

  const reqUserId = location.pathname.split("/")[1];

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${URL}/users/friends/preview?id=${reqUserId}`)
      .then((response) => {
        setFriendsList(response.data.friends);
        setMoreFriends(response.data.lastKey);
        setLoading(false);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  }, [reqUserId, showError]);

  return (
    <div className="friendsPanel">
      <div className="panelHeader">
        <div className="panelTitle">Friends</div>
        {moreFriends ? (
          <div className="viewMoreBtn" onClick={() => navigate(`friends`)}>
            View full list
          </div>
        ) : (
          <></>
        )}
      </div>
      {isLoading ? (
        <img src={Loading} className="loadingGif" alt="loading" />
      ) : (
        <div className="panelFriendList">
          {friendsList.length !== 0 ? (
            <>
              {friendsList.map((friend) => (
                <div
                  key={friend.resultId}
                  className="panelFriend"
                  onClick={() => navigate(`/${friend.id}`)}
                >
                  <div className="panelProfPic">
                    <img
                      className="panelPic"
                      src={friend.pic_url}
                      alt="friend"
                    />
                  </div>
                  <div className="panelName">{friend.full_name}</div>
                </div>
              ))}
            </>
          ) : (
            <div className="panelNoFriendsMsg">No friends</div>
          )}
        </div>
      )}
    </div>
  );
};
