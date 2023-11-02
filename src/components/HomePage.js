import { useSelector } from "react-redux";
import "../styles/home.css";
import { NavigationPanel } from "./homePageComponents/NavigationPanel";
import { ContentPanel } from "./homePageComponents/ContentPanel";

export const HomePage = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className="componentBody">
      <div className="navigationPanel">
        <NavigationPanel />
      </div>
      <div className="contentPanel">
        <ContentPanel />
      </div>
    </div>
  );
}
