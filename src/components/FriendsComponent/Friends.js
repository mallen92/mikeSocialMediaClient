/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useState, useEffect } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { friendsURL } from "../../util/urls";

/*-------------- COMPONENT IMPORTS --------------*/
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";

/*-------------- ICON IMPORTS --------------*/
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../images/Loading.gif";

/*-------------- STYLE IMPORTS --------------*/
import "./Friends.css";

export const Friends = () => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const location = useLocation();
  const navigate = useNavigate();

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [isLoading, setLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /*---------------------- REGULAR VARIABLES ---------------------*/
  const reqUserId = location.pathname.split("/")[1];

  /*--------------------------- FUNCTIONS --------------------------*/
  const searchForFriends = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { keyword } = formEntries;

    if (
      (keyword.length > 0 && keyword.length < 3) ||
      (keyword.trim().length > 0 && keyword.trim().length < 3)
    )
      setErrorMessage("Search keyword must contain at least 3 characters.");
    else {
      if (keyword === "" || keyword.trim() === "") setSearchMode(false);
      else {
        setSearchMode(true);
        setKeyword(keyword);
      }
    }
  };

  /*----------------------------- USEEFFECT HOOK ----------------------------*/
  useEffect(() => {
    setLoading(true);

    let url;
    if (searchMode) url = `${friendsURL}?id=${reqUserId}&keyword=${keyword}`;
    else url = `${friendsURL}?id=${reqUserId}`;

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

  /*----------------------------------- JSX ----------------------------------*/
  return (
    <div className="friendsView">
      {errorMessage ? (
        <MessageBanner error={errorMessage} closeError={setErrorMessage} />
      ) : (
        <></>
      )}

      <div className="friendsViewContent">
        <div className="friendsViewHeader">
          <div className="friendsViewTitle">Friends</div>
          <div className="backBtn" onClick={() => navigate(`/${reqUserId}`)}>
            Back to Profile
          </div>
          <form className="searchForm" onSubmit={searchForFriends}>
            <input
              name="keyword"
              className="friendSearch"
              placeholder="Search..."
            />
            <button type="submit" className="submit">
              <SearchIcon style={{ fontSize: "40px" }} />
            </button>
          </form>
        </div>

        {isLoading ? (
          <img src={Loading} className="loadingGif" alt="loading" />
        ) : (
          <>
            {friendsList.length !== 0 ? (
              <div className="friendList">
                {friendsList.map((friend) => (
                  <div
                    key={friend.resultId}
                    className="listedFriend"
                    onClick={() => navigate(`/${friend.id}`)}
                  >
                    <div className="friendProfPic">
                      <img
                        className="friendPic"
                        src={friend.picUrl}
                        alt="friend"
                      />
                    </div>
                    <div className="friendName">
                      {friend.firstName} {friend.lastName}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noFriendsMsg">No friends found.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
