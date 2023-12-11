import { Outlet } from "react-router-dom";
import { NavigationContainer } from "../NavigationComponent/NavigationContainer";
import "./MainSite.css";

export const MainSite = () => {
  return (
    <div className="mainSite">
      <NavigationContainer />
      <Outlet />
    </div>
  );
};
