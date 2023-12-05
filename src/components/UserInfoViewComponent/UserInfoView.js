import { FriendsPanel } from "./subcomponents/FriendsPanel";
import { AboutPanel } from "./subcomponents/AboutPanel";
import "./styles/UserInfoView.css";

export const UserInfoView = () => {
  return (
    <div className="userInfoView">
      <FriendsPanel />
      <AboutPanel />
    </div>
  );
};
