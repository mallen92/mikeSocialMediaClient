/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useState, useEffect } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { friendsURL } from "../../util/urls";

/*-------------- IMAGE IMPORTS --------------*/
import Loading from "../../images/Loading.gif";

/*-------------- STYLE IMPORTS --------------*/
import "./styles/FriendsPanel.css";

export const FriendsPanel = ({ showError }) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const location = useLocation();
  const navigate = useNavigate();

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [isLoading, setLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [moreFriends, setMoreFriends] = useState(null);

  /*---------------------- REGULAR VARIABLES ---------------------*/
  const reqUser = location.pathname.split("/")[1];

  /*----------------------- USEEFFECT HOOK ----------------------*/
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${friendsURL}?u=${reqUser}&panel=${true}`)
      .then((response) => {
        setFriendsList(response.data.friends);
        setMoreFriends(response.data.moreFriendsKey);
        setLoading(false);
      })
      .catch((error) => {
        showError(error.response.data.message);
      });
  }, [reqUser, showError]);

  /*----------------------------- JSX ----------------------------*/
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
                  onClick={() => navigate(`/${friend.username}`)}
                >
                  <div className="panelProfPic">
                    <img
                      className="panelPic"
                      src={friend.picUrl}
                      alt="friend"
                    />
                  </div>
                  <div className="panelName">
                    {friend.firstName} {friend.lastName}
                  </div>
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
