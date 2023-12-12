import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../../app/userSlice";
import "./SessionLoading.css";

export const SessionLoading = ({ error }) => {
  /*--------- CONFIGURATIONS ---------*/
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*--------- FUNCTIONS ---------*/
  const logOutUser = () => {
    dispatch(unsetUser());
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
