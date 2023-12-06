import { FriendsPanel } from "./FriendsPanel";
import { AboutPanel } from "./AboutPanel";
import { useOutletContext } from "react-router-dom";
import "./styles/UserInfoView.css";

export const UserInfoView = () => {
  const setErrorMessage = useOutletContext();

  return (
    <div className="userInfoView">
      <FriendsPanel showError={setErrorMessage} />
      <AboutPanel />
    </div>
  );
};
