import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LargeNavContainerMenu } from "../navMenuComponent/LargeNavContainerMenu";
import { MobileNavContainerMenu } from "../navMenuComponent/MobileNavContainerMenu";
import "./NavContainer.css";

export const NavContainer = () => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  return (
    <div className="navPanelContents">
      <div className="navBranding">TheSocial</div>

      {!user.user_token ? (
        <div className="unauthCallToAction">
          <div className="callToActionMsg">
            Log in or sign up to connect with family and friends TheSocial way!
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
        </div>
      ) : (
        <>
          <div className="hideOnMobile">
            <LargeNavContainerMenu />
          </div>

          <div className="hideOnLarge">
            <MobileNavContainerMenu />
          </div>
        </>
      )}
    </div>
  );
};
