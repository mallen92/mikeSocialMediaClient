/*--------------- REACT IMPORTS ---------------*/
import { useState } from "react";

/*-------------- COMPONENT IMPORTS --------------*/
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import { MobileSearch } from "./subcomponents/MobileSearch";
import { LargeSearch } from "./subcomponents/LargeSearch";

/*-------------- STYLE IMPORTS --------------*/
import "./styles/Search.css";

export const Search = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="searchPage">
      {errorMessage ? (
        <MessageBanner error={errorMessage} closeError={setErrorMessage} />
      ) : (
        <></>
      )}

      <div className="hideOnLarge">
        <MobileSearch setError={setErrorMessage} />
      </div>
      <div className="hideOnMobile">
        <LargeSearch setError={setErrorMessage} />
      </div>
    </div>
  );
};
