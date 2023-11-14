import { unsetUser } from "../state/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ErrorWindow = ({ error, showThisWindow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(unsetUser());
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="errorWindow">
      <div className="errorWindowTitle">ERROR</div>
      <div className="errorWindowMsg">{error}</div>

      <div className="errorWindowCloseBtn" onClick={logOutUser}>
        OK
      </div>
    </div>
  );
};
