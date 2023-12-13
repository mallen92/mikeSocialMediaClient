import { useNavigate } from "react-router-dom";
import "./SessionLoading.css";

export const SessionLoading = ({ error }) => {
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.clear();
    navigate(0);
  };

  return (
    <div className="sessionLoading">
      {error ? (
        <div className="dialogWindow">
          <div className="windowHeader">
            Session Expired
            <div className="closeBanner" onClick={logOutUser}>
              &#10006;
            </div>
          </div>
          <div className="windowMsg">{error}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
