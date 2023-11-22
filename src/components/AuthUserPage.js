import { NavigationContainer } from "./NavigationComponent/NavigationContainer";
import { Outlet } from "react-router-dom";

export const AuthUserPage = () => {
  return (
    <div className="authUserPageBody">
      <NavigationContainer />
      <Outlet />
    </div>
  );
};
