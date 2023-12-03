import { NavigationContainer } from "./NavigationComponent/NavigationContainer";
import { Outlet } from "react-router-dom";

export const UserPage = () => {
  return (
    <div className="publicPageBody">
      <NavigationContainer />
      <Outlet />
    </div>
  );
};
