/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { userURL } from "../../../util/urls";

/*-------------- IMAGE IMPORTS --------------*/
import Loading from "../../../images/Loading.gif";

/*-------------- STYLE IMPORTS --------------*/
import "../styles/MobileSearch.css";

export const MobileSearch = ({ setError }) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const navigate = useNavigate();

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [resultsList, setResultsList] = useState([]);

  /*--------------------------- FUNCTIONS --------------------------*/
  const searchForUsers = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    let { fName, lName, username } = formEntries;

    fName = fName.trim();
    if (fName === "") fName = null;
    lName = lName.trim();
    if (lName === "") lName = null;
    username = username.trim();
    if (username === "") username = null;

    if (!fName && !lName && !username)
      setError("Please enter a search keyword.");
    else {
      if (fName?.length === 1 || lName?.length === 1 || username?.length === 1)
        setError("Search keywords must contain at least 2 characters.");
      else {
        setShowSearchForm(false);
        setLoading(true);

        axios
          .post(`${userURL}/search`, { username, fName, lName })
          .then((response) => {
            setResultsList(response.data.results);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      }
    }
  };

  return (
    <div className="mobileSearch">
      <div className="searchPageHeader">
        {showSearchForm ? (
          <div className="searchFormTitle">User Search</div>
        ) : (
          <div className="resultPageHeader">
            <div className="resultPageTitle">Users</div>
            <div className="backButton" onClick={() => setShowSearchForm(true)}>
              New Search
            </div>
          </div>
        )}
      </div>

      {showSearchForm ? (
        <form className="searchPageForm" onSubmit={searchForUsers}>
          <input
            name="fName"
            className="searchFormInput"
            placeholder="First name"
          />
          <input
            name="lName"
            className="searchFormInput"
            placeholder="Last name"
          />
          <input
            name="username"
            className="searchFormInput"
            placeholder="Username"
          />

          <button type="submit" className="searchFormSubmit">
            Search
          </button>
        </form>
      ) : (
        <>
          {isLoading ? (
            <img src={Loading} className="loadingGif" alt="loading" />
          ) : (
            <>
              {resultsList.length !== 0 ? (
                <div className="resultList">
                  {resultsList.map((result) => (
                    <div
                      key={result.resultId}
                      className="listedUser"
                      onClick={() => navigate(`/${result.username}`)}
                    >
                      <div className="userProfPic">
                        <img
                          className="userPic"
                          src={result.picUrl}
                          alt="user"
                        />
                      </div>
                      <div className="userName">
                        {result.firstName} {result.lastName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noResultsMsg">No users found.</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
