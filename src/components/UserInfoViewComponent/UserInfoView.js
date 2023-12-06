import { FriendsPanel } from "./subcomponents/FriendsPanel";
import { AboutPanel } from "./subcomponents/AboutPanel";
import { useOutletContext } from "react-router-dom";
import "./styles/UserInfoView.css";

export const UserInfoView = () => {
  const [setErrorMessage] = useOutletContext();

  return (
    <div className="userInfoView">
      <FriendsPanel showError={setErrorMessage} />
      <AboutPanel />
    </div>
  );
};
