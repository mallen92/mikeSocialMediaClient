import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../util/url";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import SearchIcon from "@mui/icons-material/Search";
import "./FriendsView.css";

export const FriendsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const reqUserId = location.pathname.split("/")[1];

  useEffect(() => {
    let url;
    setLoading(true);

    if (searchMode)
      url = `${URL}/users/friends/search?id=${reqUserId}&keyword=${keyword}`;
    else url = `${URL}/users/friends/list?id=${reqUserId}`;

    axios
      .get(url)
      .then((response) => {
        setFriendsList(response.data.friends);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, [searchMode, reqUserId, keyword]);

  const engageSearchMode = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { keyword } = formEntries;

    if (keyword === "" || keyword.trim() === "") setSearchMode(false);
    else setSearchMode(true);

    setKeyword(keyword);
  };

  return (
    <div className="friendsView">
      {errorMessage ? (
        <MessageBanner error={errorMessage} showError={setErrorMessage} />
      ) : (
        <></>
      )}

      <form className="searchForm" onSubmit={engageSearchMode}>
        <input
          name="keyword"
          className="friendSearch"
          placeholder="Search..."
        />
        <button type="submit" className="submit">
          <SearchIcon style={{ fontSize: "40px" }} />
        </button>
      </form>

      {isLoading ? (
        <div className="loadingMsg">Retrieving friends...</div>
      ) : (
        <div className="friendList">
          {friendsList.length !== 0 ? (
            <>
              {friendsList.map((friend) => (
                <div
                  key={friend.resultId}
                  className="listedFriend"
                  onClick={() => navigate(`/${friend.id}`)}
                >
                  <div className="friendProfPic">
                    <img
                      className="friendPic"
                      src={friend.pic_url}
                      alt="friend"
                    />
                  </div>
                  <div className="friendName">{friend.full_name}</div>
                </div>
              ))}
            </>
          ) : (
            <div className="noFriendsMsg">No friends found.</div>
          )}
        </div>
      )}
    </div>
  );
};
