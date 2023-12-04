import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../util/url";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import "./FriendsView.css";

export const FriendsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let [page, setPage] = useState(1);
  const [friendsList, setFriendsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [hasMorePages, setHasMorePages] = useState(false);

  const reqUserId = location.pathname.split("/")[1];
  const listURL = `${URL}/users/friends/list`;
  // const searchURL = `${URL}/users/friends/search`;

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${listURL}?id=${reqUserId}&page=${page}`)
      .then((response) => {
        setFriendsList(response.data.friends);

        if (response.data.lastKey) setHasMorePages(true);
        else setHasMorePages(false);

        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, [listURL, reqUserId, page]);

  return (
    <div className="friendsView">
      {errorMessage ? (
        <MessageBanner error={errorMessage} showError={setErrorMessage} />
      ) : (
        <></>
      )}

      {isLoading ? (
        <div className="loadingMsg">Retrieving this user's friends...</div>
      ) : (
        <>
          {friendsList.length !== 0 ? (
            <>
              {friendsList.map((friend) => (
                <div key={friend.resultId} className="listedFriend">
                  <div className="friendProfPic">
                    <img
                      className="friendPic"
                      src={friend.pic_url}
                      alt="friend"
                      onClick={() => navigate(`/${friend.id}`)}
                    />
                  </div>
                  <div className="friendNameAndOptions">
                    <div
                      className="friendName"
                      onClick={() => navigate(`/${friend.id}`)}
                    >
                      {friend.full_name}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pageTurners">
                {page > 1 ? (
                  <div
                    className="previous enabled"
                    onClick={() => setPage(--page)}
                  >
                    &#129032;
                  </div>
                ) : (
                  <div className="previous disabled">&#129032;</div>
                )}
                {hasMorePages ? (
                  <div className="next enabled" onClick={() => setPage(++page)}>
                    &#129034;
                  </div>
                ) : (
                  <div className="next disabled">&#129034;</div>
                )}
              </div>
            </>
          ) : (
            <div className="noFriendsMsg">This user has no friends.</div>
          )}
        </>
      )}
    </div>
  );
};
