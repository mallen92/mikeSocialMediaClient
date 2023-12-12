/*------------- 3RD PARTY IMPORTS -------------*/
import { Outlet } from "react-router-dom";

/*-------------- CONFIG IMPORTS --------------*/
import { useState } from "react";

/*-------------- COMPONENT IMPORTS --------------*/
import { NavigationContainer } from "../NavigationComponent/NavigationContainer";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";

/*-------------- STYLE IMPORTS --------------*/
import "./AuthSite.css";

export const AuthSite = () => {
  /*--------- STATE VARIABLES ---------*/
  const [successMsg, setSuccess] = useState("");
  const [warningMsg, setWarning] = useState("");
  const [errorMsg, setError] = useState("");

  /*--------- JSX ---------*/
  return (
    <div className="authSite">
      <NavigationContainer setError={setError} />

      <div className="contentSection">
        {successMsg || warningMsg || errorMsg ? (
          <MessageBanner
            success={successMsg}
            closeSuccess={setSuccess}
            warning={warningMsg}
            closeWarning={setWarning}
            error={errorMsg}
            closeError={setError}
          />
        ) : (
          <></>
        )}

        <Outlet context={{ setSuccess, setWarning, setError }} />
      </div>
    </div>
  );
};
