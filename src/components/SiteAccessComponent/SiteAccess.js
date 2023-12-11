import { Outlet } from "react-router-dom";
import "./SiteAccess.css";

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
