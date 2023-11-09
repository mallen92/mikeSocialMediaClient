import "./HomePage.css";
import { NavContainer } from "../navContainerComponent/NavContainer.js";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="homePageBody">
      <div className="navContainer">
        <NavContainer />
      </div>
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
};
