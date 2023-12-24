/*------------- 3RD PARTY IMPORTS -------------*/
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*-------------- COMPONENT IMPORTS --------------*/
import { LargeNavMenu } from "./subcomponents/LargeNavMenu";
import { MobileNavMenu } from "./subcomponents/MobileNavMenu";

/*-------------- STYLE IMPORTS --------------*/
import "./styles/NavigationContainer.css";

export const NavigationContainer = ({ setError }) => {
  /*------------------ HOOKS ------------------*/
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  /*------------------ JSX ------------------*/
  return (
    <div className="navigationContainerBody">
      <div className="branding">TheSocial</div>

      {!user.accessToken ? (
        <>
          <div className="callToActionMsg">
            Connect with family and friends TheSocial way!
          </div>

          <div className="callToActionBtns">
            <div
              className="callToActionBtn"
              onClick={() => navigate("/access")}
            >
              Log In
            </div>
            <div
              className="callToActionBtn"
              onClick={() => navigate("/access/signup")}
            >
              Sign Up
            </div>
            <div
              className="callToActionBtn"
              onClick={() => navigate("/search")}
            >
              Search
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="largeNavMenuContainer hideOnMobile">
            <LargeNavMenu setError={setError} />
          </div>

          <div className="hideOnLarge">
            <MobileNavMenu />
          </div>
        </>
      )}
    </div>
  );
};
