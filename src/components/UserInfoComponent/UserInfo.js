/*------------- 3RD PARTY IMPORTS -------------*/
import { useOutletContext } from "react-router-dom";

/*-------------- COMPONENT IMPORTS --------------*/
import { FriendsPanel } from "./FriendsPanel";
import { AboutPanel } from "./AboutPanel";

/*-------------- STYLE IMPORTS --------------*/
import "./styles/UserInfo.css";

export const UserInfo = () => {
  const setErrorMessage = useOutletContext();

  return (
    <div className="userInfoView">
      <FriendsPanel showError={setErrorMessage} />
      <AboutPanel />
    </div>
  );
};
