import { Outlet } from "react-router-dom";
import "./SiteAccess.css";
import "../../util/breakpoints.css";

export const SiteAccess = () => {
  return (
    <div className="siteAccessBody">
      <div className="formContainer">
        <div className="branding">TheSocial</div>
        <Outlet />
      </div>
    </div>
  );
};
