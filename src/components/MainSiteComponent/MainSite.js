import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavigationContainer } from "../NavigationComponent/NavigationContainer";
import { MessageBanner } from "../MessageBannerComponent/MessageBanner";
import "./MainSite.css";

export const MainSite = () => {
  const [successMsg, setSuccess] = useState("");
  const [warningMsg, setWarning] = useState("");
  const [errorMsg, setError] = useState("");

  return (
    <div className="mainSite">
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
