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
import "../styles/LargeSearch.css";

export const LargeSearch = ({ setError }) => {
  /*------------------------ HOOK VARIABLES -----------------------*/
  const navigate = useNavigate();

  /*------------------ COMPONENT STATE VARIABLES -----------------*/
  const [searchMode, setSearchMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [resultsList, setResultsList] = useState([]);

  /*--------------------------- FUNCTIONS --------------------------*/
  const searchForUsers = (e) => {
    e.preventDefault();
    setSearchMode(true);

    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    let { fName, lName, id } = formEntries;

    fName = fName.trim();
    if (fName === "") fName = null;
    lName = lName.trim();
    if (lName === "") lName = null;
    id = id.trim();
    if (id === "") id = null;

    if (!fName && !lName && !id) setError("Please enter a search keyword.");
    else {
      if (fName?.length === 1 || lName?.length === 1 || id?.length === 1)
        setError("Search keywords must contain at least 2 characters.");
      else {
        setLoading(true);

        axios
          .post(`${userURL}/search`, { id, fName, lName })
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
    <div className="largeSearch">
      <div className="lSearchHeader">
        <div className="lSearchFormTitle">User Search</div>
        <form id="searchForm" className="lSearchForm" onSubmit={searchForUsers}>
          <input
            name="fName"
            className="lSearchFormInput"
            placeholder="First name"
          />
          <input
            name="lName"
            className="lSearchFormInput"
            placeholder="Last name"
          />
          <input
            name="id"
            className="lSearchFormInput"
            placeholder="Username"
          />
          <button type="submit" className="lSearchSubmit">
            Search
          </button>
        </form>
        {searchMode ? (
          <div
            className="clearButton"
            onClick={() => {
              setSearchMode(false);
              document.getElementById("searchForm").reset();
            }}
          >
            New Search
          </div>
        ) : (
          <></>
        )}
      </div>

      {searchMode ? (
        <>
          {isLoading ? (
            <img src={Loading} className="loadingGif" alt="loading" />
          ) : (
            <>
              {resultsList.length !== 0 ? (
                <div className="lResultList">
                  {resultsList.map((result) => (
                    <div
                      key={result.resultId}
                      className="lListedUser"
                      onClick={() => navigate(`/${result.id}`)}
                    >
                      <div className="lUserProfPic">
                        <img
                          className="lUserPic"
                          src={result.picUrl}
                          alt="user"
                        />
                      </div>
                      <div className="lUserName">
                        {result.firstName} {result.lastName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noResultsMsg">No results found.</div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="noResultsMsg">Search for a user!</div>
      )}
    </div>
  );
};
