import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LargeNavMenu } from "./subcomponents/LargeNavMenu";
import { MobileNavMenu } from "./subcomponents/MobileNavMenu";
import "./styles/NavigationContainer.css";

export const NavigationContainer = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  return (
    <div className="navigationContainerBody">
      <div className="branding">TheSocial</div>

      {!user.token ? (
        <>
          <div className="callToActionMsg">
            Connect with family and friends TheSocial way!
          </div>

          <div className="callToActionBtns">
            <div className="callToActionBtn" onClick={() => navigate("/login")}>
              Log In
            </div>
            <div
              className="callToActionBtn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="largeNavMenuContainer hideOnMobile">
            <LargeNavMenu />
          </div>

          <div className="hideOnLarge">
            <MobileNavMenu />
          </div>
        </>
      )}
    </div>
  );
};
