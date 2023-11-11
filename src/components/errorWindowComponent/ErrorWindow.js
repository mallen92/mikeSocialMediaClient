import { unsetUser } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ErrorWindow = ({ error, closeWindow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="errorWindow">
      <div className="errorWindowTitle">ERROR</div>
      <div className="errorWindowMsg">{error}</div>

      {error.includes("session") ? (
        <div className="errorWindowCloseBtn" onClick={logOutUser}>
          OK
        </div>
      ) : (
        <div className="errorWindowCloseBtn" onClick={() => closeWindow(null)}>
          OK
        </div>
      )}
    </div>
  );
};
